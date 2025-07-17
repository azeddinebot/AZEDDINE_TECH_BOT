
let handler = async (m, { conn, text, usedPrefix, command }) => {
  // هذا الـ handler للتعامل مع كلمة السر
  if (command === 'password' || command === 'كلمة-السر') {
    if (!text) {
      return m.reply('🔐 من فضلك أدخل كلمة السر للوصول إلى البوت.')
    }
    
    // التحقق من كلمة السر
    if (text.trim() === '2025') {
      // حفظ أن المستخدم أدخل كلمة السر الصحيحة
      global.db.data.users[m.sender].passwordVerified = true
      return m.reply(`✅ تم التحقق من كلمة السر بنجاح!
🎉 مرحباً بك في AZEDDINE-TECH-BOT
📝 يمكنك الآن استخدام جميع أوامر البوت
🔍 اكتب .menu لعرض القائمة الرئيسية`)
    } else {
      return m.reply('❌ كلمة السر غير صحيحة! حاول مرة أخرى.')
    }
  }
}

handler.before = async (m, { conn, isROwner }) => {
  try {
    // تجاهل الرسائل من البوت نفسه
    if (m.fromMe) return
    
    // السماح للمالك بالاستخدام بدون كلمة سر
    if (isROwner) return
    
    // التحقق من وجود المستخدم في قاعدة البيانات
    if (!global.db.data.users[m.sender]) return
    
    // التحقق من أن الرسالة تحتوي على نص
    if (!m.text) return
    
    // التحقق من أن الرسالة في محادثة خاصة أو مجموعة
    const user = global.db.data.users[m.sender]
    
    // إذا لم يتم التحقق من كلمة السر بعد
    if (!user.passwordVerified) {
      // التحقق من أن الرسالة ليست أمر كلمة السر
      const prefixes = ['.', '#', '!', '/', '\\', '$']
      let isPasswordCommand = false
      
      for (const prefix of prefixes) {
        if (m.text.startsWith(prefix + 'password') || 
            m.text.startsWith(prefix + 'كلمة-السر') ||
            m.text === '2025') {
          isPasswordCommand = true
          break
        }
      }
      
      // إذا كانت الرسالة هي كلمة السر مباشرة
      if (m.text.trim() === '2025') {
        user.passwordVerified = true
        return m.reply(`✅ تم التحقق من كلمة السر بنجاح!
🎉 مرحباً بك في AZEDDINE-TECH-BOT
📝 يمكنك الآن استخدام جميع أوامر البوت
🔍 اكتب .menu لعرض القائمة الرئيسية`)
      }
      
      // التحقق من أن الرسالة تبدأ بـ prefix (أمر)
      const isCommand = prefixes.some(prefix => m.text.startsWith(prefix))
      
      // قائمة الأوامر التي تتطلب كلمة السر (جميع الأوامر الموجودة في plugins)
      const commandsRequiringPassword = [
        'menu', 'help', 'a', 'comandos', 'commands', 'cmd', 'cmds',
        'stucker', 'sticker', 'menus-menu',
        'menuaudios', 'menuanimes', 'labiblia', 'lang', 'langgroup', 'glx'
      ]
      
      // التحقق من أن الأمر المرسل يتطلب كلمة السر
      let requiresPassword = false
      if (isCommand) {
        for (const prefix of prefixes) {
          if (m.text.startsWith(prefix)) {
            const command = m.text.slice(prefix.length).split(' ')[0].toLowerCase()
            if (commandsRequiringPassword.includes(command)) {
              requiresPassword = true
              break
            }
          }
        }
      }
      
      // إذا لم تكن كلمة السر أو أمر كلمة السر، وكان الأمر يتطلب كلمة السر، إرسال رسالة طلب كلمة السر
      if (!isPasswordCommand && requiresPassword) {
        return m.reply(`🔐 مرحباً بك في AZEDDINE-TECH-BOT!
🔒 للوصول إلى البوت، يرجى إرسال كلمة السر أولاً.
💡 يمكنك إرسال كلمة السر مباشرة أو استخدام الأمر:
📝 .password كلمة_السر
🔑 أو: .كلمة-السر كلمة_السر`)
      }
    }
  } catch (error) {
    console.error('خطأ في التحقق من كلمة السر:', error)
  }
}

handler.help = ['password', 'كلمة-السر']
handler.tags = ['main']
handler.command = /^(password|كلمة-السر)$/i

export default handler
