import axios from 'axios';

let handler = async (m, { conn, args }) => {
    const text = args.join(' ');
    if (!text) return conn.reply(m.chat, '🍟 Ingresa el nombre de la aplicación que deseas buscar.', m, rcanal);

    conn.reply(m.chat, `🚩 Buscando espere...`, m, rcanal);

    try {
        const url = `https://deliriussapi-oficial.vercel.app/search/playstore?q=${encodeURIComponent(text)}`;
        const res = await axios.get(url);
        const results = res.data.data;  

        if (results && results.length > 0) {
            let teks = `🍟 *Resultado de la búsqueda* : ${text}\n\n`;
            for (let r of results) {
                const idApp = r.link.match(/id=([^&]*)/)[1];
                teks += `🐢 *Nombre* ∙ ${r.name}\n🔗 *ID de la App* ∙ ${idApp}\n\n`;
            }
            conn.reply(m.chat, teks, m, rcanal);
        } else {
            conn.reply(m.chat, '❌ No se encontraron aplicaciones.', m);
        }
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '❌ Error al buscar en la Play Store.', m);
    }
};

handler.help = ['package <App>'];
handler.tags = ['buscador'];
handler.command = ['pck', 'package'];
handler.group = true;
export default handler;
