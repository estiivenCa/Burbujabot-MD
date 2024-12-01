/*var handler = async (m, { conn, text, usedPrefix, command}) => {

let user, number, bot, bant, ownerNumber, aa, users, usr, q, mime, img

try {
function no(number){
return number.replace(/\s/g,'').replace(/([@+-])/g,'')}
text = no(text)
if(isNaN(text)) {
number = text.split`@`[1]
} else if(!isNaN(text)) {
number = text
}
user = conn.user.jid.split`@`[0] + '@s.whatsapp.net'
bot = conn.user.jid.split`@`[0] 
bant = `🚩 *Etiquete a una persona*\n\nEjemplo, !${command} @${global.suittag}`
const nn = conn.getName(m.sender);
if (!text && !m.quoted) return conn.reply(m.chat, bant, m, { mentions: [user] })               
try {
if(text) {
user = number + '@s.whatsapp.net'
} else if(m.quoted.sender) {
user = m.quoted.sender
} else if(m.mentionedJid) {
user = number + '@s.whatsapp.net'
}} catch (e) {
} finally {
number = user.split('@')[0]
if(user === conn.user.jid) return conn.reply(m.chat, `🚩 @${bot} *No puede ser baneado con este comando*`, m, { mentions: [user] })   
for (let i = 0; i < global.owner.length; i++) {
ownerNumber = global.owner[i][0];
if (user.replace(/@s\.whatsapp\.net$/, '') === ownerNumber) {
aa = ownerNumber + '@s.whatsapp.net'
await conn.reply(m.chat, `🚩 *No puedo banear al propietario @${ownerNumber} de ${dev}*`, m, { mentions: [aa] })
return
}}
users = global.db.data.users
if (users[user].banned === true) conn.reply(m.chat, `🚩 *No es necesario volver a banear a @${number}*`, m, { mentions: [user] }) 
users[user].banned = true
usr = m.sender.split('@')[0]     
await conn.reply(m.chat, '✅ *Usuario baneado con éxito*', m, { mentions: [user] })   
}} catch (e) {
await conn.reply(m.chat, '🚩 *Ocurrió un fallo*', m, rcanal, )
console.log(e) 
}

}
handler.help = ['banuser <@tag> <razón>'];
handler.command = ['banuser'];
handler.tags = ['owner'];
handler.group = true;
handler.rowner = true;
export default handler
*/
var handler = async (m, { conn, text, usedPrefix, command }) => {
    let user, number, bot, bant, ownerNumber, aa, users, usr;

    try {
        // Función para limpiar el número y eliminar caracteres no deseados
        function no(number) {
            return number.replace(/\s/g, '').replace(/([@+-])/g, '');
        }

        if (!text && !m.quoted) {
            return conn.reply(m.chat, `🚩 *Proporcione un número o mencione a alguien.*\n\nEjemplo:\n- !${command} @usuario\n- !${command} +573222356632`, m);
        }

        // Limpiar y procesar el texto de entrada
        text = no(text);

        // Verificar si es un número o una mención
        if (isNaN(text)) {
            number = text.split`@`[1]; // Es una mención
        } else {
            number = text; // Es un número
        }

        if (!number) {
            return conn.reply(m.chat, `🚩 *Formato inválido.* Proporcione un número o mencione a alguien.`, m);
        }

        // Crear el ID del usuario
        user = number + '@s.whatsapp.net';

        // Validar si el bot está siendo baneado
        bot = conn.user.jid.split`@`[0];
        if (user === conn.user.jid) {
            return conn.reply(m.chat, `🚩 @${bot} *No puede ser baneado con este comando.*`, m, { mentions: [user] });
        }

        // Validar si el propietario está siendo baneado
        for (let i = 0; i < global.owner.length; i++) {
            ownerNumber = global.owner[i][0];
            if (user.replace(/@s\.whatsapp\.net$/, '') === ownerNumber) {
                aa = ownerNumber + '@s.whatsapp.net';
                await conn.reply(m.chat, `🚩 *No puedo banear al propietario @${ownerNumber}.*`, m, { mentions: [aa] });
                return;
            }
        }

        // Obtener datos de usuarios
        users = global.db.data.users;

        if (!users[user]) {
            users[user] = { banned: false }; // Crear el registro si no existe
        }

        if (users[user].banned === true) {
            return conn.reply(m.chat, `🚩 *El usuario @${number} ya está baneado.*`, m, { mentions: [user] });
        }

        // Baneando al usuario
        users[user].banned = true;
        await conn.reply(m.chat, `✅ *Usuario @${number} baneado con éxito.*`, m, { mentions: [user] });
    } catch (e) {
        console.error(e);
        await conn.reply(m.chat, '🚩 *Ocurrió un error.*', m);
    }
};

handler.help = ['banuser <@tag|número>'];
handler.command = ['banuser'];
handler.tags = ['owner'];
//handler.group = true;
handler.rowner = true;

export default handler;
