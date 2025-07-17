import { URL } from 'url';

const handler = async (m, { conn, args }) => {
    // تتجاهل الرسائل التي تبدأ ببادئة الأمر
    if (m.text && m.text.startsWith(conn.prefix)) return;

    const messageText = m.text;

    if (!messageText) return;

    try {
        const url = new URL(messageText);
        let command = null;
        let platformName = null;

        // --- اكتشاف روابط الفيديوهات ---
        if (url.hostname.includes('instagram.com')) {
            command = '.insta'; // الأمر لتحميل فيديو انستقرام
            platformName = 'انستقرام';
        } else if (url.hostname.includes('facebook.com') || url.hostname.includes('fb.watch')) {
            command = '.fb'; // الأمر لتحميل فيديو فيسبوك
            platformName = 'فيسبوك';
        } else if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) { // تم التعديل ليشمل youtu.be
            command = '.yt'; // الأمر لتحميل فيديو يوتيوب
            platformName = 'يوتيوب';
        } else if (url.hostname.includes('tiktok.com')) {
            command = '.tiktok'; // الأمر لتحميل فيديو تيك توك
            platformName = 'تيك توك';
        }
        // أضف المزيد من المنصات هنا إذا لزم الأمر
        // else if (url.hostname.includes('مثال.com')) {
        //     command = '.امركذا';
        //     platformName = 'مثال.com';
        // }

        // --- اكتشاف روابط ملفات APK ---
        else if (url.pathname.toLowerCase().endsWith('.apk')) {
            command = '.apk'; // الأمر لتحميل ملف APK
            platformName = 'ملف APK';
        }

        if (command) {
            // إرسال رسالة للمستخدم بأن الرابط تم استلامه
            await m.reply(`*تـم اسـتـلام الـرابـط!* ✅\n\nأرسلت رابط *${platformName}*، جاري معالجة طلبك وإرسال المحتوى.`);

            // ************************************************
            // التعديل الرئيسي هنا: استدعاء الهاندلر الرئيسي
            // ************************************************

            // إنشاء نسخة جديدة من كائن الرسالة مع النص المعدل
            // هذا مهم لتجنب التعديلات غير المتوقعة على الكائن الأصلي
            const newM = { ...m, text: `${command} ${messageText}` };

            // استدعاء الهاندلر الرئيسي مباشرة.
            // هذا يفترض أن `handler.handler` هو الدالة الرئيسية التي تعالج الأوامر.
            // يجب التأكد أن هذا لا يسبب حلقة لا نهائية (أي أن هذا الـ plugin
            // يجب ألا يعالج الرسالة المعدلة التي يرسلها بنفسه).
            // بما أننا نتجاهل الرسائل التي تبدأ بالبادئة في بداية الـ plugin،
            // فهذا يجب أن يكون آمناً.
            await global.handler.handler.call(conn, newM);

            console.log(`[AUTO-DL] تم الكشف عن رابط ${platformName} من ${m.sender.split('@')[0]}، سيتم تنفيذ الأمر: ${newM.text}`);
            return true; // للإشارة إلى أن الرسالة تم التعامل معها بواسطة هذا الـ plugin
        }

    } catch (e) {
        // إذا لم يكن النص رابطًا صالحًا أو حدث خطأ آخر، دعه يمر
        // يمكنك تفعيل هذا السطر لمزيد من تصحيح الأخطاء إذا لزم الأمر
        // console.error("Error in auto-link detection (non-URL or internal):", e.message);
    }

    return false; // للإشارة إلى أن الرسالة لم يتم التعامل معها بواسطة هذا الـ plugin
};

export default handler;
