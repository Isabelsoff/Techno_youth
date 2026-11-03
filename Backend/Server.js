// ==============================================================================
// TechnoYouth - Servidor Principal (Server.js)
// Backend Express + SQLite + Firebase Admin + reCAPTCHA v2 + Multer
// ==============================================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const bcrypt = require('bcryptjs');

// Carga de módulos de cursos y videos
const cursosCientifico = require('./cursosData');
const cursosCreativo = require('./cursosCreativo');
const cursosPractico = require('./cursosPractico');
const cursosSocial = require('./cursosSocial');
const { sincronizarVideos } = require('./videosSync');

// =============================================
// CONFIGURACIÓN BÁSICA Y RUTAS DE DIRECTORIOS
// =============================================
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const FRONTEND_DIR = path.join(__dirname, '..', 'Frontend');

if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// =============================================
// // TODO-FIREBASE: FIREBASE ADMIN SDK INICIALIZACIÓN
// =============================================
let admin = null;
let firebaseAdminActivo = false;

try {
    admin = require('firebase-admin');
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
        ? path.resolve(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
        : null;

    if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        firebaseAdminActivo = true;
        console.log('✓ Firebase Admin inicializado exitosamente con archivo de credenciales.');
    } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            })
        });
        firebaseAdminActivo = true;
        console.log('✓ Firebase Admin inicializado exitosamente desde variables de entorno.');
    } else {
        console.warn('⚠️ [ADVERTENCIA DEV] Firebase Admin no configurado aún (falta serviceAccountKey.json o variables de entorno). Modo desarrollo activo.');
    }
} catch (e) {
    console.warn('⚠️ [ADVERTENCIA DEV] Error inicializando Firebase Admin:', e.message);
}

// =============================================
// EXPRESS APP Y MIDDLEWARES GLOBALES
// =============================================
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos de uploads y frontend
app.use('/uploads', express.static(UPLOADS_DIR));
app.use(express.static(FRONTEND_DIR));

// =============================================
// BASE DE DATOS (SQLite)
// =============================================
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

const run = (sql, p = []) => new Promise((resolve, reject) => {
    db.run(sql, p, function (err) {
        if (err) reject(err);
        else resolve(this);
    });
});

const get = (sql, p = []) => new Promise((resolve, reject) => {
    db.get(sql, p, (err, row) => {
        if (err) reject(err);
        else resolve(row);
    });
});

const all = (sql, p = []) => new Promise((resolve, reject) => {
    db.all(sql, p, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
    });
});

