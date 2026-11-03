// ==============================================================================
// TechnoYouth - Lógica del Frontend (app.js)
// Firebase Authentication + reCAPTCHA v2 + Multer + Test Vocacional + Cursos
// ==============================================================================

// // TODO-FIREBASE: Importación del SDK modular de Firebase (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    OAuthProvider,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ---- Variables globales de Firebase y reCAPTCHA ----
let firebaseApp = null;
let firebaseAuth = null;
let recaptchaSiteKey = "";
let recaptchaWidgetId = null;
let fotoRegistroArchivo = null;

// ---- Variables globales del Test Vocacional ----
let preguntasTest = [];
let preguntaActual = 0;
let respuestasUsuario = [];

// ---- Variables para Cursos y Quizzes ----
let perfilUsuario = null;
let moduloActual = null;
let preguntaQuizActual = 0;
let puntajeQuiz = 0;
let cursoSeleccionadoId = null;

// ---- Agente de orientación vocacional con IA (Streamlit) ----
const AGENTE_URL = "https://agente-tecnochilds.streamlit.app";

// =============================================
// SISTEMA DE NOTIFICACIONES (Toast)
// =============================================
function mostrarToast(mensaje, tipo = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    // Evita duplicar el mismo toast si ya está en pantalla
    const toastsActuales = container.querySelectorAll(".toast-msg");
    for (const t of toastsActuales) {
        if (t.textContent === mensaje) return;
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${tipo}`;

    const iconos = { success: "✓", error: "✕", info: "i", warning: "!" };
    toast.innerHTML = `
        <span class="toast-icon toast-icon-${tipo}">${iconos[tipo] || "i"}</span>
        <span class="toast-msg">${mensaje}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("toast-visible"));

    setTimeout(() => {
        toast.classList.remove("toast-visible");
        toast.classList.add("toast-saliendo");
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// =============================================
// HELPER PARA BOTONES DE CARGA (Evita doble clic)
// =============================================
function bloquearBoton(idBoton, cargando, textoCarga = "Cargando...") {
    const btn = document.getElementById(idBoton);
    if (!btn) return;
    const txtSpan = btn.querySelector(".btn-text");
    const loaderSpan = btn.querySelector(".btn-loader");

    if (cargando) {
        btn.disabled = true;
        btn.dataset.textoOriginal = txtSpan ? txtSpan.textContent : btn.textContent;
        if (txtSpan) txtSpan.textContent = textoCarga;
        if (loaderSpan) loaderSpan.style.display = "inline-block";
    } else {
        btn.disabled = false;
        if (txtSpan && btn.dataset.textoOriginal) {
            txtSpan.textContent = btn.dataset.textoOriginal;
        }
        if (loaderSpan) loaderSpan.style.display = "none";
    }
}

// =============================================
// MOSTRAR/OCULTAR CONTRASEÑA
// =============================================
function togglePassword(inputId, boton) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === "password") {
        input.type = "text";
        boton.textContent = "⊘";
    } else {
        input.type = "password";
        boton.textContent = "⊙";
    }
}

// =============================================
// NAVEGACIÓN ENTRE SECCIONES
// =============================================
function mostrar(seccion) {
    // Si falta la edad (cuenta de Google o Microsoft), solo se puede ver esa pantalla
    const uid = localStorage.getItem("usuarioId");
    if (uid && localStorage.getItem("requiereEdad") === uid) {
        seccion = "completarPerfil";
    }

    document.querySelectorAll(".seccion-pantalla").forEach(div => {
        div.style.display = "none";
    });

    const seccionActiva = document.getElementById(seccion);
    if (seccionActiva) {
        seccionActiva.style.display = "block";
    }

    if (seccion === "testVocacional") cargarPreguntas();
    if (seccion === "perfil") cargarPerfil();
    if (seccion === "misRutas") cargarMisRutas();
    if (seccion === "agente") cargarAgente();
    if (seccion === "login") resetearRecaptcha();

    actualizarNavegacion();
}

function actualizarNavegacion() {
    const logueado = localStorage.getItem("usuarioId") !== null;
    const nombre = localStorage.getItem("usuarioNombre") || "Mi Cuenta";
    const foto = localStorage.getItem("usuarioFoto") || "";

    const navRegistro = document.getElementById("navRegistro");
    const navLogin = document.getElementById("navLogin");
    const navUserPill = document.getElementById("navUserPill");
    const navUserName = document.getElementById("navUserName");
    const navUserAvatar = document.getElementById("navUserAvatar");
    const navPerfil = document.getElementById("navPerfil");
    const navRutas = document.getElementById("navRutas");
    const navTest = document.getElementById("navTest");
    const navAgente = document.getElementById("navAgente");
    const navLogout = document.getElementById("navLogout");

    if (navRegistro) navRegistro.style.display = logueado ? "none" : "";
    if (navLogin) navLogin.style.display = logueado ? "none" : "";

    if (navUserPill) {
        navUserPill.style.display = logueado ? "flex" : "none";
        if (navUserName) navUserName.textContent = nombre.split(" ")[0];
        if (navUserAvatar) {
            navUserAvatar.src = foto && foto.trim() ? foto : "Img/TechnoYouth_crop.png";
        }
    }

    if (navPerfil) navPerfil.style.display = logueado ? "" : "none";
    if (navRutas) navRutas.style.display = logueado ? "" : "none";
    if (navTest) navTest.style.display = logueado ? "" : "none";
    if (navAgente) navAgente.style.display = logueado ? "" : "none";
    if (navLogout) navLogout.style.display = logueado ? "" : "none";
}

// =============================================
// PREVISUALIZACIÓN DE FOTO DE PERFIL EN REGISTRO
// =============================================
function previsualizarFotoRegistro(event) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    if (archivo.size > 2 * 1024 * 1024) {
        mostrarToast("La imagen supera los 2 MB permitidos", "error");
        event.target.value = "";
        return;
    }

    const formatos = ["image/jpeg", "image/png", "image/webp"];
    if (!formatos.includes(archivo.type)) {
        mostrarToast("Formato no admitido. Usa JPG, PNG o WEBP", "error");
        event.target.value = "";
        return;
    }

    fotoRegistroArchivo = archivo;

    const reader = new FileReader();
    reader.onload = (e) => {
        const preview = document.getElementById("registroFotoPreview");
        const placeholder = document.getElementById("registroFotoPlaceholder");
        if (preview && placeholder) {
            preview.src = e.target.result;
            preview.style.display = "block";
            placeholder.style.display = "none";
        }
    };
    reader.readAsDataURL(archivo);
}

