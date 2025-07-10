import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';
import cfonts from 'cfonts';
import readline from 'readline';
import yargs from 'yargs';
import chalk from 'chalk'; 
import fs from 'fs'; 
import './config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { say } = cfonts;
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let isRunning = false;

const question = (texto) => new Promise((resolver) => rl.question(texto, resolver));

console.log(chalk.yellow.bold('—◉ㅤجاري بدء تشغيل البوت...')); // تم التعديل

function verificarOCrearCarpetaAuth() {
  const authPath = join(__dirname, global.authFile);
  if (!fs.existsSync(authPath)) {
    fs.mkdirSync(authPath, { recursive: true });
  }
}

function verificarCredsJson() {
  const credsPath = join(__dirname, global.authFile, 'creds.json');
  return fs.existsSync(credsPath);
}

function formatearNumeroTelefono(numero) {
  let formattedNumber = numero.replace(/[^\d+]/g, '');
  // هذا الجزء مخصص لأرقام المكسيك، يمكنك تركه كما هو أو تعديله إذا كنت تواجه مشاكل مع الأرقام المغربية فقط
  if (formattedNumber.startsWith('+52') && !formattedNumber.startsWith('+521')) {
    formattedNumber = formattedNumber.replace('+52', '+521');
  } else if (formattedNumber.startsWith('52') && !formattedNumber.startsWith('521')) {
    formattedNumber = `+521${formattedNumber.slice(2)}`;
  } else if (formattedNumber.startsWith('52') && formattedNumber.length >= 12) {
    formattedNumber = `+${formattedNumber}`;
  } else if (!formattedNumber.startsWith('+')) {
    formattedNumber = `+${formattedNumber}`;
  }
  return formattedNumber;
}

function esNumeroValido(numeroTelefono) {
  const regex = /^\+\d{7,15}$/; // هذا التعبير النمطي عام ويعمل مع معظم الأرقام الدولية
  return regex.test(numeroTelefono);
}

async function start(file) {
  if (isRunning) return;
  isRunning = true;

  say('بوت\nAZEDDINE', { // تم التعديل
    font: 'chrome',
    align: 'center',
    gradient: ['red', 'magenta'],
  });

  say(`بوت تم إنشاؤه بواسطة AZEDDINE`, { // تم التعديل
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta'],
  });

  verificarOCrearCarpetaAuth();

  if (verificarCredsJson()) {
    console.log(chalk.green.bold('—◉ㅤتم العثور على جلسة موجودة، جاري البدء...')); // تم التعديل
    const args = [join(__dirname, file), ...process.argv.slice(2)];
    setupMaster({ exec: args[0], args: args.slice(1) });
    fork();
    return;
  }

  // Auto-select option 2 (8-digit code method)
  const opcion = '2';
  console.log(chalk.yellowBright.bold('—◉ㅤالطريقة المختارة تلقائيًا: مع رمز نصي مكون من 8 أرقام')); // تم التعديل

  if (opcion === '2') {
    let numeroTelefono;

    // Use the phone number from config.js if available
    if (global.botnumber && global.botnumber.trim() !== '') {
      numeroTelefono = formatearNumeroTelefono(global.botnumber);

      if (esNumeroValido(numeroTelefono)) {
        console.log(chalk.green.bold(`—◉ㅤجاري استخدام الرقم من ملف الإعدادات: ${numeroTelefono}`)); // تم التعديل
        console.log(chalk.yellow.bold('—◉ㅤيرجى الانتظار بضع ثوانٍ لاستلام رمز الاقتران...')); // تم التعديل

        rl.close();
        process.argv.push('--phone=' + numeroTelefono);
        process.argv.push('--method=code');
      } else {
        console.log(chalk.red.bold('[ خطأ ] الرقم في config.js غير صالح. يرجى تصحيحه.')); // تم التعديل
        process.exit(1);
      }
    } else {
      // Fallback to manual input if no number in config
      let phoneNumber;
      let isValid = false;

      while (!isValid) {
        phoneNumber = await question(chalk.yellowBright.bold('\n—◉ㅤالرجاء إدخال رقم WhatsApp الخاص بك:\n') + chalk.white.bold('◉ㅤمثال: +212690781092\n—> ')); // تم التعديل

        if (!phoneNumber || phoneNumber.trim() === '') {
          console.log(chalk.red.bold('[ خطأ ] يجب عليك إدخال رقم هاتف.')); // تم التعديل
          continue;
        }

        numeroTelefono = formatearNumeroTelefono(phoneNumber.trim());

        if (!esNumeroValido(numeroTelefono)) {
          console.log(chalk.bgRed(chalk.white.bold('[ خطأ ] رقم غير صالح. تأكد من أنك كتبت رقمك بالصيغة الدولية وبدأت برمز الدولة.\n—◉ㅤمثال:\n◉ +212690781092\n'))); // تم التعديل
          continue;
        }

        isValid = true;
      }

      console.log(chalk.green.bold('—◉ㅤالرقم صالح. جاري بدء عملية الاقتران...')); // تم التعديل
      console.log(chalk.yellow.bold('—◉ㅤيرجى الانتظار بضع ثوانٍ لاستلام رمز الاقتران...')); // تم التعديل

      rl.close();
      process.argv.push('--phone=' + numeroTelefono);
      process.argv.push('--method=code');
    }
  } else if (opcion === '1') {
    process.argv.push('--method=qr');
  }

  const args = [join(__dirname, file), ...process.argv.slice(2)];
  setupMaster({ exec: args[0], args: args.slice(1) });

  const p = fork();

  p.on('message', (data) => {
    console.log(chalk.green.bold('—◉ㅤتم الاستلام:'), data); // تم التعديل
    switch (data) {
      case 'reset':
        p.process.kill();
        isRunning = false;
        start(file);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
    }
  });

  p.on('exit', (code, signal) => {
    isRunning = false;
    console.error(chalk.red.bold('[ خطأ ] تم إنهاء العملية الفرعية:'), { code, signal }); // تم التعديل
    if (code !== 0) {
      console.log(chalk.yellow.bold('—◉ㅤجاري إعادة التشغيل...')); // تم التعديل
      start(file);
    }
  });

  const opts = yargs(process.argv.slice(2)).argv;
  if (!opts.test) {
    rl.on('line', (line) => {
      p.emit('message', line.trim());
    });
  }
}

try {
  start('main.js');
} catch (error) {
  console.error(chalk.red.bold('[ خطأ فادح ]:'), error); // تم التعديل
  process.exit(1);
}
