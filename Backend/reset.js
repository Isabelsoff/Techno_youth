const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "database.db"));

console.log("Reseteando tablas de cursos...");

// Se borra primero lo que depende de otras tablas
db.exec(
    `
    DELETE FROM progreso_usuario;
    DELETE FROM inscripciones;
    DELETE FROM modulos;
    DELETE FROM cursos;
    `,
    (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log("Tablas vaciadas. Ahora reinicia el Server.js para que inserte los nuevos datos.");
        db.close();
    }
);