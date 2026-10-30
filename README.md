# TechnoYouth

Plataforma web de orientación vocacional para jóvenes. Ayuda a descubrir el perfil profesional de cada usuario a través de un test vocacional con análisis automático de resultados, rutas formativas interactivas, quizzes y sistema de progreso.

## Tecnologías

| Componente | Tecnología |
|------------|------------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla ES6+), Firebase Web SDK Modular |
| Backend | Node.js, Express 5, Multer, reCAPTCHA v2, Firebase Admin SDK |
| Base de datos | SQLite3 (`database.db`) |
| Seguridad | Firebase Authentication (Email/Password, Google, Microsoft), reCAPTCHA v2 |

## Funcionalidades

- Registro e inicio de sesión seguros con Firebase Authentication.
- Validación obligatoria y segura de Google reCAPTCHA v2 en el inicio de sesión.
- Soporte para inicio de sesión social con Google y Microsoft.
- Subida y actualización de foto de perfil con recorte/previsualización y validación estricta de tamaño (máx 2 MB) y formatos (JPG, PNG, WEBP).
- Test vocacional interactivo de 8 preguntas paso a paso.
- Análisis automático de 4 perfiles vocacionales:
  - **Científico-Tecnológico** (Ingeniería de Software, Ciencia de Datos, Biotecnología).
  - **Artístico-Creativo** (Diseño Digital, Animación 3D, Arquitectura).
  - **Social-Humanístico** (Psicología, Educación, Mediación Comunitaria).
  - **Práctico-Técnico** (Mecatrónica, Redes y Ciberseguridad, Desarrollo Web).
- Visualización de resultados con barras animadas y recomendaciones de carreras.
- Rutas de aprendizaje personalizadas con módulos de lectura, videos de YouTube y quizzes evaluativos.
- Historial de tests para monitorear la evolución del usuario.
- Interfaz moderna y responsiva con estética Glassmorphism.

## Instalación y Puesta en Marcha

1. Clonar el repositorio:
```bash
git clone https://github.com/Isabelsoff/Tecno_renovado.git
cd Tecno_renovado
```

2. Instalar dependencias del backend:
```bash
cd Backend
npm install
```

3. Configurar variables de entorno:
   - Copiar `.env.example` a `.env`:
     ```powershell
     Copy-Item .env.example .env
     ```
   - Configurar las credenciales de Firebase y Google reCAPTCHA v2 según las instrucciones de `.env.example`.

4. Iniciar el servidor:
```bash
# Modo producción
npm start

# Modo desarrollo con recarga automática
npm run dev
```

5. Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
Tecno_renovado/
├── Backend/
│   ├── Server.js             # Servidor Express, API REST, SQLite y Firebase
│   ├── database.db           # Base de datos SQLite (generada automáticamente)
│   ├── uploads/              # Fotos de perfil subidas por usuarios
│   ├── cursosData.js         # Módulos y quizzes del perfil Científico
│   ├── cursosCreativo.js     # Módulos y quizzes del perfil Creativo
│   ├── cursosPractico.js     # Módulos y quizzes del perfil Práctico
│   ├── cursosSocial.js       # Módulos y quizzes del perfil Social
│   ├── videosModulos.js      # Identificadores de videos de YouTube
│   ├── Module.sql            # Esquema de referencia de base de datos
│   ├── .env.example          # Plantilla documentada de variables de entorno
│   └── package.json          # Dependencias y scripts del backend
├── Frontend/
│   ├── index.html            # Interfaz SPA de TechnoYouth
│   ├── app.js                # Lógica del cliente, Firebase Auth y llamadas a API
│   ├── style.css             # Estilos y animaciones Glassmorphism
│   └── Img/                  # Logotipo y recursos gráficos (TechnoYouth.png)
├── .gitignore
└── README.md
```

## Autores

- **Isabel** — [@Isabelsoff](https://github.com/Isabelsoff)
- **Samuel Giraldo** — [@SamuelGiraldo1](https://github.com/SamuelGiraldo1)

## Licencia

Proyecto académico — Universidad de Antioquia, 2026.
