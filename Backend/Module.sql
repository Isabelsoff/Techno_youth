CREATE DATABASE IF NOT EXISTS technoyouth;
USE technoyouth;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    edad INT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS preguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto VARCHAR(500) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    opciones JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS respuestas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    pregunta_id INT NOT NULL,
    respuesta VARCHAR(500) NOT NULL,
    perfil VARCHAR(50),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (pregunta_id) REFERENCES preguntas(id)
);

CREATE TABLE IF NOT EXISTS resultados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    perfil_dominante VARCHAR(50) NOT NULL,
    puntajes JSON NOT NULL,
    recomendaciones JSON NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    perfil VARCHAR(50) NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    icono VARCHAR(10) NOT NULL,
    orden INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS modulos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    curso_id INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    video_url VARCHAR(500) NOT NULL,
    lectura TEXT NOT NULL,
    quiz JSON NOT NULL,
    orden INT DEFAULT 1,
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

CREATE TABLE IF NOT EXISTS inscripciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    curso_id INT NOT NULL,
    fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_inscripcion (usuario_id, curso_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

CREATE TABLE IF NOT EXISTS progreso_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    modulo_id INT NOT NULL,
    puntaje INT NOT NULL DEFAULT 0,
    total_preguntas INT NOT NULL DEFAULT 3,
    completado BOOLEAN DEFAULT FALSE,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_progreso (usuario_id, modulo_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (modulo_id) REFERENCES modulos(id)
);

INSERT INTO preguntas (id, texto, categoria, opciones) VALUES
(1, '¿Qué actividad disfrutas más en tu tiempo libre?', 'intereses',
 '[{"texto":"Leer","perfil":"cientifico"},{"texto":"Dibujar","perfil":"creativo"},{"texto":"Deporte","perfil":"practico"},{"texto":"Ayudar","perfil":"social"}]'),
(2, '¿Qué problemas te gusta resolver?', 'intereses',
 '[{"texto":"Lógica","perfil":"cientifico"},{"texto":"Diseño","perfil":"creativo"},{"texto":"Mecánicos","perfil":"practico"},{"texto":"Relaciones","perfil":"social"}]'),
(3, '¿Qué materias prefieres?', 'habilidades',
 '[{"texto":"Matemáticas","perfil":"cientifico"},{"texto":"Artes","perfil":"creativo"},{"texto":"Tecnología","perfil":"practico"},{"texto":"Sociales","perfil":"social"}]');