// =============================================
// INICIALIZACIÓN DE GOOGLE reCAPTCHA v2
// =============================================
window.onRecaptchaCargado = function () {
    renderizarRecaptchaSiListo();
};

function renderizarRecaptchaSiListo() {
    const widgetElem = document.getElementById("recaptchaWidget");
    if (!widgetElem || !recaptchaSiteKey || typeof grecaptcha === "undefined") return;

    if (recaptchaWidgetId === null) {
        try {
            recaptchaWidgetId = grecaptcha.render("recaptchaWidget", {
                sitekey: recaptchaSiteKey,
                theme: "dark"
            });
        } catch (e) {
            console.warn("reCAPTCHA ya estaba renderizado o error:", e);
        }
    }
}

function obtenerRecaptchaToken() {
    if (typeof grecaptcha !== "undefined" && recaptchaWidgetId !== null) {
        return grecaptcha.getResponse(recaptchaWidgetId);
    }
    return "";
}

function resetearRecaptcha() {
    if (typeof grecaptcha !== "undefined" && recaptchaWidgetId !== null) {
        try { grecaptcha.reset(recaptchaWidgetId); } catch { /* ignora */ }
    }
}

// =============================================
// REGISTRO DE USUARIO (Firebase + SQLite + Multer)
// =============================================
async function registrar() {
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const edad = document.getElementById("edad").value;

    if (!nombre || !email || !password) {
        return mostrarToast("Completa los campos obligatorios", "warning");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return mostrarToast("Ingresa un correo electrónico válido", "warning");
    }

    if (password.length < 6) {
        return mostrarToast("La contraseña debe tener al menos 6 caracteres", "warning");
    }

    if (password !== passwordConfirm) {
        return mostrarToast("Las contraseñas no coinciden", "error");
    }

    bloquearBoton("btnRegistrar", true, "Creando cuenta...");

    try {
        let idToken = null;

        // // TODO-FIREBASE: Creación de usuario en Firebase Auth en el cliente (si está configurado)
        if (firebaseAuth) {
            try {
                const cred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
                idToken = await cred.user.getIdToken();
            } catch (fbError) {
                const msg = traducirErrorFirebase(fbError.code) || fbError.message;
                bloquearBoton("btnRegistrar", false);
                return mostrarToast(msg, "error");
            }
        }

        // Envía datos al Backend (multipart para soportar foto de perfil)
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("correo", email);
        formData.append("password", password);
        if (edad) formData.append("edad", edad);
        if (idToken) formData.append("idToken", idToken);
        if (fotoRegistroArchivo) formData.append("foto", fotoRegistroArchivo);

        const res = await fetch("/api/registro", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (!res.ok) {
            bloquearBoton("btnRegistrar", false);
            return mostrarToast(data.error || "No se pudo crear la cuenta", "error");
        }

        mostrarToast("¡Cuenta creada exitosamente! Inicia sesión para continuar", "success");

        // Limpiar formulario de registro
        document.getElementById("nombre").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("passwordConfirm").value = "";
        document.getElementById("edad").value = "";
        fotoRegistroArchivo = null;
        const preview = document.getElementById("registroFotoPreview");
        const placeholder = document.getElementById("registroFotoPlaceholder");
        if (preview && placeholder) {
            preview.src = "";
            preview.style.display = "none";
            placeholder.style.display = "flex";
        }

        setTimeout(() => mostrar("login"), 1000);
    } catch (error) {
        console.error("Error en registro:", error);
        mostrarToast("Error al conectar con el servidor", "error");
    } finally {
        bloquearBoton("btnRegistrar", false);
    }
}

// =============================================
// LOGIN SEGURO CON reCAPTCHA Y BACKEND PROXY
// =============================================
async function login() {
    const email = document.getElementById("emailLogin").value.trim();
    const password = document.getElementById("passwordLogin").value;
    const recaptchaToken = obtenerRecaptchaToken();

    if (!email || !password) {
        return mostrarToast("Ingresa tu correo y contraseña", "warning");
    }

    // Si hay siteKey pero no se completó el captcha en el cliente
    if (recaptchaSiteKey && !recaptchaToken) {
        return mostrarToast("Por favor verifica el reCAPTCHA (\"No soy un robot\")", "warning");
    }

    bloquearBoton("btnLogin", true, "Verificando...");

    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                correo: email,
                password: password,
                recaptchaToken: recaptchaToken
            })
        });

        const data = await res.json();

        if (!res.ok) {
            resetearRecaptcha();
            bloquearBoton("btnLogin", false);
            return mostrarToast(data.error || "Error al iniciar sesión", "error");
        }

        // Guardar sesión en localStorage
        localStorage.setItem("usuarioId", data.usuario.id);
        localStorage.setItem("usuarioNombre", data.usuario.nombre);
        localStorage.setItem("usuarioEmail", data.usuario.correo);
        localStorage.setItem("usuarioFoto", data.usuario.foto_perfil || "");
        if (data.idToken) {
            localStorage.setItem("firebaseToken", data.idToken);
        }

        mostrarToast(`¡Bienvenido de nuevo, ${data.usuario.nombre}!`, "success");

        document.getElementById("emailLogin").value = "";
        document.getElementById("passwordLogin").value = "";
        resetearRecaptcha();

        actualizarNavegacion();
        setTimeout(() => mostrar("perfil"), 800);
    } catch (error) {
        console.error("Error en login:", error);
        resetearRecaptcha();
        mostrarToast("Error al conectar con el servidor", "error");
    } finally {
        bloquearBoton("btnLogin", false);
    }
}

