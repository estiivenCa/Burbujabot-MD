import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let fkontak = {
        "key": {
            "participants": "0@s.whatsapp.net",
            "remoteJid": "status@broadcast",
            "fromMe": false,
            "id": "Halo"
        },
        "message": {
            "contactMessage": {
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        "participant": "0@s.whatsapp.net"
    };

    if (!args[0]) return conn.reply(m.chat, `*[❗𝐈𝐍𝐅𝐎❗] 𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀 𝙔𝙊𝙐𝙏𝙐𝘽𝙀 𝙋𝘼𝙍𝘼 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙍 𝙀𝙇 𝙑𝙄𝘿𝙀𝙊*\n\n❕ 𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n*${usedPrefix + command} https://youtu.be/85xI8WFMIUY*`, m, {
        contextInfo: {
            'forwardingScore': 0,
            'isForwarded': false,
            externalAdReply: {
                showAdAttribution: false,
                title: packname,
                body: `👋 Hola ` + nombre,
                mediaType: 3,
                sourceUrl: global.channel
            }
        }
    }, { quoted: fkontak });

    let youtubeLink = '';
    if (args[0].includes('you')) {
        youtubeLink = args[0];
    } else {
        const index = parseInt(args[0]) - 1;
        if (index >= 0) {
            if (Array.isArray(global.videoList) && global.videoList.length > 0) {
                const matchingItem = global.videoList.find(item => item.from === m.sender);
                if (matchingItem) {
                    if (index < matchingItem.urls.length) {
                        youtubeLink = matchingItem.urls[index];
                    } else {
                        throw `🌀 *no se encontró*`;
                    }
                } else {
                    throw `𝙋𝘼𝙍𝘼 𝙋𝙊𝘿𝙀𝙍 𝙐𝙎𝘼𝙍 𝙀𝙎𝙏𝙀 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 𝘿𝙀 𝙀𝙎𝙏𝘼 𝙁𝙊𝙍𝙈𝘼 (${usedPrefix + command} <numero>), 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝙍𝙀𝘼𝙇𝙄𝙕𝘼𝙍 𝙇𝘼 𝘽𝙐́𝙎𝙌𝙐𝙀𝘿𝘼 𝘿𝙀 𝙑𝙄́𝘿𝙀𝙊𝙎 𝘾𝙊𝙉 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊  ${usedPrefix}playlist <texto>*`;
                }
            } else {
                throw `𝙋𝘼𝙍𝘼 𝙋𝙊𝘿𝙀𝙍 𝙐𝙎𝘼𝙍 𝙀𝙎𝙏𝙀 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 𝘿𝙀 𝙀𝙎𝙏𝘼 𝙁𝙊𝙍𝙈𝘼 (${usedPrefix + command} <numero>), 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝙍𝙀𝘼𝙇𝙄𝙕𝘼𝙍 𝙇𝘼 𝘽𝙐́𝙎𝙌𝙐𝙀𝘿𝘼 𝘿𝙀 𝙑𝙄́𝘿𝙀𝙊𝙎 𝘾𝙊𝙉 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊  ${usedPrefix}playlist <texto>*`;
            }
        }
    }

    await conn.reply(m.chat, `*🚀 𝙎𝙀 𝙀𝙎𝙏𝘼 𝘿𝙀𝙎𝘼𝙍𝙂𝘼𝙉𝘿𝙊 𝙎𝙐 𝙑𝙄𝘿𝙀𝙊, 𝙀𝙎𝙋𝙀𝙍𝙀 𝙐𝙉 𝙈𝙊𝙈𝙀𝙉𝙏𝙊*`, m, rcanal);
    

try {
    let apiResponse = await fetch(`https://api.ryzendesu.vip/api/downloader/ytmp4?url=${encodeURIComponent(youtubeLink)}`);
    let data = await apiResponse.json();
    if (data.url) {
        await conn.sendMessage(m.chat, {
            video: { url: data.url },
            fileName: `video_yt.mp4`,
            mimetype: 'video/mp4',
            caption: `😎 Su video by ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰`
        }, { quoted: m });
        return;
    }
} catch (E2) {
    console.error('Error en Ryzendesu:', E2);
}
try {
    let apiResponse = await fetch(`https://aemt.uk.to/download/ytdl?url=${encodeURIComponent(youtubeLink)}`);
    let data = await apiResponse.json();
    if (data.result) {
        await conn.sendMessage(m.chat, {
            video: { url: data.result.mp4 },
            fileName: `${data.result.title}.mp4`,
            mimetype: 'video/mp4',
            caption: `😎 Su video by ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰`,
            thumbnail: data.result.image
        }, { quoted: m });
        return;
    }
} catch (E4) {
    console.error('Error en Aemt:', E4);
}
try {
    let apiResponse = await fetch(`https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${youtubeLink}`);
    let data = await apiResponse.json();
    if (data.data) {
        await conn.sendMessage(m.chat, {
            video: { url: data.data.download.url },
            fileName: data.data.download.filename,
            mimetype: 'video/mp4',
            caption: `😎 Su video by ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰`,
            thumbnail: data.data.image
        }, { quoted: m });
        return;
    }
} catch (E3) {
    console.error('Error en Delirius:', E3);
}

try {
    let qu = args[1] || '360';
    let q = qu + 'p';
    let v = youtubeLink;

    const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v));
    const dl_url = await yt.video[q].download();
    const ttl = await yt.title;

    await conn.sendMessage(m.chat, {
        video: { url: dl_url },
        fileName: `${ttl}.mp4`,
        mimetype: 'video/mp4',
        caption: `😎 Su video by ✰ 𝙺𝚊𝚗𝙱𝚘𝚝 ✰`,
        thumbnail: await fetch(yt.thumbnail)
    }, { quoted: m });
} catch (E4) {
    await conn.reply(m.chat, `*[❗𝐈𝐍𝐅𝐎❗] ES POSIBLE QUE EL VIDEO SEA MUY PESADO, INTENTE CON OTRA OPCIÓN (/play8)*`, m);
}
};
handler.command = ['ytmp4', 'ytvideo', 'ytv'];
handler.group = true;