async function initDB() {
    // 1. Tabla de Usuarios
    await run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firebase_uid TEXT UNIQUE,
        nombre TEXT NOT NULL,
        correo TEXT NOT NULL UNIQUE,
        password TEXT,
        edad INTEGER,
        foto_perfil TEXT,
        auth_provider TEXT NOT NULL DEFAULT 'local',
        fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Migración de columnas si la tabla ya existía
    const colsUsuarios = (await all('PRAGMA table_info(usuarios)')).map(c => c.name);
    const necesariasUsuarios = {
        firebase_uid: 'TEXT UNIQUE',
        edad: 'INTEGER',
        foto_perfil: 'TEXT',
        auth_provider: "TEXT NOT NULL DEFAULT 'local'",
        fecha_registro: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
    };
    for (const [col, tipo] of Object.entries(necesariasUsuarios)) {
        if (!colsUsuarios.includes(col)) {
            try {
                await run(`ALTER TABLE usuarios ADD COLUMN ${col} ${tipo}`);
            } catch { /* ignora si ya existía índice o restricción */ }
        }
    }

    // 2. Tabla de Preguntas Vocacionales
    await run(`CREATE TABLE IF NOT EXISTS preguntas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        texto TEXT NOT NULL,
        categoria TEXT NOT NULL,
        opciones TEXT NOT NULL
    )`);

    // 3. Tabla de Respuestas
    await run(`CREATE TABLE IF NOT EXISTS respuestas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        pregunta_id INTEGER NOT NULL,
        respuesta TEXT NOT NULL,
        perfil TEXT,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY (pregunta_id) REFERENCES preguntas(id)
    )`);

    // 4. Tabla de Resultados
    await run(`CREATE TABLE IF NOT EXISTS resultados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        perfil_dominante TEXT NOT NULL,
        puntajes TEXT NOT NULL,
        recomendaciones TEXT NOT NULL,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )`);

    // 5. Tabla de Cursos
    await run(`CREATE TABLE IF NOT EXISTS cursos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        perfil TEXT NOT NULL,
        titulo TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        icono TEXT NOT NULL,
        orden INTEGER DEFAULT 1
    )`);

    // 6. Tabla de Módulos
    await run(`CREATE TABLE IF NOT EXISTS modulos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        curso_id INTEGER NOT NULL,
        titulo TEXT NOT NULL,
        descripcion TEXT,
        video_url TEXT NOT NULL,
        lectura TEXT NOT NULL,
        quiz TEXT NOT NULL,
        orden INTEGER DEFAULT 1,
        FOREIGN KEY (curso_id) REFERENCES cursos(id)
    )`);

    // 7. Tabla de Inscripciones
    await run(`CREATE TABLE IF NOT EXISTS inscripciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        curso_id INTEGER NOT NULL,
        fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (usuario_id, curso_id),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY (curso_id) REFERENCES cursos(id)
    )`);

    // 8. Tabla de Progreso de Usuario
    await run(`CREATE TABLE IF NOT EXISTS progreso_usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        modulo_id INTEGER NOT NULL,
        puntaje INTEGER NOT NULL DEFAULT 0,
        total_preguntas INTEGER NOT NULL DEFAULT 3,
        completado BOOLEAN DEFAULT 0,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (usuario_id, modulo_id),
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY (modulo_id) REFERENCES modulos(id)
    )`);

    // =============================================
    // SEEDING INICIAL DE PREGUNTAS (8 Preguntas)
    // =============================================
    const countPreguntas = await get('SELECT COUNT(*) AS total FROM preguntas');
    if (!countPreguntas || countPreguntas.total === 0) {
        console.log('Poblando preguntas vocacionales iniciales...');
        const preguntasIniciales = [
            {
                texto: '¿Qué actividad disfrutas más en tu tiempo libre?',
                categoria: 'intereses',
                opciones: JSON.stringify([
                    { texto: 'Investigar, analizar cómo funcionan las cosas y resolver acertijos', perfil: 'cientifico' },
                    { texto: 'Dibujar, escribir historias, editar fotos o tocar un instrumento', perfil: 'creativo' },
                    { texto: 'Ayudar a personas, escuchar problemas y organizar actividades grupales', perfil: 'social' },
                    { texto: 'Arreglar aparatos, armar piezas, programar o hacer deportes', perfil: 'practico' }
                ])
            },
            {
                texto: '¿Qué tipo de desafíos o problemas prefieres resolver?',
                categoria: 'intereses',
                opciones: JSON.stringify([
                    { texto: 'Problemas matemáticos, científicos o de lógica compleja', perfil: 'cientifico' },
                    { texto: 'Diseñar la identidad visual o buscar formas originales de comunicar algo', perfil: 'creativo' },
                    { texto: 'Resolver desacuerdos entre amigos y mejorar la convivencia', perfil: 'social' },
                    { texto: 'Reparar un dispositivo que no funciona o construir una herramienta útil', perfil: 'practico' }
                ])
            },
            {
                texto: 'En tus materias o asignaturas, ¿cuáles te llaman más la atención?',
                categoria: 'habilidades',
                opciones: JSON.stringify([
                    { texto: 'Matemáticas, Física, Química o Biología', perfil: 'cientifico' },
                    { texto: 'Artes, Literatura, Diseño o Música', perfil: 'creativo' },
                    { texto: 'Filosofía, Ciencias Sociales, Psicología o Ética', perfil: 'social' },
                    { texto: 'Tecnología, Informática, Mecánica o Educación Física', perfil: 'practico' }
                ])
            },
            {
                texto: 'Si te invitan a un proyecto escolar o grupal, ¿qué rol asumes con gusto?',
                categoria: 'habilidades',
                opciones: JSON.stringify([
                    { texto: 'Investigador o analista de los datos y hechos', perfil: 'cientifico' },
                    { texto: 'Diseñador creativo del contenido, diapositivas y estilo visual', perfil: 'creativo' },
                    { texto: 'Coordinador que motiva al equipo y expone la presentación', perfil: 'social' },
                    { texto: 'Constructor técnico que hace funcionar la maqueta o prototipo', perfil: 'practico' }
                ])
            },
            {
                texto: '¿En qué tipo de entorno te visualizas trabajando a futuro?',
                categoria: 'preferencias',
                opciones: JSON.stringify([
                    { texto: 'En un centro de investigación, laboratorio o analizando datos', perfil: 'cientifico' },
                    { texto: 'En un estudio de diseño, agencia creativa o entorno artístico libre', perfil: 'creativo' },
                    { texto: 'En una comunidad, escuela, hospital o consultorio apoyando a otros', perfil: 'social' },
                    { texto: 'En un taller tecnológico, fábrica automatizada o en campo con herramientas', perfil: 'practico' }
                ])
            },
            {
                texto: '¿Qué cualidad personal consideras que te describe mejor?',
                categoria: 'personalidad',
                opciones: JSON.stringify([
                    { texto: 'Curioso, analítico y observador detallista', perfil: 'cientifico' },
                    { texto: 'Imaginativo, intuitivo y apasionado por la estética', perfil: 'creativo' },
                    { texto: 'Empático, comunicativo y solidario', perfil: 'social' },
                    { texto: 'Práctico, eficiente y orientado a la acción inmediata', perfil: 'practico' }
                ])
            },
            {
                texto: 'Cuando enfrentas un problema nuevo, ¿cómo comienzas?',
                categoria: 'metodologia',
                opciones: JSON.stringify([
                    { texto: 'Investigo antecedentes, recopilo datos y comparo hipótesis', perfil: 'cientifico' },
                    { texto: 'Hago lluvia de ideas sin límites y busco una perspectiva innovadora', perfil: 'creativo' },
                    { texto: 'Converso con otras personas para escuchar sus opiniones y experiencias', perfil: 'social' },
                    { texto: 'Pongo manos a la obra probando opciones hasta encontrar la que funcione', perfil: 'practico' }
                ])
            },
            {
                texto: '¿Qué impacto te gustaría lograr con tu profesión?',
                categoria: 'valores',
                opciones: JSON.stringify([
                    { texto: 'Descubrir nuevos conocimientos o avances que cambien el mundo', perfil: 'cientifico' },
                    { texto: 'Inspirar emociones y crear belleza visual o cultural duradera', perfil: 'creativo' },
                    { texto: 'Mejorar la calidad de vida y el bienestar emocional de las personas', perfil: 'social' },
                    { texto: 'Construir infraestructuras, sistemas o tecnologías útiles y seguras', perfil: 'practico' }
                ])
            }
        ];

        for (const p of preguntasIniciales) {
            await run('INSERT INTO preguntas (texto, categoria, opciones) VALUES (?, ?, ?)', [
                p.texto, p.categoria, p.opciones
            ]);
        }
        console.log('✓ 8 preguntas vocacionales cargadas.');
    }

    // =============================================
    // SEEDING DE CURSOS Y MÓDULOS
    // =============================================
    const countCursos = await get('SELECT COUNT(*) AS total FROM cursos');
    if (!countCursos || countCursos.total === 0) {
        console.log('Poblando cursos y módulos desde archivos de datos...');
        const colecciones = [
            ...cursosCientifico,
            ...cursosCreativo,
            ...cursosPractico,
            ...cursosSocial
        ];

        for (const curso of colecciones) {
            const rCurso = await run(
                `INSERT INTO cursos (perfil, titulo, descripcion, icono, orden)
                 VALUES (?, ?, ?, ?, ?)`,
                [curso.perfil, curso.titulo, curso.descripcion, curso.icono || '◈', curso.orden || 1]
            );
            const cursoId = rCurso.lastID;

            if (Array.isArray(curso.modulos)) {
                for (const m of curso.modulos) {
                    const videoUrl = ''; // el video lo pone sincronizarVideos()
                    await run(
                        `INSERT INTO modulos (curso_id, titulo, descripcion, video_url, lectura, quiz, orden)
                         VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        [
                            cursoId,
                            m.titulo,
                            m.descripcion || '',
                            videoUrl,
                            m.lectura || '',
                            JSON.stringify(m.quiz || []),
                            m.orden || 1
                        ]
                    );
                }
            }
        }
        console.log('✓ Cursos y módulos estructurados cargados.');
    }

    // Aplica videosModulos.js a los módulos que ya existen en la base de datos
    await sincronizarVideos(all, run);
}

// =============================================
// UTILIDADES Y SANITIZACIÓN
// =============================================
const usuarioPublico = (u) => ({
    id: u.id,
    firebase_uid: u.firebase_uid || null,
    nombre: u.nombre,
    correo: u.correo,
    edad: u.edad,
    foto_perfil: u.foto_perfil,
    auth_provider: u.auth_provider
});

// // TODO-FIREBASE: Middleware de autenticación con verificación de ID Token de Firebase Admin
async function verificarAuthFirebase(req, res, next) {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

        if (!token) {
            return res.status(401).json({ error: 'No autorizado: falta token de autenticación' });
        }

        if (firebaseAdminActivo && admin) {
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.firebaseUser = decodedToken;

            // Busca usuario en SQLite por firebase_uid o por correo
            let user = await get('SELECT * FROM usuarios WHERE firebase_uid = ? OR correo = ?', [
                decodedToken.uid,
                decodedToken.email || ''
            ]);

            if (!user) {
                // Sincroniza usuario automáticamente si existe en Firebase pero no en SQLite
                const resInsert = await run(
                    `INSERT INTO usuarios (firebase_uid, nombre, correo, foto_perfil, auth_provider)
                     VALUES (?, ?, ?, ?, ?)`,
                    [
                        decodedToken.uid,
                        decodedToken.name || (decodedToken.email ? decodedToken.email.split('@')[0] : 'Usuario'),
                        decodedToken.email || `${decodedToken.uid}@technoyouth.local`,
                        decodedToken.picture || null,
                        decodedToken.firebase_sign_in_provider || 'firebase'
                    ]
                );
                user = await get('SELECT * FROM usuarios WHERE id = ?', [resInsert.lastID]);
            } else if (!user.firebase_uid) {
                await run('UPDATE usuarios SET firebase_uid = ? WHERE id = ?', [decodedToken.uid, user.id]);
                user.firebase_uid = decodedToken.uid;
            }

            req.user = user;
            return next();
        } else {
            // Modo desarrollo: token simulado "dev-token-<id>-<fecha>" generado en /api/login
            if (token.startsWith('dev-token-')) {
                const idDev = parseInt(token.split('-')[2], 10);
                const userDev = Number.isInteger(idDev)
                    ? await get('SELECT * FROM usuarios WHERE id = ?', [idDev])
                    : null;
                if (userDev) {
                    req.user = userDev;
                    return next();
                }
            }

            // Modo desarrollo: decodifica el token sin firma o busca por usuarioId
            try {
                const parts = token.split('.');
                if (parts.length === 3) {
                    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
                    let user = await get('SELECT * FROM usuarios WHERE firebase_uid = ? OR correo = ?', [
                        payload.user_id || payload.sub || payload.uid,
                        payload.email || ''
                    ]);
                    if (!user) {
                        const r = await run(
                            `INSERT INTO usuarios (firebase_uid, nombre, correo, auth_provider)
                             VALUES (?, ?, ?, 'firebase-dev')`,
                            [payload.user_id || payload.sub || 'dev-uid', payload.name || 'Usuario Dev', payload.email || 'dev@technoyouth.local']
                        );
                        user = await get('SELECT * FROM usuarios WHERE id = ?', [r.lastID]);
                    }
                    req.user = user;
                    return next();
                }
            } catch { /* ignora */ }

            // Si hay un usuario por defecto en la BD
            let fallbackUser = await get('SELECT * FROM usuarios LIMIT 1');
            if (fallbackUser) {
                req.user = fallbackUser;
                return next();
            }
            return res.status(401).json({ error: 'Sesión no válida' });
        }
    } catch (error) {
        console.error('Error verificando token:', error.message);
        return res.status(401).json({ error: 'Sesión inválida o expirada' });
    }
}

// Verificación de reCAPTCHA v2 ante Google
async function verificarRecaptcha(token) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
        console.warn('⚠️ [ADVERTENCIA DEV] reCAPTCHA omitido: RECAPTCHA_SECRET_KEY no configurado en .env');
        return true;
    }

    if (!token) return false;

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                secret: secretKey,
                response: token
            })
        });
        const data = await response.json();
        return data.success === true;
    } catch (err) {
        console.error('Error al contactar con el servidor de Google reCAPTCHA:', err);
        return false;
    }
}

// =============================================
// SUBIDA DE FOTO DE PERFIL (Multer)
// =============================================
const TIPOS_MIME_PERMITIDOS = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => {
        const ext = TIPOS_MIME_PERMITIDOS[file.mimetype] || path.extname(file.originalname).toLowerCase() || '.jpg';
        const usuarioId = req.user ? req.user.id : (req.body && req.body.usuario_id) || 'registro';
        cb(null, `avatar-${usuarioId}-${Date.now()}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB máximo
    fileFilter: (req, file, cb) => {
        if (TIPOS_MIME_PERMITIDOS[file.mimetype]) {
            cb(null, true);
        } else {
            cb(new Error('Formato no soportado. Usa imágenes JPG, PNG o WEBP.'));
        }
    }
});

// =============================================
// RUTAS DE LA API (Prefijo /api/...)
// =============================================

// 1. Configuración Pública (para inicializar Firebase y reCAPTCHA en el Frontend)
app.get('/api/config', (req, res) => {
    res.json({
        recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || '',
        firebase: {
            apiKey: process.env.FIREBASE_API_KEY || '',
            authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
            projectId: process.env.FIREBASE_PROJECT_ID || '',
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
            appId: process.env.FIREBASE_APP_ID || ''
        }
    });
});

// 2. Registro de Usuario (con soporte opcional de subida de foto inicial)
app.post('/api/registro', upload.single('foto'), async (req, res) => {
    try {
        const nombre = (req.body.nombre || '').trim();
        const correo = (req.body.correo || req.body.email || '').trim().toLowerCase();
        const password = req.body.password || '';
        const edad = req.body.edad ? parseInt(req.body.edad, 10) : null;
        const idToken = req.body.idToken || '';

        if (!nombre || !correo) {
            if (req.file) fs.unlink(req.file.path, () => {});
            return res.status(400).json({ error: 'Completa nombre y correo electrónico' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            if (req.file) fs.unlink(req.file.path, () => {});
            return res.status(400).json({ error: 'Ingresa un correo electrónico válido' });
        }

        let firebaseUid = null;

        // // TODO-FIREBASE: Sincronización con Firebase ID Token recibido del frontend
        if (idToken && firebaseAdminActivo && admin) {
            try {
                const decoded = await admin.auth().verifyIdToken(idToken);
                firebaseUid = decoded.uid;
            } catch (err) {
                console.warn('Error verificando idToken en registro:', err.message);
            }
        }

        // // TODO-FIREBASE: Creación alternativa de usuario en Firebase Auth usando Admin SDK
        if (!firebaseUid && firebaseAdminActivo && admin && password) {
            if (password.length < 6) {
                if (req.file) fs.unlink(req.file.path, () => {});
                return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
            }
            try {
                const userRecord = await admin.auth().createUser({
                    email: correo,
                    password: password,
                    displayName: nombre
                });
                firebaseUid = userRecord.uid;
            } catch (fbErr) {
                if (req.file) fs.unlink(req.file.path, () => {});
                if (fbErr.code === 'auth/email-already-exists') {
                    return res.status(409).json({ error: 'Ese correo ya está registrado en Firebase' });
                }
                if (fbErr.code === 'auth/invalid-password') {
                    return res.status(400).json({ error: 'La contraseña es muy débil (mínimo 6 caracteres)' });
                }
                return res.status(400).json({ error: fbErr.message });
            }
        }

        // Verificar si el correo ya existe en SQLite
        const existente = await get('SELECT id FROM usuarios WHERE correo = ?', [correo]);
        if (existente) {
            if (req.file) fs.unlink(req.file.path, () => {});
            return res.status(409).json({ error: 'Ese correo ya está registrado' });
        }

        // Ruta de foto si se subió un archivo
        const fotoRuta = req.file ? `/uploads/${req.file.filename}` : null;
        const passwordHash = password ? await bcrypt.hash(password, 10) : null;

        const resultado = await run(
            `INSERT INTO usuarios (firebase_uid, nombre, correo, password, edad, foto_perfil, auth_provider)
             VALUES (?, ?, ?, ?, ?, ?, 'local')`,
            [firebaseUid, nombre, correo, passwordHash, edad, fotoRuta]
        );

        const nuevoUsuario = await get('SELECT * FROM usuarios WHERE id = ?', [resultado.lastID]);

        return res.status(201).json({
            mensaje: 'Cuenta creada exitosamente',
            usuario: usuarioPublico(nuevoUsuario)
        });
    } catch (e) {
        console.error('Error en /api/registro:', e);
        if (req.file) fs.unlink(req.file.path, () => {});
        return res.status(500).json({ error: 'Error del servidor al procesar el registro' });
    }
});

// 3. Inicio de Sesión Seguro con reCAPTCHA v2 y Firebase REST API
app.post('/api/login', async (req, res) => {
    try {
        const correo = (req.body.correo || req.body.email || '').trim().toLowerCase();
        const password = req.body.password || '';
        const recaptchaToken = req.body.recaptchaToken || '';

        if (!correo || !password) {
            return res.status(400).json({ error: 'Ingresa correo y contraseña' });
        }

        // Verificación obligatoria de reCAPTCHA
        const recaptchaValido = await verificarRecaptcha(recaptchaToken);
        if (!recaptchaValido) {
            return res.status(400).json({ error: 'Verifica la casilla de reCAPTCHA ("No soy un robot")' });
        }

        let firebaseIdToken = null;
        let firebaseUid = null;

        // // TODO-FIREBASE: Autenticación con Firebase Auth REST API (signInWithPassword)
        if (process.env.FIREBASE_API_KEY) {
            try {
                const fbUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;
                const fbRes = await fetch(fbUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: correo,
                        password: password,
                        returnSecureToken: true
                    })
                });

                const fbData = await fbRes.json();

                if (!fbRes.ok) {
                    const fbErrorMsg = fbData.error ? fbData.error.message : '';
                    if (fbErrorMsg.includes('EMAIL_NOT_FOUND') || fbErrorMsg.includes('INVALID_PASSWORD') || fbErrorMsg.includes('INVALID_LOGIN_CREDENTIALS')) {
                        return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
                    }
                    if (fbErrorMsg.includes('USER_DISABLED')) {
                        return res.status(403).json({ error: 'Esta cuenta ha sido inhabilitada' });
                    }
                    if (fbErrorMsg.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
                        return res.status(429).json({ error: 'Demasiados intentos fallidos. Intenta más tarde.' });
                    }
                    return res.status(400).json({ error: fbErrorMsg || 'Error de autenticación con Firebase' });
                }

                firebaseIdToken = fbData.idToken;
                firebaseUid = fbData.localId;
            } catch (fbFetchErr) {
                console.error('Error contactando Firebase Auth REST API:', fbFetchErr);
            }
        }

        // Busca el usuario en SQLite
        let user = await get('SELECT * FROM usuarios WHERE correo = ?', [correo]);

        // Si Firebase no estaba configurado o como fallback local: valida contraseña local con bcrypt
        if (!firebaseIdToken) {
            if (!user) {
                return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
            }
            if (user.password) {
                const coincide = await bcrypt.compare(password, user.password);
                if (!coincide) {
                    return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
                }
            }
            // En modo desarrollo sin Firebase API Key, genera token simulado
            firebaseIdToken = `dev-token-${user.id}-${Date.now()}`;
        } else {
            // Si el usuario autenticó en Firebase pero no está en SQLite, créalo
            if (!user) {
                const rInsert = await run(
                    `INSERT INTO usuarios (firebase_uid, nombre, correo, auth_provider)
                     VALUES (?, ?, ?, 'firebase')`,
                    [firebaseUid, correo.split('@')[0], correo]
                );
                user = await get('SELECT * FROM usuarios WHERE id = ?', [rInsert.lastID]);
            } else if (!user.firebase_uid && firebaseUid) {
                await run('UPDATE usuarios SET firebase_uid = ? WHERE id = ?', [firebaseUid, user.id]);
                user.firebase_uid = firebaseUid;
            }
        }

        return res.json({
            idToken: firebaseIdToken,
            usuario: usuarioPublico(user)
        });
    } catch (e) {
        console.error('Error en /api/login:', e);
        return res.status(500).json({ error: 'Error del servidor al iniciar sesión' });
    }
});

// 4. Sincronización de Autenticación Social (Google y Microsoft desde Firebase Client)
app.post('/api/auth/social', async (req, res) => {
    try {
        const { idToken, nombre, correo, foto, provider } = req.body;
        if (!correo) {
            return res.status(400).json({ error: 'Datos de autenticación incompletos' });
        }

        let firebaseUid = null;
        if (idToken && firebaseAdminActivo && admin) {
            try {
                const decoded = await admin.auth().verifyIdToken(idToken);
                firebaseUid = decoded.uid;
            } catch (err) {
                console.warn('Advertencia en validación de token social:', err.message);
            }
        }

        let user = await get('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        if (!user) {
            const r = await run(
                `INSERT INTO usuarios (firebase_uid, nombre, correo, foto_perfil, auth_provider)
                 VALUES (?, ?, ?, ?, ?)`,
                [firebaseUid, nombre || correo.split('@')[0], correo, foto || null, provider || 'social']
            );
            user = await get('SELECT * FROM usuarios WHERE id = ?', [r.lastID]);
        } else {
            // Si el usuario existe pero no tiene foto y el proveedor la tiene, la guardamos
            if (!user.foto_perfil && foto) {
                await run('UPDATE usuarios SET foto_perfil = ? WHERE id = ?', [foto, user.id]);
                user.foto_perfil = foto;
            }
            if (firebaseUid && !user.firebase_uid) {
                await run('UPDATE usuarios SET firebase_uid = ? WHERE id = ?', [firebaseUid, user.id]);
                user.firebase_uid = firebaseUid;
            }
        }

        return res.json({ usuario: usuarioPublico(user) });
    } catch (e) {
        console.error('Error en /api/auth/social:', e);
        return res.status(500).json({ error: 'Error al sincronizar cuenta social' });
    }
});

// 5. Perfil de Usuario Autenticado
app.get('/api/perfil', verificarAuthFirebase, (req, res) => {
    res.json({ usuario: usuarioPublico(req.user) });
});

// Ruta de compatibilidad /api/perfil/:id
app.get('/api/perfil/:id', async (req, res) => {
    try {
        const user = await get('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(usuarioPublico(user));
    } catch (e) {
        res.status(500).json({ error: 'Error al obtener perfil' });
    }
});

// 6. Subida y Actualización de Foto de Perfil (Multer)
app.post('/api/perfil/foto', verificarAuthFirebase, (req, res) => {
    upload.single('foto')(req, res, async (err) => {
        if (err) {
            const mensaje = err.code === 'LIMIT_FILE_SIZE'
                ? 'La imagen supera el límite de 2 MB'
                : err.message;
            return res.status(400).json({ error: mensaje });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No se envió ningún archivo de imagen' });
        }

        try {
            const nuevaRuta = `/uploads/${req.file.filename}`;
            const fotoAnterior = req.user.foto_perfil;

            // Actualizar ruta en la base de datos
            await run('UPDATE usuarios SET foto_perfil = ? WHERE id = ?', [nuevaRuta, req.user.id]);

            // Si la foto anterior estaba almacenada localmente, borrarla del disco
            if (fotoAnterior && fotoAnterior.startsWith('/uploads/')) {
                const archivoViejo = path.join(UPLOADS_DIR, path.basename(fotoAnterior));
                fs.unlink(archivoViejo, (unlinkErr) => {
                    if (unlinkErr && unlinkErr.code !== 'ENOENT') {
                        console.warn('No se pudo borrar la foto anterior:', unlinkErr.message);
                    }
                });
            }

            return res.json({
                mensaje: 'Foto actualizada correctamente',
                foto_perfil: nuevaRuta
            });
        } catch (e) {
            console.error('Error al guardar la foto de perfil:', e);
            return res.status(500).json({ error: 'No se pudo guardar la foto' });
        }
    });
});

// Guardar la edad (obligatoria para cuentas de Google y Microsoft)
app.put('/api/perfil/edad', verificarAuthFirebase, async (req, res) => {
    const edad = parseInt(req.body.edad, 10);
    if (!Number.isInteger(edad) || edad < 10 || edad > 30) {
        return res.status(400).json({ error: 'Ingresa una edad válida entre 10 y 30 años' });
    }
    try {
        await run('UPDATE usuarios SET edad = ? WHERE id = ?', [edad, req.user.id]);
        res.json({ edad });
    } catch (e) {
        res.status(500).json({ error: 'No se pudo guardar la edad' });
    }
});

// =============================================
// RUTAS DEL TEST VOCACIONAL
// =============================================

// Obtener todas las preguntas del test
app.get('/api/preguntas', async (req, res) => {
    try {
        const filas = await all('SELECT * FROM preguntas ORDER BY id ASC');
        const preguntas = filas.map(p => ({
            ...p,
            opciones: typeof p.opciones === 'string' ? JSON.parse(p.opciones) : p.opciones
        }));
        res.json(preguntas);
    } catch (e) {
        console.error('Error en /api/preguntas:', e);
        res.status(500).json({ error: 'Error al cargar preguntas' });
    }
});

// Enviar respuestas y calcular resultados
app.post('/api/respuestas', async (req, res) => {
    try {
        const { usuario_id, respuestas } = req.body;

        if (!usuario_id || !Array.isArray(respuestas) || respuestas.length === 0) {
            return res.status(400).json({ error: 'Respuestas o usuario inválidos' });
        }

        // Conteo de puntajes por perfil
        const puntajes = { cientifico: 0, creativo: 0, social: 0, practico: 0 };

        for (const r of respuestas) {
            if (puntajes[r.perfil] !== undefined) {
                puntajes[r.perfil]++;
            }
            // Guarda respuesta individual en SQLite
            await run(
                `INSERT INTO respuestas (usuario_id, pregunta_id, respuesta, perfil)
                 VALUES (?, ?, ?, ?)`,
                [usuario_id, r.pregunta_id, r.respuesta, r.perfil]
            );
        }

        // Determina el perfil dominante
        let perfilDominante = 'cientifico';
        let maxPuntos = -1;
        for (const [perfil, pts] of Object.entries(puntajes)) {
            if (pts > maxPuntos) {
                maxPuntos = pts;
                perfilDominante = perfil;
            }
        }

        // Diccionario de recomendaciones por perfil
        const recomendacionesPorPerfil = {
            cientifico: {
                perfil: 'Científico-Tecnológico',
                descripcion: 'Tienes una mente inquisitiva y orientada al análisis. Disfrutas descubrir cómo funciona el mundo, descifrar patrones lógicos y resolver problemas mediante el método científico y la tecnología.',
                carreras: [
                    'Ingeniería de Software e Inteligencia Artificial',
                    'Ciencia de Datos y Matemáticas Aplicadas',
                    'Biotecnología y Bioingeniería',
                    'Astrofísica y Ciencias Puras',
                    'Robótica y Automatización'
                ]
            },
            creativo: {
                perfil: 'Artístico-Creativo',
                descripcion: 'Posees una gran sensibilidad estética y pensamiento divergente. Tu punto fuerte es la imaginación para transformar ideas abstractas en proyectos visuales, narrativos y multimedia impactantes.',
                carreras: [
                    'Diseño Gráfico y Comunicación Visual',
                    'Animación Digital y Creación de Videojuegos',
                    'Arquitectura y Urbanismo Sostenible',
                    'Producción Audiovisual y Cine',
                    'Diseño UX/UI de Experiencias Digitales'
                ]
            },
            social: {
                perfil: 'Social-Humanístico',
                descripcion: 'Tu vocación se centra en las personas, la empatía y el liderazgo transformador. Te destacas por escuchar activamente, comprender dinámicas sociales y buscar soluciones a problemáticas humanas.',
                carreras: [
                    'Psicología Clínica y Social',
                    'Educación y Pedagogía Innovadora',
                    'Derecho y Mediación Comunitaria',
                    'Comunicación Social y Periodismo',
                    'Trabajo Social y Gestión Pública'
                ]
            },
            practico: {
                perfil: 'Práctico-Técnico',
                descripcion: 'Eres proactivo, pragmático y te apasiona poner manos a la obra. Tienes gran habilidad para construir, ensamblar, implementar soluciones tangibles y optimizar sistemas tecnológicos reales.',
                carreras: [
                    'Mecatrónica y Electrónica Aplicada',
                    'Redes de Computadores y Ciberseguridad',
                    'Desarrollo Web Full-Stack',
                    'Energías Renovables y Sostenibilidad',
                    'Mantenimiento Tecnológico y Telecomunicaciones'
                ]
            }
        };

        const recomendacion = recomendacionesPorPerfil[perfilDominante];

        // Guardar resultado global en la base de datos
        await run(
            `INSERT INTO resultados (usuario_id, perfil_dominante, puntajes, recomendaciones)
             VALUES (?, ?, ?, ?)`,
            [usuario_id, perfilDominante, JSON.stringify(puntajes), JSON.stringify(recomendacion)]
        );

        return res.json({
            resultado: {
                perfil_dominante: perfilDominante,
                puntajes,
                recomendaciones: recomendacion
            }
        });
    } catch (e) {
        console.error('Error en /api/respuestas:', e);
        res.status(500).json({ error: 'Error al procesar el test vocacional' });
    }
});

// Obtener el último resultado de un usuario
app.get('/api/resultado/:userId', async (req, res) => {
    try {
        const fila = await get(
            `SELECT * FROM resultados WHERE usuario_id = ? ORDER BY fecha DESC LIMIT 1`,
            [req.params.userId]
        );
        if (!fila) return res.status(404).json({ error: 'No hay resultados registrados' });

        res.json({
            id: fila.id,
            usuario_id: fila.usuario_id,
            perfil_dominante: fila.perfil_dominante,
            puntajes: JSON.parse(fila.puntajes),
            recomendaciones: JSON.parse(fila.recomendaciones),
            fecha: fila.fecha
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al obtener resultado' });
    }
});

// Historial de resultados de un usuario
app.get('/api/historial/:userId', async (req, res) => {
    try {
        const filas = await all(
            `SELECT * FROM resultados WHERE usuario_id = ? ORDER BY fecha DESC`,
            [req.params.userId]
        );
        const historial = filas.map(f => ({
            id: f.id,
            perfil_dominante: f.perfil_dominante,
            puntajes: JSON.parse(f.puntajes),
            recomendaciones: JSON.parse(f.recomendaciones),
            fecha: f.fecha
        }));
        res.json(historial);
    } catch (e) {
        res.status(500).json({ error: 'Error al cargar historial' });
    }
});

// =============================================
// RUTAS DE CURSOS Y RUTAS DE APRENDIZAJE
// =============================================

// Listar cursos por perfil con progreso del usuario
app.get('/api/cursos/:perfil/progreso/:userId', async (req, res) => {
    try {
        const { perfil, userId } = req.params;
        const cursos = await all(
            `SELECT c.*,
                (SELECT COUNT(*) FROM modulos m WHERE m.curso_id = c.id) AS total_modulos,
                (SELECT COUNT(*) FROM progreso_usuario pu
                 JOIN modulos m ON pu.modulo_id = m.id
                 WHERE m.curso_id = c.id AND pu.usuario_id = ? AND pu.completado = 1) AS modulos_completados
             FROM cursos c
             WHERE c.perfil = ?
             ORDER BY c.orden ASC`,
            [userId, perfil]
        );
        res.json(cursos);
    } catch (e) {
        console.error('Error en /api/cursos:', e);
        res.status(500).json({ error: 'Error al cargar cursos' });
    }
});

// Inscribir a un usuario en un curso
app.post('/api/inscripcion', async (req, res) => {
    try {
        const { usuario_id, curso_id } = req.body;
        if (!usuario_id || !curso_id) {
            return res.status(400).json({ error: 'Faltan parámetros de inscripción' });
        }
        await run(
            `INSERT OR IGNORE INTO inscripciones (usuario_id, curso_id) VALUES (?, ?)`,
            [usuario_id, curso_id]
        );
        res.json({ mensaje: 'Inscripción registrada' });
    } catch (e) {
        res.status(500).json({ error: 'Error al registrar inscripción' });
    }
});

// Listar módulos de un curso con estado completado
app.get('/api/modulos/:cursoId/:userId', async (req, res) => {
    try {
        const { cursoId, userId } = req.params;
        const modulos = await all(
            `SELECT m.id, m.curso_id, m.titulo, m.descripcion, m.orden,
                COALESCE(pu.completado, 0) AS completado
             FROM modulos m
             LEFT JOIN progreso_usuario pu ON pu.modulo_id = m.id AND pu.usuario_id = ?
             WHERE m.curso_id = ?
             ORDER BY m.orden ASC`,
            [userId, cursoId]
        );
        res.json(modulos);
    } catch (e) {
        res.status(500).json({ error: 'Error al cargar módulos' });
    }
});

// Detalle de un módulo (con video, lectura y quiz)
app.get('/api/modulo/:moduloId', async (req, res) => {
    try {
        const modulo = await get('SELECT * FROM modulos WHERE id = ?', [req.params.moduloId]);
        if (!modulo) return res.status(404).json({ error: 'Módulo no encontrado' });

        res.json({
            ...modulo,
            quiz: typeof modulo.quiz === 'string' ? JSON.parse(modulo.quiz) : modulo.quiz
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al cargar contenido del módulo' });
    }
});

// Guardar progreso y aprobación de quiz de un módulo
app.post('/api/progreso', async (req, res) => {
    try {
        const { usuario_id, modulo_id, puntaje, total_preguntas } = req.body;
        const total = total_preguntas || 3;
        const pts = puntaje || 0;
        const completado = pts >= 2 ? 1 : 0;

        await run(
            `INSERT INTO progreso_usuario (usuario_id, modulo_id, puntaje, total_preguntas, completado)
             VALUES (?, ?, ?, ?, ?)
             ON CONFLICT(usuario_id, modulo_id) DO UPDATE SET
                puntaje = MAX(puntaje, excluded.puntaje),
                completado = CASE WHEN completado = 1 THEN 1 ELSE excluded.completado END,
                fecha = CURRENT_TIMESTAMP`,
            [usuario_id, modulo_id, pts, total, completado]
        );

        res.json({ completado: !!completado, puntaje: pts, total_preguntas: total });
    } catch (e) {
        console.error('Error en /api/progreso:', e);
        res.status(500).json({ error: 'Error al guardar progreso' });
    }
});

// Fallback SPA: Cualquier ruta que no sea API sirve el index.html
app.use((req, res) => {
    const indexPath = path.join(FRONTEND_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('Página no encontrada');
    }
});

// =============================================
// INICIO DEL SERVIDOR
// =============================================
initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`====================================================`);
            console.log(`✓ Servidor TechnoYouth corriendo en: ${BASE_URL}`);
            console.log(`✓ Sirviendo Frontend desde: ${FRONTEND_DIR}`);
            console.log(`✓ Directorio de subidas: ${UPLOADS_DIR}`);
            console.log(`====================================================`);
        });
    })
    .catch((err) => {
        console.error('Error crítico al inicializar la base de datos:', err);
        process.exit(1);
    });