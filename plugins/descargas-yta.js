import fetch from 'node-fetch';

var handler = async (m, { args, conn }) => {
  if (!args[0]) return m.reply('*[❗𝐈𝐍𝐅𝐎❗] 𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 𝙈𝘼𝙎 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀 𝙔𝙊𝙐𝙏𝙐𝘽𝙀*');

  let youtubeLink = args[0];
  await m.react('⏳');

  try {
    const apiUrl = `https://rest.cifumo.biz.id/api/downloader/ytdl?url=${encodeURIComponent(youtubeLink)}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();

      if (result.status && result.data && result.data.audio) {
        await conn.sendMessage(m.chat, {
          audio: { url: result.data.audio },
          mimetype: 'audio/mpeg',
          ptt: true,
        }, { quoted: m });

        await m.react('✅');
        return;
      } else {
        throw new Error('No se encontró enlace de audio en la respuesta.');
      }
    } else {
      throw new Error(`Error en la API: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error al obtener audio:', error);
    return m.reply('*[❗𝐄𝐑𝐑𝐎𝐑❗] 𝙉𝙊 𝙎𝙀 𝙋𝙐𝙀𝘿𝙀 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙍 𝙀𝙇 𝘼𝙐𝘿𝙄𝙊. 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍 𝙈𝘼𝙎 𝙏𝘼𝙍𝘿𝙀.*');
  }
};

handler.help = ['yta'];
handler.tags = ['descargas'];
handler.command = /^yta|audio|fgmp3|dlmp3|mp3|getaud|yt(a|mp3|mp3)$/i;
handler.group = true;
export default handler;