export default handler;


function bytesToSize(bytes) {
return new Promise((resolve, reject) => {
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
if (bytes === 0) return 'n/a';
const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
if (i === 0) resolve(`${bytes} ${sizes[i]}`);
resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`)})};

async function ytMp3(url) {
return new Promise((resolve, reject) => {
ytdl.getInfo(url).then(async(getUrl) => {
let result = [];
for(let i = 0; i < getUrl.formats.length; i++) {
let item = getUrl.formats[i];
if (item.mimeType == 'audio/webm; codecs=\"opus\"') {
let { contentLength } = item;
let bytes = await bytesToSize(contentLength);
result[i] = { audio: item.url, size: bytes }}};
let resultFix = result.filter(x => x.audio != undefined && x.size != undefined) 
let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].audio}`);
let tinyUrl = tiny.data;
let title = getUrl.videoDetails.title;
let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
resolve({ title, result: tinyUrl, result2: resultFix, thumb })}).catch(reject)})}

async function ytMp4(url) {
return new Promise(async(resolve, reject) => {
ytdl.getInfo(url).then(async(getUrl) => {
let result = [];
for(let i = 0; i < getUrl.formats.length; i++) {
let item = getUrl.formats[i];
if (item.container == 'mp4' && item.hasVideo == true && item.hasAudio == true) {
let { qualityLabel, contentLength } = item;
let bytes = await bytesToSize(contentLength);
result[i] = { video: item.url, quality: qualityLabel, size: bytes }}};
let resultFix = result.filter(x => x.video != undefined && x.size != undefined && x.quality != undefined) 
let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].video}`);
let tinyUrl = tiny.data;
let title = getUrl.videoDetails.title;
let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
resolve({ title, result: tinyUrl, rersult2: resultFix[0].video, thumb })}).catch(reject)})};

async function ytPlay(query) {
return new Promise((resolve, reject) => {
yts(query).then(async(getData) => {
let result = getData.videos.slice( 0, 5 );
let url = [];
for (let i = 0; i < result.length; i++) { url.push(result[i].url) }
let random = url[0];
let getAudio = await ytMp3(random);
resolve(getAudio)}).catch(reject)})};

async function ytPlayVid(query) {
return new Promise((resolve, reject) => {
yts(query).then(async(getData) => {
let result = getData.videos.slice( 0, 5 );
let url = [];
for (let i = 0; i < result.length; i++) { url.push(result[i].url) }
let random = url[0];
let getVideo = await ytMp4(random);
resolve(getVideo)}).catch(reject)})};