// =============================================
// // TODO-FIREBASE: INICIO DE SESIÓN SOCIAL (Google y Microsoft con Firebase Auth)
// =============================================
async function loginGoogle() {
    if (!firebaseAuth) {
        return mostrarToast("Firebase no está configurado aún (pendiente de claves)", "warning");
    }

    try {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await signInWithPopup(firebaseAuth, provider);
        await procesarLoginSocial(result.user, "google");
    } catch (error) {
        if (error.code !== "auth/popup-closed-by-user") {
            console.error("Error en Google Auth:", error);
            mostrarToast(traducirErrorFirebase(error.code) || "Error con Google", "error");
        }
    }
}

async function loginMicrosoft() {
    if (!firebaseAuth) {
        return mostrarToast("Firebase no está configurado aún", "warning");
    }

    try {
        const provider = new OAuthProvider("microsoft.com");
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await signInWithPopup(firebaseAuth, provider);
        await procesarLoginSocial(result.user, "microsoft");
    } catch (error) {
        if (error.code !== "auth/popup-closed-by-user") {
            console.error("Error en Microsoft Auth:", error);
            mostrarToast(traducirErrorFirebase(error.code) || "Error con Microsoft", "error");
        }
    }
}

async function procesarLoginSocial(fbUser, providerName) {
    try {
        const idToken = await fbUser.getIdToken();
        const res = await fetch("/api/auth/social", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idToken: idToken,
                nombre: fbUser.displayName || fbUser.email.split("@")[0],
                correo: fbUser.email,
                foto: fbUser.photoURL || null,
                provider: providerName
            })
        });

        const data = await res.json();
        if (!res.ok) {
            return mostrarToast(data.error || "Error al sincronizar cuenta social", "error");
        }

        localStorage.setItem("usuarioId", data.usuario.id);
        localStorage.setItem("usuarioNombre", data.usuario.nombre);
        localStorage.setItem("usuarioEmail", data.usuario.correo);
        localStorage.setItem("usuarioFoto", data.usuario.foto_perfil || "");
        localStorage.setItem("firebaseToken", idToken);

        mostrarToast(`¡Bienvenido, ${data.usuario.nombre}!`, "success");
        actualizarNavegacion();

        // La edad es obligatoria para cuentas de Google y Microsoft
        if (!data.usuario.edad) {
            localStorage.setItem("requiereEdad", String(data.usuario.id));
            return mostrar("completarPerfil");
        }
        localStorage.removeItem("requiereEdad");
        mostrar("perfil");
    } catch (e) {
        console.error("Error en procesarLoginSocial:", e);
        mostrarToast("Error al sincronizar datos de la cuenta social", "error");
    }
}

// =============================================
// CERRAR SESIÓN
// =============================================
async function cerrarSesion() {
    if (firebaseAuth) {
        try { await signOut(firebaseAuth); } catch { /* ignora */ }
    }
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("usuarioNombre");
    localStorage.removeItem("usuarioEmail");
    localStorage.removeItem("usuarioFoto");
    localStorage.removeItem("firebaseToken");
    localStorage.removeItem("requiereEdad");

    actualizarNavegacion();
    mostrarToast("Sesión cerrada correctamente", "info");
    mostrar("landing");
}

