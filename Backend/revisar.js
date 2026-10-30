const sqlite3 = require("sqlite3");
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "database.db"));

db.get("SELECT COUNT(*) AS total FROM preguntas", (err, fila) => {
    console.log("Preguntas:", err ? err.message : fila.total);
});

db.all(
    "SELECT sql FROM sqlite_master WHERE name IN ('progreso_usuario', 'inscripciones')",
    (err, filas) => {
        if (err) return console.error(err);
        filas.forEach(t => console.log("\n" + t.sql));
    }
);