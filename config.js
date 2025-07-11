/**
 * AZEDDINE-TECH-BOT - Configuración
 * Copyright © 2025 AZEDDINE TECH
 * License: AZEDDINE RH
 * Repositorio: https://github.com/azeddinebot/AZEDDINE_TECH_BOT
 * Contacto: azeddinet22@gmail.com
 * Canal: https://whatsapp.com/channel/0029VbAul2nIiRojwr0tQZ2v
 */

import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import moment from 'moment-timezone'

global.botnumber = "212774099020"
global.confirmCode = ""
global.authFile = `AZEDDINE_SESSION`

global.isBaileysFail = true
global.defaultLenguaje = 'es'

global.owner = [
  ['212774099020', '👑 Propietario 👑', true],
  ['212690781092'],
  ['212690781092']
]
global.suittag = ['212690781092']
global.prems = ['212690781092']

global.BASE_API_DELIRIUS = "https://delirius-apiofc.vercel.app"

global.packname = 'Sticker'
global.author = 'AZEDDINE-TECH-BOT'
global.wm = 'AZEDDINE-TECH-BOT'
global.titulowm = 'AZEDDINE-TECH-BOT'
global.titulowm2 = 'AZEDDINE-TECH-BOT'
global.igfg = 'AZEDDINE-TECH-BOT'
global.wait = '*[ ⏳ ] Cargando...*'

global.imagen1 = fs.readFileSync('./src/assets/images/menu/languages/es/menu.png')
global.imagen2 = fs.readFileSync('./src/assets/images/menu/languages/pt/menu.png')
global.imagen3 = fs.readFileSync('./src/assets/images/menu/languages/fr/menu.png')
global.imagen4 = fs.readFileSync('./src/assets/images/menu/languages/en/menu.png')
global.imagen5 = fs.readFileSync('./src/assets/images/menu/languages/ru/menu.png')

global.mods = []

global.d = new Date(new Date + 3600000)
global.locale = 'es'
global.dia = d.toLocaleDateString(locale, { weekday: 'long' })
global.fecha = d.toLocaleDateString('es', { day: 'numeric', month: 'numeric', year: 'numeric' })
global.mes = d.toLocaleDateString('es', { month: 'long' })
global.año = d.toLocaleDateString('es', { year: 'numeric' })
global.tiempo = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })

global.wm2 = `${dia} ${fecha}\nAZEDDINE-TECH-BOT`
global.gt = 'AZEDDINE-TECH-BOT'
global.mysticbot = 'AZEDDINE-TECH-BOT'
global.channel = 'https://whatsapp.com/channel/0029VbAul2nIiRojwr0tQZ2v'
global.md = 'https://github.com/azeddinebot/AZEDDINE_TECH_BOT'
global.waitt = '*[ ⏳ ] Cargando...*'
global.waittt = '*[ ⏳ ] Cargando...*'
global.waitttt = '*[ ⏳ ] Cargando...*'

global.nomorown = '212690781092'

global.pdoc = [
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/msword',
  'application/pdf',
  'text/rtf'
]

global.cmenut = '❖––––––『'
global.cmenub = '┊✦ '
global.cmenuf = '╰━═┅═━––––––๑\n'
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     '
global.dmenut = '*❖─┅──┅〈*'
global.dmenub = '*┊»*'
global.dmenub2 = '*┊*'
global.dmenuf = '*╰┅────────┅✦*'
global.htjava = '⫹⫺'
global.htki = '*⭑•̩̩͙⊱•••• ☪*'
global.htka = '*☪ ••••̩̩͙⊰•⭑*'
global.comienzo = '• • ◕◕════'
global.fin = '════◕◕ • •'

global.botdate = `*[ 📅 ] Fecha:*  ${moment.tz('Africa/Casablanca').format('DD/MM/YY')}`
global.bottime = `*[ ⏳ ] Hora:* ${moment.tz('Africa/Casablanca').format('HH:mm:ss')}`

global.fgif = {
  key: { participant: '0@s.whatsapp.net' },
  message: {
    'videoMessage': {
      'title': wm,
      'h': `Hmm`,
      'seconds': '999999999',
      'gifPlayback': 'true',
      'caption': bottime,
      'jpegThumbnail': fs.readFileSync('./src/assets/images/menu/languages/es/menu.png')
    }
  }
}

global.multiplier = 99

global.flaaa = [
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&fontsize=90&scaleWidth=800&scaleHeight=500&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&scaleWidth=800&scaleHeight=500&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&scaleWidth=800&scaleHeight=500&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&scaleWidth=800&scaleHeight=500&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&scaleWidth=800&scaleHeight=500&fillColor1Color=%23f2aa4c&backgroundColor=%23101820&text='
]

const file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
