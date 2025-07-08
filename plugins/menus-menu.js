import fetch from 'node-fetch';

// Para configurar o idioma, na raiz do projeto altere o arquivo config.json
// Para configurar el idioma, en la raíz del proyecto, modifique el archivo config.json.
// To set the language, in the root of the project, modify the config.json file.

const handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems }) => {

  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  try {
    const datas = global
    const idioma = datas.db.data.users[m.sender].language || global.defaultLenguaje
    const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))
    const tradutor = _translate.plugins.menu_menu
    // const pp = imagen7;

    // let vn = './src/assets/audio/01J673Y3TGCFF1D548242AX68Q.mp3'
    const img = './src/assets/images/menu/languages/es/menu.png';
    const d = new Date(new Date + 3600000);
    const locale = 'es-ES';
    const week = d.toLocaleDateString(locale, { weekday: 'long' });
    const date = d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);
    const user = global.db.data.users[m.sender];
    const { money, joincount } = global.db.data.users[m.sender];
    const { exp, limit, level, role } = global.db.data.users[m.sender];
    const rtotalreg = Object.values(global.db.data.users).filter((user) => user.registered == true).length;
    const rtotal = Object.entries(global.db.data.users).length || '0'
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const doc = ['pdf', 'zip', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const document = doc[Math.floor(Math.random() * doc.length)];
    const str = `
╭─「 ★★★★★★★★★★ 」───╮
║ •─ AZEDDINE - TECH ─• ║
╰═══════════════════════╯

╭─「 مرحبا بك في البوت 」───╮
╰═══════════════════════╯

صفحتي على فيسبوك: 📘 ║
🔗 https://www.facebook.com/profile.php?id=100094037400458
╰─「★★★★★★★★★★」───╯

╭──────────────────╮
│ <MENU THE BOT/>   │
├═══════════════════┤
├ 🤖 AZEDDINE-TECH-BOT │
├ واتساب بوت متطور 📱 │
╰──────────────────╯

╭────── • التحميل • ──────╮

${tradutor.texto1[10]}

╭───── • ◆ • ─────╮
├✰ _${usedPrefix}insta_تحميل_من_انستقرام
├✰ _${usedPrefix}fb_تحميل_من_فيسبوك
├✰ _${usedPrefix}tik_تحميل_من_تيك_توك
├✰ _${usedPrefix}lang_تغيير_لغة
├✰ _${usedPrefix}threads_تحميل_من_ثريدز
├✰ _${usedPrefix}apk_تحميل_تطبيقات
╰───── • ◆ • ─────╯

╰────── • التحميل • ──────╯

${tradutor.texto1[28]}

╭────── • أوامر المطور • ──────╮ 
├✰ _> *<funcion>*_
├✰ _=> *<funcion>*_
├✰ _$ *<funcion>*_
├✰ _${usedPrefix}dsowner_
╰────── • أوامر المطور • ──────╯

╭──────────────────╮
│     شكرا لك      │
│   AZEDDINE TECH   │
╰──────────────────╯`

    let pp
    // Nuevas Imágenes del menu para otros idiomas
    if (idioma == 'es') {
      pp = global.imagen1
    } else if (idioma == 'pt-br') {
      pp = global.imagen2
    } else if (idioma == 'fr') {
      pp = global.imagen3
    }else if (idioma == 'en') {
      pp = global.imagen4
    } else if (idioma == 'ru') {
      pp = global.imagen5
    } else {
      pp = global.imagen1 // Imagen por defecto (Español/Spanish)
    }



    if (m.isGroup) {
      // await conn.sendFile(m.chat, vn, './src/assets/audio/01J673Y3TGCFF1D548242AX68Q.mp3', null, m, true, { type: 'audioMessage', ptt: true})
      conn.sendMessage(m.chat, { image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net') }, { quoted: m });
    } else {
      //await conn.sendFile(m.chat, vn, './src/assets/audio/01J673Y3TGCFF1D548242AX68Q.mp3', null, m, true, { type: 'audioMessage', ptt: true})
      const fkontak = { key: { participants:"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { " contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
      conn.sendMessage(m.chat, { image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net') }, { quoted: fkontak });
    }
  } catch {
    const datas = global
    const idioma = datas.db.data.users[m.sender].language || global.defaultLenguaje
    const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))
    const tradutor = _translate.plugins.menu_menu

    conn.reply(m.chat, translator.texto1[29], m);
  }
};
handler.command = /^(menu|a)$/i;
handler.exp = 50;
handler.fail = null;
export default handler;
function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
      }
