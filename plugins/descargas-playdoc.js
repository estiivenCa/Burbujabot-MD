import fetch from "node-fetch";
import yts from "yt-search";

const handler = async (m, { conn, command, args, text }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `🧿 *Ingrese un nombre de una canción de YouTube*\n\nEjemplo: !${command} falling - Daniel Trevor`,
      m
    );
  }

  try {
    await m.react("⏳");

    const yt_play = await search(args.join(" "));
    const videoUrl = yt_play[0].url;

    let texto1 = `
┏◚◚◚◚🅓🅞🅒🅘🅢◚◚◚◚┓
🍁 𝚃𝚒𝚝𝚞𝚕𝚘:
${yt_play[0].title}

🎀 𝙿𝚞𝚋𝚕𝚒𝚌𝚊𝚍𝚘:
${yt_play[0].ago}

🧿 𝚄𝚁𝙻:
${videoUrl}

🖋️ 𝙰𝚞𝚝𝚘𝚛:
${yt_play[0].author.name}

📌 𝙲𝚊𝚗𝚊𝚕:
${yt_play[0].author.url}

⏰ 𝙳𝚞𝚛𝚊𝚌𝚒𝚘𝚗:
${yt_play[0].duration.timestamp}

┗◛◛◛🅚🅐🅝🅑🅞🅣◛◛◛┛

𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚜𝚞 ${
      command === "play7" ? "audio" : "video"
    }, 𝙿𝚘𝚛 𝙵𝚊𝚟𝚘𝚛 𝙴𝚜𝚙𝚎𝚛𝚎 
`.trim();

    await conn.sendMessage(m.chat, { text: texto1 }, { quoted: m });
    

    // Descarga audio o video
    if (command === "play7") {
      await downloadMedia(videoUrl, "audio", m, conn);
    } else if (command === "play8") {
      await downloadMedia(videoUrl, "video", m, conn);
    }
  } catch (error) {
    await conn.reply(m.chat, "*❌ Ocurrió un error inesperado.*", m);
    console.error(error);
  }
};

// Función para buscar videos en YouTube
async function search(query) {
  const result = await yts.search({ query, hl: "es", gl: "ES" });
  return result.videos;
}

// Función para descargar audio o video
async function downloadMedia(url, type, m, conn) {
  try {
    const response = await fetch(
      `https://rest.cifumo.biz.id/api/downloader/ytdl?url=${encodeURIComponent(
        url
      )}`,
      { method: "GET", headers: { accept: "application/json" } }
    );
    const data = await response.json();

    if (data.status && data.data) {
      const mediaUrl = type === "audio" ? data.data.audio : data.data.video;
      const fileName = `${data.data.title}.${type === "audio" ? "mp3" : "mp4"}`;

      await conn.sendMessage(
        m.chat,
        {
          document: { url: mediaUrl },
          mimetype: type === "audio" ? "audio/mpeg" : "video/mp4",
          fileName,
          caption: `🌚 *_Provided by KanBot_* 🌝`,
        },
        { quoted: m }
      );
      await m.react("✅");
    } else {
      throw new Error("Error al obtener el enlace de descarga.");
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, "*❌ No se pudo descargar el contenido.*", m);
  }
}

// Función para convertir segundos en un formato legible
function secondString(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " día, " : " días, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " horas, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " minutos, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " segundos") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

handler.help = ["play7", "play8", "playdoc", "playdoc2"];
handler.tags = ["descargas"];
handler.command = ["playdoc", "playdoc2", "play7", "play8"];
handler.group = true;

export default handler;