// =============================================
// PERFIL DEL USUARIO Y CAMBIO DE FOTO
// =============================================
async function cargarPerfil() {
    const id = localStorage.getItem("usuarioId");
    if (!id) {
        mostrarToast("Debes iniciar sesión para ver tu perfil", "warning");
        return mostrar("login");
    }

    const token = localStorage.getItem("firebaseToken");
    const contenedor = document.getElementById("infoPerfil");

    try {
        const headers = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`/api/perfil/${id}`, { headers });
        if (!res.ok) throw new Error("Error obteniendo perfil");
        const user = await res.json();

        // Cuentas sociales sin edad: pedirla antes de continuar
        if (!user.edad && user.auth_provider && user.auth_provider !== "local") {
            localStorage.setItem("requiereEdad", String(id));
            return mostrar("completarPerfil");
        }

        // Actualiza datos locales
        localStorage.setItem("usuarioNombre", user.nombre);
        localStorage.setItem("usuarioFoto", user.foto_perfil || "");
        actualizarNavegacion();

        const fotoUrl = user.foto_perfil && user.foto_perfil.trim() ? user.foto_perfil : "";
        const iniciales = user.nombre.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

        contenedor.innerHTML = `
            <div class="perfil-card-content">
                <div class="perfil-avatar-wrapper">
                    ${fotoUrl 
                        ? `<img src="${fotoUrl}" alt="Foto de perfil" class="perfil-avatar-img" id="imgPerfilActual">`
                        : `<div class="avatar-initials" id="avatarInitials">${iniciales}</div>`
                    }
                </div>
                <div class="perfil-datos">
                    <h2>${user.nombre}</h2>
                    <p style="color:var(--text-secondary); margin: 4px 0;"><strong>Correo:</strong> ${user.correo || user.email}</p>
                    <p style="color:var(--text-secondary); margin: 4px 0;"><strong>Edad:</strong> ${user.edad ? user.edad + " años" : "No especificada"}</p>
                    <div style="margin-top: 12px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <button class="btn-secondary btn-sm" onclick="document.getElementById('inputCambiarFoto').click()">
                            📷 Cambiar foto de perfil
                        </button>
                        <input type="file" id="inputCambiarFoto" accept="image/jpeg,image/png,image/webp" style="display:none;" onchange="cambiarFotoPerfil(event)">
                    </div>
                </div>
            </div>
            <div style="margin-top:24px; display:flex; gap:12px; flex-wrap:wrap;">
                <button class="btn-primary" onclick="mostrar('testVocacional')">
                    Realizar Test Vocacional
                </button>
                <button class="btn-secondary" onclick="mostrar('misRutas')">
                    Ver mis Cursos
                </button>
            </div>
        `;
    } catch (error) {
        console.error("Error al cargar perfil:", error);
        mostrarToast("Error al cargar perfil", "error");
    }

    await cargarUltimoResultado(id);
    await cargarHistorial(id);
}

// Subida de nueva foto desde la vista de Perfil
async function cambiarFotoPerfil(event) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    if (archivo.size > 2 * 1024 * 1024) {
        return mostrarToast("La imagen supera los 2 MB permitidos", "error");
    }

    const formatos = ["image/jpeg", "image/png", "image/webp"];
    if (!formatos.includes(archivo.type)) {
        return mostrarToast("Usa una imagen JPG, PNG o WEBP", "error");
    }

    const token = localStorage.getItem("firebaseToken");
    const formData = new FormData();
    formData.append("foto", archivo);

    mostrarToast("Subiendo nueva foto...", "info");

    try {
        const headers = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch("/api/perfil/foto", {
            method: "POST",
            headers,
            body: formData
        });

        const data = await res.json();
        if (!res.ok) {
            return mostrarToast(data.error || "No se pudo actualizar la foto", "error");
        }

        localStorage.setItem("usuarioFoto", data.foto_perfil);
        actualizarNavegacion();
        mostrarToast("¡Foto de perfil actualizada con éxito!", "success");

        // Recargar vista de perfil
        cargarPerfil();
    } catch (e) {
        console.error("Error cambiando foto:", e);
        mostrarToast("Error al subir la foto de perfil", "error");
    }
}

// =============================================
// HISTORIAL Y ÚLTIMO RESULTADO DEL TEST
// =============================================
async function cargarUltimoResultado(userId) {
    try {
        const res = await fetch(`/api/resultado/${userId}`);
        if (!res.ok) {
            document.getElementById("ultimoResultado").style.display = "none";
            return;
        }

        const resultado = await res.json();
        const seccion = document.getElementById("ultimoResultado");
        seccion.style.display = "block";

        document.getElementById("contenidoUltimoResultado").innerHTML =
            generarHTMLResultado(resultado.puntajes, resultado.recomendaciones);
    } catch (error) {
        document.getElementById("ultimoResultado").style.display = "none";
    }
}

async function cargarHistorial(userId) {
    try {
        const res = await fetch(`/api/historial/${userId}`);
        if (!res.ok) {
            document.getElementById("seccionHistorial").style.display = "none";
            return;
        }
        const historial = await res.json();

        if (!Array.isArray(historial) || historial.length === 0) {
            document.getElementById("seccionHistorial").style.display = "none";
            return;
        }

        const seccion = document.getElementById("seccionHistorial");
        seccion.style.display = "block";

        const contenedor = document.getElementById("contenedorHistorial");
        contenedor.innerHTML = historial.map(r => {
            const fecha = new Date(r.fecha).toLocaleDateString("es-ES", {
                day: "numeric", month: "long", year: "numeric"
            });
            return `
                <div class="historial-item">
                    <div class="historial-fecha">${fecha}</div>
                    <div class="historial-perfil">
                        <span>${r.recomendaciones.perfil}</span>
                    </div>
                </div>
            `;
        }).join("");
    } catch (error) {
        document.getElementById("seccionHistorial").style.display = "none";
    }
}

