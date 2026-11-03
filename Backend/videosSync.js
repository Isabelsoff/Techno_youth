// Aplica los videos de videosModulos.js a los módulos que ya están en la base de datos
const videosModulos = require('./videosModulos');

// Acepta un ID de YouTube o un link completo y devuelve el link embed ('' si no es válido)
function urlVideo(valor) {
    const v = String(valor || '').trim();
    const id = /^[\w-]{11}$/.test(v)
        ? v
        : (v.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/) || [])[1];
    return id ? `https://www.youtube.com/embed/${id}` : '';
}

// Compara títulos sin tildes, signos ¿? ni mayúsculas
const clave = t => String(t).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

const porTitulo = {};
for (const [titulo, valor] of Object.entries(videosModulos)) {
    porTitulo[clave(titulo)] = valor;
}

async function sincronizarVideos(all, run) {
    const modulos = await all('SELECT id, titulo, video_url FROM modulos');
    const vistos = new Set();
    let cambios = 0;

    for (const m of modulos) {
        const k = clave(m.titulo);
        vistos.add(k);
        if (!(k in porTitulo)) continue;

        const nuevo = urlVideo(porTitulo[k]);
        if (nuevo !== m.video_url) {
            await run('UPDATE modulos SET video_url = ? WHERE id = ?', [nuevo, m.id]);
            cambios++;
        }
    }
    console.log(`✓ Videos sincronizados: ${cambios} actualizados`);

    // Avisa si algún título del archivo no coincide con ningún módulo
    const sobran = Object.keys(videosModulos).filter(t => !vistos.has(clave(t)));
    if (sobran.length) {
        console.warn('⚠️ Estos títulos de videosModulos.js no coinciden con ningún módulo:', sobran.join(', '));
    }
}

module.exports = { sincronizarVideos, urlVideo };