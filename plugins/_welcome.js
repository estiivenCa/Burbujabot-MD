let WAMessageStubType = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let vn = 'https://qu.ax/cGluV.mp3';
  let vn2 = 'https://qu.ax/cTDa.mp3';
  let chat = global.db.data.chats[m.chat];
  const getMentionedJid = () => {
    return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
  };

  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];

  let userName = user ? user.name : await conn.getName(who);

 if (chat.welcome && m.messageStubType === 27) {
    this.sendMessage(m.chat, {
        text: `╭══•🫧ೋ•๑♡๑•ೋ🫧•══╮\n¡Bienvenido/a,  @${m.messageStubParameters[0].split`@`[0]}!\n╰══•🦋 ೋ•๑♡๑•ೋ 🦋•══╯\n\nEsperamos que disfrutes tu estancia en esta comunidad🩵✨️.\n*_Recuerda leer la descripción para evitar malentendidos_*\n🦋*ੈ✩‧₊˚༺☆༻*ੈ✩˚🫧`,
        contextInfo: {
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363318891913110@newsletter",
                serverMessageId: '',
                newsletterName: namechannel
            },
            forwardingScore: 9999999,
            isForwarded: true,
            mentionedJid: getMentionedJid(),
            externalAdReply: {
                title: `  ͟͞ Ｗ Ｅ Ｌ Ｃ Ｏ Ｍ Ｅ ͟͞  `,
                body: `${userName}`,
                previewType: "PHOTO",
                thumbnailUrl: null,
                thumbnail: imagen3,
                sourceUrl: redes,
                showAdAttribution: true
            }
        }
    }, { quoted: fkontak, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
}

if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    this.sendMessage(m.chat, {
        text: `╭══•🦋ೋ•๑♡๑•ೋ🦋•══╮\n¡Adiós, lamento si soportaste🤷🏻‍♀️ , @${m.messageStubParameters[0].split`@`[0]}!\n╰══•🫧 ೋ•๑♡๑•ೋ 🫧•══╯\n\nGracias por haber estado con nosotros y espero que regreses con tu ex✨️.\n🦋*ੈ✩‧₊˚༺☆༻*ੈ✩˚🫧`,
        contextInfo: {
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363318891913110@newsletter",
                serverMessageId: '',
                newsletterName: namechannel
            },
            forwardingScore: 9999999,
            isForwarded: true,
            mentionedJid: getMentionedJid(),
            externalAdReply: {
                title: `  ͟͞ Ａ Ｄ Ｉ Ｏ Ｓ ͟͞  `,
                body: `${userName}, se despide.`,
                previewType: "PHOTO",
                thumbnailUrl: null,
                thumbnail: imagen3,
                sourceUrl: redes,
                showAdAttribution: true
            }
        }
    }, { quoted: fkontak, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
}
}