// =============================================
// TEST VOCACIONAL (8 Preguntas Paso a Paso)
// =============================================
async function cargarPreguntas() {
    try {
        const res = await fetch("/api/preguntas");
        if (!res.ok) throw new Error("Fallo al obtener preguntas");
        preguntasTest = await res.json();
        preguntaActual = 0;
        respuestasUsuario = [];
        mostrarPreguntaActual();
    } catch (error) {
        mostrarToast("Error al cargar preguntas del test", "error");
    }
}

function mostrarPreguntaActual() {
    const contenedor = document.getElementById("contenedorPreguntas");
    const total = preguntasTest.length;

    const progreso = ((preguntaActual) / total) * 100;
    document.getElementById("barraProgreso").style.width = progreso + "%";
    document.getElementById("textoProgreso").textContent =
        `Pregunta ${preguntaActual + 1} de ${total}`;

    if (preguntaActual >= total) {
        document.getElementById("barraProgreso").style.width = "100%";
        document.getElementById("textoProgreso").textContent = "¡Test completado!";
        contenedor.innerHTML = `
            <div class="test-finalizar">
                <div class="test-finalizar-icon icon-completado">✓</div>
                <h3>¡Has respondido todas las preguntas!</h3>
                <p>Haz clic en el botón para calcular tus resultados y perfil profesional</p>
                <button class="btn-primary btn-lg" onclick="enviarRespuestas()">
                    Ver mis resultados
                </button>
            </div>
        `;
        return;
    }

    const p = preguntasTest[preguntaActual];
    const opciones = Array.isArray(p.opciones) ? p.opciones : JSON.parse(p.opciones);

    contenedor.innerHTML = `
        <div class="pregunta-card animate-in">
            <span class="pregunta-categoria">${(p.categoria || "").toUpperCase()}</span>
            <h3 class="pregunta-texto">${p.texto}</h3>
            <div class="opciones-grid">
                ${opciones.map((op, i) => `
                    <button class="opcion-card" onclick="seleccionarOpcion(${p.id}, '${op.texto.replace(/'/g, "\\'")}', '${op.perfil}', event)">
                        <span class="opcion-letra">${String.fromCharCode(65 + i)}</span>
                        <span class="opcion-texto">${op.texto}</span>
                    </button>
                `).join("")}
            </div>
        </div>
    `;
}

function seleccionarOpcion(preguntaId, respuesta, perfil, ev) {
    respuestasUsuario.push({
        pregunta_id: preguntaId,
        respuesta: respuesta,
        perfil: perfil
    });

    if (ev && ev.currentTarget) {
        ev.currentTarget.classList.add("opcion-seleccionada");
    }

    setTimeout(() => {
        preguntaActual++;
        mostrarPreguntaActual();
    }, 320);
}

async function enviarRespuestas() {
    const usuarioId = localStorage.getItem("usuarioId");

    if (!usuarioId) {
        mostrarToast("Debes iniciar sesión para guardar tus resultados", "warning");
        return mostrar("login");
    }

    if (respuestasUsuario.length === 0) {
        return mostrarToast("No hay respuestas para enviar", "warning");
    }

    try {
        const res = await fetch("/api/respuestas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usuario_id: parseInt(usuarioId, 10),
                respuestas: respuestasUsuario
            })
        });

        const data = await res.json();
        if (!res.ok) {
            return mostrarToast(data.error || "Error al procesar el test", "error");
        }

        mostrarToast("¡Test vocacional completado exitosamente!", "success");
        mostrarResultados(data.resultado);
    } catch (error) {
        console.error("Error en enviarRespuestas:", error);
        mostrarToast("Error al enviar respuestas al servidor", "error");
    }
}

function mostrarResultados(resultado) {
    document.querySelectorAll(".seccion-pantalla").forEach(div => {
        div.style.display = "none";
    });
    document.getElementById("resultados").style.display = "block";

    const contenedor = document.getElementById("contenidoResultados");
    contenedor.innerHTML = generarHTMLResultado(resultado.puntajes, resultado.recomendaciones);
}

