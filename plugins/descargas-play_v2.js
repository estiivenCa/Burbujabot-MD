import yts from 'yt-search';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fetch from 'node-fetch';

let handler = async (m, { text, conn, args }) => {
    if (!text) {
        return conn.reply(m.chat, '*Ingresa el nombre de lo que quieres buscar*', m);
    }

    await m.react('🕓');
    let res = await yts(text);
    let play = res.videos[0];

    if (!play) {
        throw `Error: Vídeo no encontrado`;
    }

    let { title, thumbnail, ago, timestamp, views, videoId } = play;

    // Construcción del mensaje inicial
    let txt = '```𝚈𝚘𝚞𝚝𝚞𝚋𝚎 𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚜```\n';
    txt += '===========================\n';
    txt += `> *Título* : _${title}_\n`;
    txt += `> *Creado* : _${ago}_\n`;
    txt += `> *Duración* : _${timestamp}_\n`;
    txt += `> *Visitas* : _${views.toLocaleString()}_\n`;
    txt += `> *Link* : _https://www.youtube.com/watch?v=${videoId}_\n`;
    txt += '*🚀 𝙎𝙀 𝙀𝙎𝙏𝘼 𝘿𝙀𝙎𝘼𝙍𝙂𝘼𝙉𝘿𝙊 𝙎𝙐 𝙑𝙄𝘿𝙀𝙊, 𝙀𝙎𝙋𝙀𝙍𝙀 𝙐𝙉 𝙈𝙊𝙈𝙀𝙉𝙏𝙊*\n';
    txt += '===========================\n';
    txt += '✰ KanBot ✰\n';
    txt += '> *Provided by Stiiven*\n';

    // Envía el mensaje inicial con la miniatura
    await conn.sendMessage(m.chat, { 
        image: { url: thumbnail },
        caption: txt,
        mimetype: 'image/jpeg'
    }, { quoted: m });
    

    
    try {
        // Construcción del URL para la nueva API
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const apiUrl = `https://btch.us.kg/download/ytdl?url=${encodeURIComponent(youtubeUrl)}`;

        // Llamada a la API
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            },
        });
        const data = await response.json();

        if (data?.status && data?.result?.mp4) {
            // Envía el video descargado
            await conn.sendMessage(m.chat, { 
                video: { url: data.result.mp4 },
                fileName: `${data.result.title}.mp4`,
                mimetype: 'video/mp4',
                caption: `🎥 *Título:* ${data.result.title}\n\n😎 Su video by ✰ KanBot ✰`
            }, { quoted: m });
            await m.react('✅');
        } else {
            console.error('No se pudo descargar el video desde la API:', data);
            throw new Error('Fallo en la API de btch.us.kg');
        }
    } catch (error) {
        console.error('Error en la descarga de video:', error);

        // Mensaje de error en caso de fallo
        await conn.reply(m.chat, `*[❗INFO❗] El video no se pudo descargar. Intente con otra opción de descarga (#play8)*`, m);
    }
};

handler.help = ['play2'];
handler.tags = ['descargas'];
handler.command = ['play2'];
handler.group = true;

export default handler;