import fetch from 'node-fetch';
import cheerio from 'cheerio';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0] || !args[0].startsWith('http')) {
    return conn.reply(m.chat, `*مثال:* \n${usedPrefix + command} https://www.facebook.com/watch/?v=1234567890`, m);
  }

  try {
    await conn.reply(m.chat, '⌛ *جاري تحميل الفيديو...*', m);

    const res = await fetch('https://fdown.net/download.php', {
      method: 'POST',
      body: new URLSearchParams({ URLz: args[0] }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    const links = [];
    $('a.btn.btn-primary').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.includes('.mp4')) links.push(href);
    });

    if (links.length === 0) {
      return conn.reply(m.chat, '❌ لم يتم العثور على روابط فيديو. تأكد من أن الرابط صحيح أو أن الفيديو متاح للعامة.', m);
    }

    const videoUrl = links.length > 1 ? links[1] : links[0];

    // التحقق من الحجم
    const head = await fetch(videoUrl, { method: 'HEAD' });
    const size = parseInt(head.headers.get('content-length') || '0');
    const maxSize = 99 * 1024 * 1024; // 99 ميغابايت

    if (size > maxSize) {
      return conn.reply(
        m.chat,
        `⚠️ الفيديو كبير جدًا (${(size / (1024 * 1024)).toFixed(1)}MB) ولا يمكن إرساله عبر واتساب.\n📥 يمكنك تحميله من هنا:\n${videoUrl}`,
        m
      );
    }

    // إرسال الفيديو مباشرة
    await conn.sendMessage(
      m.chat,
      { video: { url: videoUrl }, caption: `✅ هذا هو الفيديو الخاص بك!\nالجودة: ${links.length > 1 ? 'HD' : 'SD'}` },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ حدث خطأ أثناء تحميل الفيديو. حاول لاحقًا.', m);
  }
};

handler.command = /^fb|facebook3$/i;
export default handler;