function generarHTMLResultado(puntajes, recomendaciones) {
    const totalPreguntas = 8;
    const perfilesInfo = {
        cientifico: { nombre: "Científico", color: "#3b82f6", letra: "△" },
        creativo:   { nombre: "Creativo",   color: "#a855f7", letra: "◇" },
        social:     { nombre: "Social",     color: "#10b981", letra: "○" },
        practico:   { nombre: "Práctico",   color: "#f59e0b", letra: "□" }
    };

    const barrasHTML = Object.keys(perfilesInfo).map(key => {
        const info = perfilesInfo[key];
        const puntos = puntajes[key] || 0;
        const porcentaje = Math.round((puntos / totalPreguntas) * 100);

        return `
            <div class="barra-perfil">
                <div class="barra-label">
                    <span><span class="perfil-letra" style="background:${info.color}">${info.letra}</span> ${info.nombre}</span>
                    <span class="barra-valor">${puntos}/${totalPreguntas} (${porcentaje}%)</span>
                </div>
                <div class="barra-track">
                    <div class="barra-fill" style="width: ${porcentaje}%; background: ${info.color};" data-width="${porcentaje}"></div>
                </div>
            </div>
        `;
    }).join("");

    const carrerasHTML = (recomendaciones.carreras || []).map(c =>
        `<span class="carrera-tag">${c}</span>`
    ).join("");

    return `
        <div class="resultado-perfil-card">
            <h3 class="resultado-nombre">${recomendaciones.perfil}</h3>
            <p class="resultado-desc">${recomendaciones.descripcion}</p>
        </div>
        <div class="resultado-barras">
            <h4>Distribución de tu Perfil Vocacional</h4>
            ${barrasHTML}
        </div>
        <div class="resultado-carreras">
            <h4>Carreras recomendadas para tu perfil</h4>
            <div class="carreras-grid">${carrerasHTML}</div>
        </div>
    `;
}

