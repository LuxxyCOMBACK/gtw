//~~~~~~~~~SETTING BOT~~~~~~~~~~//
global.owner = "6285655636044" //ganti aja
global.namaowner = "©Luxxy.core" // Ganti aja
global.namaBot = "©Leo Bot" // Ganti aja
global.namach = 'INFO BOT STIKER BRAT' // Ganti aja
global.idch = '120363393132770871@newsletter' // diemin kalau gda
global.themeemoji = '🌸' // Ganti aja
global.packname = "©by" // Ganti aja
global.author = "Luxxy.core | Leo Bot" // Ganti aja
global.creator = "6288216399193@s.whatsapp.net" // Ganti aja
global.delayPushkontak = 7500
//====== [ THEME URL & URL ] ========//
global.thumbnail = 'https://raw.githubusercontent.com/LuxxyCOMBACK/Leo/main/uploads/upload_1761118053027.jpg' // Ganti gambar menu
global.qris = 'https://raw.githubusercontent.com/LuxxyCOMBACK/Leo/main/uploads/upload_1761121137869.jpg', // ganti gambar qris kamu
//~~~~~~~~~ Settings reply ~~~~~~~~~//
global.mess = {
    owner: "𝙆𝙝𝙪𝙨𝙪𝙨 𝙊𝙬𝙣𝙚𝙧 𝙎𝙖𝙟𝙖 𝙮𝙖𝙖!!",
    prem: "𝙊𝙣𝙡𝙮 𝙋𝙧𝙚𝙢𝙞𝙪𝙢 𝙐𝙨𝙚𝙧!!",
    limit: '⚠️ 𝙇𝙞𝙢𝙞𝙩 𝙝𝙖𝙧𝙞𝙖𝙣 𝙠𝙖𝙢𝙪 𝙨𝙪𝙙𝙖𝙝 𝙝𝙖𝙗𝙞𝙨, 𝙠𝙖𝙠. 𝘾𝙤𝙗𝙖 𝙡𝙖𝙜𝙞 𝙗𝙚𝙨𝙤𝙠 𝙖𝙩𝙖𝙪 𝙗𝙚𝙡𝙞 𝙥𝙧𝙚𝙢𝙞𝙪𝙢 𝙮𝙖𝙖!',
    botAdmin: '𝘽𝙤𝙩 𝙝𝙖𝙧𝙪𝙨 𝙢𝙚𝙣𝙟𝙖𝙙𝙞 𝙖𝙙𝙢𝙞𝙣 𝙩𝙚𝙧𝙡𝙚𝙗𝙞𝙝 𝙙𝙖𝙝𝙪𝙡𝙪',
    onlyAdmin: '𝙆𝙝𝙪𝙨𝙪𝙨 𝘼𝙙𝙢𝙞𝙣𝙂𝙧𝙪𝙥!!',
    group: "𝙊𝙣𝙡𝙮 𝙂𝙧𝙪𝙥𝘾𝙝𝙖𝙩!!",
    private: "𝙊𝙣𝙡𝙮 𝙋𝙧𝙞𝙫𝙖𝙩𝙚𝘾𝙝𝙖𝙩!!"
}

//~~~~~~~~~~~SETTINGS PANEL~~~~~~~~~~//
// Pengaturan Pterodactyl Global
global.domain = 'https://private.fyxzpediadomainpanel.my.id' // Ganti dengan link panel kamu
global.ptla = 'ptla_ftGevXzrtFrrBjFMc5KduebI632zR3HItjQwnvEtxix' // Ganti dengan API Admin PTLA kamu
global.pltc = 'ptlc_xX8fbv2b56GjSTIWalpliSjjsoB86WXgXtBDtJDSKcp' // API Client (Untuk kontrol server)
global.loc = '1' // ID Location (biasanya 1)
global.egg = '15' // ID Egg (contoh: NodeJS)
global.nest = '5' // ID Nest (biasanya 5)
//~~~~~~~~~~~SETTINGS DLL~~~~~~~~~~//
global.onlypc = false
global.onlygc = false
global.anticall = true
global.autotype = false
global.autoread = false
global.autovn = false
global.autobio = false
global.status = true //sama aja public/self

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
