/**
 * AZEDDINE-TECH-BOT - Inicio del bot
 * Copyright © 2025 AZEDDINE TECH
 * Licencia: AZEDDINE RH
 * Canal: https://whatsapp.com/channel/0029VbAul2nIiRojwr0tQZ2v
 * Repositorio: https://github.com/azeddinebot/AZEDDINE_TECH_BOT
 * Contacto: azeddinet22@gmail.com
 */

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

console.log(chalk.yellow.bold('—◉ بدء تشغيل AZEDDINE TECH BOT...'));

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
  const regex = /^\+\d{7,15}$/;
  return regex.test(numeroTelefono);
}

async function start(file) {
  if (isRunning) return;
  isRunning = true;

  say('AZEDDINE TECH BOT', {
    font: 'chrome',
    align: 'center',
    gradient: ['red', 'magenta'],
  });

  say(`تم تطوير هذا البوت بواسطة AZEDDINE RH`, {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta'],
  });

  verificarOCrearCarpetaAuth();

  if (verificarCredsJson()) {
    console.log(chalk.green.bold('—◉ تم العثور على جلسة. بدء AZEDDINE TECH BOT...'));
    const args = [join(__dirname, file), ...process.argv.slice(2)];
    setupMaster({ exec: args[0], args: args.slice(1) });
    fork();
    return;
  }

  const opcion = '2';
  console.log(chalk.yellowBright.bold('—◉ الطريقة المحددة تلقائيًا: رمز من 8 أرقام'));

  if (opcion === '2') {
    let numeroTelefono;

    if (global.botnumber && global.botnumber.trim() !== '') {
      numeroTelefono = formatearNumeroTelefono(global.botnumber);

      if (esNumeroValido(numeroTelefono)) {
        console.log(chalk.green.bold(`—◉ رقم من config.js: ${numeroTelefono}`));
        console.log(chalk.cyan.bold('—◉ تم التحقق من رقم الهاتف المرتبط بـ AZEDDINE TECH BOT'));
        console.log(chalk.yellow.bold('—◉ الرجاء الانتظار لاستلام رمز الاقتران...'));

        rl.close();
        process.argv.push('--phone=' + numeroTelefono);
        process.argv.push('--method=code');
      } else {
        console.log(chalk.red.bold('[ خطأ ] الرقم في config.js غير صالح.'));
        process.exit(1);
      }
    } else {
      let phoneNumber;
      let isValid = false;

      while (!isValid) {
        phoneNumber = await question(chalk.yellowBright.bold('\n—◉ أدخل رقم WhatsApp:\n') + chalk.white.bold('مثال: +212690781092\n—> '));

        if (!phoneNumber || phoneNumber.trim() === '') {
          console.log(chalk.red.bold('[ خطأ ] يجب إدخال رقم.'));
          continue;
        }

        numeroTelefono = formatearNumeroTelefono(phoneNumber.trim());

        if (!esNumeroValido(numeroTelefono)) {
          console.log(chalk.bgRed(chalk.white.bold('[ خطأ ] رقم غير صالح. تأكد من إدخاله بشكل صحيح.\nمثال: +212690781092\n')));
          continue;
        }

        isValid = true;
      }

      console.log(chalk.green.bold('—◉ الرقم صالح. جاري الإعداد...'));
      console.log(chalk.yellow.bold('—◉ الرجاء الانتظار لاستلام رمز الاقتران...'));

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
    console.log(chalk.green.bold('—◉ تم الاستلام:'), data);
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
    console.error(chalk.red.bold('[ خطأ ] العملية الفرعية انتهت:'), { code, signal });
    if (code !== 0) {
      console.log(chalk.yellow.bold('—◉ إعادة التشغيل...'));
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
  console.error(chalk.red.bold('[ خطأ فادح ]:'), error);
  process.exit(1);
}
