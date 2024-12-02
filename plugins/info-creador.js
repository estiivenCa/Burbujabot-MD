let handler = async (m, { conn, usedPrefix, isOwner }) => {
    let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;Stiiven⁩;;\nFN:Stiiven⁩\nTITLE:\nitem1.TEL;waid=524151586570:524151586570\nitem1.X-ABLabel:Burbuja\nitem2.URL:https://wa.me/524151586570\nitem2.X-ABLabel:Enviar Mensaje\nEND:VCARD`;
    await conn.sendMessage(m.chat, { contacts: { displayName: 'BurbujaBot⁩', contacts: [{ vcard }] }}, { quoted: m });
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