// =============================================
// RUTAS DE APRENDIZAJE Y CURSOS
// =============================================
async function cargarMisRutas() {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) return mostrar("login");

    try {
        const resRes = await fetch(`/api/resultado/${usuarioId}`);
        if (!resRes.ok) {
            document.getElementById("contenedorRutas").innerHTML = `
                <div class="glass-card" style="text-align:center; grid-column: 1/-1; padding: 30px;">
                    <p style="margin-bottom: 15px;">Aún no has completado el test vocacional para descubrir tu ruta personalizada.</p>
                    <button class="btn-primary" onclick="mostrar('testVocacional')">Realizar Test Ahora</button>
                </div>`;
            return;
        }

        const resultado = await resRes.json();
        const perfilKey = Object.keys(resultado.puntajes).reduce((a, b) =>
            resultado.puntajes[a] > resultado.puntajes[b] ? a : b
        );
        perfilUsuario = perfilKey;

        const resCursos = await fetch(`/api/cursos/${perfilKey}/progreso/${usuarioId}`);
        const cursos = await resCursos.json();

        const contenedor = document.getElementById("contenedorRutas");
        if (!Array.isArray(cursos) || cursos.length === 0) {
            contenedor.innerHTML = "<p>No hay cursos disponibles para tu perfil vocacional en este momento.</p>";
            return;
        }

        contenedor.innerHTML = cursos.map(c => {
            const porcentaje = c.total_modulos > 0
                ? Math.round((c.modulos_completados / c.total_modulos) * 100)
                : 0;
            return `
                <div class="curso-card animate-in" onclick="verCurso(${c.id}, '${c.titulo.replace(/'/g, "\\'")}', '${c.descripcion.replace(/'/g, "\\'")}')">
                    <div class="curso-icono">${c.icono || "◈"}</div>
                    <div class="curso-info">
                        <h3>${c.titulo}</h3>
                        <p>${c.descripcion}</p>
                    </div>
                    <div class="progreso-container">
                        <div class="progreso-header">
                            <span>Avance del Curso</span>
                            <span>${porcentaje}%</span>
                        </div>
                        <div class="progreso-bar-track">
                            <div class="progreso-bar-fill" style="width: ${porcentaje}%"></div>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    } catch (error) {
        console.error("Error al cargar rutas:", error);
        mostrarToast("Error al cargar tus rutas de aprendizaje", "error");
    }
}

async function verCurso(cursoId, titulo, descripcion) {
    const usuarioId = localStorage.getItem("usuarioId");
    cursoSeleccionadoId = cursoId;

    document.getElementById("tituloCurso").textContent = titulo;
    document.getElementById("descCurso").textContent = descripcion;
    mostrar("vistaCurso");

    try {
        await fetch("/api/inscripcion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario_id: usuarioId, curso_id: cursoId })
        });

        const res = await fetch(`/api/modulos/${cursoId}/${usuarioId}`);
        const modulos = await res.json();

        const contenedor = document.getElementById("contenedorModulos");
        contenedor.innerHTML = modulos.map(m => `
            <div class="modulo-item-card animate-in" onclick="verModulo(${m.id})">
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <span class="pregunta-categoria">MÓDULO ${m.orden}</span>
                    ${m.completado ? '<span style="color:var(--success); font-weight:700;">✓ Aprobado</span>' : ""}
                </div>
                <h3 style="margin: 10px 0;">${m.titulo}</h3>
                <p style="font-size:0.85rem; color:var(--text-secondary);">${m.descripcion}</p>
                <div style="margin-top:15px;">
                    <button class="btn-secondary btn-full" style="padding: 8px;">
                        ${m.completado ? "Repasar Módulo" : "Comenzar Módulo"}
                    </button>
                </div>
            </div>
        `).join("");
    } catch (error) {
        mostrarToast("Error al cargar los módulos del curso", "error");
    }
}

async function verModulo(moduloId) {
    mostrar("vistaModulo");
    document.getElementById("contenedorVideo").innerHTML = "<p>Cargando contenido...</p>";
    document.getElementById("contenedorLectura").innerHTML = "";
    document.getElementById("seccionQuiz").style.display = "none";

    try {
        const res = await fetch(`/api/modulo/${moduloId}`);
        const modulo = await res.json();
        moduloActual = modulo;

        document.getElementById("tituloModulo").textContent = modulo.titulo;

        if (modulo.video_url && modulo.video_url.includes("embed/")) {
            document.getElementById("contenedorVideo").innerHTML = `
                <div class="video-wrapper">
                    <iframe src="${modulo.video_url}" allowfullscreen title="${modulo.titulo}"></iframe>
                </div>`;
        } else {
            const tema = encodeURIComponent(modulo.titulo + " TechnoYouth");
            document.getElementById("contenedorVideo").innerHTML = `
                <a class="btn-secondary" target="_blank" rel="noopener"
                   style="display:inline-block; text-decoration:none; padding:10px 16px; margin-bottom:15px;"
                   href="https://www.youtube.com/results?search_query=${tema}">
                    ▶ Buscar videos de este tema en YouTube
                </a>`;
        }

        document.getElementById("contenedorLectura").innerHTML = (modulo.lectura || "")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br>");

        if (modulo.quiz && modulo.quiz.length > 0) {
            document.getElementById("seccionQuiz").style.display = "block";
            preguntaQuizActual = 0;
            puntajeQuiz = 0;
            mostrarPreguntaQuiz();
        }

        document.getElementById("btnVolverCurso").onclick = () => {
            const titulo = document.getElementById("tituloCurso").textContent;
            const desc = document.getElementById("descCurso").textContent;
            verCurso(modulo.curso_id, titulo, desc);
        };
    } catch (error) {
        mostrarToast("Error al cargar el módulo", "error");
    }
}

function mostrarPreguntaQuiz() {
    const quiz = moduloActual.quiz;
    const q = quiz[preguntaQuizActual];

    document.getElementById("preguntaQuiz").textContent = `${preguntaQuizActual + 1}. ${q.pregunta}`;
    const contenedorOpciones = document.getElementById("opcionesQuiz");

    contenedorOpciones.innerHTML = q.opciones.map((op, i) => `
        <button class="opcion-card" onclick="seleccionarOpcionQuiz(${i})">
            <span class="opcion-letra">${String.fromCharCode(65 + i)}</span>
            <span class="opcion-texto">${op}</span>
        </button>
    `).join("");

    document.getElementById("btnSiguienteQuiz").style.display = "none";
}

function seleccionarOpcionQuiz(index) {
    const quiz = moduloActual.quiz;
    const q = quiz[preguntaQuizActual];
    const botones = document.querySelectorAll("#opcionesQuiz .opcion-card");

    botones.forEach(b => b.onclick = null);

    if (index === q.correcta) {
        puntajeQuiz++;
        botones[index].classList.add("toast-success");
        botones[index].style.borderColor = "var(--success)";
        mostrarToast("¡Correcto!", "success");
    } else {
        botones[index].classList.add("toast-error");
        botones[index].style.borderColor = "var(--error)";
        if (botones[q.correcta]) botones[q.correcta].style.borderColor = "var(--success)";
        mostrarToast("Incorrecto", "error");
    }

    const btnSig = document.getElementById("btnSiguienteQuiz");
    btnSig.style.display = "block";

    if (preguntaQuizActual < quiz.length - 1) {
        btnSig.textContent = "Siguiente Pregunta";
        btnSig.onclick = () => {
            preguntaQuizActual++;
            mostrarPreguntaQuiz();
        };
    } else {
        btnSig.textContent = "Finalizar Quiz";
        btnSig.onclick = finalizarQuiz;
    }
}

async function finalizarQuiz() {
    const usuarioId = localStorage.getItem("usuarioId");
    const total = moduloActual.quiz.length;

    try {
        const res = await fetch("/api/progreso", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usuario_id: usuarioId,
                modulo_id: moduloActual.id,
                puntaje: puntajeQuiz,
                total_preguntas: total
            })
        });

        const data = await res.json();

        if (data.completado) {
            mostrarToast(`¡Felicitaciones! Aprobaste con ${puntajeQuiz}/${total}`, "success");
        } else {
            mostrarToast(`Obtuviste ${puntajeQuiz}/${total}. Necesitas al menos 2 correctas para aprobar.`, "warning");
        }

        document.getElementById("btnVolverCurso").click();
    } catch (error) {
        mostrarToast("Error al guardar progreso del módulo", "error");
    }
}

// =============================================
// TRADUCCIÓN DE ERRORES DE FIREBASE A ESPAÑOL
// =============================================
function traducirErrorFirebase(codigo) {
    const errores = {
        "auth/email-already-in-use": "Ese correo electrónico ya está registrado.",
        "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
        "auth/invalid-email": "El formato del correo electrónico no es válido.",
        "auth/user-not-found": "Correo o contraseña incorrectos.",
        "auth/wrong-password": "Correo o contraseña incorrectos.",
        "auth/invalid-credential": "Credenciales incorrectas.",
        "auth/user-disabled": "Esta cuenta ha sido inhabilitada.",
        "auth/too-many-requests": "Demasiados intentos fallidos. Intenta más tarde.",
        "auth/popup-closed-by-user": "La ventana de inicio de sesión fue cerrada.",
        "auth/network-request-failed": "Error de red. Verifica tu conexión a internet."
    };
    return errores[codigo] || null;
}

// =============================================
// INICIALIZACIÓN DE LA APLICACIÓN
// =============================================
async function inicializarApp() {
    // 1. Obtener configuración pública del servidor
    try {
        const res = await fetch("/api/config");
        const config = await res.json();

        recaptchaSiteKey = config.recaptchaSiteKey || "";
        renderizarRecaptchaSiListo();

        // // TODO-FIREBASE: Inicialización del cliente Web SDK de Firebase cuando se configuren las credenciales en /api/config
        if (config.firebase && config.firebase.apiKey) {
            firebaseApp = initializeApp(config.firebase);
            firebaseAuth = getAuth(firebaseApp);

            // Escuchar cambios de sesión de Firebase
            onAuthStateChanged(firebaseAuth, async (user) => {
                if (user) {
                    try {
                        const token = await user.getIdToken();
                        localStorage.setItem("firebaseToken", token);
                    } catch { /* ignora */ }
                }
            });
        }
    } catch (err) {
        console.warn("No se pudo cargar la configuración de /api/config:", err);
    }

    // 2. Determinar estado de sesión inicial
    const usuarioId = localStorage.getItem("usuarioId");
    if (usuarioId) {
        mostrar("perfil");
    } else {
        mostrar("landing");
    }

    actualizarNavegacion();
}

// Iniciar al cargar el DOM
document.addEventListener("DOMContentLoaded", inicializarApp);

// =============================================
// ASESOR VOCACIONAL CON IA (agente Streamlit embebido)
// =============================================
function cargarAgente() {
    const frame = document.getElementById("agenteFrame");
    const enlace = document.getElementById("agenteAbrirNueva");
    if (enlace) enlace.href = AGENTE_URL;
    // Se carga una sola vez, y solo cuando el usuario abre la pantalla
    if (frame && frame.dataset.cargado !== "1") {
        frame.src = `${AGENTE_URL}/?embed=true&embed_options=dark_theme`;
        frame.dataset.cargado = "1";
    }
}

// =============================================
// RECUPERAR CONTRASEÑA (correo de Firebase)
// =============================================
function abrirRecuperar() {
    const correo = document.getElementById("emailLogin").value.trim();
    mostrar("recuperar");
    document.getElementById("emailRecuperar").value = correo;
}

async function recuperarPassword() {
    const email = document.getElementById("emailRecuperar").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return mostrarToast("Ingresa un correo electrónico válido", "warning");
    }
    if (!firebaseAuth) {
        return mostrarToast("La recuperación no está disponible aún (falta configurar Firebase)", "warning");
    }

    bloquearBoton("btnRecuperar", true, "Enviando...");
    try {
        await sendPasswordResetEmail(firebaseAuth, email);
    } catch (error) {
        // Por seguridad no revelamos si el correo existe
        const mostrables = ["auth/invalid-email", "auth/too-many-requests", "auth/network-request-failed"];
        if (mostrables.includes(error.code)) {
            bloquearBoton("btnRecuperar", false);
            return mostrarToast(traducirErrorFirebase(error.code) || "No se pudo enviar el correo", "error");
        }
    }
    bloquearBoton("btnRecuperar", false);
    mostrarToast("Si el correo está registrado, te enviamos un enlace para crear una nueva contraseña. Revisa también el spam.", "success");
    setTimeout(() => mostrar("login"), 2500);
}

// =============================================
// EDAD OBLIGATORIA (cuentas de Google y Microsoft)
// =============================================
async function guardarEdad() {
    const edad = parseInt(document.getElementById("edadPerfil").value, 10);
    if (!Number.isInteger(edad) || edad < 10 || edad > 30) {
        return mostrarToast("Ingresa una edad válida entre 10 y 30 años", "warning");
    }

    const token = localStorage.getItem("firebaseToken");
    bloquearBoton("btnGuardarEdad", true, "Guardando...");
    try {
        const res = await fetch("/api/perfil/edad", {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ edad })
        });
        const data = await res.json();
        if (!res.ok) {
            return mostrarToast(data.error || "No se pudo guardar la edad", "error");
        }
        localStorage.removeItem("requiereEdad");
        mostrarToast("¡Listo! Tu perfil está completo", "success");
        mostrar("perfil");
    } catch (error) {
        mostrarToast("Error al conectar con el servidor", "error");
    } finally {
        bloquearBoton("btnGuardarEdad", false);
    }
}

// =============================================
// EXPOSICIÓN GLOBAL PARA ATRIBUTOS ONCLICK
// =============================================
window.mostrar = mostrar;
window.togglePassword = togglePassword;
window.registrar = registrar;
window.login = login;
window.loginGoogle = loginGoogle;
window.loginMicrosoft = loginMicrosoft;
window.cerrarSesion = cerrarSesion;
window.previsualizarFotoRegistro = previsualizarFotoRegistro;
window.cambiarFotoPerfil = cambiarFotoPerfil;
window.seleccionarOpcion = seleccionarOpcion;
window.enviarRespuestas = enviarRespuestas;
window.verCurso = verCurso;
window.verModulo = verModulo;
window.seleccionarOpcionQuiz = seleccionarOpcionQuiz;
window.finalizarQuiz = finalizarQuiz;
window.abrirRecuperar = abrirRecuperar;
window.recuperarPassword = recuperarPassword;
window.guardarEdad = guardarEdad;