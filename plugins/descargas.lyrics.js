
import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.reply(m.chat, `*Ingrese el nombre de una cancion y el artista 🎶*\n\n> *Ejemplo :*\n> _${usedPrefix + command} Falling - Daniel trevor_`, m, rcanal);
    }

    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

        let response = await fetch(`https://deliriussapi-oficial.vercel.app/search/letra?query=${encodeURIComponent(text)}`);
        let ApiData = await response.json();

    
        let { title, fullTitle, artist, artistUrl, image, lyrics } = ApiData.data;

     
        let txt = ' *\`【 Lʏʀɪᴄꜱ Sᴇᴀʀᴄʜ 】\`*\n\n';
        txt += `> *❀ Título:* _${title || 'x'}_\n`;
        txt += `> *✽ Título Completo:* _${fullTitle || 'x'}_\n`;
        txt += `> *❀ Artista:* _${artist || 'x'}_\n`;
        txt += `> *✽ URL del Artista:* _${artistUrl || 'x'}_\n`;
        txt += `> *ꕤ Letra:* _${lyrics || 'x'}_\n`.trim();

       
        if (image) {
            await conn.sendFile(m.chat, image, 'image.jpg', txt, m);
        } else {
            await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
        }

      
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

   
    } catch (error) {
        console.error(error);

       
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });

        await conn.reply(m.chat, global.error, m);
    }
};


handler.command = /^letra$/i;
handler.tags = ['buscador']
handler.help = ['letra']
handler.group = true;
export default handler;
