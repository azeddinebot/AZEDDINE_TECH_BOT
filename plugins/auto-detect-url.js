let handler = async (m, { conn }) => {
  let url = m.text?.trim()
  if (!url || !/^https?:\/\//i.test(url)) return

  let command = null

  if (/instagram\.com\/(reel|p|tv)/i.test(url)) {
    command = `.insta ${url}`
  } else if (/facebook\.com|fb\.watch/i.test(url)) {
    command = `.fb ${url}`
  } else if (/youtube\.com|youtu\.be/i.test(url)) {
    command = `.yt ${url}`
  } else if (/tiktok\.com\/@|vm\.tiktok\.com/i.test(url)) {
    command = `.tt ${url}`
  } else if (/x\.com|twitter\.com/i.test(url)) {
    command = `.twitter ${url}`
  } else if (/threads\.net/i.test(url)) {
    command = `.threads ${url}`
  } else if (/snapchat\.com/i.test(url)) {
    command = `.snap ${url}`
  } else if (/\.apk(\?|$)/i.test(url)) {
    command = `.apk ${url}`
  } else if (/play\.google\.com\/store\/apps\/details\?id=/i.test(url) || /play\.google\.com\/work\/apps\/details\?id=/i.test(url)) {
    // هذا الشرط يتحقق من روابط Google Play Store العادية و Google Play for Work
    command = `.apk ${url}`
  }

  if (command) {
    conn.ev.emit('messages.upsert', {
      messages: [
        {
          key: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.id
          },
          message: { conversation: command },
          messageTimestamp: m.messageTimestamp,
          pushName: m.pushName,
          participant: m.sender,
        }
      ],
      type: 'notify'
    })
  }
}

handler.customPrefix = /^https?:\/\/\S+/i
handler.command = new RegExp
handler.limit = false
handler.group = false

export default handler
