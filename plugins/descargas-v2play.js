import yts from 'yt-search';
import fetch from 'node-fetch';

let handler = async (m, { text, conn }) => {
    try {
        if (!text) {
            return conn.reply(m.chat, '*𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚎𝚕 𝚗𝚘𝚖𝚋𝚛𝚎 𝚍𝚎 𝚕𝚘 𝚚𝚞𝚎 𝚚𝚞𝚒𝚎𝚛𝚎𝚜 𝚋𝚞𝚜𝚌𝚊𝚛*', m);
        }

        await m.react('🕓');
        let res = await yts(text);
        let play = res.videos[0];

        if (!play) {
            throw `Error: Vídeo no encontrado`;
        }
        let { title, thumbnail, ago, timestamp, views, videoId } = play;

        let txt = '```𝚈𝚘𝚞𝚝𝚞𝚋𝚎 𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚜```\n';
        txt += '===========================\n';
        txt += `> *𝚃𝚒𝚝𝚞𝚕𝚘* : _${title}_\n`;
        txt += `> *𝙲𝚛𝚎𝚊𝚍𝚘* : _${ago}_\n`;
        txt += `> *𝙳𝚞𝚛𝚊𝚌𝚒𝚘𝚗* : _${timestamp}_\n`;
        txt += `> *𝚅𝚒𝚜𝚒𝚝𝚊𝚜* : _${views.toLocaleString()}_\n`;
        txt += `> *𝙻𝚒𝚗𝚔* : _https://www.youtube.com/watch?v=${videoId}_\n`;
        txt += `*🚀 𝙎𝙀 𝙀𝙎𝙏𝘼 𝘿𝙀𝙎𝘾𝘼𝙍𝚐𝙔𝙀𝙉𝙏𝙊 𝙎𝙐 𝘼𝙐𝘿𝙄𝙊, 𝙀𝙎𝙋𝙀𝙍𝙀 𝙐𝙉 𝙈𝙊𝙈𝙀𝙉𝙏𝙊*\n`;
        txt += '===========================\n';
        txt += '✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰\n ';
        txt += '> *Provided by Stiiven*\n ';

        await conn.sendMessage(m.chat, { 
            image: { url: thumbnail }, 
            caption: txt, 
            mimetype: 'image/jpeg' 
        }, { quoted: m });

        // Obtener el enlace de descarga
        let youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;
        const response = await fetch('https://shinoa.us.kg/api/download/ytdl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api_key': 'free', // Clave API requerida
            },
            body: JSON.stringify({ text: youtubeLink }),
        });

        const data = await response.json();

        if (data.status && data.data && data.data.mp3) {
            // Enviar el audio MP3
            await conn.sendMessage(m.chat, {
                audio: { url: data.data.mp3 },
                fileName: `${title}.mp3`, // Nombre del archivo
                mimetype: 'audio/mpeg',
            }, { quoted: m });

            await m.react('✅');
        } else {
            throw new Error('La API no devolvió una respuesta válida.');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        await conn.reply(m.chat, '*[❗𝐈𝐍𝐅𝐎❗] Error al procesar el audio, intenta nuevamente.*', m);
    }
};

handler.help = ['play'];
handler.tags = ['descargas'];
handler.command = ['play'];
handler.group = true;

export default handler;