require('./config');

const { fromBuffer } = require('file-type')
let cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const os = require('os')
const osu = require('node-os-utils')
const BodyForm = require('form-data')
const util = require("util");
const moment = require("moment-timezone");
const { sendInteractiveMessage } = require('baileys_helper');
const { sendButtons } = require('baileys_helper');
const fetch = require('node-fetch');
const yts = require('yt-search');
const crypto = require('crypto');
const { SnackVideo } = require('./lib/snackvideo')
const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()
const { mediafire, tiktokDl } = require('./lib/scraper');
const { toAudio, toPTT, toVideo } = require('./lib/converter');
const { safeGroupMetadata, fetchAllGroupsSafe, pMapLimit } = require('./lib/wa-utils')
const {
  modul
} = require("./module");
const {
    spawn, 
    exec,
    execSync 
   } = require('child_process');
   const getFileSizeFromUrl = async (url) => {
    try {
        let response = await fetch(url, { method: 'HEAD' });
        return response.headers.get('content-length') || 0;
    } catch (err) {
        console.error(err);
        return 0;
    }
};
const {
  speed
} = modul;

const { makeWASocket, makeCacheableSignalKeyStore, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, generateWAMessageContent, generateWAMessage, makeInMemoryStore, prepareWAMessageMedia, generateWAMessageFromContent, MediaType, areJidsSameUser, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, GroupMetadata, initInMemoryKeyStore, getContentType, MiscMessageGenerationOptions, useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, DisconnectReason, WASocket, getStream, WAProto, isBaileys, PHONENUMBER_MCC, AnyMessageContent, useMultiFileAuthState, fetchLatestBaileysVersion, templateMessage, InteractiveMessage, Header } = require('@whiskeysockets/baileys')

module.exports = kyami = async (kyami, m, chatUpdate, store) => {
    try {
        const body = (
    m.mtype === "conversation" ? (m.message?.conversation || "") :
    m.mtype === "imageMessage" ? (m.message?.imageMessage?.caption || "") :
    m.mtype === "videoMessage" ? (m.message?.videoMessage?.caption || "") :
    m.mtype === "extendedTextMessage" ? (m.message?.extendedTextMessage?.text || "") :
    m.mtype === "buttonsResponseMessage" ? (m.message?.buttonsResponseMessage?.selectedButtonId || "") :
    m.mtype === "listResponseMessage" ? (m.message?.listResponseMessage?.singleSelectReply?.selectedRowId || "") :
    m.mtype === "templateButtonReplyMessage" ? (m.message?.templateButtonReplyMessage?.selectedId || "") :
    m.mtype === "interactiveResponseMessage" ? (JSON.parse(m.msg?.nativeFlowResponseMessage?.paramsJson || "{}").id || "") :
    (m.text || "")
);
        const sender = m.key.fromMe ? kyami.user.id.split(":")[0] + "@s.whatsapp.net" || kyami.user.id
: m.key.participant || m.key.remoteJid;

        const senderNumber = sender.split('@')[0];
        const budy = typeof m.text == "string" ? m.text : "";
        const prefa = ["", "!", ".", ",", "🐤", "🗿"];
        const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><™©®Δ^βα~¦|/\\©^]/;
        const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const premium = JSON.parse(fs.readFileSync("./lib/database/premium.json"))
        const Antilink = JSON.parse(fs.readFileSync('./lib/database/antilink.json'))
        const AntilinkAll = JSON.parse(fs.readFileSync("./lib/database/antilinkall.json"))
        const AntitagGc = JSON.parse(fs.readFileSync('./lib/database/antitaggc.json'))
        const AntispamGc = JSON.parse(fs.readFileSync("./lib/database/antispamgc.json"));
        const gctime = JSON.parse(fs.readFileSync('./lib/database/gctime.json'));
        const limit = JSON.parse(fs.readFileSync('./lib/database/limit.json'));
        const Sewa = JSON.parse(fs.readFileSync('./lib/database/sewa.json'))
        const WelcomeGc = JSON.parse(fs.readFileSync('./lib/database/welcome.json'));
        const AntiSticker = JSON.parse(fs.readFileSync('./lib/database/antisticker.json'));
        const GrupEvent = JSON.parse(fs.readFileSync('./lib/database/grupevent.json'));
        const AdminEvent = JSON.parse(fs.readFileSync('./lib/database/adminevent.json'));
        const botNumber = await kyami.decodeJid(kyami.user.id);
        const isPremium = premium.includes(m.sender)
        const isCmd = body.startsWith(prefix);
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const isCreator = [owner,].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const text = q = args.join(" ");
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);
        
        const groupMetadata = m.isGroup ? await safeGroupMetadata(kyami, m.chat).catch(e => null) : null
        const groupName = m.isGroup ? (groupMetadata?.subject || '') : ''
        const participants = m.isGroup ? (groupMetadata?.participants || []) : []
        const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.phoneNumber) : ''
        const groupOwner = m.isGroup ? (groupMetadata?.owner || '') : ''
        const groupMembers = m.isGroup ? (groupMetadata?.participants || []) : []
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const froms = m.quoted ? m.quoted.sender : text ? (text.replace(/[^0-9]/g, '') ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false) : false;

const reply = (teks) => {
        kyami.sendMessage(m.chat, {
            text: teks,
            contextInfo: {
                mentionedJid: [],
                groupMentions: [],
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: idch,
                    newsletterName: namach,
                },
                forwardingScore: 256,
                externalAdReply: {
                    title: namaowner,
                    body: ucapanWaktu,
                    thumbnailUrl: 'https://raw.githubusercontent.com/LuxxyCOMBACK/Leo/main/uploads/upload_1761120405051.jpg',
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: m });
};
function saveSewa() {
    fs.writeFileSync('./lib/database/sewa.json', JSON.stringify(Sewa, null, 2))
}
setInterval(async () => {
    let now = Date.now();

    for (let id in Sewa) {
        let data = Sewa[id];

        if (now >= data.end) {
            try {
                delete Sewa[id];
                saveSewa();

                await kyami.groupLeave(id);

                await kyami.sendMessage(global.owner + "@s.whatsapp.net", {
                    text: `⛔ Masa sewa untuk grup *${data.groupName}* telah habis.\nBot sudah keluar otomatis.`
                });

            } catch (err) {
                console.log("Error auto leave:", err);
            }
        }
    }
}, 5000);

function getSisaWaktu(ms) {
    if (ms <= 0) return "Expired";

    let menit = Math.floor(ms / 60000);
    let jam = Math.floor(ms / 3600000);
    let hari = Math.floor(ms / 86400000);

    if (hari > 0) return `${hari} hari`;
    if (jam > 0) return `${jam} jam`;
    return `${menit} menit`;
}

function formatWIB(timestamp) {
    return new Date(timestamp).toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }).replace(".", ":") + " WIB";
}
const time = moment.tz('Asia/Jakarta').format('HH:mm:ss');
const date = moment.tz('Asia/Jakarta').format('DD/MM/YYYY');
const time2 = moment().tz('Asia/Jakarta');

let ucapanWaktu = "Selamat Malam 🌌"; // Default

function updateUcapanWaktu() {
    const time2 = moment().tz('Asia/Jakarta');

    if (time2.hour() >= 0 && time2.hour() < 5) {
        ucapanWaktu = "Selamat Dini Hari 🌙";
    } else if (time2.hour() >= 5 && time2.hour() < 11) {
        ucapanWaktu = "Selamat Pagi 🌄";
    } else if (time2.hour() >= 11 && time2.hour() < 15) {
        ucapanWaktu = "Selamat Siang ☀️";
    } else if (time2.hour() >= 15 && time2.hour() < 18) {
        ucapanWaktu = "Selamat Sore 🌅";
    } else if (time2.hour() >= 18 && time2.hour() < 24) {
        ucapanWaktu = "Selamat Malam 🌃";
    }
}

// PANGGIL SEKALI DI AWAL
updateUcapanWaktu();

// Perbarui ucapan waktu setiap 5 detik
setInterval(updateUcapanWaktu, 5000);

// Fungsi untuk mengirim reaksi emoji
const sendReact = async (key, emojiIndex) => {
  const emojis = [
  '🔥', '✨', '🎉', '⭐', '💫', '🚀', '😊', '🤖', '💝', '🌸',
  '🎈', '🌈', '🍀', '🎯', '🎨', '🎵', '🎮', '📚', '🎁', '💡',
  '🔑', '🎊', '🏆', '💎', '👑', '🐰', '🦋', '🍕', '☕', '🍩',
  '🎂', '🍦', '🧁', '🍫', '🍭', '🎠', '🎡', '🎢', '⚽', '🏀',
  '🐶', '🐱', '🐼', '🦊', '🐨', '🐯', '🦁', '🐮', '🦖', '🐸',
  '🌺', '🌻', '🌹', '🌷', '🍁', '🌵', '🎄', '🌴', '🍄', '🌾'
  ]; // 50 emoji dengan tambahan hewan dan tumbuhan
  
  let emoji;
  if (emojiIndex === 0) {
    // Random emoji dari 30 pilihan
    emoji = emojis[Math.floor(Math.random() * emojis.length)];
  } else if (emojiIndex === 1) {
    emoji = '❌';
  } else {
    emoji = emojis[Math.floor(Math.random() * emojis.length)];
  }
  
  await kyami.sendMessage(m.chat, {        
    react: {
      text: emoji,
      key: key,
    }
  });
};
function initUserLimit(userId, isPremium) {
    const today = new Date().toLocaleDateString('id-ID'); // Format lokal agar konsisten

    // Jika user belum ada, inisialisasi
    if (!limit[userId]) {
        limit[userId] = {
            sisa: isPremium ? Infinity : 15,
            reset: today
        };
    }

    // Jika sudah lewat hari (jam 00:00 ke atas), reset limit
    if (limit[userId].reset !== today) {
        limit[userId].sisa = isPremium ? Infinity : 15;
        limit[userId].reset = today;
        fs.writeFileSync('./lib/database/limit.json', JSON.stringify(limit, null, 2));
    }
}

function cekLimit(userId) {
    return limit[userId]?.sisa ?? 0;
}

function kurangiLimit(userId) {
    if (limit[userId] && limit[userId].sisa !== Infinity) {
        limit[userId].sisa -= 1;
        fs.writeFileSync('./lib/database/limit.json', JSON.stringify(limit, null, 2));
    }
}

let timestamp = speed();
let latensi = speed() - timestamp;

const example = (teks) => {
return `\n *Example Command :*\n *${prefix+command}* ${teks}\n`
}
function capital(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
async function getBuffer(url) {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(res.data);
}
async function sendkyamiMessage(chatId, message, options = {}){
    let generate = await generateWAMessage(chatId, message, options)
    let type2 = getContentType(generate.message)
    if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
    if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
    return await kyami.relayMessage(chatId, generate.message, { messageId: generate.key.id })
}
function runtimeID(seconds) {
    seconds = Number(seconds)
    const d = Math.floor(seconds / (3600 * 24))
    const h = Math.floor((seconds % (3600 * 24)) / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    return (
        (d > 0 ? d + ' hari, ' : '') +
        (h > 0 ? h + ' jam, ' : '') +
        (m > 0 ? m + ' menit, ' : '') +
        s + ' detik'
    )
}

function formatGB(bytes) {
    return (bytes / (1024 ** 3)).toFixed(2)
}

function progressBar(used, total, length = 10) {
    const percent = used / total
    const filled = Math.round(percent * length)
    return `[${'█'.repeat(filled)}${'░'.repeat(length - filled)}]`
}

if (Antilink.includes(m.chat)) {
    const body = m.body?.toLowerCase() || "";

    const isGroupLink = body.includes("https://chat.whatsapp.com");
    const isChannelLink = body.includes("https://whatsapp.com/channel/") || body.includes("https://www.whatsapp.com/channel/");

    if (isGroupLink || isChannelLink) {
        if (!isBotAdmins) return;
        if (isAdmins || m.key.fromMe || isCreator) return;

        const jenis = isGroupLink ? 'Link Grup' : 'Link Saluran';

        await kyami.sendMessage(m.chat, {
            text: `🚫 *${jenis} Terdeteksi!*\n\n@${m.sender.split("@")[0]} telah mengirim tautan dan akan dikeluarkan.`,
            mentions: [m.sender]
        });

        await kyami.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: m.key.participant
            }
        });

        await kyami.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    }
}
if (AntilinkAll.includes(m.chat)) {
    if (!isBotAdmins) return;   

    const bebas = isAdmins || m.key.fromMe || isCreator;
    if (!bebas) {
        if (m.body?.includes("https://")) {
            await kyami.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            });

            await kyami.sendMessage(m.chat, {
                text: `🚫 *Tautan Terdeteksi!*\n\n@${m.sender.split("@")[0]} telah mengirim tautan dan akan dikeluarkan`,
                mentions: [m.sender]
            }, { quoted: m });

            await kyami.groupParticipantsUpdate(m.chat, [m.sender], "remove");
        }
    } 
}
if (AntitagGc.includes(m.chat)) {
    if (m.message?.groupStatusMentionMessage) {
        if (!isBotAdmins) return;
        if (isAdmins) return;
        if (m.key.fromMe) return;
        if (isCreator) return;

        try {
            await kyami.sendMessage(m.chat, {
                text: `🚫 *Mention Status Grup Terdeteksi!*\n\n@${m.sender.split("@")[0]} telah mention status grup dan akan dikeluarkan`,
                mentions: [m.sender]
            }, { quoted: m });
            
            await kyami.groupParticipantsUpdate(m.chat, [m.sender], 'remove');

        } catch (err) {
            console.error(err);
        }
    }
}
if (!global.antispamUser) global.antispamUser = {}
if (AntispamGc.includes(m.chat) && !isCreator && !isAdmins) {
    const id = m.chat + m.sender
    const now = Date.now()
    const maxInterval = 5000
    const maxSpam = 4

    if (!global.antispamUser[id]) {
        global.antispamUser[id] = { count: 1, last: now }
    } else {
        const userData = global.antispamUser[id]
        const diff = now - userData.last

        if (diff < maxInterval) {
            userData.count += 1
        } else {
            userData.count = 1
        }

        userData.last = now

        if (userData.count >= maxSpam) {
            delete global.antispamUser[id]
            await kyami.groupParticipantsUpdate(m.chat, [m.sender], "remove").catch(() => {})
            return kyami.sendMessage(m.chat, {
                text: `@${m.sender.split("@")[0]} dikeluarkan karena spam`,
                mentions: [m.sender]
            }, { quoted: m });
        }
    }
}
if (AntiSticker.includes(m.chat)) {
    if (m.mtype === 'stickerMessage') {
        if (!isBotAdmins) return;
        if (isAdmins) return;
        if (isCreator) return;
        if (m.key.fromMe) return;

        await kyami.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: m.key.participant
            }
        });
    }
}

if (global.autotype) {
    kyami.sendPresenceUpdate('composing', m.chat);
}
if (global.autoread) {
    kyami.readMessages([m.key]);
}
if (global.autovn) {
    kyami.sendPresenceUpdate('recording', m.chat);
}
if (global.autobio) {
    setInterval(() => {
        kyami.updateProfileStatus(`⚡ Online selama: ${runtimeID(process.uptime())} ⏳`).catch(_ => _)
    }, 60 * 1000) // 1 menit = 60.000 ms
}

if (onlypc && m.isGroup) return;
if (onlygc && !m.isGroup) return;

if (!global.scheduledGcTime) global.scheduledGcTime = {};
if (fs.existsSync('./lib/database/gctime.json')) {
  let gctime = JSON.parse(fs.readFileSync('./lib/database/gctime.json'));
  for (let id in gctime) {
    if (global.scheduledGcTime[id]) continue;
    global.scheduledGcTime[id] = true;

    let { jam, menit, opsi } = gctime[id];

    let now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    let target = new Date(now);
    target.setHours(jam, menit, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);

    let timeout = target - now;

    let warnTimeout = timeout - 5 * 60 * 1000;

    if (warnTimeout > 0) {
      setTimeout(async () => {
        try {
          const warnAction = opsi === 'not_announcement' ? 'dibuka' : 'ditutup';
          const warnEmoji = opsi === 'not_announcement' ? '🔓' : '🔒';

          let warnMsg = `
${warnEmoji} *Peringatan!*
Grup akan *${warnAction.toUpperCase()}* dalam *5 menit*.
          `.trim();

          await kyami.sendMessage(id, { text: warnMsg });
        } catch (e) {
          console.log(e);
        }
      }, warnTimeout);
    }
    setTimeout(async () => {
      try {
        await kyami.groupSettingUpdate(id, opsi);

        const action = opsi === 'not_announcement' ? 'dibuka' : 'ditutup';
        const actionEmoji = opsi === 'not_announcement' ? '🔓' : '🔒';
        const accessType = opsi === 'not_announcement'
          ? 'Semua member bisa chat'
          : 'Hanya admin yang bisa chat';

        const formattedTime = new Date().toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        const cleanMessage = `
${actionEmoji} *Pengaturan Grup Diperbarui*

• Status: *${action.toUpperCase()}*
• Waktu: ${formattedTime}
• Akses: ${accessType}

✅ Berhasil diupdate secara otomatis
        `.trim();

        await kyami.sendMessage(id, { text: cleanMessage });

        delete gctime[id];
        delete global.scheduledGcTime[id];
        fs.writeFileSync('./lib/database/gctime.json', JSON.stringify(gctime, null, 2));
      } catch (err) {
        console.error(err);
      }
    }, timeout);
  }
}
async function UploadFileUgu (input) {
	return new Promise (async (resolve, reject) => {
			const form = new BodyForm();
			form.append("files[]", fs.createReadStream(input))
			await axios({
				url: "https://uguu.se/upload.php",
				method: "POST",
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
					...form.getHeaders()
				},
				data: form
			}).then((data) => {
				resolve(data.data.files[0])
			}).catch((err) => reject(err))
	})
}
const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}
  const {
            smsg,
            fetchJson, 
            sleep,
            getRandom,
            runtime,
            formatSize
            } = require('./lib/myfunction');
       
if (m.message) {
    const waktu = chalk.black(chalk.bgGreen(` ${moment().tz("Asia/Jakarta").format("HH:mm:ss")} `));
    const tipePesan = chalk.black(chalk.bgBlue(` ${m.body || m.mtype} `));

    if (m.chat.endsWith('@broadcast')) {
        console.log(chalk.bold.yellowBright('\n[ CHANNEL / BROADCAST ]'));
        console.log(`${chalk.black(chalk.bgWhite(' MESSAGE '))} ${waktu} ${tipePesan}`);
        console.log(`${chalk.magenta('=> From Channel ID:')} ${chalk.cyan(m.chat)}`);
    } else if (m.isGroup) {
        const sender = chalk.yellow(`@${m.sender.split('@')[0]}`);
        const namaPengirim = chalk.green(pushname || 'Unknown');
        const namaGrup = chalk.green(groupName);
        const idGrup = chalk.cyan(m.chat);

        console.log(chalk.bold.redBright('\n[ GROUP CHAT ]'));
        console.log(`${chalk.black(chalk.bgWhite(' MESSAGE '))} ${waktu} ${tipePesan}`);
        console.log(`${chalk.magenta('=> From:')} ${namaPengirim} ${sender}`);
        console.log(`${chalk.blueBright('=> In Group:')} ${namaGrup} (${idGrup})`);
    } else {
        const sender = chalk.yellow(`@${m.sender.split('@')[0]}`);
        const namaPengirim = chalk.green(pushname || 'Unknown');

        console.log(chalk.bold.redBright('\n[ PRIVATE CHAT ]'));
        console.log(`${chalk.black(chalk.bgWhite(' MESSAGE '))} ${waktu} ${tipePesan}`);
        console.log(`${chalk.magenta('=> From:')} ${namaPengirim} ${sender}`);
    }
}

async function loading() {
    return reply("Sedang memuat Wak...");
}

if (kyami.tebakkata && kyami.tebakkata[m.chat] && !m.isBaileys) {
    let game = kyami.tebakkata[m.chat];
    let input = body.toLowerCase().trim();

    if (!input) return;

    if (input === 'hint') {
        let clue = game.jawaban.replace(/[AIUEOaiueo]/g, '_');
        return reply(`💡 Hint: *${clue.toUpperCase()}*`);
    }

    if (input === 'nyerah') {
        reply(`🏳️ Yah menyerah... Jawabannya adalah *${game.jawaban.toUpperCase()}*`);
        clearTimeout(game.timeout);
        delete kyami.tebakkata[m.chat];
        return;
    }

    if (input.startsWith('#')) {
        let jawabanUser = input.replace('#', '').trim();

        if (jawabanUser === game.jawaban) {
            reply(`🎉 *BENAR!* 🎉\n\nJawaban: *${game.jawaban.toUpperCase()}*\nPinter banget lu King!`);
            clearTimeout(game.timeout);
            delete kyami.tebakkata[m.chat];
            return;
        } else {
            reply('JAWABAN SALAHH!!! Coba lagi.');
        }
    }
}


async function CatBox(filePath) {
	try {
		const fileStream = fs.createReadStream(filePath);
		const formData = new BodyForm();
		formData.append('fileToUpload', fileStream);
		formData.append('reqtype', 'fileupload');
		formData.append('userhash', '');
		const response = await axios.post('https://catbox.moe/user/api.php', formData, {
			headers: {
				...formData.getHeaders(),
			},
		});
		return response.data;
	} catch (err) {
		console.error(err);
		return "Terjadi kesalahan saat upload ke Catbox.";
	}
};

        switch (command) {
case "menu": {
await kyami.sendMessage(m.chat, {
        react: { text: '⏱️', key: m.key }
    });
        let menu = `𝘏𝘢𝘪 𝘬𝘢𝘬 @${m.sender.split('@')[0]}!

┏━⭓ ɪɴғᴏʀᴍᴀᴛɪᴏɴ ᴜsᴇʀ
┃◦ 𝙉𝙖𝙢𝙖 : ${pushname} 
┃◦ 𝙎𝙩𝙖𝙩𝙪𝙨 : ${isCreator ? "ᴏᴡɴᴇʀ" : isPremium ? "ᴘʀᴇᴍɪᴜᴍ" : "ꜰʀᴇᴇ ᴜꜱᴇʀ"}
┃◦ 𝙉𝙤𝙢𝙤𝙧 : ${m.sender.split("@")[0]}
┗━━━━━━━━━━━━➤

┏━⭓ ɪɴғᴏʀᴍᴀᴛɪᴏɴ ʙᴏᴛ
┃◦ 𝙉𝙖𝙢𝙖 𝘽𝙤𝙩 : ${namaBot}  
┃◦ 𝙋𝙚𝙣𝙜𝙚𝙢𝙗𝙖𝙣𝙜 : ${namaowner}  
┃◦ 𝙈𝙤𝙙𝙚 : ${kyami.public ? 'ᴘᴜʙʟɪᴄ' : 'ꜱᴇʟꜰ'}  
┃◦ 𝙍𝙪𝙣𝙩𝙞𝙢𝙚 : ${runtime(process.uptime())}
┗━━━━━━━━━━━━➤

┏━『 👑 ᴏᴡɴᴇʀ ᴍᴇɴᴜ 』━┓
┃⟩ ${prefix}ᴏs
┃⟩ ${prefix}ᴋᴇʟᴜᴀʀɢᴄ
┃⟩ ${prefix}ᴀᴅᴅsᴇᴡᴀ
┃⟩ ${prefix}sᴛᴀᴛᴜssᴇᴡᴀ
┃⟩ ${prefix}ᴘᴇsᴀɴᴀʟʟɢᴄ
┃⟩ ${prefix}ᴀᴜᴛᴏᴊᴏɪɴ
┃⟩ ${prefix}ʀᴠᴏ
┃⟩ ${prefix}ᴀᴅᴅʟɪᴍɪᴛ
┃⟩ ${prefix}ʙʟᴏᴄᴋ
┃⟩ ${prefix}ᴜɴʙʟᴏᴄᴋ
┃⟩ ${prefix}ᴀɴᴛɪᴄᴀʟʟ
┃⟩ ${prefix}ᴄᴇᴋɪᴅᴄʜ
┃⟩ ${prefix}ᴄᴇᴋɪᴅɢᴄ
┃⟩ ${prefix}ᴏɴʟʏᴘᴄ
┃⟩ ${prefix}ᴏɴʟʏɢᴄ
┃⟩ ${prefix}ᴅᴇʟ
┃⟩ ${prefix}ʙᴀᴄᴋᴜᴩ
┃⟩ ${prefix}ᴅᴏᴡɴʟᴏᴀᴅꜰɪʟᴇ
┃⟩ ${prefix}ʟɪsᴛᴘʀᴇᴍ
┃⟩ ${prefix}ʟɪsᴛᴘᴄ
┃⟩ ${prefix}ʟɪsᴛɢᴄ
┃⟩ ${prefix}sᴇᴛᴛʜᴜᴍʙ
┃⟩ ${prefix}ᴀᴅᴅᴘʀᴇᴍ
┃⟩ ${prefix}ᴅᴇʟᴘʀᴇᴍ
┃⟩ ${prefix}ᴜᴘᴄʜ
┃⟩ ${prefix}sᴇᴛᴘᴘʙᴏᴛ
┃⟩ ${prefix}ᴅᴇʟʟᴘᴘʙᴏᴛ
┃⟩ ${prefix}ᴏɴ
┃⟩ ${prefix}ᴀᴅᴅᴄᴀsᴇ
┃⟩ ${prefix}ʀᴄʜ
┃⟩ ${prefix}sᴇʟғ
┃⟩ ${prefix}ᴘᴜʙʟɪᴄ
┗━━━━━━━━━━━━━━━━━━➤

┏━『 🤖 ᴀɪ ᴍᴇɴᴜ 』━┓
┃⟩ ${prefix}ᴇᴅɪᴛᴀɪ
┃⟩ ${prefix}ʜʏᴛᴀᴍᴋᴀɴ
┃⟩ ${prefix}ғɪɢᴜʀᴇ
┃⟩ ${prefix}ᴄʜᴀᴛɢᴘᴛ
┗━━━━━━━━━━━━━━━━━━➤

┏━『 📥 ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ 』━┓
┃⟩ ${prefix}ᴘɪɴᴅʟ
┃⟩ ${prefix}sᴘᴏᴛɪғʏᴅʟ
┃⟩ ${prefix}ᴅᴏᴡɴʟᴏᴀᴅ  
┃⟩ ${prefix}ᴛᴛ
┃⟩ ${prefix}ɪɢᴅʟ  
┃⟩ ${prefix}ᴘʟᴀʏ
┃⟩ ${prefix}ʏᴛᴍᴘ3
┃⟩ ${prefix}ʏᴛᴍᴘ4
┃⟩ ${prefix}ғᴀᴄᴇʙᴏᴏᴋ  
┃⟩ ${prefix}ᴠɪᴅᴇʏ  
┃⟩ ${prefix}sɴᴀᴄᴋᴠɪᴅᴇᴏ  
┗━━━━━━━━━━━━━━━━━━➤

┏━『 👥 ɢʀᴏᴜᴘ ᴍᴇɴᴜ 』━┓
┃⟩ ${prefix}ᴜᴘsᴡɢᴄ
┃⟩ ${prefix}ᴛᴀɢsᴡ
┃⟩ ${prefix}sᴇᴛᴘᴘɢᴄ
┃⟩ ${prefix}ᴅᴇʟʟᴘᴘɢᴄ
┃⟩ ${prefix}ᴀɴᴛɪᴛᴀɢɢᴄ
┃⟩ ${prefix}ᴀᴅᴍɪɴᴇᴠᴇɴᴛ
┃⟩ ${prefix}ɢʀᴜᴘᴇᴠᴇɴᴛ
┃⟩ ${prefix}ᴀɴᴛɪsᴛɪᴄᴋᴇʀ
┃⟩ ${prefix}ᴡᴇʟᴄᴏᴍᴇ  
┃⟩ ${prefix}ɢᴄᴛɪᴍᴇ
┃⟩ ${prefix}ᴛᴀɢᴀʟʟ  
┃⟩ ${prefix}ʜɪᴅᴇᴛᴀɢ
┃⟩ ${prefix}ᴇᴠᴇʀʏᴏɴᴇ
┃⟩ ${prefix}ᴀɴᴛɪʟɪɴᴋ
┃⟩ ${prefix}ᴀɴᴛɪʟɪɴᴋᴀʟʟ  
┃⟩ ${prefix}ᴀɴᴛɪsᴘᴀᴍɢᴄ
┃⟩ ${prefix}ᴀᴅᴅ  
┃⟩ ${prefix}ᴋɪᴄᴋ  
┃⟩ ${prefix}ᴅᴇʟᴘᴘɢᴄ  
┃⟩ ${prefix}sᴇᴛᴘᴘɢʀᴏᴜᴘ    
┃⟩ ${prefix}sᴇᴛᴅᴇsᴋ  
┃⟩ ${prefix}sᴇᴛᴅᴇsᴄ  
┃⟩ ${prefix}sᴇᴛsᴜʙᴊᴇᴄᴛ  
┃⟩ ${prefix}sᴇᴛɢʀᴏᴜᴘɴᴀᴍᴇ  
┃⟩ ${prefix}sᴇᴛɴᴀᴍᴇɢᴄ  
┃⟩ ${prefix}ᴘʀᴏᴍᴏᴛᴇ  
┃⟩ ${prefix}ᴅᴇᴍᴏᴛᴇ  
┗━━━━━━━━━━━━━━━━━━➤

┏━『 🛠️ ᴛᴏᴏʟs ᴍᴇɴᴜ 』━┓
┃⟩ ${prefix}sᴘᴀᴍɴɢʟ
┃⟩ ${prefix}ɢᴇᴛᴘᴘ
┃⟩ ${prefix}ᴘɪɴ
┃⟩ ${prefix}sᴘᴏᴛɪғʏ
┃⟩ ${prefix}ттѕ
┃⟩ ${prefix}ʀᴇᴍᴏᴠᴇʙɢ
┃⟩ ${prefix}ᴛᴏɪᴍɢ
┃⟩ ${prefix}ᴛᴏᴜʀʟ 
┃⟩ ${prefix}ᴛᴏᴍᴘ𝟹
┃⟩ ${prefix}ᴛᴏᴍᴘ𝟺
┃⟩ ${prefix}ᴛᴏᴠɴ
┃⟩ ${prefix}ʜᴅ
┃⟩ ${prefix}sᴜᴘᴇʀʜᴅ
┗━━━━━━━━━━━━━━━━━━➤

┏━『 🎮 ғᴜɴ ᴍᴇɴᴜ 』━┓
┃⟩ ${prefix}ᴛʀᴜᴛʜ
┃⟩ ${prefix}ᴅᴀʀᴇ
┃⟩ ${prefix}ᴄʜᴇᴄᴋᴍᴇ
┃⟩ ${prefix}ᴍɪᴛᴏs
┃⟩ ${prefix}ғᴀᴋᴛᴀᴜɴɪᴋ
┃⟩ ${prefix}ғᴀᴋᴛᴀᴋᴜᴄɪɴɢ
┃⟩ ${prefix}ᴄᴇᴋɢᴀɴᴛᴇɴɢ
┃⟩ ${prefix}ᴄᴇᴋᴄᴀɴᴛɪᴋ
┃⟩ ${prefix}ᴄᴇᴋɪᴍᴜᴛ
┃⟩ ${prefix}ᴄᴇᴋᴊᴏᴍᴏᴋ
┃⟩ ${prefix}ᴄᴇᴋᴡᴀɪғᴜ
┃⟩ ${prefix}ᴄᴇᴋʜᴜsʙᴜ
┃⟩ ${prefix}ᴄᴇᴋᴋᴇᴘʀɪʙᴀᴅɪᴀɴ
┃⟩ ${prefix}ᴄᴇᴋᴍᴀsᴀᴅᴇᴘᴀɴ
┃⟩ ${prefix}sᴜɪᴛ
┃⟩ ${prefix}ᴛᴇʙᴀᴋᴋᴀᴛᴀ
┃⟩ ${prefix}ʙᴇʙᴀɴɢʀᴜᴘ
┃⟩ ${prefix}ᴊᴏᴅᴏʜ
┃⟩ ${prefix}ǫᴜᴏᴛᴇs
┃⟩ ${prefix}ᴀʀᴛɪɴᴀᴍᴀ
┃⟩ ${prefix}ᴀʀᴛɪᴍɪᴍᴘɪ
┃⟩ ${prefix}sɪғᴀᴛ
┃⟩ ${prefix}ʜᴀᴄᴋᴡᴀ
┃⟩ ${prefix}ᴀᴋsᴀʀᴀsᴜɴᴅᴀ
┃⟩ ${prefix}ɢʟɪᴛᴄʜᴛᴇxᴛ
┃⟩ ${prefix}ғɪɴᴅsᴏɴɢ
┃⟩ ${prefix}ʀᴀᴍᴀʟᴀɴ
┃⟩ ${prefix}ʟᴜᴄᴋʏɴᴜᴍʙᴇʀ
┗━━━━━━━━━━━━━━━━━━➤

┏━『 🖥️ ᴘᴀɴᴇʟ ᴍᴇɴᴜ 』━┓
┃⟩ ${prefix}𝟷ɢʙ ɴᴀᴍᴀ,ɴᴏᴍᴏʀ
┃⟩ ${prefix}𝟸ɢʙ ɴᴀᴍᴀ,ɴᴏᴍᴏʀ
┃⟩ ${prefix}𝟹ɢʙ ɴᴀᴍᴀ,ɴᴏᴍᴏʀ
┃⟩ ${prefix}𝟺ɢʙ ɴᴀᴍᴀ,ɴᴏᴍᴏʀ
┃⟩ ${prefix}𝟻ɢʙ ɴᴀᴍᴀ,ɴᴏᴍᴏʀ
┃⟩ ${prefix}𝟼ɢʙ ɴᴀᴍᴀ,ɴᴏᴍᴏʀ
┃⟩ ${prefix}𝟽ɢʙ ɴᴀᴍᴀ,ɴᴏᴍᴏʀ
┃⟩ ${prefix}𝟾ɢʙ ɴᴀᴍᴀ,ɴᴏᴍᴏʀ
┃⟩ ${prefix}𝟿ɢʙ ɴᴀᴍᴀ,ɴᴏᴍᴏʀ
┃⟩ ${prefix}𝟷𝟶ɢʙ ɴᴀᴍᴀ,ɴᴏᴍᴏʀ
┃⟩ ${prefix}ᴜɴʟɪ ɴᴀᴍᴀ,ɴᴏᴍᴏʀ
┃⟩ ${prefix}ʟɪsᴛsʀᴠ
┗━━━━━━━━━━━━━━━━━━━➤

┏━『 🖼️ sᴛɪᴋᴇʀ ᴍᴇɴᴜ 』━┓
┃⟩ ${prefix}ǫᴄ
┃⟩ ${prefix}ɪǫᴄ
┃⟩ ${prefix}ʙʀᴀᴛ
┃⟩ ${prefix}ʙʀᴀᴛᴠɪᴅ
┃⟩ ${prefix}sᴍᴇᴍᴇ
┃⟩ ${prefix}sᴛɪᴄᴋᴇʀ
┗━━━━━━━━━━━━━━━━━━➤

┏━『 🔍 sᴛᴀʟᴋ ᴍᴇɴᴜ 』━┓
┃⟩ ${prefix}ʀᴏʙʟᴏxsᴛᴀʟᴋ
┃⟩ ${prefix}ᴛᴛsᴛᴀʟᴋ
┃⟩ ${prefix}ɪɢsᴛᴀʟᴋ
┗━━━━━━━━━━━━━━━━━━➤

┏━『 🚀 ᴘᴜsʜ ᴍᴇɴᴜ 』━┓
┃⟩ ${prefix}ᴄᴇᴋɪᴅɢᴄ
┃⟩ ${prefix}ᴄᴇᴋɪᴅᴄʜ
┃⟩ ${prefix}ᴘᴜsʜᴋᴏɴᴛᴀᴋ
┃⟩ ${prefix}ᴘᴜsʜᴋᴏɴᴛᴀᴋɪᴅ
┃⟩ ${prefix}ᴊᴘᴍ
┃⟩ ${prefix}ᴅᴏɴᴇ
┗━━━━━━━━━━━━━━━━━━➤

┏━『 📂 ᴏᴛʜᴇʀ ᴍᴇɴᴜ 』━┓
┃⟩ ${prefix}ʟɪsᴛsᴇᴡᴀ
┃⟩ ${prefix}ᴘᴀʏᴍᴇɴᴛ
┃⟩ ${prefix}ʟɪsᴛᴘᴀɴᴇʟ
┗━━━━━━━━━━━━━━━━━━➤
ʜᴀʀᴀᴘ ᴜɴᴛᴜᴋ ʙᴇʀɢᴀʙᴜɴɢ ɢʀᴏᴜᴘ ʙᴏᴛ ᴀɢᴀʀ ᴍᴇɴɢᴇᴛᴀʜᴜɪ ɪɴғᴏʀᴍᴀsɪ ʙᴏᴛ ᴊɪᴋᴀ *ᴇʀʀᴏʀ/ʙᴀɴɴᴇᴅ*
━─━─━─━─━─━─━─━─━`
await kyami.sendMessage(m.chat, {
        text: menu,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: idch,
                newsletterName: namach,
                serverMessageId: -1
            },
            externalAdReply: {
                title: namaowner,
                body: ucapanWaktu,
                thumbnailUrl: 'https://raw.githubusercontent.com/LuxxyCOMBACK/Leo/main/uploads/upload_1761118053027.jpg',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
                    }
break
case 'payment': {
  let pay = `𝙃𝙞 @${m.sender.split("@")[0]}  
𝘽𝙚𝙧𝙞𝙠𝙪𝙩 𝘽𝙚𝙗𝙚𝙧𝙖𝙥𝙖 𝙋𝙖𝙮𝙢𝙚𝙣𝙩 𝙆𝙖𝙢𝙞`;

  await sendButtons(kyami, m.chat, {
    title: '💳 PAYMENT METHOD',
    text: pay,
    footer: "© Luxxy | Leo",
    buttons: [
      { 
        id: '.qris', 
        text: '🧾 QRIS' 
      },
      { 
        id: '.dana', 
        text: '📱 DANA' 
      },
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({
          display_text: '📞 Hubungi Owner',
          url: 'https://wa.me/6285655636044'
        })
      }
    ]
  }, { quoted: m });
}
break
case 'truth': {
    const truths = [
        '😈 Apa rahasia terbesar yang belum pernah kamu ceritakan ke siapa pun?',
        '🤭 Siapa orang yang diam-diam kamu suka saat ini?',
        '🫣 Pernah bohong sama sahabat sendiri? Tentang apa?',
        '👀 Hal paling memalukan yang pernah kamu alami?',
        '💬 Kalau bisa kembali ke masa lalu, apa yang ingin kamu ubah?',
        '💔 Pernah patah hati? Ceritakan alasannya!',
        '😳 Pernah stalk mantan atau gebetan di media sosial? Seberapa sering?',
        '😅 Apa hal paling konyol yang pernah kamu lakukan demi seseorang?',
        '🤨 Pernah suka diam-diam sama teman sendiri? Siapa?',
        '🤥 Apa kebohongan terbesar yang pernah kamu ucapkan dan belum ketahuan?',
        '🎭 Kalau harus berpura-pura jadi seseorang selama sehari, siapa yang akan kamu pilih?',
        '🙈 Apa kebiasaan aneh yang kamu lakukan tapi jarang orang tahu?',
        '🛌 Apa mimpi paling aneh atau menyeramkan yang pernah kamu alami?',
        '🙊 Pernah kepikiran buat balikan sama mantan? Kenapa?',
        '💵 Kalau tiba-tiba dapat 1 miliar, apa hal pertama yang akan kamu beli?',
        '📱 Siapa orang yang paling sering kamu kepoin di media sosial?',
        '😬 Hal apa yang bikin kamu malu tiap kali mengingatnya?',
        '🧐 Siapa orang yang pernah kamu iri dalam hidupmu?',
        '🎤 Lagu apa yang paling menggambarkan perasaanmu saat ini?',
        '🏫 Pelajaran atau mata kuliah apa yang paling kamu benci dan kenapa?',
        '👶 Kalau bisa kembali ke masa kecil, apa yang ingin kamu lakukan lagi?',
        '😜 Apa kebiasaan buruk yang sulit kamu hilangkan?',
        '🥺 Siapa orang yang paling kamu sayangi saat ini?',
        '🚫 Pernah melakukan sesuatu yang bertentangan dengan prinsipmu? Apa itu?',
        '😎 Kalau bisa jadi artis terkenal, siapa yang ingin kamu gantikan?',
        '💬 Satu kata yang bisa mendeskripsikan kehidupan cintamu saat ini?',
        '😂 Apa hal paling aneh yang pernah kamu ketahui tentang dirimu sendiri?',
        '📩 Pernah mengirim chat ke orang yang salah? Ceritakan!',
        '🙄 Siapa orang yang paling menyebalkan menurutmu?',
        '💌 Jika bisa mengungkapkan perasaan ke seseorang sekarang juga, siapa itu?',
        '🤗 Siapa orang yang paling ingin kamu peluk saat ini dan kenapa?',
        '🎬 Film atau drama yang paling membuatmu nangis?',
        '📚 Apa buku atau cerita yang pernah mengubah hidupmu?',
        '😵 Pernah punya pengalaman paranormal? Ceritakan!',
        '🛑 Pernah hampir ketahuan berbohong? Ceritakan situasinya!',
        '💤 Pernah ketiduran di tempat yang tidak seharusnya? Di mana?',
        '🌍 Kalau bisa pindah ke negara mana pun, kamu pilih ke mana dan kenapa?',
        '💡 Apa ide paling gila yang pernah kamu pikirkan tapi belum kamu lakukan?',
        '👻 Kamu lebih takut setan atau kehilangan orang yang kamu sayang?',
        '📝 Kalau harus menulis surat untuk dirimu di masa depan, apa yang akan kamu tulis?',
        '🎁 Apa hadiah terbaik yang pernah kamu terima dalam hidupmu?'
    ];
    const randomTruth = truths[Math.floor(Math.random() * truths.length)];
    reply(`🤔 *Truth*\n\n${randomTruth}`);
}
break
case 'dare': {
    const dares = [
        '🔥 Kirim chat "Aku suka kamu" ke kontak terakhir yang kamu chat!',
        '😜 Kirim voice note bilang "Aku adalah manusia paling lucu sedunia."',
        '🤡 Foto selfie dengan ekspresi wajah paling aneh dan kirim ke grup!',
        '🕺 Kirim video kamu joget lagu favorit selama 10 detik.',
        '📸 Post story IG dengan caption "Aku lagi kena dare nih, tolong selamatkan!"',
        '📢 Kirim voice note teriak "Aku ganteng/cantik banget, dunia harus tahu!"',
        '🐵 Ubah foto profil WhatsApp jadi gambar monyet selama 3 jam.',
        '🍋 Makan sesuatu yang asam tanpa berekspresi, lalu kirim video.',
        '🎤 Nyanyikan lagu favoritmu dengan suara paling aneh dan kirim voice note.',
        '📷 Kirim foto isi galeri HP tanpa melihatnya terlebih dahulu!',
        '🙊 Chat mantan dan tanya "Apa kabar? Aku kangen nih 🥺."',
        '🚀 Kirim voice note ngomong dengan aksen alien selama 10 detik.',
        '📞 Telepon teman dan bilang "Aku mau curhat, aku suka sama kamu."',
        '🎭 Ganti nama di grup jadi "Si paling unyu" selama 1 jam.',
        '🐸 Kirim stiker kodok ke 5 orang secara random.',
        '👀 Kirim chat "Kamu tau nggak?" ke 3 orang lalu diamkan tanpa lanjut.',
        '🍔 Makan sesuatu dengan cara yang aneh lalu kirim video.',
        '📝 Tulis status di WhatsApp: "Aku single dan siap menerima lamaran."',
        '🐔 Kirim voice note meniru suara ayam berkokok!',
        '🔄 Kirim chat ke seseorang dengan huruf terbalik (contoh: "ahoy" jadi "yohA").',
        '🕵️‍♂️ Stalking profil orang random di IG lalu kasih like 3 foto lamanya.',
        '📢 Kirim voice note mengaku sebagai karakter anime favoritmu.',
        '💀 Beri komentar di postingan random dengan kata "Gokil bet dah!"',
        '🐵 Ubah foto profil jadi gambar kartun selama 24 jam.',
        '🍫 Makan makanan manis dan asin bersamaan lalu rekam reaksi kamu!',
        '📲 Kirim pesan ke teman lama yang sudah lama tidak dihubungi.',
        '🙃 Balas 3 chat terakhir hanya dengan emoji selama 1 jam.',
        '📺 Rekam dirimu menyebutkan 3 fakta aneh tentang dirimu sendiri.',
        '💌 Kirim pesan ke crush kamu tanpa konteks apa pun.',
        '🌎 Tulis "Aku cinta bumi" di status WA selama 12 jam!',
        '😂 Kirim chat ke grup dengan kata-kata random selama 5 menit!',
        '🎨 Gambar sesuatu dengan tangan kiri (atau kanan jika kidal) dan kirim hasilnya.',
        '🐱 Tirukan suara kucing dan kirim voice note!',
        '🤡 Kirim selfie dengan filter paling konyol di HP kamu.',
        '💔 Kirim voice note "Aku galau, tolong hibur aku." ke grup.'
    ];
    const randomDare = dares[Math.floor(Math.random() * dares.length)];
    reply(`😈 *Dare*\n\n${randomDare}`);
}
break
case 'checkme':{
				let namaTarget = args.join(" ");
				let idPengirim = `${m.sender}`;
				const daftarSifat = ['Baik 🥰', 'Jutek 😤', 'Santai 😎', 'Ramah 😊', 'Lucu 🤭', 'Nyebelin 😜', 'Serius 🧐', 'Keren 😌'];
				const daftarHobi = ['Memasak 🍳', 'Menari 💃', 'Bermain 🎮', 'Menggambar 🎨', 'Membaca 📚', 'Menonton Anime 📺', 'Bernyanyi 🎤', 'Berkebun 🌱'];
				const tingkatBucin = Array.from({ length: 100 }, (_, i) => (i + 1).toString());
				const tingkatKeren = Array.from({ length: 100 }, (_, i) => (i + 1).toString());
				const ketampanan = ['Iya 😍', 'Enggak 😭', 'Sangat Tampan 🤩', 'Hmm... Biasa aja 😅'];
				const daftarWatak = ['Penyayang 💖', 'Pemarah 😡', 'Murah Hati 🤗', 'Sabar 🧘', 'Lucu 🤭', 'Serius 🧐'];
				const moralBaik = Array.from({ length: 100 }, (_, i) => (i + 1).toString());
				const moralBuruk = Array.from({ length: 100 }, (_, i) => (i + 1).toString());
				const tingkatKepintaran = Array.from({ length: 100 }, (_, i) => (i + 1).toString());
				const tingkatKeberanian = Array.from({ length: 100 }, (_, i) => (i + 1).toString());
				const tingkatKetakutan = Array.from({ length: 100 }, (_, i) => (i + 1).toString());

				let sifatAcak = daftarSifat[Math.floor(Math.random() * daftarSifat.length)];
				let hobiAcak = daftarHobi[Math.floor(Math.random() * daftarHobi.length)];
				let bucinAcak = tingkatBucin[Math.floor(Math.random() * tingkatBucin.length)];
				let kerenAcak = tingkatKeren[Math.floor(Math.random() * tingkatKeren.length)];
				let tampanAcak = ketampanan[Math.floor(Math.random() * ketampanan.length)];
				let watakAcak = daftarWatak[Math.floor(Math.random() * daftarWatak.length)];
				let moralBaikAcak = moralBaik[Math.floor(Math.random() * moralBaik.length)];
				let moralBurukAcak = moralBuruk[Math.floor(Math.random() * moralBuruk.length)];
				let pintarAcak = tingkatKepintaran[Math.floor(Math.random() * tingkatKepintaran.length)];
				let beraniAcak = tingkatKeberanian[Math.floor(Math.random() * tingkatKeberanian.length)];
				let takutAcak = tingkatKetakutan[Math.floor(Math.random() * tingkatKetakutan.length)];
				let profil = `*🎀━━━〔 𝗖𝗵𝗲𝗰𝗸 @${idPengirim.split('@')[0]} 〕━━━🎀*\n\n📝 *Nama:* ${pushname}\n✨ *Karakteristik:* ${sifatAcak}\n🎯 *Hobi:* ${hobiAcak}\n❤️ *Tingkat Bucin:* ${bucinAcak}%\n🌟 *Tingkat Keren:* ${kerenAcak}%\n😎 *Ketampanan:* ${tampanAcak}\n🧠 *Watak:* ${watakAcak}\n💎 *Moral Baik:* ${moralBaikAcak}%\n🔥 *Moral Buruk:* ${moralBurukAcak}%\n📊 *Kepintaran:* ${pintarAcak}%\n🛡️ *Keberanian:* ${beraniAcak}%\n👻 *Ketakutan:* ${takutAcak}%\n\n*🍭━━━〔 𝗖𝗛𝗘𝗖𝗞 𝗣𝗥𝗢𝗣𝗘𝗥𝗧𝗜𝗘𝗦 〕━━━🍭*`;
				try {
					ppuser = await kyami.profilePictureUrl(m.sender, 'image');
				} catch (err) {
					ppuser = imageUrl
				}	
				let fotoProfil = await getBuffer(ppuser);
				kyami.sendMessage(
					m.chat, 
					{ image: fotoProfil, caption: profil, mentions: [idPengirim] },
					{ quoted: m }
				);
			}
break
case 'mitos': {
				const myths = [
					'🌕 *Mitos Bulan Purnama:* Banyak orang percaya bahwa bulan purnama bisa memengaruhi perilaku manusia, menyebabkan kegilaan, dan meningkatkan angka kejahatan.',
					'🪞 *Mitos Cermin Pecah:* Memecahkan cermin dipercaya membawa nasib buruk selama 7 tahun.',
					'👻 *Mitos Hantu di Pohon Beringin:* Pohon beringin sering dikaitkan dengan makhluk halus dan dipercaya sebagai tempat tinggal roh gentayangan.',
					'🐈‍⬛ *Mitos Kucing Hitam:* Melihat kucing hitam melintas di depanmu sering dianggap sebagai pertanda sial.',
					'💍 *Mitos Cincin di Jari Tengah:* Memakai cincin di jari tengah dipercaya dapat menarik energi positif dan keberuntungan.',
					'🧂 *Mitos Menumpahkan Garam:* Menumpahkan garam dipercaya membawa nasib buruk, kecuali jika dilemparkan ke bahu kiri.',
					'🔮 *Mitos Bola Kristal:* Bola kristal sering dikaitkan dengan kemampuan meramal masa depan.',
					'🎋 *Mitos Pohon Bamboo:* Pohon bamboo di halaman rumah dipercaya bisa mengundang energi positif dan membawa keberuntungan.',
					'🌠 *Mitos Bintang Jatuh:* Jika melihat bintang jatuh dan membuat permintaan, maka permintaan itu akan terkabul.',
					'🐦 *Mitos Burung Masuk Rumah:* Burung yang masuk ke dalam rumah sering dianggap sebagai pertanda akan ada tamu atau berita penting.',
					'🌧️ *Mitos Hujan di Hari Pernikahan:* Hujan di hari pernikahan sering dianggap sebagai pertanda keberuntungan dan kebahagiaan.',
					'🍃 *Mitos Daun Jatuh di Kepala:* Jika ada daun jatuh di kepala seseorang, dipercaya orang itu akan mendapat keberuntungan.',
					'🦉 *Mitos Burung Hantu:* Burung hantu sering dianggap sebagai simbol kematian atau pertanda buruk di beberapa budaya.',
					'🖤 *Mitos Warna Hitam:* Warna hitam sering dikaitkan dengan kesialan dan energi negatif.',
					'🌈 *Mitos Ujung Pelangi:* Konon, ada harta karun di ujung pelangi, tetapi tidak ada yang bisa mencapainya.',
					'🌺 *Mitos Bunga Tumbuh di Makam:* Bunga yang tumbuh subur di makam dipercaya sebagai tanda bahwa roh orang yang dimakamkan itu damai.',
					'🏰 *Mitos Kastil Berhantu:* Banyak kastil tua di Eropa dipercaya dihantui oleh roh para penghuni masa lalu.',
					'💤 *Mitos Mimpi Gigi Copot:* Mimpi gigi copot sering dianggap sebagai pertanda akan ada kematian di keluarga.',
					'🌜 *Mitos Menghitung Bintang:* Menghitung bintang di langit dipercaya bisa membuat seseorang tumbuh jerawat.',
					'🍀 *Mitos Daun Semanggi Berdaun Empat:* Menemukan daun semanggi berdaun empat dipercaya membawa keberuntungan.',
					'🔥 *Mitos Api Menyala Sendiri:* Api yang menyala tiba-tiba di malam hari sering dikaitkan dengan kehadiran roh halus.',
					'🎵 *Mitos Siulan di Malam Hari:* Bersiul di malam hari dipercaya dapat mengundang makhluk halus.',
					'🦎 *Mitos Cicak Jatuh di Kepala:* Jika cicak jatuh di kepala seseorang, dipercaya itu adalah pertanda buruk.',
					'🌺 *Mitos Bunga Sedap Malam:* Aroma bunga sedap malam sering dianggap sebagai tanda kehadiran makhluk halus.',
					'🪦 *Mitos Makam Baru:* Mengunjungi makam yang baru dibuat di malam hari dipercaya dapat membawa energi negatif.',
					'🧟 *Mitos Zombie di Haiti:* Dalam kepercayaan Voodoo Haiti, ada mitos tentang manusia yang dihidupkan kembali sebagai zombie oleh penyihir.',
					'🌟 *Mitos Cahaya Misterius di Malam Hari:* Cahaya aneh yang terlihat di malam hari sering dianggap sebagai roh yang sedang berkeliaran.',
					'🏞️ *Mitos Danau Berhantu:* Banyak danau di dunia yang dipercaya dihuni oleh roh penjaga atau makhluk mitos.',
					'🪶 *Mitos Bulu Putih:* Menemukan bulu putih dipercaya sebagai tanda bahwa malaikat sedang menjaga kita.',
					'🍃 *Mitos Angin Berhembus Kencang Tiba-Tiba:* Angin yang tiba-tiba berhembus kencang sering dianggap sebagai tanda kehadiran makhluk halus.',
					'🎭 *Mitos Topeng Berhantu:* Beberapa topeng tradisional dipercaya memiliki roh atau energi mistis yang kuat.',
					'🗿 *Mitos Patung Tua:* Patung tua sering dianggap memiliki roh atau kutukan di dalamnya.',
					'⚰️ *Mitos Peti Mati Bergerak:* Ada mitos di beberapa budaya bahwa peti mati bisa bergerak sendiri jika ada roh yang tidak tenang.',
					'🔔 *Mitos Lonceng Berbunyi Sendiri:* Jika lonceng berbunyi sendiri tanpa ada angin atau yang memukulnya, sering dianggap sebagai tanda roh yang ingin berkomunikasi.'
				];
				const randomMyth = myths[Math.floor(Math.random() * myths.length)];
				reply(`🪄 *Mitos Menarik*\n\n${randomMyth}`);
			}
break;
case 'faktaunik': {
				const facts = [
					'🧠 Otak manusia dapat menghasilkan listrik yang cukup untuk menyalakan lampu kecil!',
					'🐼 Panda bisa menghabiskan sekitar 12 jam sehari hanya untuk makan bambu.',
					'🌕 Di bulan, jejak kaki manusia bisa bertahan selama jutaan tahun karena tidak ada angin atau hujan.',
					'🦄 Jerapah tidur hanya sekitar 10-30 menit sehari dan sering tidur sambil berdiri!',
					'🎵 Musik dapat meningkatkan suasana hati dan membantu mengurangi stres.',
					'🐢 Penyu sudah ada sejak zaman dinosaurus, sekitar lebih dari 200 juta tahun yang lalu.',
					'🍫 Cokelat bisa memicu hormon endorfin yang membuat seseorang merasa bahagia.',
					'🚀 Di luar angkasa, air mata tidak bisa jatuh karena gravitasi yang rendah!',
					'🔮 Lebih dari 70% permukaan Bumi ditutupi oleh air.',
					'🐝 Lebah bisa mengenali wajah manusia layaknya manusia mengenali wajah satu sama lain.',
					'🐧 Penguin adalah satu-satunya burung yang bisa berenang tetapi tidak bisa terbang.',
					'🦷 Gigi adalah satu-satunya bagian tubuh manusia yang tidak bisa memperbaiki dirinya sendiri.',
					'🐌 Siput bisa tidur hingga 3 tahun lamanya!',
					'🔑 Sidik jari koala sangat mirip dengan sidik jari manusia.',
					'🌍 Bumi adalah satu-satunya planet yang tidak dinamai berdasarkan nama dewa atau dewi.',
					'🐟 Ikan mas memiliki ingatan yang lebih baik daripada yang orang pikirkan, mereka bisa mengingat sesuatu hingga beberapa bulan.',
					'🦇 Kelelawar adalah satu-satunya mamalia yang bisa terbang.',
					'🎤 Hati manusia berdetak sekitar 100.000 kali sehari.',
					'🌈 Tidak ada dua pelangi yang benar-benar sama, setiap orang melihat pelangi dengan sudut pandang berbeda.',
					'📱 Lebih banyak orang di dunia memiliki akses ke ponsel daripada toilet bersih.',
					'🌋 Di Islandia, ada lebih dari 100 gunung berapi aktif.',
					'💧 Air panas bisa membeku lebih cepat daripada air dingin dalam kondisi tertentu (Efek Mpemba).',
					'⚡ Petir lebih panas dari permukaan matahari.',
					'🦩 Flamingo mendapatkan warna pink dari makanan yang mereka makan, yaitu udang.',
					'🐇 Kelinci tidak bisa muntah.',
					'🧊 Antartika adalah gurun terbesar di dunia meskipun tertutup es.',
					'🐜 Semut tidak memiliki paru-paru, mereka bernapas melalui pori-pori kecil di tubuh mereka.',
					'🌟 Cahaya dari bintang yang kita lihat mungkin sudah tidak ada lagi karena bintang tersebut bisa saja sudah mati.',
					'🕷️ Laba-laba bisa menghasilkan sutra yang lebih kuat daripada baja dengan berat yang sama.',
					'🐨 Koala tidur hingga 20 jam sehari.',
					'🦁 Singa betina lebih sering berburu dibandingkan singa jantan.',
					'🐍 Ular bisa tidur dengan mata terbuka karena mereka tidak memiliki kelopak mata.',
					'🧠 Otak manusia terdiri dari sekitar 75% air.',
					'🐦 Burung kolibri adalah satu-satunya burung yang bisa terbang mundur.',
					'🎮 Bermain video game bisa meningkatkan koordinasi tangan dan mata.',
					'📖 Orang yang membaca buku secara rutin cenderung lebih empatik dan mudah memahami perasaan orang lain.',
					'🎭 Tertawa dapat meningkatkan sistem kekebalan tubuh.',
					'🌠 Rata-rata ada 44 petir yang menyambar permukaan bumi setiap detik.',
					'🦜 Burung beo bisa meniru suara manusia karena memiliki struktur otot vokal yang unik.',
					'🐴 Kuda bisa tidur sambil berdiri.',
					'🐶 Anjing bisa memahami lebih dari 150 kata manusia.',
					'🌬️ Angin terkuat yang pernah tercatat di Bumi memiliki kecepatan 372 km/jam.',
					'🍯 Madu adalah satu-satunya makanan yang tidak pernah basi.',
					'🦀 Kepiting bisa berjalan ke samping karena struktur tubuh dan kakinya.',
					'🌌 Ada lebih banyak bintang di alam semesta daripada butiran pasir di semua pantai di Bumi.',
					'🐉 Komodo adalah kadal terbesar di dunia.',
					'🏊‍♂️ Manusia bisa bertahan tanpa makanan selama berminggu-minggu, tetapi hanya beberapa hari tanpa air.',
					'🦎 Jika ekor cicak putus, ekornya akan tumbuh kembali.',
					'🚀 Sebagian besar debu di rumah berasal dari kulit mati manusia.'
				];
				const randomFact = facts[Math.floor(Math.random() * facts.length)];
				reply(`🧠 *Fakta Unik*\n\n${randomFact}`);
			}
break;
case 'faktakucing': {
				const fakta = [
					'🐾 Kucing bisa melompat hingga 6 kali panjang tubuhnya!',
					'🐾 Lidah kucing memiliki tekstur kasar untuk membersihkan bulu.',
					'🐾 Kucing menghabiskan sekitar 70% hidupnya untuk tidur.',
					'🐾 Telinga kucing bisa berputar hingga 180 derajat!',
					'🐾 Kucing punya lima jari di kaki depan, tetapi hanya empat jari di kaki belakang.',
					'🐾 Kucing bisa berlari hingga 48 km per jam! Cepet banget, ya! 😲',
					'🐾 Kucing bisa mendengar suara frekuensi tinggi yang tidak bisa didengar manusia.',
					'🐾 Kucing bisa berkomunikasi dengan manusia lewat suara dan gerakan tubuh.',
					'🐾 Kucing memiliki 32 otot di telinga mereka untuk mengatur posisi telinga.',
					'🐾 Kucing memiliki indera penciuman yang 14 kali lebih tajam daripada manusia!',
					'🐾 Kucing menggosokkan kepala mereka ke objek sebagai tanda perkenalan dan untuk menandai wilayahnya.',
					'🐾 Beberapa kucing bisa mengingat tempat-tempat tertentu meskipun sudah bertahun-tahun berlalu.',
					'🐾 Kucing bisa melihat dengan jelas dalam kondisi cahaya yang sangat rendah, hampir gelap total!',
					'🐾 Kucing domestik punya banyak jenis suara, antara lain meong, dengkuran, dan purring!',
					'🐾 Kucing suka menjilat tangan mereka setelah makan untuk membersihkan diri dan merasa lebih tenang.',
					'🐾 Kucing sering tidur dengan mata setengah terbuka, ini untuk tetap waspada dari ancaman.',
					'🐾 Kucing punya kemampuan luar biasa dalam merasakan getaran tanah, misalnya gempa bumi!',
					'🐾 Kucing memiliki 9 kehidupan yang legendaris (tapi hanya mitos, ya)!',
					'🐾 Kucing bisa merasakan perubahan cuaca, kadang mereka lebih sensitif daripada manusia.',
					'🐾 Kucing tidak bisa merasakan rasa manis, lho! Mereka hanya suka makanan berbasis protein.'
				];
				const randomFakta = fakta[Math.floor(Math.random() * fakta.length)];
				reply(randomFakta);
			}
break
case 'cekganteng': {
				const percentage = Math.floor(Math.random() * 100) + 1;
				const komentar = percentage > 80 ? '🔥 Wah, Kakak ini benar-benar bikin meleleh!' : 
					percentage > 50 ? '😎 Lumayan ganteng sih, Kak!' :
					'😅 Hmm... yang penting percaya diri ya, Kak!';
				reply(`👑 *Cek Ganteng*\n\nKegantengan Kakak ada di angka *${percentage}%*\n${komentar}`);
			}
break;
case 'cekcantik': {
				const percentage = Math.floor(Math.random() * 100) + 1;
				const komentar = percentage > 80 ? '🔥 Wah, Kakak ini benar-benar bikin meleleh!' : 
					percentage > 50 ? '😍 Lumayan cantik sih, Kak!' :
					'😅 Hmm... yang penting percaya diri ya, Kak!';
				reply(`👑 *Cek Cantik*\n\nKecantikan Kakak ada di angka *${percentage}%*\n${komentar}`);
}
break;
case 'cekimut': {
				const percentage = Math.floor(Math.random() * 100) + 1;
				const komentar = percentage > 80 ? '🔥 Wah, Kakak ini benar-benar bikin meleleh!' : 
					percentage > 50 ? '😋 Lumayan imut sih, Kak!' :
					'😅 Hmm... yang penting percaya diri ya, Kak!';
				reply(`👑 *Cek Imut*\n\nKeimutan Kakak ada di angka *${percentage}%*\n${komentar}`);
			}
break;
case 'cekjomok': {
				const percentage = Math.floor(Math.random() * 100) + 1;
				const komentar = percentage > 80 ? '🔥 Wah, Kakak ini benar-benar bikin meleleh!' : 
					percentage > 50 ? '🤣 Lumayan jomok sih, Kak!' :
					'😅 Hmm... yang penting percaya diri ya, Kak!';
				reply(`👑 *Cek Jomok*\n\nKejomokan Kakak ada di angka *${percentage}%*\n${komentar}`);
			}
break;
case 'cekwaifu': {
				if (!quoted) return reply(`Kirim/Reply Gambar Waifu Kamu Dengan Caption *${prefix + command}*`);
				if (!mime) return reply(`Kirim/Reply Gambar Waifu Kamu Dengan Caption *${prefix + command}*`);
				const percentage = Math.floor(Math.random() * 100) + 1;
				const komentar = percentage > 80 ? '😍 Waifu terbaik sepanjang masa!' : 
					percentage > 50 ? '😊 Lumayan jadi waifu idaman!' :
					'😬 Ehm, mungkin waifu-nya butuh upgrade dikit...';
				reply(`💖 *Cek Waifu*\n\nPersentase waifu Kakak adalah *${percentage}%*\n${komentar}`);
			}
break;
case 'cekhusbu': {
				if (!quoted) return reply(`Kirim/Reply Gambar Husbu Kamu Dengan Caption *${prefix + command}*`);
				if (!mime) return reply(`Kirim/Reply Gambar Husbu Kamu Dengan Caption *${prefix + command}*`);
				const percentage = Math.floor(Math.random() * 100) + 1;
				const komentar = percentage > 80 ? '😍 Husbu terbaik sepanjang masa!' : 
					percentage > 50 ? '😊 Lumayan jadi husbu idaman!' :
					'😬 Ehm, mungkin Husbu-nya butuh upgrade dikit...';
				reply(`💖 *Cek Husbu*\n\nPersentase husbu Kakak adalah *${percentage}%*\n${komentar}`);
			}
break;
case 'cekkepribadian': {
    const kepribadian = [
        '🧠 Cerdas dan bijaksana, selalu berpikir sebelum bertindak.',
        '❤️ Penuh kasih sayang, selalu peduli dengan orang lain.',
        '🔥 Bersemangat dan penuh energi, tidak mudah menyerah.',
        '🎭 Misterius dan sulit ditebak, suka menyimpan rahasia.',
        '😄 Ramah dan menyenangkan, mudah bergaul dengan siapa saja.',
        '😎 Cool dan tenang dalam segala situasi, tidak mudah panik.',
        '😅 Sering baperan, tapi baik hati dan mudah memaafkan.',
        '🤔 Suka berpikir mendalam dan analitis, selalu mempertimbangkan segala hal.',
        '🎨 Kreatif dan imajinatif, suka menciptakan sesuatu yang unik.',
        '💪 Pekerja keras dan tidak mudah menyerah, selalu berusaha yang terbaik.',
        '🌈 Selalu berpikir positif dan menyebarkan kebahagiaan.',
        '💤 Pemalas tapi jenius, sering mendapatkan ide cemerlang di waktu yang tidak terduga.',
        '🎤 Suka jadi pusat perhatian dan humoris, selalu bikin orang tertawa.',
        '👀 Observatif dan jeli dalam melihat detail, tidak mudah tertipu.',
        '🎯 Tegas dalam mengambil keputusan, tidak suka bertele-tele.',
        '💸 Boros tapi baik hati, suka berbagi dengan teman-teman.',
        '🧘‍♂️ Tenang dan selalu berpikir jernih, tidak mudah terprovokasi.',
        '👓 Perfeksionis dan suka hal yang teratur, tidak suka sesuatu yang berantakan.',
        '🌊 Santai dan mengikuti arus kehidupan, tidak suka terburu-buru.',
        '🚀 Ambisius dan selalu ingin maju, punya banyak impian besar.',
        '😜 Iseng dan suka bercanda, tidak bisa melihat orang serius terus-menerus.',
        '🤯 Penuh ide gila yang kreatif, sering memberikan solusi unik.',
        '🛠 Problem solver yang selalu punya solusi untuk setiap masalah.',
        '🕵️‍♂️ Penasaran dan suka mencari tahu banyak hal, selalu ingin belajar.',
        '📚 Suka belajar dan menambah wawasan, tidak pernah puas dengan ilmu yang ada.',
        '🦸‍♂️ Pahlawan bagi teman-teman yang membutuhkan, selalu siap membantu.',
        '🔮 Sering memiliki firasat yang tepat, seperti punya indra keenam.',
        '🏆 Kompetitif dan suka tantangan, tidak suka kalah dalam apapun.',
        '🎶 Hidupnya penuh dengan musik dan ritme, tidak bisa jauh dari lagu favorit.',
        '⏳ Sabar dan bisa mengendalikan emosi, tidak mudah terpancing.',
        '🤗 Suka membantu orang lain tanpa pamrih, selalu ingin melihat orang lain bahagia.',
        '🦉 Bijaksana dan penuh pengalaman hidup, sering memberikan nasihat yang berharga.',
        '🏕 Petualang sejati, suka mencoba hal-hal baru dan menantang.',
        '🍕 Suka makan dan gampang bahagia dengan makanan.',
        '🧩 Kompleks, tapi menarik untuk dipahami.',
        '🧛‍♂️ Nocturnal, lebih aktif di malam hari dan suka begadang.',
        '🏡 Homebody, lebih suka di rumah daripada keluar, merasa nyaman dengan ketenangan.',
        '🚗 Suka bepergian dan eksplorasi tempat baru, tidak bisa diam di satu tempat.',
        '🎮 Gamer sejati, tidak bisa jauh dari dunia permainan.',
        '💻 Tech-savvy, selalu update dengan teknologi terbaru.',
        '📸 Suka fotografi, selalu mencari momen yang pas untuk diabadikan.',
        '🎭 Mudah beradaptasi, bisa menjadi siapa saja di lingkungan mana pun.',
        '🐶 Pecinta hewan, tidak tahan melihat binatang terlantar.',
        '💬 Suka ngobrol dan berdiskusi, selalu punya topik menarik untuk dibahas.',
        '📝 Suka menulis, bisa menuangkan isi hati ke dalam kata-kata.',
        '⚡ Spontan dan tidak suka perencanaan yang terlalu kaku, suka kejutan!',
        '🍀 Beruntung, sering mendapatkan hal-hal baik tanpa disangka-sangka.',
        '☕ Suka kopi dan menikmati suasana tenang, lebih suka diskusi santai daripada keramaian.'
    ];
    
    const randomKepribadian = kepribadian[Math.floor(Math.random() * kepribadian.length)];
    reply(`🪄 *Cek Kepribadian*\n\nKakak memiliki kepribadian:\n${randomKepribadian}`);
}
break;
case 'cekmasadepan': {
    const masaDepan = [
        '💼 Akan jadi bos besar di perusahaan ternama!',
        '🏝️ Pensiun muda dan tinggal di pulau tropis.',
        '💖 Akan menemukan cinta sejati dalam waktu dekat.',
        '📚 Akan jadi orang yang sangat berilmu dan dihormati.',
        '💸 Kaya raya dengan bisnis sukses!',
        '🎭 Masa depan Kakak penuh misteri dan kejutan!',
        '😴 Hmm... masa depan Kakak masih kabur, coba lagi nanti.',
        '🚀 Akan menjadi ilmuwan terkenal yang menemukan teknologi masa depan!',
        '🎬 Masa depan Kakak seperti film action, penuh petualangan!',
        '🎤 Akan jadi penyanyi terkenal dengan banyak fans!',
        '⚽ Masa depan Kakak adalah menjadi atlet kelas dunia!',
        '🧑‍🍳 Akan sukses sebagai koki terkenal dan punya restoran sendiri.',
        '✈️ Bakal sering jalan-jalan ke luar negeri dan menikmati hidup!',
        '👩‍⚕️ Akan jadi dokter sukses yang menyelamatkan banyak nyawa!',
        '💡 Masa depan Kakak penuh inovasi, bakal menciptakan sesuatu yang besar!',
        '🏆 Akan memenangkan penghargaan bergengsi di bidang yang Kakak tekuni.',
        '🕵️‍♂️ Masa depan Kakak seperti detektif, banyak mengungkap misteri!',
        '👑 Akan jadi orang berpengaruh dan dihormati banyak orang.',
        '🚗 Punya koleksi mobil mewah impian di masa depan!',
        '🎮 Akan jadi gamer profesional dan memenangkan banyak turnamen!',
        '📖 Akan menulis buku bestseller yang menginspirasi banyak orang!',
        '🏡 Masa depan Kakak penuh ketenangan, punya rumah impian!',
        '🛍️ Bakal jadi fashion icon yang selalu tampil stylish!',
        '🔮 Ramalan masa depan Kakak sulit ditebak... tapi sepertinya menarik!',
        '🥷 Masa depan Kakak penuh aksi seperti ninja, hati-hati ya!',
        '🍕 Punya restoran makanan cepat saji yang selalu laris!',
        '🎨 Bakal jadi seniman terkenal dengan karya-karya hebat!',
        '🛠️ Akan menciptakan sesuatu yang mengubah dunia!',
        '🌍 Jadi traveler yang menjelajahi dunia dan bertemu banyak orang baru!',
        '🎓 Masa depan Kakak dipenuhi ilmu dan kebijaksanaan!',
        '🌌 Akan menemukan sesuatu yang luar biasa di luar angkasa!',
        '🎩 Hidup seperti orang kaya di film-film, penuh kemewahan!',
        '🔫 Masa depan Kakak seperti di film action, siap menghadapi tantangan!',
        '🥇 Bakal jadi juara dalam bidang yang Kakak tekuni!',
        '🛒 Punya bisnis sukses dan toko online terbesar!',
        '📱 Akan menciptakan aplikasi yang digunakan jutaan orang!',
        '💍 Bakal menikah dengan seseorang yang sangat mencintai Kakak!',
        '🎶 Hidup Kakak akan dipenuhi musik dan kebahagiaan!',
        '🏰 Akan punya rumah besar seperti istana!',
        '👨‍🏫 Masa depan Kakak jadi guru atau mentor yang dihormati banyak orang!',
        '🌱 Bakal sukses di bidang pertanian dan jadi petani modern!',
        '🤖 Masa depan Kakak berhubungan dengan robot dan kecerdasan buatan!',
        '🗿 Hidup Kakak akan penuh petualangan seperti Indiana Jones!',
        '💎 Akan menemukan harta karun berharga!',
        '📡 Bakal jadi pembawa berita terkenal di masa depan!',
        '🌟 Masa depan Kakak sangat cerah, siap-siap jadi terkenal!',
        '🔔 Akan memiliki pengaruh besar di media sosial!',
        '💃 Masa depan Kakak penuh warna seperti pertunjukan seni yang indah!'
    ];

    const randomMasaDepan = masaDepan[Math.floor(Math.random() * masaDepan.length)];
    reply(`🔮 *Cek Masa Depan*\n\nRamalan masa depan Kakak:\n${randomMasaDepan}`);
}
break
case 'suit': {
    if (!text) {
        return sendButtons(kyami, m.chat, {
            title: "🎮 GAME SUIT",
            text: "Silahkan pilih salah satu tangan di bawah ini untuk melawan Bot!",
            footer: '© Luxxy | Leo',
            buttons: [
                { id: `${prefix + command} batu`, text: '✊ Batu' },
                { id: `${prefix + command} gunting`, text: '✌️ Gunting' },
                { id: `${prefix + command} kertas`, text: '✋ Kertas' }
            ]
        }, { quoted: m });
    }

    const item = ["batu", "gunting", "kertas"];
    const userChoice = text.toLowerCase().trim();
    
    if (!item.includes(userChoice)) return reply("Pilihan tidak valid! Pilih: batu, gunting, atau kertas.");
    
    const botChoice = item[Math.floor(Math.random() * item.length)];
    let status = "";
    let emojiUser = userChoice === "batu" ? "✊" : userChoice === "gunting" ? "✌️" : "✋";
    let emojiBot = botChoice === "batu" ? "✊" : botChoice === "gunting" ? "✌️" : "✋";

    if (userChoice === botChoice) {
        status = "HASIL: *SERI (DRAW)* 🤝";
    } else if (
        (userChoice === "batu" && botChoice === "gunting") ||
        (userChoice === "gunting" && botChoice === "kertas") ||
        (userChoice === "kertas" && botChoice === "batu")
    ) {
        status = "HASIL: *KAMU MENANG!* 🎉";
    } else {
        status = "HASIL: *KAMU KALAH!* 💀";
    }

    const hasilTeks = `
🎮 *SUIT RESULTS*

👤 Kamu: ${emojiUser} (${userChoice})
🤖 Bot: ${emojiBot} (${botChoice})

${status}
`.trim();

    await sendButtons(kyami, m.chat, {
        title: "GAME OVER",
        text: hasilTeks,
        footer: '© Luxxy | Leo',
        buttons: [
            { id: `${prefix + command}`, text: '🔄 Main Lagi' }
        ]
    }, { quoted: m });
}
break
case 'tebakkata': {
    kyami.tebakkata = kyami.tebakkata ? kyami.tebakkata : {};
    let id = m.chat;
    if (id in kyami.tebakkata) return reply('Selesaikan soal sebelumnya dulu, King!');

    try {
        const res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json');
        const data = await res.json();
        const json = data[Math.floor(Math.random() * data.length)];

        let caption = `🎮 *TEBAK KATA*\n\n📝 Soal: *${json.soal}*\n⏱️ Waktu: 60 detik\n\nCara Jawab: Gunakan *#* di awal kata\nContoh: *#napas*\n\n💡 Klik tombol di bawah untuk bantuan!`.trim();

        kyami.tebakkata[id] = {
            jawaban: json.jawaban.toLowerCase().trim(),
            timeout: setTimeout(() => {
                if (kyami.tebakkata[id]) {
                    reply(`⏰ Waktu habis!\nJawaban yang benar adalah: *${kyami.tebakkata[id].jawaban.toUpperCase()}*`);
                    delete kyami.tebakkata[id];
                }
            }, 60000)
        };

        await sendButtons(kyami, m.chat, {
            title: "GAME TEBAK KATA",
            text: caption,
            footer: '© Luxxy | Leo',
            buttons: [
                { id: 'hint', text: '💡 Hint' },
                { id: 'nyerah', text: '🏳️ Menyerah' }
            ]
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        reply('Gagal mengambil soal.');
    }
}
break
case 'bebangrup':
case 'beban': {
    if (!m.isGroup) return reply(mess.group);

    const groupMetadata = await safeGroupMetadata(kyami, from);
    const participants = groupMetadata.participants;
    
    // Filter agar Bot tidak terpilih jadi beban
    const members = participants.map(u => u.id).filter(v => v !== kyami.user.id);
    
    // Pilih satu member secara acak
    const target = members[Math.floor(Math.random() * members.length)];
    const tag = `@${target.split('@')[0]}`;

    // Daftar kalimat random
    const captions = [
        `Cieee, selamat ya! Lu resmi jadi beban grup ini hari ini ${tag} 😂`,
        `Waduh, ${tag} terpantau hanya menyimak dan tidak berkontribusi. Fix beban! 💀`,
        `Gak nyangka, ternyata ${tag} adalah beban tersembunyi kita selama ini. 🗿`,
        `Pantesan grup sepi, bebannya lagi tidur ${tag} 💤`,
        `Tolong admin, orang ini ${tag} terlalu berat bebannya buat grup ini. ⚖️`
    ];

    // Pilih satu kalimat secara acak
    const randomCaption = captions[Math.floor(Math.random() * captions.length)];

    await kyami.sendMessage(m.chat, {
        text: randomCaption,
        contextInfo: {
            mentionedJid: [target]
        }
    }, { quoted: m });
}
break
case 'jodoh': {
    if (!m.isGroup) return reply(mess.group);

    const groupMetadata = await safeGroupMetadata(kyami, from);
    const participants = groupMetadata.participants;
    const members = participants.map(u => u.id).filter(v => v !== kyami.user.id);

    if (members.length < 2) return reply("Member grup terlalu dikit buat dijodohin, King.");

    let user1, user2;

    if (m.mentionedJid.length > 0) {
        // Jika user mention seseorang, jodohkan orang itu dengan orang acak
        user1 = m.mentionedJid[0];
        user2 = members[Math.floor(Math.random() * members.length)];
        while (user2 === user1) {
            user2 = members[Math.floor(Math.random() * members.length)];
        }
    } else {
        // Jika tidak ada mention, pilih dua orang acak di grup
        user1 = members[Math.floor(Math.random() * members.length)];
        user2 = members[Math.floor(Math.random() * members.length)];
        while (user2 === user1) {
            user2 = members[Math.floor(Math.random() * members.length)];
        }
    }

    const caption = `💞 *PERJODOHAN GRUP* 💞\n\n@${user1.split('@')[0]} jodoh kamu adalah @${user2.split('@')[0]}\n\nCiee... Kapan nih pajaknya cair? 🥳`;

    await kyami.sendMessage(m.chat, {
        text: caption,
        contextInfo: {
            mentionedJid: [user1, user2]
        }
    }, { quoted: m });
}
break
case "setthumb": {
    if (!isCreator) return reply(mess.owner);
    if (!/image/.test(mime)) return reply("Balas atau kirim gambar untuk dijadikan thumbnail.");

    try {
        await sendReact(m.key, 0); // ⏳

        let media = await kyami.downloadAndSaveMediaMessage(qmsg);
        const { ImageUploadService } = require('node-upload-images');
        const service = new ImageUploadService('pixhost.to');

        let { directLink } = await service.uploadFromBinary(fs.readFileSync(media), 'kyami.png');
        let teks = directLink.toString();
        const newteks = m.quoted ? m.quoted.text : teks;

        if (newteks) {
            global.thumbnail = newteks;
            return kyami.sendMessage(m.chat, { text: "_Berhasil Mengganti Thumbnail_" });
        } else {
            return reply(`*Format Salah!*\nContoh: *${prefix + command} <Apikey>*`);
        }

    } catch (err) {
        await sendReact(m.key, 1) // ❌
        console.error(err);
        return reply("Terjadi kesalahan saat mengganti thumbnail.");
    }
}
break
case 'listpanel': {
    let lspnl = `
*List Panel Run Bot By © Luxxy*

* Ram 1GB : Rp2.000

* Ram 2 GB : Rp3.000

* Ram 3 GB : Rp4.000

* Ram 4 GB : Rp5.000

* Ram 5 GB : Rp6.000

* Ram 6 GB : Rp7.000

* Ram 7 GB : Rp8.000

* Ram 8 GB : Rp9.000

* Ram 9 GB : Rp10.000

* Ram Unlimited : Rp12.000

*Syarat & Ketentuan :*
* _Server private & kualitas terbaik!_
* _Script bot dijamin aman (anti drama/maling)_
* _script di jamin aman panel sudah anti intip_
* _Garansi 10 hari (1x replace)_
* _Server anti delay/lemot!_
* _Claim garansi wajib bawa bukti transaksi_
𝗖𝗼𝗻𝘁𝗮𝗰𝘁 :
🪀𝙒𝙝𝙖𝙩𝙨𝙖𝙥𝙥 : https://wa.me/6285655636044
📡𝙎𝙖𝙡𝙪𝙧𝙖𝙣 𝙒𝙖 : https://whatsapp.com/channel/0029Vb1KZGfD38COhcA6MQ3u `
const qtext = {
    key: {
        remoteJid: "status@broadcast",
        participant: "0@s.whatsapp.net"
    },
    message: {
        extendedTextMessage: { text: ucapanWaktu }
    }
};

await kyami.sendMessage(m.key.remoteJid, {
    image: { url: thumbnail },
    caption: lspnl,
    footer: '© Luxxy | Leo',
    buttons: [
        {
            buttonId: '.owner',
            buttonText: { displayText: 'CLICK HERE TO CHAT OWNER' },
            type: 1
        }
    ],
    headerType: 1,
    viewOnce: true
}, { quoted: qtext });
}
break
case 'addlimit': {
    if (!isCreator) return reply(mess.owner);

    const jumlah = parseInt(args[0]);
    if (isNaN(jumlah) || jumlah < 1) return reply(`Masukkan jumlah limit yang benar!\n\nContoh: *${prefix + command} 10*`);

    let target;
    if (m.quoted) {
        target = m.quoted.sender;
    } else if (args[1]) {
        target = args[1].replace(/[^0-9]/g, '') + "@s.whatsapp.net";
    } else {
        return reply(`Reply pesan user atau masukkan nomor.\nContoh: *${prefix + command} 5 628xxxx*`);
    }

    initUserLimit(target, isPremium);
    limit[target].sisa = (limit[target].sisa === Infinity ? Infinity : limit[target].sisa + jumlah);
    fs.writeFileSync('./lib/database/limit.json', JSON.stringify(limit, null, 2));

    reply(`✅ Limit berhasil ditambah *${jumlah}* untuk @${target.split('@')[0]}`, { mentions: [target] });
}
break
case "listpremium":
case "listprem": {
    if (!isCreator) return reply(mess.owner);

    await sendReact(m.key, 0); // Reaksi proses ⏳

    if (premium.length < 1) {
        await reply("Tidak ada user premium");
        await sendReact(m.key, 1) // Reaksi error ❌
        return;
    }

    let teks = `\n *#- List all user premium*\n`;
    for (let i of premium) {
        teks += `\n* ${i.split("@")[0]}`;
    }
    teks += `\n*Total : ${premium.length}*`;

    await kyami.sendMessage(m.chat, { text: teks, mentions: premium }, { quoted: m });
}
break
case 'mode': {
    let mode = `𝘽𝙤𝙩 𝙉𝙮𝙖 𝙈𝙖𝙪 𝘿𝙞 𝙈𝙤𝙙𝙚 𝘼𝙥𝙖 𝙉𝙞𝙝 𝙆𝙞𝙣𝙜`;

    await sendButtons(kyami, m.chat, {
        title: '🤖 BOT SETTINGS',
        text: mode,
        footer: "© Luxxy | Leo",
        buttons: [
            { 
                id: '.self', 
                text: 'Mode cool🥶' 
            },
            { 
                id: '.public', 
                text: 'Mode gaul😎' 
            },
            {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                    display_text: '👤 Owner',
                    url: 'https://wa.me/6285655636044'
                })
            }
        ]
    }, { quoted: m });
}
break
case 'qris': {
    if (!isCreator) return reply(mess.owner);
    
    let qrisText = `💳 *PEMBAYARAN MELALUI QRIS* 💳

📌 *Scan QRIS berikut untuk melakukan pembayaran:*

❗ *Penting:* \`\`\`Wajib kirimkan bukti transfer demi keamanan bersama.\`\`\`
`;

    try {
        await sendButtons(kyami, m.chat, {
            text: qrisText,
            footer: "© Luxxy | Leo",
            image: qris, // Variabel berisi link/path QRIS
            buttons: [
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: "💬 Konfirmasi Transfer",
                        url: "https://wa.me/6285655636044"
                    })
                }
            ]
        }, { quoted: m });
    } catch (err) {
        console.error(err);
        reply('Gagal mengirim QRIS.');
    }
}
break
case 'dana': {
    if (!isCreator) return reply(mess.owner);
    
    let danaText = `💰 *INFORMASI PEMBAYARAN DANA* 💰

📌 *Nomor:* 085655636044

❗ *Penting:* \`\`\`Wajib kirimkan bukti transfer demi keamanan bersama.\`\`\`
`;

    try {
        await sendReact(m.key, 0); // ⏳

        await sendButtons(kyami, m.chat, {
            title: "Pembayaran DANA",
            text: danaText,
            footer: "© Luxxy | Leo",
            buttons: [
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "Hubungi Owner",
                        url: "https://wa.me/6285655636044"
                    })
                }
            ]
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
    }
}
break
case 'download': {
    if (!text) return reply(`Penggunaan .${command} <link>`);

    try {
        await sendReact(m.key, 0); // ⏳

        await sendInteractiveMessage(kyami, m.chat, {
            text: `Silakan pilih metode download yang tersedia di bawah ini.`,
            footer: '© Luxxy | Leo',
            interactiveButtons: [
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: '📁 LIST METODE DOWNLOAD',
                        sections: [
                            {
                                title: '⬇️ Daftar Metode Tersedia',
                                rows: [
                                    {
                                        header: '🎥 TIKTOK',
                                        title: 'VIDEO',
                                        description: 'Unduh video TikTok tanpa watermark',
                                        id: `.tt ${text}`
                                    },
                                    {
                                        header: '🖼️ TIKTOK',
                                        title: 'IMAGE',
                                        description: 'Unduh slide gambar dari TikTok',
                                        id: `.tt ${text}`
                                    },
                                    {
                                        header: '🎵 TIKTOK',
                                        title: 'AUDIO',
                                        description: 'Unduh lagu dari video TikTok (MP3)',
                                        id: `.ttmp3 ${text}`
                                    },
                                    {
                                        header: '📹 INSTAGRAM',
                                        title: 'VIDEO',
                                        description: 'Unduh video dari Instagram Reel/Post',
                                        id: `.igdl ${text}`
                                    },
                                    {
                                        header: '📸 INSTAGRAM',
                                        title: 'IMAGE',
                                        description: 'Unduh foto dari Instagram Post',
                                        id: `.igdl ${text}`
                                    },
                                    {
                                        header: '📦 MEDIAFIRE',
                                        title: 'FILE',
                                        description: 'Unduh file langsung dari Mediafire',
                                        id: `.mediafire ${text}`
                                    }
                                ]
                            }
                        ]
                    })
                }
            ]
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply('Gagal menampilkan menu download, silakan coba lagi.');
    }
}
break
case 'quotes': {
    try {
        await sendReact(m.key, 0); // ⏳

        await sendInteractiveMessage(kyami, m.chat, {
            text: `Silakan pilih *quotes* yang tersedia di bawah ini 📜`,
            footer: '© Luxxy | Leo',
            interactiveButtons: [
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: '💬 LIST QUOTES',
                        sections: [
                            {
                                title: '📚 Daftar Quotes Pilihan',
                                rows: [
                                    {
                                        header: '❤️',
                                        title: 'QUOTES BUCIN',
                                        description: 'Kata-kata cinta penuh rayuan dan baper',
                                        id: `.quotesbucin`
                                    },
                                    {
                                        header: '🔥',
                                        title: 'QUOTES MOTIVASI',
                                        description: 'Kutipan penyemangat hidup dan perjuangan',
                                        id: `.quotesmotivasi`
                                    },
                                    {
                                        header: '🤬',
                                        title: 'QUOTES BACOT',
                                        description: 'Quotes pedas, savage, dan bacotan war',
                                        id: `.quotesbacot`
                                    },
                                    {
                                        header: '😢',
                                        title: 'QUOTES GALAU',
                                        description: 'Kata-kata sedih dan penuh kegalauan',
                                        id: `.quotesgalau`
                                    },
                                    {
                                        header: '😎',
                                        title: 'QUOTES GOMBAL',
                                        description: 'Rayuan maut biar si dia klepek-klepek',
                                        id: `.quotesgombal`
                                    },
                                    {
                                        header: '💻',
                                        title: 'QUOTES HACKER WIBU',
                                        description: 'Quotes misterius dari Epep Hacker Tzy',
                                        id: `.quoteshacker`
                                    }
                                ]
                            }
                        ]
                    })
                }
            ]
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply('Terjadi kesalahan saat memproses daftar quotes.');
    }
}
break
case 'runtime': {
    try {
        const teks = `🖥️ *VPS SERVER STATUS*\n\n` +
                    
                    `📊 *UPTIME INFORMATION*\n` +
                    `├ 🤖 Bot aktif selama: *${runtime(process.uptime())}*\n` +
                    `└ System: *${runtime(os.uptime())}*\n\n` +
                    
                    `⚡ *PERFORMANCE*\n` +
                    `├ Speed: ${latensi.toFixed(4)}s\n` +
                    `└ Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB\n\n` +
                    
                    `💾 *MEMORY USAGE*\n` +
                    `├ Total: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(1)} GB\n` +
                    `├ Used: ${((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(1)} GB\n` +
                    `└ Free: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(1)} GB\n\n` +
                    
                    `🔧 *SYSTEM DETAILS*\n` +
                    `├ CPU: ${os.cpus().length} Core ${os.arch()}\n` +
                    `├ OS: ${os.platform()} ${os.release()}\n` +
                    `├ Host: ${os.hostname()}\n` +
                    `└ Node: ${process.version}`;
        
        reply(teks);
        
    } catch (err) {
        console.error(err);
        reply('❌ Gagal mengambil data server!');
    }
}
break
case 'ping': {
    try {
        let timestamp = speed();
        let latensi = speed() - timestamp;

        await kyami.sendMessage(m.chat, {
            text: `🏓 Pong!\n⚡ Kecepatan Respon: *${latensi.toFixed(4)} ms*`
        }, {
            quoted: m 
        });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply("Gagal cek ping");
    }
}
break
case 'os':
case 'server': {
    try {
        const cpu = osu.cpu
        const mem = osu.mem
        const drive = osu.drive
        const osUtil = osu.os

        const totalMem = os.totalmem()
        const freeMem = os.freemem()
        const usedMem = totalMem - freeMem

        const memInfo = await mem.info()
        const driveInfo = await drive.info()
        const cpuModel = os.cpus()[0].model
        const uptimeOS = os.uptime()
        
        const textos = `╭─[⚙️ SYSTEM INFO]
│ 🖥️ OS       : ${osUtil.platform()} ${os.release()}
│ 🧠 RAM      : ${progressBar(usedMem, totalMem)} ${formatGB(usedMem)} / ${formatGB(totalMem)} GB
│ 💽 Storage  : ${progressBar(driveInfo.usedGb, driveInfo.totalGb)} ${driveInfo.usedGb} / ${driveInfo.totalGb} GB
│ 🔧 CPU      : ${await cpu.count()} Cores (${cpuModel})
│ ⏱️ Uptime   : ${runtime(os.uptime())}
│ 📆 Runtime  : ${runtime(process.uptime())}
╰────────────────────────`;

        await reply(textos)

    } catch (err) {
        console.log(err)
        await reply('Terjadi kesalahan saat mengambil info OS')
    }
}
break
case 'delete':
case 'd':
case 'del': {
    if (!isCreator) return reply(mess.owner);

    if (!m.quoted) {
        return reply('⚠️ Kak, kamu perlu *reply* ke pesan yang mau dihapus ya! 🤔');
    }

    try {
        await kyami.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                id: m.quoted.id,
                participant: m.quoted.sender
            }
        });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Gagal menghapus pesan. Mungkin pesan terlalu lama atau bot bukan admin.');
    }
}
break
case 'buylimit': {
    if (!text) {
        return kyami.sendMessage(m.chat, {
            text: `Masukkan jumlah limit yang ingin dibeli!\nContoh: *.${command} 5*`
        }, { quoted: m });
    }

    const jumlah = parseInt(text)
    const hargaPerLimit = 500
    const totalHarga = jumlah * hargaPerLimit

    if (isNaN(jumlah) || jumlah < 1) {
        return kyami.sendMessage(m.chat, {
            text: 'Jumlah limit tidak valid!'
        }, { quoted: m });
    }

    try {
        await sendReact(m.key, 0); // ⏳

        const list = `
┏━⭓ *PEMBELIAN LIMIT*
┃◦ Jumlah: *${jumlah}* limit
┃◦ Harga per Limit: *Rp${hargaPerLimit}*
┃◦ Total Harga: *Rp${totalHarga.toLocaleString('id-ID')}*
┃◦ Metode: *QRIS*
┗━━━━━━━━━━━━➤

Silakan bayar dan kirim bukti ke owner.
Klik tombol di bawah ini.
`.trim()

        if (!global.pendingBuyLimit) global.pendingBuyLimit = {}
        global.pendingBuyLimit[m.sender] = jumlah

        await sendButtons(kyami, m.chat, {
            title: "💳 Pembelian Limit",
            text: list,
            footer: "© Luxxy | Leo",
            buttons: [
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "💬 Hubungi Owner",
                        url: "https://wa.me/6285655636044"
                    })
                }
            ]
        }, { quoted: m });

    } catch (err) {
        await sendReact(m.key, 1); // ❌
        console.log(err)
        return reply("Terjadi kesalahan saat memproses pembelian.")
    }
}

break
case 'backup': {
  try {
    if (!isCreator) return reply(mess.owner)

    await sendReact(m.key, 0); // ⏳
    await reply("Harap tunggu sebentar, sedang melakukan backup!")

    const { execSync } = require("child_process")
    const fs = require("fs")

    const ls = execSync("ls").toString().split("\n").filter(file => ![
      "node_modules", "temp", "npm", ".yarn", ".npm", ".cache",
      ".sampah", "yarn.lock", "undefined.jpg"
    ].includes(file))

    if (ls.length === 0) {
      return reply("Tidak ada file atau folder untuk di-backup.")
    }

    const escapedFiles = ls.map(file => `"${file}"`).join(" ")
    execSync(`zip -r Myscript.zip ${escapedFiles}`)

    await kyami.sendMessage(m.chat, {
      document: fs.readFileSync("./Myscript.zip"),
      mimetype: "application/zip",
      fileName: "Myscript.zip"
    }, { quoted: m });

    fs.unlinkSync("./Myscript.zip")
    await reply("✅ Backup selesai dan file telah dikirim.")
  } catch (err) {
    console.error(err)
    await sendReact(m.key, 1) // ❌
    await reply("⚠️ Terjadi kesalahan saat melakukan backup.")
  }
}
break
case 'downloadfile': {
    if (!isCreator) return reply(mess.owner)
    if (!text) return reply('Harap masukkan nama file yang ingin diunduh!')

    const fs = require('fs')
    const path = require('path')
    const filePath = `./${text}`
    const fileName = path.basename(filePath)

    try {
        await sendReact(m.key, 0); // ⏳
        await reply('Proses mengunduh file...')

        if (fs.existsSync(filePath)) {
            await kyami.sendMessage(m.chat, { 
                document: { url: filePath }, 
                mimetype: 'application/octet-stream', 
                fileName: fileName
            }, { quoted: m });

        } else {
            return reply('File tidak ditemukan di dalam direktori bot.')
        }
    } catch (err) {
        console.error(err)
        await sendReact(m.key, 1) // ❌
        return reply('Terjadi kesalahan saat mencoba mengakses file.')
    }
}
break
case 's':
case 'stiker':
case 'sticker': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    const q = quoted || m
    const mime = (q.msg || q).mimetype || ''

    if (!q || !/image|video/.test(mime))
        return reply(`Reply gambar/video dengan caption *${prefix + command}*`)

    try {
        const mediaPath = await kyami.downloadAndSaveMediaMessage(q)
        if (!mediaPath) throw new Error('Failed to download media')

        if (/image/.test(mime)) {
            await sendReact(m.key, 0); // ⏳
            await kyami.sendImageAsSticker(m.chat, mediaPath, m, {
                packname: global.packname,
                author: global.author
            })
        } else {
            if ((q.msg || q).seconds > 9)
                return reply('Video terlalu panjang (maks 9 detik)')

            await sendReact(m.key, 0); // ⏳

            await kyami.sendVideoAsSticker(m.chat, mediaPath, m, {
                packname: global.packname,
                author: global.author
            })
        }

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err)
        await sendReact(m.key, 1) // ❌
        reply('Gagal membuat stiker')
    }
}
break
case 'setnamegc':
case 'setgroupname':
case 'setsubject': {
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply(mess.botAdmin);
    if (!isAdmins) return reply(mess.onlyAdmin);
    if (!text) return reply('Masukkan nama grup yang baru!')

    try {
        await sendReact(m.key, 0); // ⏳
        await kyami.groupUpdateSubject(m.chat, text)
        await reply('Nama grup berhasil diperbarui!')
    } catch (err) {
        console.error(err)
        await sendReact(m.key, 1) // ❌
        await reply('Gagal mengubah nama grup.')
    }
}
break
case 'setdesc':
case 'setdesk': {
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply(mess.botAdmin);
    if (!isAdmins) return reply(mess.onlyAdmin);
    if (!text) return reply('Masukkan deskripsi grup yang baru!')

    try {
        await sendReact(m.key, 0); // ⏳
        await kyami.groupUpdateDescription(m.chat, text)
        await reply('Deskripsi grup berhasil diperbarui!')
    } catch (err) {
        console.error(err)
        await sendReact(m.key, 1) // ❌
        await reply('Gagal mengubah deskripsi grup.')
    }
}
break
case 'getpp': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }
    
    if (!text && m.mentionedJid.length === 0) 
        return reply(`Nomor atau tag pengguna dibutuhkan.\nContoh:\n• *${prefix + command} @user*\n• *${prefix + command} 6281234567890*`);

    try {
        await sendReact(m.key, 0); // ⏳

        let target;
        if (m.mentionedJid.length > 0) {
            target = m.mentionedJid[0];
        } else if (text) {
            let formattedNumber = text.replace(/[^0-9]/g, '');
            target = formattedNumber + '@s.whatsapp.net';
        } else {
            target = m.sender;
        }

        const [res] = await kyami.onWhatsApp(target);
        if (!res?.exists) {
            await sendReact(m.key, 1) // ❌
            return reply(`⚠️ Nomor *${text || target}* tidak ditemukan di WhatsApp!`);
        }

        let ppUrl;
        try {
            ppUrl = await kyami.profilePictureUrl(target, 'image');
        } catch {
            await sendReact(m.key, 1) // ❌
            return reply(`⚠️ Nomor *${text || target}* tidak memiliki foto profil.`);
        }

        await kyami.sendMessage(m.chat, {
            image: { url: ppUrl },
            caption: `📸 Foto profil @${target.split('@')[0]}`,
            mentions: [target]
        });


        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('⚠️ Terjadi kesalahan saat mengambil foto profil.');
    }
}
break
case 'on': {
    if (!isCreator) return reply(mess.owner)

    try {
        if (kyami.public && kyami.publicTimeout) {
            let remainingTime = kyami.publicTimeout - Date.now();
            if (remainingTime > 0) {
                let seconds = Math.floor((remainingTime / 1000) % 60);
                let minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
                let hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
                let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

                let timeString = [];
                if (days) timeString.push(`${days} hari`);
                if (hours) timeString.push(`${hours} jam`);
                if (minutes) timeString.push(`${minutes} menit`);
                if (seconds) timeString.push(`${seconds} detik`);

                return reply(`ᴍᴏᴅᴇ public sudah aktif. Bot akan kembali ke mode self dalam ${timeString.join(' ')}.`);
            }
        }

        if (!args[0]) return reply('Masukkan durasi dan satuan waktu.\n\nContoh:\n*.on 10detik*\n*.on 5menit*\n*.on 1jam*\n*.on 2hari*');

        let timeInput = args[0].match(/(\d+)(detik|menit|jam|hari)/i);
        if (!timeInput) return reply('Format salah. Gunakan: detik, menit, jam, atau hari.\n\nContoh:\n*.on 10detik*\n*.on 5menit*\n*.on 1jam*\n*.on 2hari*');

        let timeValue = parseInt(timeInput[1]);
        let unit = timeInput[2].toLowerCase();
        let duration = { detik: 1000, menit: 60000, jam: 3600000, hari: 86400000 }[unit] * timeValue;

        kyami.public = true;
        kyami.publicTimeout = Date.now() + duration;
        reply(`ᴍᴏᴅᴇ public diaktifkan selama ${timeValue} ${unit}. Bot akan otomatis kembali ke mode self setelah waktu habis.`);

        setTimeout(() => {
            kyami.public = false;
            kyami.publicTimeout = null;
            kyami.sendMessage(global.owner + '@s.whatsapp.net', {
                text: `Waktu ${timeValue} ${unit} habis. Bot otomatis masuk ke mode self.`
            });
        }, duration);

    } catch (err) {
        console.error(err)
        await sendReact(m.key, 1) // ❌
        reply('Terjadi kesalahan saat mengaktifkan mode public.')
    }
}
break
case 'deleteppgroup':
case 'delppgc':
case 'deleteppgc':
case 'delppgroup': {
    if (!m.isGroup) return reply(mess.group);
    if (!isAdmins) return reply(mess.onlyAdmin);
    if (!isBotAdmins) return reply(mess.botAdmin);

    await sendReact(m.key, 0); // ⏳

    try {
        await kyami.removeProfilePicture(from);
        reply('Foto profil grup berhasil dihapus.');
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Gagal menghapus foto profil grup.');
    }
}
    break
    case 'everyone': { 
if (!m.isGroup) return reply(mess.group)
if (!isAdmins) return reply(mess.onlyAdmin)
let mem = m.isGroup ? await groupMetadata.participants.map(a => a.id) : ""
kyami.sendMessage(m.chat, {
text: `@${m.chat}\n${text}`,
contextInfo: {
mentionedJid: mem, 
groupMentions: [
   {
groupSubject: `everyone`,
groupJid: m.chat,
    },
   ],
  },
});
}
break
case "jpm": {
    if (!isCreator) return reply(mess.owner);
    if (!q || !/image/.test(mime)) return reply(`Kirim foto dengan caption\n\n*${prefix + command} teks caption*`);

    await sendReact(m.key, 0); // ⏳

    try {
        const allGroups = await kyami.groupFetchAllParticipating();
        const groupJids = Object.keys(allGroups);
        const mediaPath = await kyami.downloadAndSaveMediaMessage(qmsg);
        let sukses = 0;

        await reply(`Memproses kirim teks + foto ke *${groupJids.length}* grup`);

        for (const jid of groupJids) {
            try {
                await kyami.sendMessage(jid, {
                    image: fs.readFileSync(mediaPath),
                    caption: q
                });
                sukses++;
                await sleep(1500); // delay antar kirim
            } catch (e) {
                console.log(`Gagal kirim ke ${jid}`);
            }
        }

        fs.unlinkSync(mediaPath);
        await kyami.sendMessage(m.chat, {
            text: `✅ *JPM selesai!*\nTotal grup berhasil dikirimi: *${sukses}*`,
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Terjadi kesalahan saat kirim JPM');
    }
}
break      
case 'promote': {
    if (!m.isGroup) return reply(mess.group);
    if (!isAdmins) return reply(mess.onlyAdmin);
    if (!isBotAdmins) return reply(mess.botAdmin);

    let users = m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.quoted
        ? m.quoted.sender
        : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    await sendReact(m.key, 0); // ⏳

    try {
        await kyami.groupParticipantsUpdate(m.chat, [users], 'promote');
        reply('Sukses promote');
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Gagal promote');
    }
}
break
case 'demote': {
    if (!m.isGroup) return reply(mess.group);
    if (!isAdmins) return reply(mess.onlyAdmin);
    if (!isBotAdmins) return reply(mess.botAdmin);

    let users = m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.quoted
        ? m.quoted.sender
        : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    await sendReact(m.key, 0); // ⏳

    try {
        await kyami.groupParticipantsUpdate(m.chat, [users], 'demote');
        reply('Sukses demote');
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Gagal demote');
    }
}
break
case 'kick': {
    if (!m.isGroup) return reply(mess.group)
    if (!isBotAdmins) return reply(mess.botAdmin)
    if (!isAdmins) return reply(mess.onlyAdmin)
    if (!text && !m.quoted && m.mentionedJid.length === 0)
        return reply(`Contoh: *${prefix + command} @user / +62xxx*`)

    let number = text ? text.replace(/[^0-9]/g, '') : ''
    let userJid

    if (m.mentionedJid.length) {
        userJid = m.mentionedJid[0]
    } else if (m.quoted) {
        userJid = m.quoted.sender
    } else if (number) {
        if (number.length < 10 || number.length > 15)
            return reply("Nomor tidak valid atau tidak ditemukan!")
        userJid = number + '@s.whatsapp.net'
    } else {
        return reply("Masukkan tag, balas pesan, atau ketik nomor!")
    }

    await sendReact(m.key, 0); // ⏳

    try {
        await kyami.groupParticipantsUpdate(m.chat, [userJid], 'remove')
        reply(`✅ Berhasil mengeluarkan: wa.me/${userJid.split('@')[0]}`)
    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1) // ❌
        reply('Gagal mengeluarkan. User mungkin sudah keluar atau bukan anggota grup.')
    }
}
break
case 'add': {
    if (!isCreator) return reply(mess.owner);
    if (!text) return reply(`Contoh: *${prefix + command} +62 812 3456 7890*`)

    let number = text.replace(/[^0-9]/g, '')

    if (!number || number.length < 10 || number.length > 15)
        return reply("Nomor tidak valid atau tidak ditemukan!")

    const userJid = number + '@s.whatsapp.net'
    await sendReact(m.key, 0); // ⏳

    try {
        await kyami.groupParticipantsUpdate(m.chat, [userJid], 'add')
        reply(`✅ Berhasil menambahkan: wa.me/${number}`)
    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1) // ❌
        reply('Gagal menambahkan. Nomor mungkin tidak aktif, tidak bisa diundang, atau belum menyimpan invite.')
    }
}
break
case 'upswgc': {
        if (!m.isGroup) return reply(mess.group);
        if (!isBotAdmins) return reply(mess.botAdmin);
        if (!isAdmins) return reply(mess.onlyAdmin);

    const q = m.quoted || m
    const mime = (q.msg || q).mimetype || ''
    const textToParse = m.text || m.body || ''
    const caption = textToParse.replace(new RegExp(`^\\${prefix}${command}\\s*`, 'i'), '').trim()

    try {
        if (!mime && !caption)
            return reply(`Balas media atau kirim teks.\nContoh: *${prefix + command}* (reply image/video/audio) Hai ini saya`)

        await sendReact(m.key, 0) // ⏳

        const baileys = require('@whiskeysockets/baileys')
        const crypto = require('crypto')

        let msgContent

        if (/image/.test(mime)) {
            const buffer = await q.download()
            msgContent = await baileys.generateWAMessageContent(
                { image: buffer, caption },
                { upload: kyami.waUploadToServer }
            )
        } else if (/video/.test(mime)) {
            const buffer = await q.download()
            msgContent = await baileys.generateWAMessageContent(
                { video: buffer, caption },
                { upload: kyami.waUploadToServer }
            )
        } else if (/audio/.test(mime)) {
            const buffer = await q.download()
            msgContent = await baileys.generateWAMessageContent(
                { audio: buffer, mimetype: 'audio/mp4' },
                { upload: kyami.waUploadToServer }
            )
        } else if (caption) {
            msgContent = {
                conversation: caption,
                backgroundColor: '#000000'
            }
        } else {
            return reply(`Balas media atau kirim teks.\nContoh: *${prefix + command}* (reply image/video/audio) Hai ini saya`)
        }

        const messageSecret = crypto.randomBytes(32)
        const groupStatusMessage = {
            messageContextInfo: { messageSecret },
            groupStatusMessageV2: {
                message: {
                    ...msgContent,
                    messageContextInfo: { messageSecret }
                }
            }
        }

        await kyami.relayMessage(m.chat, groupStatusMessage, {})
        reply('Berhasil upload ke status grup.')
    } catch (err) {
        console.error(err)
        await sendReact(m.key, 1) // ❌
        reply('Gagal upload ke status grup.')
    }
}
break
case 'tagsw': {
    if (!isCreator) return reply(mess.owner);
    if (!text) return reply('Masukkan teks untuk status atau reply gambar/video dengan caption');

    await sendReact(m.key, 0); // ⏳

    try {
        let media = null;
        let options = {};
        const jids = [m.sender, m.chat];

        if (m.quoted) {
            const mime = m.quoted.mtype || m.quoted.mediaType || '';
            if (mime.includes('image')) {
                media = await m.quoted.download();
                options = { image: media, caption: text || m.quoted.text || '' };
            } else if (mime.includes('video')) {
                media = await m.quoted.download();
                options = { video: media, caption: text || m.quoted.text || '' };
            } else {
                options = { text: text || m.quoted.text || '' };
            }
        } else {
            options = { text: text };
        }

        await kyami.sendMessage("status@broadcast", options, {
            backgroundColor: "#7ACAA7",
            textArgb: 0xffffffff,
            font: 1,
            statusJidList: (await safeGroupMetadata(kyami, m.chat)).participants.map(a => a.id),
            additionalNodes: [{
                tag: "meta",
                attrs: {},
                content: [{
                    tag: "mentioned_users",
                    attrs: {},
                    content: jids.map(jid => ({
                        tag: "to",
                        attrs: { jid: m.chat },
                        content: undefined,
                    })),
                }],
            }],
        }, { quoted: m });

        reply('Done up tag sw, silahkan cek sw sekarang');
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Gagal up tag sw');
    }
}
break
case 'tiktokmp3':
case 'ttmp3': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1); // ❌
        return reply(mess.limit);
    }

    if (!text) return reply(`Masukkan URL TikTok.\n\nContoh: *${prefix + command} https://vt.tiktok.com/xxx*`);
    if (!text.startsWith('http')) return reply("URL tidak valid.");

    await sendReact(m.key, 0); // ⏳

    try {
        const apiUrl = `https://api.privatezia.biz.id/api/downloader/tiktok2?url=${encodeURIComponent(text)}`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json.status || !json.data || !json.data.downloads) {
            await sendReact(m.key, 1); // ❌
            return reply("Gagal mengambil audio dari TikTok.");
        }

        const data = json.data;
        const audioUrl = data.downloads.find(d => d.label.includes("MP3"))?.url || data.downloads[0].url;

        await kyami.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            fileName: `${data.title}.mp3`,
            contextInfo: {
                externalAdReply: {
                    title: data.title || "TikTok Audio",
                    body: data.author?.username || "TikTok Music",
                    thumbnailUrl: data.cover || "https://telegra.ph/file/7e13f1b8b1b3a3f3b3b2d.jpg",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan saat memproses audio TikTok.");
    }
}
break
case 'mediafire': {
    initUserLimit(m.sender, isPremium)
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1)
        return reply(mess.limit)
    }

    if (!text) return reply(`URL\n\nContoh: *${prefix + command} https://www.mediafire.com/file/xxxxx*`);
    if (!text.includes('mediafire.com')) return reply("Link Mediafire tidak valid")

    await sendReact(m.key, 0); // ⏳

    try {
        const res = await mediafire(text)
        if (!res?.link) {
            await sendReact(m.key, 1)
            return reply("Gagal mendapatkan file")
        }

        await kyami.sendMessage(m.chat, {
            document: { url: res.link },
            fileName: res.judul || `file_${Date.now()}`,
            mimetype: res.mime ? `application/${res.mime.toLowerCase()}` : 'application/octet-stream'
        }, { quoted: m });

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err)
        await sendReact(m.key, 1) // ❌
        reply("Gagal mengunduh file")
    }
}
break
case 'igdl': 
case 'instagram': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1); // ❌
        return reply(mess.limit);
    }

    if (!text) return reply(`Contoh: *${prefix + command} https://www.instagram.com/reel/abc123/*`);
    if (!/^https:\/\/(www\.)?instagram\.com\//.test(text))
        return reply("Link Instagram tidak valid.");

    await sendReact(m.key, 0); // ⏳

    try {
        const apiUrl = `https://api.privatezia.biz.id/api/downloader/igdl?url=${encodeURIComponent(text)}`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json.status || !json.result) {
            await sendReact(m.key, 1); // ❌
            return reply("Gagal mengambil media dari Instagram.");
        }

        const { user, caption: igCaption, download } = json.result;
        const caption = `📥 *Instagram Downloader*\n\n👤 User: @${user || "-"}\n📝 Caption: ${igCaption || "-"}`;

        // Cek apakah hasil download berupa video atau gambar berdasarkan URL
        const isVideo = download.includes('.mp4') || download.includes('video');

        if (isVideo) {
            await kyami.sendMessage(m.chat, {
                video: { url: download },
                caption: caption,
            }, { quoted: m });
        } else {
            await kyami.sendMessage(m.chat, {
                image: { url: download },
                caption: caption,
            }, { quoted: m });
        }

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan saat mengambil data.");
    }
}
break
case 'pin':
case 'pinterest': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    if (!text) return reply(`Pencarian gambar\n\nContoh: *${prefix + command} naga hitam*`)

    await sendReact(m.key, 0); // ⏳

    try {
        const apiUrl = `https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(text)}&type=image`
        const res = await fetch(apiUrl)
        const json = await res.json()

        const data = json.data || []
        if (!Array.isArray(data) || data.length === 0) {
            await sendReact(m.key, 1) // ❌
            return reply("Tidak ditemukan hasil dari Pinterest")
        }

        const item = data[Math.floor(Math.random() * data.length)]

        await kyami.sendMessage(m.chat, {
            image: { url: item.image_url },
            caption: `Hasil pin: *${text}*`
        }, { quoted: m });

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err)
        await sendReact(m.key, 1) // ❌
        reply("Terjadi kesalahan saat memproses pencarian Pinterest")
    }
}
break
case 'pindl': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }
    
    if (!text) return reply(`Contoh: ${prefix}pindl https://pin.it/7jWBaQGhd`);
    if (!text.includes('pin.it') && !text.includes('pinterest.com')) {
        return reply(`Link harus dari Pinterest`);
    }

    await sendReact(m.key, 0); // ⏳

    try {
        const res = await fetch(`https://api.siputzx.my.id/api/d/pinterest?url=${encodeURIComponent(text)}`);
        const json = await res.json();

        if (!json.status || !json.data || !json.data.media_urls || json.data.media_urls.length === 0) {
            await sendReact(m.key, 1) // ❌
            return reply('Tidak ditemukan media pada link Pinterest tersebut.');
        }

        const original = json.data.media_urls.find(v => v.quality === 'original') || json.data.media_urls[0];
        const mediaUrl = original.url;

        const buffer = await (await fetch(mediaUrl)).arrayBuffer();

        await kyami.sendMessage(m.chat, {
            image: Buffer.from(buffer),
            caption: `✅ Pinterest Download Berhasil\nKualitas: ${original.quality}\nUkuran: ${original.size}`
        }, { quoted: m });

        
        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1)
        reply('Terjadi kesalahan saat mengambil data Pinterest.');
    }
}
break
case 'tt': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    if (!text) return reply(`URL video TikTok\n\nContoh: *${prefix + command} https://vm.tiktok.com/xx*`);
    if (!text.startsWith("https://")) return reply("Link harus diawali dengan https://");

    await sendReact(m.key, 0); // ⏳

    try {
        const result = await tiktokDl(text)

        if (!result.status) {
            await sendReact(m.key, 1) // ❌
            return reply("Gagal mengambil data TikTok")
        }

        if ((result.durations === 0 || result.duration === "0 Seconds") && Array.isArray(result.data)) {
            const cards = []
            let no = 0

            for (const slide of result.data) {
                const media = await prepareWAMessageMedia({
                    image: { url: slide.url }
                }, { upload: kyami.waUploadToServer })

                cards.push({
                    header: proto.Message.InteractiveMessage.Header.fromObject({
                        title: `Slide ke ${++no}`,
                        hasMediaAttachment: true,
                        ...media
                    }),
                    nativeFlowMessage: {
                        buttons: [{
                            name: "cta_url",
                            buttonParamsJson: JSON.stringify({
                                display_text: "Lihat Gambar",
                                url: slide.url
                            })
                        }]
                    }
                })
            }

            const msg = await generateWAMessageFromContent(m.chat, {
                viewOnceMessageV2Extension: {
                    message: {
                        interactiveMessage: {
                            body: { text: "TikTok Downloader - Slide" },
                            carouselMessage: { cards }
                        }
                    }
                }
            },{ quoted: m })

            await kyami.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

        } else {
            const vid = result.data.find(v => v.type === "nowatermark_hd" || v.type === "nowatermark")
            if (!vid?.url) throw new Error("Tidak menemukan URL video")

            await kyami.sendMessage(m.chat, {
                video: { url: vid.url },
                mimetype: 'video/mp4',
                caption: "TikTok Downloader"
            }, { quoted: m });
        }

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err)
        await sendReact(m.key, 1) // ❌
        reply("Gagal memproses video TikTok")
    }
}
break
case 'q':
case 'quoted': {
    if (!m.quoted) return reply("Tidak ada pesan yang dibalas!")

    await sendReact(m.key, 0); // ⏳

    try {
        const kyaquotx = await kyami.serializeM(await m.getQuotedObj())
        if (!kyaquotx.quoted) {
            await sendReact(m.key, 1) // ❌
            return reply("Pesan yang Anda balas tidak dikirim oleh bot")
        }

        await kyaquotx.quoted.copyNForward(m.chat, true)

    } catch (err) {
        console.error(err)
        await sendReact(m.key, 1) // ❌
        reply("Gagal mem-forward pesan terkutip")
    }
}
break
case 'owner': {
    const name = m.pushName || await kyami.getName(m.sender);
    const senderNumber = m.sender.split('@')[0];
    const mention = [m.sender];

    const panduan = `✨ *Hai @${senderNumber}!*  
Sebelum chat owner, yuk baca dulu aturan singkatnya biar enak ngobrol 😄  

🚫 Jangan spam chat, ya~  
📵 Hindari telepon biar nggak langsung diblok 😅  

*👤 Nih kontak ownernya ya 👇*`;

    await kyami.sendMessage(m.chat, { 
        text: panduan,
        mentions: mention
    }, { quoted: m });

    const vcard = 'BEGIN:VCARD\n' +
        'VERSION:3.0\n' +
        'FN:© 𝗟𝘂𝘅𝘅𝘺\n' +
        'ORG:Leo Bot Development;\n' +
        'TEL;type=CELL;type=VOICE;waid=6285655636044:+62 856-5563-6044\n' +
        'NOTE:Contact for collaboration or bug reports\n' +
        'URL:https://github.com/LuxxyCOMBACK\n' +
        'END:VCARD';

    await kyami.sendMessage(m.chat, {
        contacts: {
            displayName: '© 𝗟𝘂𝘅𝘅𝘺',
            contacts: [{ vcard }]
        },
        mentions: mention
    }, { quoted: m });
}
break;
case "rvo": {
    if (!m.quoted) return reply(
        `Syntax Error!\nBalas pesan view once dengan caption:\n*${prefix + command}*`);

    await sendReact(m.key, 0); // ⏳

    try {
        let buffer = await m.quoted.download();
        let type = m.quoted.mtype;
        let caption = m.quoted.text || "";
        let sendOptions = { quoted: m };

        if (type === "videoMessage") {
            await kyami.sendMessage(m.chat, { video: buffer, caption }, sendOptions);
        } else if (type === "imageMessage") {
            await kyami.sendMessage(m.chat, { image: buffer, caption }, sendOptions);
        } else if (type === "audioMessage") {
            await kyami.sendMessage(m.chat, { audio: buffer, mimetype: "audio/mpeg" }, sendOptions);
        } else {
            return reply("Media View Once tidak didukung.");
        }


    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply("Gagal mengambil media View Once.");
    }
}
break
case "cekidgc":
case "idgc": {
    if (!isPremium && !isCreator) return reply(mess.prem);
    if (!text) return reply("Masukkan tautan grup");

    const match = text.match(/chat\.whatsapp\.com\/([A-Za-z0-9]+)/);
    if (!match) return reply("Link grup tidak valid");

    const inviteCode = match[1];
    await sendReact(m.key, 0); // ⏳

    try {
        const inviteInfo = await kyami.groupGetInviteInfo(inviteCode);
        if (!inviteInfo || !inviteInfo.id) throw new Error();

        const teks = `
*INFO GRUP WHATSAPP*

🆔 *ID Grup:* ${inviteInfo.id}
📛 *Nama:* ${inviteInfo.subject}
⏰ *Dibuat:* ${new Date(inviteInfo.creation * 1000).toLocaleString()}
🔐 *Status:* ${inviteInfo.announce == false ? "Terbuka" : "Hanya Admin"}
👑 *Pembuat:* ${inviteInfo.subjectOwner ? '@' + inviteInfo.subjectOwner.split("@")[0] : "Tidak Diketahui"}
        `.trim();

        await sendButtons(kyami, m.chat, {
            title: "📊 INFO GRUP",
            text: teks,
            footer: "Info Grup via Bot",
            buttons: [
                {
                    name: "cta_copy",
                    buttonParamsJson: JSON.stringify({
                        display_text: "📋 Copy ID Grup",
                        copy_code: inviteInfo.id
                    })
                }
            ]
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply("Gagal mendapatkan informasi grup");
    }
}
break
case "cekidch":
case "idch": {
    if (!isPremium && !isCreator) return reply(mess.prem);
    if (!text) return reply("Masukkan tautan channel");
    if (!text.includes("https://whatsapp.com/channel/")) return reply("Link channel tidak valid");

    await sendReact(m.key, 0); // ⏳

    try {
        let result = text.split('https://whatsapp.com/channel/')[1];
        let res = await kyami.newsletterMetadata("invite", result);

        if (!res || !res.id) throw new Error();

        let teks = `
*INFO CHANNEL WHATSAPP*

🆔 *ID:* ${res.id}
📛 *Nama:* ${res.name}
👥 *Pengikut:* ${res.subscribers}
🔄 *Status:* ${res.state}
☑️ *Verified:* ${res.verification == "VERIFIED" ? "✅ Terverifikasi" : "❌ Tidak"}
        `.trim();

        await sendButtons(kyami, m.chat, {
            title: "📢 INFO CHANNEL",
            text: teks,
            footer: "Info Channel via Bot",
            buttons: [
                {
                    name: "cta_copy",
                    buttonParamsJson: JSON.stringify({
                        display_text: "📋 Copy ID Channel",
                        copy_code: res.id
                    })
                }
            ]
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply("Gagal mendapatkan informasi channel");
    }
}
break
case "listgc":
case "listgrup": {
    if (!isCreator) return reply(mess.owner);

    await sendReact(m.key, 0); // ⏳

    try {
        const groups = await kyami.groupFetchAllParticipating();
        const groupList = Object.values(groups);

        let teks = `*📋 DAFTAR GRUP*\n\n`;
            teks += `*Total Grup:* ${groupList.length}\n\n`;

        for (let group of groupList) {
            teks += `*• Nama:* ${group.subject || '-'}\n`;
            teks += `*• ID:* ${group.id}\n`;
            teks += `*• Member:* ${group.participants?.length || 0}\n`;
            teks += `*• Status:* ${group.announce ? 'Hanya Admin' : 'Terbuka'}\n`;
            teks += `*• Pembuat:* ${group.ownerPn ? group.ownerPn.split('@')[0] : '-'}\n\n`;
        }

        await reply(teks);

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply("Gagal mengambil daftar grup");
    }
}
break
case 'listpc': {
    if (!isCreator) return reply(mess.owner);

    await sendReact(m.key, 0); // ⏳

    try {
        const personalChats = store.chats.all()
            .filter(v => v.id.endsWith('.net') && !v.id.includes('@g.us'))
            .map(v => v.id);

        if (personalChats.length === 0) {
            return reply("Tidak ada chat personal yang tersimpan.");
        }

        let teksHeader = `⬣ *LIST PERSONAL CHAT*\n\n`;
        teksHeader += `Total Chat: ${personalChats.length} Chat\n\n`;

        let teks = "";
        let allMentions = [];

        for (const chatId of personalChats) {
            const userId = chatId.split('@')[0];
            const name = store.contacts[chatId]?.name ||
                         store.contacts[chatId]?.notify ||
                         `+${userId}`;

            teks += `*Name*: ${name}\n`;
            teks += `*User*: @${userId}\n`;
            teks += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

            allMentions.push(chatId);

            // kalau teks sudah mendekati limit WA, kirim dulu
            if (teks.length > 60000) {
                await kyami.sendMessage(m.chat, {
                    text: teksHeader + teks,
                    mentions: allMentions
                }, { quoted: m });

                teks = "";
                allMentions = [];
            }
        }

        // kirim sisa teks terakhir
        if (teks.length > 0) {
            await kyami.sendMessage(m.chat, {
                text: teksHeader + teks,
                mentions: allMentions
            }, { quoted: m });
        }

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Gagal mengambil daftar personal chat');
    }
}
break
case "onlygc": {
  if (!isCreator) return reply(mess.owner)
  if (!text) return reply(`ᴍᴀsᴜᴋᴋᴀɴ ᴏɴ/ᴏғғ\n\nKetik *${prefix}statusbot* untuk melihat status settingan bot`);

  if (text.toLowerCase() == "on") {
    if (onlygc) return reply("*OnlyGC* Sudah Aktif!\n\nKetik *.statusbot* Untuk Melihat Status Settingan Bot")
    onlygc = true
    reply("Berhasil Menyalakan *OnlyGC ✅*\n\nKetik *.statusbot* Untuk Melihat Status Settingan Bot")

  } else if (text.toLowerCase() == "off") {
    if (!onlygc) return reply("*OnlyGC* Sudah Tidak Aktif!\n\nKetik *.statusbot* Untuk Melihat Status Settingan Bot")
    onlygc = false
    reply("Berhasil Mematikan *OnlyGC ❌*\n\nKetik *.statusbot* Untuk Melihat Status Settingan Bot")

  } else {
    return reply(`ᴍᴀsᴜᴋᴋᴀɴ ᴏɴ/ᴏғғ\n\nKetik *${prefix}statusbot* untuk melihat status settingan bot`);
  }
}
break
case "onlypc": {
  if (!isCreator) return reply(mess.owner)
  if (!text) return reply(`ᴍᴀsᴜᴋᴋᴀɴ ᴏɴ/ᴏғғ\n\nKetik *${prefix}statusbot* untuk melihat status settingan bot`);
  
  if (text.toLowerCase() == "on") {
    if (onlypc) return reply("*OnlyPC* sudah aktif!\n\nKetik *.statusbot* Untuk Melihat Status Settingan Bot")
    onlypc = true
    reply("Berhasil mengaktifkan *OnlyPC ✅*\n\nBot hanya bisa digunakan di *chat pribadi*.\nKetik *.statusbot* Untuk Melihat Status Settingan Bot")
  } else if (text.toLowerCase() == "off") {
    if (!onlypc) return reply("*OnlyPC* sudah nonaktif!\n\nKetik *.statusbot* Untuk Melihat Status Settingan Bot")
    onlypc = false
    reply("Berhasil menonaktifkan *OnlyPC ❌*\n\nBot bisa digunakan di *grup dan pribadi*.\nKetik *.statusbot* Untuk Melihat Status Settingan Bot")
  } else {
    return reply(`ᴍᴀsᴜᴋᴋᴀɴ ᴏɴ/ᴏғғ\n\nKetik *${prefix}statusbot* untuk melihat status settingan bot`);
  }
}
break
case "statusbot": {
  if (!isCreator) return reply(mess.owner)
  let teks = `
┏━⭓ *ꜱᴛᴀᴛᴜꜱ ʙᴏᴛ*
┃◦ ᴏɴʟʏɢᴄ         : *${onlygc ? "ᴀᴋᴛɪꜰ" : "ɴᴏɴᴀᴋᴛɪꜰ"}*
┃◦ ᴏɴʟʏᴘᴄ         : *${onlypc ? "ᴀᴋᴛɪꜰ" : "ɴᴏɴᴀᴋᴛɪꜰ"}*
┃◦ ᴀɴᴛɪᴄᴀʟʟ       : *${anticall ? "ᴀᴋᴛɪꜰ" : "ɴᴏɴᴀᴋᴛɪꜰ"}*
┃◦ ᴀᴜᴛᴏᴛʏᴘᴇ       : *${autotype ? "ᴀᴋᴛɪꜰ" : "ɴᴏɴᴀᴋᴛɪꜰ"}*
┃◦ ᴀᴜᴛᴏʀᴇᴀᴅ       : *${autoread ? "ᴀᴋᴛɪꜰ" : "ɴᴏɴᴀᴋᴛɪꜰ"}*
┃◦ ᴀᴜᴛᴏᴠɴ          : *${autovn ? "ᴀᴋᴛɪꜰ" : "ɴᴏɴᴀᴋᴛɪꜰ"}*
┃◦ ᴀᴜᴛᴏʙɪᴏ        : *${autobio ? "ᴀᴋᴛɪꜰ" : "ɴᴏɴᴀᴋᴛɪꜰ"}*
┃◦ ᴍᴏᴅᴇ           : *${kyami.public ? "ᴘᴜʙʟɪᴄ" : "ꜱᴇʟꜰ"}*
┃◦ ᴀɴᴛɪʟɪɴᴋ       : *ᴀᴋᴛɪꜰ* (${Antilink.length || 0} ɢʀᴜᴘ)
┃◦ ᴀɴᴛɪʟɪɴᴋᴀʟʟ    : *ᴀᴋᴛɪꜰ* (${AntilinkAll.length || 0} ɢʀᴜᴘ)
┃◦ ᴀɴᴛɪᴛᴀɢɢᴄ      : *ᴀᴋᴛɪꜰ* (${AntitagGc.length || 0} ɢʀᴜᴘ)
┃◦ ᴀɴᴛɪsᴘᴀᴍɢᴄ      : *ᴀᴋᴛɪꜰ* (${AntispamGc.length || 0} ɢʀᴜᴘ)
┃◦ ᴡᴇʟᴄᴏᴍᴇ      : *ᴀᴋᴛɪꜰ* (${WelcomeGc.length || 0} ɢʀᴜᴘ)
┃◦ ᴀɴᴛɪsᴛɪᴄᴋᴇʀ      : *ᴀᴋᴛɪꜰ* (${AntiSticker.length || 0} ɢʀᴜᴘ)
┃◦ ɢʀᴏᴜᴘ ᴇᴠᴇɴᴛ      : *ᴀᴋᴛɪꜰ* (${GrupEvent.length || 0} ɢʀᴜᴘ)
┃◦ ᴀᴅᴍɪɴ ᴇᴠᴇɴᴛ      : *ᴀᴋᴛɪꜰ* (${AdminEvent.length || 0} ɢʀᴜᴘ)
┗━━━━━━━━━━━━➤
  `.trim()
  reply(teks)
}
break
case 'hd':
case 'superhd':
case 'tohd':
case 'upscale': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || '';
    if (!/image/.test(mime)) return reply(`Reply gambar yang ingin di-HD-kan`);

    await sendReact(m.key, 0); // ⏳

    try {
        const imagePath = await kyami.downloadAndSaveMediaMessage(q);
        const { url: uploadedUrl } = await UploadFileUgu(imagePath);

        if (!uploadedUrl) {
            await sendReact(m.key, 1)
            return reply("Gagal upload gambar.");
        }

        const upscaleUrl = `https://api.siputzx.my.id/api/iloveimg/upscale?image=${encodeURIComponent(uploadedUrl)}&scale=4`;
        const res = await fetch(upscaleUrl);
        if (!res.ok) {
            await sendReact(m.key, 1)
            return reply("Gagal mendapatkan gambar dari API.");
        }

        const buffer = Buffer.from(await res.arrayBuffer());

        await kyami.sendMessage(m.chat, {
            image: buffer,
            caption: `✅ Gambar berhasil di-HD-kan!`
        }, { quoted: m });

        fs.unlinkSync(imagePath);

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1)
        reply("Terjadi kesalahan saat memproses gambar.");
    }
}
break
case 'block': {
    if (!isCreator) return reply(mess.owner)
    if (!text) return reply(`Contoh: *${prefix + command} +62 812 3456 7890*`)

    let number = text.replace(/[^0-9]/g, '')
    if (!number || number.length < 10 || number.length > 15)
        return reply("Nomor tidak valid!")

    const jid = number + '@s.whatsapp.net'

    await sendReact(m.key, 0); // ⏳ proses

    try {
        await kyami.updateBlockStatus(jid, 'block')

        // Hapus obrolan
        await kyami.chatModify({ clear: { type: 'all' } }, jid)
        reply(`✅ Nomor *${number}* berhasil diblokir dan chat-nya dihapus.`)
    } catch (err) {
        console.error(err)
        await sendReact(m.key, 1) // ❌
        reply(`Gagal memblokir atau menghapus chat.`)
    }
}
break
case 'unblock': {
    if (!isCreator) return reply(mess.owner);
    if (!text) return reply(`Contoh: *${prefix + command} +62 812 3456 7890*`)

    let unblockTarget = m.mentionedJid && m.mentionedJid.length > 0
        ? m.mentionedJid[0]
        : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    if (!unblockTarget || !unblockTarget.endsWith('@s.whatsapp.net')) {
        return reply('Format nomor tidak valid!');
    }

    await sendReact(m.key, 0);

    try {
        await kyami.updateBlockStatus(unblockTarget, 'unblock');
        reply(`Pengguna di-unblock:\n*${unblockTarget.replace(/@s\.whatsapp\.net$/, '')}*`);
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1)
        reply('Gagal membuka blokir pengguna.');
    }
}
break
case 'ceklimit': {
    const userId = m.sender;
    const isFirstTime = !limit[userId];

    initUserLimit(userId, isPremium);
    await sendReact(m.key, 0);

    if (isPremium) {
        return reply('Kamu adalah pengguna *Premium*, limit kamu tidak terbatas!');
    }

    if (isFirstTime) {
        return reply(`📥 Data limit kamu baru dibuat!\nSisa limit: *${limit[userId].sisa}*`);
    } else {
        return reply(`Sisa limit kamu: *${limit[userId].sisa}*\nUpgrade ke *Premium* untuk akses tanpa batas!`);
    }
}
break
case 'tomp3':
case 'toaudio': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    if (!m.quoted) return reply(`Balas video yang ingin diproses\nContoh: *${prefix + command} (balas video)*`);

    const mime = m.quoted.mimetype || '';
    if (!/video|audio/.test(mime)) return reply("Harap balas video atau voice note");

    await sendReact(m.key, 0); // ⏳

    try {
        const media = await m.quoted.download();
        const audioBuffer = await toAudio(media, 'mp4');

        await kyami.sendMessage(m.chat, {
            audio: audioBuffer,
            mimetype: 'audio/mpeg'
        }, { quoted: m });


        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply("Gagal mengonversi ke MP3");
    }
}
break
case 'tovn':
case 'toptt': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    if (!m.quoted) return reply(`Balas video/audio yang ingin diproses\nContoh: *${prefix + command} (balas media)*`);

    const mime = m.quoted.mimetype || '';
    if (!/video|audio/.test(mime)) return reply("Harap balas video atau audio");

    await sendReact(m.key, 0); // ⏳

    try {
        const media = await m.quoted.download();
        const audio = await toPTT(media, 'mp4');

        await kyami.sendMessage(m.chat, {
            audio: audio,
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true
        }, { quoted: m });


        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply("Gagal mengonversi ke voice note");
    }
}
break
case 'tomp4':
case 'tovideo': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    if (!m.quoted) return reply(`Balas gambar/audio yang ingin diproses\nContoh: *${prefix + command} (balas media)*`);

    const mime = m.quoted.mimetype || '';
    if (!/image|audio/.test(mime)) return reply("Harap balas gambar atau audio");

    await sendReact(m.key, 0); // ⏳

    try {
        const media = await m.quoted.download();
        const video = await toVideo(media, 'mp4');

        await kyami.sendMessage(m.chat, {
            video: video,
            mimetype: 'video/mp4'
        }, { quoted: m });


        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply("Gagal mengonversi ke video");
    }
}
break;
case 'smeme':
case 'stickermeme':
case 'stickmeme': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    if (!text) return reply(`Masukkan teks yang ingin digunakan\nContoh: *${prefix + command} atas|bawah*`);

    let imgMessage = null;
    if (m.quoted?.mimetype?.includes('image')) {
        imgMessage = m.quoted;
    } else if (m.mtype === 'imageMessage') {
        imgMessage = m;
    } else {
        return reply("Harap balas/kirim gambar");
    }

    await sendReact(m.key, 0); // ⏳

    try {
        const [atas = "-", bawah = "-"] = text.split('|');
        const imagePath = await kyami.downloadAndSaveMediaMessage(imgMessage);
        const uploadedImg = await UploadFileUgu(imagePath);

        const memeUrl = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${uploadedImg.url}`;

        await kyami.sendImageAsSticker(m.chat, memeUrl, m, {
            packname: global.packname,
            author: global.author
        });


        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

        fs.unlinkSync(imagePath);

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply("Gagal membuat stiker meme");
    }
}
break
case "luckynumber": {
 let luckyNumber = Math.floor(Math.random() * 100) + 1;
 reply(`🍀 *Angka Keberuntunganmu Hari Ini:* *${luckyNumber}* 🍀`);
};
break;
case 'qc': {
    if (!text) return reply(`Text dibutuhkan.\nContoh: *${prefix + command} hai*`);

    await sendInteractiveMessage(kyami, m.chat, {
        text: "Silahkan Pilih *WARNA QC* Yang Tersedia Di Bawah Ini",
        footer: "© Luxxy | Leo",
        interactiveButtons: [
            {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                    title: 'PILIH WARNA QC',
                    sections: [{
                        title: 'DAFTAR WARNA LENGKAP',
                        rows: [
                            { title: "Normal 🎨", id: `.qc1 ${text}` },
                            { title: "Pink 🌸", id: `.qc2 pink ${text}` },
                            { title: "Biru 💙", id: `.qc2 biru ${text}` },
                            { title: "Merah ❤️", id: `.qc2 merah ${text}` },
                            { title: "Hijau 🍃", id: `.qc2 hijau ${text}` },
                            { title: "Kuning ☀️", id: `.qc2 kuning ${text}` },
                            { title: "Ungu 💜", id: `.qc2 ungu ${text}` },
                            { title: "Biru Tua 🔵", id: `.qc2 birutua ${text}` },
                            { title: "Biru Muda 🌊", id: `.qc2 birumuda ${text}` },
                            { title: "Abu ⚪️", id: `.qc2 abu ${text}` },
                            { title: "Orange 🧡", id: `.qc2 orangel ${text}` },
                            { title: "Hitam ⚫️", id: `.qc2 hitam ${text}` },
                            { title: "Putih 🤍", id: `.qc2 putih ${text}` },
                            { title: "Teal 🌐", id: `.qc2 teal ${text}` },
                            { title: "Merah Muda 💕", id: `.qc2 merahmuda ${text}` },
                            { title: "Cokelat 🤎", id: `.qc2 cokelat ${text}` },
                            { title: "Salmon 🧡", id: `.qc2 salmon ${text}` },
                            { title: "Magenta 🎀", id: `.qc2 magenta ${text}` },
                            { title: "Tan 🪵", id: `.qc2 tan ${text}` },
                            { title: "Wheat 🌾", id: `.qc2 wheat ${text}` },
                            { title: "Deep Pink 🌺", id: `.qc2 deepink ${text}` },
                            { title: "Api 🔥", id: `.qc2 api ${text}` },
                            { title: "Biru Langit ☁️", id: `.qc2 birulangit ${text}` },
                            { title: "Jingga 🍊", id: `.qc2 jingga ${text}` },
                            { title: "Biru Langit Cerah 💧", id: `.qc2 birulangitcerah ${text}` },
                            { title: "Hot Pink 🌷", id: `.qc2 hotpink ${text}` },
                            { title: "Biru Muda Langit 🌤️", id: `.qc2 birumudalangit ${text}` },
                            { title: "Hijau Laut 🌊", id: `.qc2 hijaulaut ${text}` },
                            { title: "Merah Tua 🩸", id: `.qc2 merahtua ${text}` },
                            { title: "Oranye Merah 🧡❤️", id: `.qc2 oranyemerah ${text}` },
                            { title: "Cyan 💧", id: `.qc2 cyan ${text}` },
                            { title: "Ungu Tua 🟣", id: `.qc2 ungutua ${text}` },
                            { title: "Hijau Lumut 🍀", id: `.qc2 hijaulumut ${text}` },
                            { title: "Hijau Gelap 🌲", id: `.qc2 hijaugelap ${text}` },
                            { title: "Biru Laut 🌊", id: `.qc2 birulaut ${text}` }
                        ]
                    }]
                })
            }
        ],
        contextInfo: {
            mentionedJid: [m.sender]
        }
    }, { quoted: m });
}
break
case 'qc2': {
if (!isPremium) return reply(mess.prem);
    if (!text) return reply(`*Masukan Input Query!*\n\nContoh:\n*${prefix + command} pink hallo\n\n*List Warna*:\npink\nbiru\nmerah\nhijau\nkuning\nungu\nbirutua\nbirumuda\nabu\norange\nhitam\nputih\nteal\nmerahmuda\ncokelat\nsalmon\nmagenta\ntan\nwheat\ndeeppink\napi\nbirulangit\njingga\nbirulangitcerah\nhotpink\nbirumudalangit\nhijaulaut\nmerahtua\noranyemerah\ncyan\nungutua\nhijaulumut\nhijaugelap\nbirulaut\noranyetua\nungukehitaman\nfuchsia\nmagentagelap\nabu-abutua\npeachpuff\nhijautua\nmerahgelap\ngoldenrod\nabu-abutua\nungugelap\nemas\nperak*`);

    await sendReact(m.key, 0);

    let [color, ...message] = text.split(' ');
    message = message.join(' ');
    let backgroundColor;

    switch (color) {
        case 'pink': backgroundColor = '#f68ac9'; break;
        case 'biru': backgroundColor = '#6cace4'; break;
        case 'merah': backgroundColor = '#f44336'; break;
        case 'hijau': backgroundColor = '#4caf50'; break;
        case 'kuning': backgroundColor = '#ffeb3b'; break;
        case 'ungu': backgroundColor = '#9c27b0'; break;
        case 'birutua': backgroundColor = '#0d47a1'; break;
        case 'birumuda': backgroundColor = '#03a9f4'; break;
        case 'abu': backgroundColor = '#9e9e9e'; break;
        case 'orange': backgroundColor = '#ff9800'; break;
        case 'hitam': backgroundColor = '#000000'; break;
        case 'putih': backgroundColor = '#ffffff'; break;
        case 'teal': backgroundColor = '#008080'; break;
        case 'merahmuda': backgroundColor = '#FFC0CB'; break;
        case 'cokelat': backgroundColor = '#A52A2A'; break;
        case 'salmon': backgroundColor = '#FFA07A'; break;
        case 'magenta': backgroundColor = '#FF00FF'; break;
        case 'tan': backgroundColor = '#D2B48C'; break;
        case 'wheat': backgroundColor = '#F5DEB3'; break;
        case 'deeppink': backgroundColor = '#FF1493'; break;
        case 'api': backgroundColor = '#B22222'; break;
        case 'birulangit': backgroundColor = '#00BFFF'; break;
        case 'jingga': backgroundColor = '#FF7F50'; break;
        case 'birulangitcerah': backgroundColor = '#1E90FF'; break;
        case 'hotpink': backgroundColor = '#FF69B4'; break;
        case 'birumudalangit': backgroundColor = '#87CEEB'; break;
        case 'hijaulaut': backgroundColor = '#20B2AA'; break;
        case 'merahtua': backgroundColor = '#8B0000'; break;
        case 'oranyemerah': backgroundColor = '#FF4500'; break;
        case 'cyan': backgroundColor = '#48D1CC'; break;
        case 'ungutua': backgroundColor = '#BA55D3'; break;
        case 'hijaulumut': backgroundColor = '#00FF7F'; break;
        case 'hijaugelap': backgroundColor = '#008000'; break;
        case 'birulaut': backgroundColor = '#191970'; break;
        case 'oranyetua': backgroundColor = '#FF8C00'; break;
        case 'ungukehitaman': backgroundColor = '#9400D3'; break;
        case 'fuchsia': backgroundColor = '#FF00FF'; break;
        case 'magentagelap': backgroundColor = '#8B008B'; break;
        case 'abu-abutua': backgroundColor = '#696969'; break;
        case 'peachpuff': backgroundColor = '#FFDAB9'; break;
        case 'hijautua': backgroundColor = '#BDB76B'; break;
        case 'merahgelap': backgroundColor = '#DC143C'; break;
        case 'goldenrod': backgroundColor = '#DAA520'; break;
        case 'emas': backgroundColor = '#FFD700'; break;
        case 'perak': backgroundColor = '#C0C0C0'; break;
        default:
            backgroundColor = '#ffffff';
            message = text;
    }

    try {
        avatar = await kyami.profilePictureUrl(m.sender, 'image');
    } catch {
        avatar = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg';
    }

    const json = {
        type: "quote",
        format: "png",
        backgroundColor,
        width: 700,
        height: 580,
        scale: 2,
        messages: [{
            entities: [],
            avatar: true,
            from: {
                id: 1,
                name: m.pushName,
                photo: {
                    url: avatar
                }
            },
            text: message,
            replyMessage: {}
        }]
    };

    try {
        const res = await axios.post("https://quotly.netorare.codes/generate", json, {
            headers: { "Content-Type": "application/json" }
        });
        const qc = Buffer.from(res.data.result.image, "base64");
        await kyami.imgToSticker(m.chat, qc, m, {
            packname: global.packname,
            author: global.author
        });
    } catch (err) {
    console.error(err);
        try {
            const data = await axios.post("https://bot.lyo.su/quote/generate", json, {
                headers: { "Content-Type": "application/json" }
            });
            const qc = Buffer.from(data.data.result.image, "base64");
            await kyami.imgToSticker(m.chat, qc, m, {
                packname: global.packname,
                author: global.author
            });
        } catch (err) {
            await sendReact(m.key, 1)
            reply('Gagal membuat quote sticker.');
        }
    }
}
break
case 'qc1': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    if (!text) return reply('Masukkan teks quote');

    await sendReact(m.key, 0); // ⏳ Proses

    try {
        const ppnyauser = await kyami.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/6880771a42bad09dd6087.jpg');

        const json = {
            type: "quote",
            format: "png",
            backgroundColor: "#FFFFFF",
            width: 512,
            height: 512,
            scale: 2,
            messages: [
                {
                    entities: [],
                    avatar: true,
                    from: {
                        id: 1,
                        name: pushname,
                        photo: {
                            url: ppnyauser
                        }
                    },
                    text: text,
                    replyMessage: {}
                }
            ]
        };

        const res = await axios.post('https://bot.lyo.su/quote/generate', json, {
            headers: { 'Content-Type': 'application/json' }
        });

        const buffer = Buffer.from(res.data.result.image, 'base64');

        await kyami.sendImageAsSticker(m.chat, buffer, m, {
            packname: global.packname,
            author: global.author
        });

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1)
        reply('Gagal membuat quote sticker.');
    }
}
break
case 'iqc': {
    if (!isPremium) return reply(mess.prem);
    if (!text) return reply('Masukkan teks untuk dijadikan quote iPhone.');

    try {
        await sendReact(m.key, 0); // ⏳
        
        const imageUrl = `https://api.privatezia.biz.id/api/generator/iphone-quoted?text=${encodeURIComponent(text)}`;

        const res = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(res.data, 'binary');

        await kyami.sendMessage(m.chat, {
            image: buffer,
            caption: '',
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Gagal membuat quote iPhone.');
    }
}
break
case 'tts': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1); // ❌
        return reply(mess.limit);
    }

    if (!text) return reply(`Masukkan teks yang akan diubah menjadi suara\n\nContoh:\n*${prefix + command} Halo semua*`);

    await sendReact(m.key, 0); // ⏳

    try {
        const apiUrl = `https://api.siputzx.my.id/api/tools/ttsgoogle?text=${encodeURIComponent(text)}`;

        await kyami.sendMessage(m.chat, {
            audio: { url: apiUrl },
            mimetype: 'audio/mpeg',
            fileName: 'tts.mp3',
            ptt: true
        }, { quoted: m });

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan saat memproses TTS");
    }
}
break
case "ramalan": {
 let fortunes = [
 "🔮 Hari ini keberuntungan ada di pihakmu!",
 "⚡ Waspada dengan keputusan besar hari ini.",
 "🌞 Kamu akan mendapatkan kejutan menyenangkan!",
 "💼 Kesempatan emas sedang mendekat, jangan lewatkan!"
 ];
 let randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
 reply(`🔮 *Ramalan Hari Ini:* \n\n${randomFortune}`);
};
break;
case "glitchtext": {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    if (!args.length) return reply("Masukkan teks untuk diubah menjadi glitch");

    await sendReact(m.key, 0); // ⏳ Proses

    try {
        let text = args.join(" ");
        let glitch = text.split("").map(char => char + "̖̫͟").join("");

        reply(`*Glitch Text:*\n\n${glitch}`);

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) //
        reply("Gagal membuat teks glitch");
    }
}
break;
case 'addcase': {
    if (!isCreator) return reply(mess.owner);

    if (!text) return reply('Mana case nya');

    const fs = require('fs');
    const namaFile = './system.js';
    const caseBaru = `${text}`;

    fs.readFile(namaFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return reply('Gagal membaca file.');
        }

        const posisiAwal = data.indexOf("case 'addcase':");

        if (posisiAwal !== -1) {
            const kodeBaruLengkap = data.slice(0, posisiAwal) + '\n' + caseBaru + '\n' + data.slice(posisiAwal);
            fs.writeFile(namaFile, kodeBaruLengkap, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return reply('Gagal menulis case.');
                } else {
                    reply('Case baru berhasil ditambahkan.');
                }
            });
        } else {
            reply('Tidak ditemukan posisi untuk menambahkan case.');
        }
    });
}
break
case 'removebg':
case 'nobg':
case 'hapusbackground': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1); // ❌
        return reply(mess.limit);
    }

    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || '';
    if (!/image/.test(mime)) return reply(`Kirim atau reply gambar dengan caption *${prefix + command}*`);

    await sendReact(m.key, 0); // ⏳
    reply("Sedang menghapus background...");

    try {
        const imagePath = await kyami.downloadAndSaveMediaMessage(q);
        const { url: uploadedUrl } = await UploadFileUgu(imagePath);

        if (!uploadedUrl) {
            await sendReact(m.key, 1); // ❌
            return reply("Gagal upload gambar.");
        }

        // Menggunakan API baru sesuai permintaan
        const apiUrl = `https://z7.veloria.my.id/tools/removebg?url=${encodeURIComponent(uploadedUrl)}`;
        
        await kyami.sendMessage(m.chat, {
            image: { url: apiUrl },
            caption: "Berhasil menghapus background!"
        }, { quoted: m });

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.log(err);
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan saat menghapus background.");
    }
}
break;
case "reactch":
case "rch": {
    if (!isCreator) return reply(mess.owner);
    if (!text) return reply("Contoh:\n*.reactch https://whatsapp.com/channel/xxx/123 ❤️biyu\n.reactch https://whatsapp.com/channel/xxx/123 ❤️biyu|5*");

    await sendReact(m.key, 0); // ⏳

    const hurufGaya = {
        a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
        h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
        o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
        v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
        '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
        '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
    };

    const [mainText, offsetStr] = text.split('|');
    const args = mainText.trim().split(" ");
    const link = args[0];

    if (!link.includes("https://whatsapp.com/channel/")) return reply("Link tidak valid!\nContoh: *.reactch https://whatsapp.com/channel/xxx/idpesan ❤️biyu|3*");

    const channelId = link.split('/')[4];
    const rawMessageId = parseInt(link.split('/')[5]);
    if (!channelId || isNaN(rawMessageId)) return reply("Link tidak lengkap!");

    const offset = parseInt(offsetStr?.trim()) || 1;
    const teksNormal = args.slice(1).join(' ');
    const teksTanpaLink = teksNormal.replace(link, '').trim();
    if (!teksTanpaLink) return reply("Masukkan teks/emoji untuk direaksikan.");

    const emoji = teksTanpaLink.toLowerCase().split('').map(c => {
        if (c === ' ') return '―';
        return hurufGaya[c] || c;
    }).join('');

    try {
        const metadata = await kyami.newsletterMetadata("invite", channelId);
        let success = 0, failed = 0;

        for (let i = 0; i < offset; i++) {
            const msgId = (rawMessageId - i).toString();
            try {
                await kyami.newsletterReactMessage(metadata.id, msgId, emoji);
                success++;
            } catch {
                failed++;
            }
        }

        reply(`Berhasil kirim reaction *${emoji}* ke ${success} pesan di channel *${metadata.name}*\nGagal di ${failed} pesan`);
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply("Gagal memproses permintaan");
    }
}
break
case 'toimg': {
    let tempDir = './lib/tmp/';
    let tempFilePath = '';
    let outputPath = '';

    try {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

        if (!m.quoted) {
            return reply(`Balas stiker dengan perintah *${prefix + command}*`);
        }

        const mime = m.quoted.mimetype || '';
        if (!/webp|webm/.test(mime)) {
            return reply('Format stiker tidak didukung');
        }

        await sendReact(m.key, 0); // ⏳

        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true, mode: 0o755 });
        }

        tempFilePath = path.join(tempDir, `sticker_${Date.now()}.${mime.includes('webm') ? 'webm' : 'webp'}`);
        outputPath = path.join(tempDir, `image_${Date.now()}.png`);

        const buffer = await m.quoted.download();
        fs.writeFileSync(tempFilePath, buffer, { mode: 0o644 });

        await new Promise((resolve, reject) => {
            exec(`ffmpeg -i "${tempFilePath}" "${outputPath}"`, (err) => {
                if (err) {
                    console.error(err);
                    reject(new Error('Gagal konversi stiker'));
                    return;
                }
                resolve();
            });
        });

        if (!fs.existsSync(outputPath)) {
            throw new Error('File output tidak terbentuk');
        }

        await kyami.sendMessage(m.chat, {
            image: fs.readFileSync(outputPath),
            caption: 'Sᴛɪᴋᴇʀ berhasil dikonversi ke gambar'
        }, { quoted: m });


        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Gagal memproses stiker');
    } finally {
        [tempFilePath, outputPath].forEach(file => {
            try {
                if (file && fs.existsSync(file)) fs.unlinkSync(file);
            } catch (cleanupError) {
                console.error(err);
            }
        });
    }
}
break
case 'group':
case 'grup': {
    try {
        if (!m.isGroup) return reply(mess.group);
        if (!isBotAdmins) return reply(mess.botAdmin);
        if (!isAdmins) return reply(mess.onlyAdmin);
        if (!args[0]) return reply(`⚙️ *Penggunaan:*\n• ${prefix + command} open - Buka grup\n• ${prefix + command} close - Tutup grup`);

        await sendReact(m.key, 0); // ⏳

        const action = args[0].toLowerCase();
        if (action === 'close') {
            await kyami.groupSettingUpdate(m.chat, 'announcement');
            reply('🔒 *Grup Ditutup!*\nSekarang hanya admin yang bisa mengirim pesan');
        } else if (action === 'open') {
            await kyami.groupSettingUpdate(m.chat, 'not_announcement');
            reply('🔓 *Grup Dibuka!*\nSekarang semua anggota bisa mengirim pesan');
        } else {
            await sendReact(m.key, 1) // ❌
            return reply(`Perintah tidak valid\nGunakan:\n• ${prefix + command} open\n• ${prefix + command} close`);
        }


    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Gagal mengubah pengaturan grup. Pastikan bot adalah admin.');
    }
}
break
case 'tourl': {
  const teks = `Pilih server uploader:

1. *Postimages* — cocok untuk banyak file  
   > Balas gambar dengan: *${prefix}tourl1*

2. *Pixhost* — cocok untuk anonym  
   > Balas gambar dengan: *${prefix}tourl2*

3. *Catbox* — bebas sensor & file besar  
   > Balas gambar dengan: *${prefix}tourl3*

4. *CloudKu* — cocok untuk file ukuran besar
   > Balas gambar dengan: *${prefix}tourl4*

5. *GitHub* — permanen & terpercaya
   > Balas gambar dengan: *${prefix}tourl5*`;

  reply(teks);
}
break
case 'tourl1': {
    if (!isPremium) return reply(mess.prem);
    if (!mime) return reply(`Kirim atau balas gambar/video dengan perintah *${prefix + command}*`);

    try {
        await sendReact(m.key, 0); // ⏳

        let media = await kyami.downloadAndSaveMediaMessage(qmsg);
        const { ImageUploadService } = require('node-upload-images');
        const service = new ImageUploadService('postimages.org');

        let { directLink } = await service.uploadFromBinary(fs.readFileSync(media), 'kyami.png');
        let teks = directLink.toString();

        await kyami.sendMessage(m.chat, { text: teks }, { quoted: m });

        await fs.unlinkSync(media);
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Gagal mengunggah gambar.');
    }
}
break
case 'tourl2': {
    if (!isPremium) return reply(mess.prem);
    if (!mime) return reply(`Kirim atau balas gambar/video dengan perintah *${prefix + command}*`);

    try {
        await sendReact(m.key, 0); // ⏳

        let media = await kyami.downloadAndSaveMediaMessage(qmsg);
        const { ImageUploadService } = require('node-upload-images');
        const service = new ImageUploadService('pixhost.to');

        let { directLink } = await service.uploadFromBinary(fs.readFileSync(media), 'kyami.png');
        let teks = directLink.toString();

        await kyami.sendMessage(m.chat, { text: teks }, { quoted: m });

        await fs.unlinkSync(media);
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply("Gagal mengunggah gambar.");
    }
}
break
case 'tourl3': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1); // ❌
        return reply(mess.limit);
    }

    if (!mime) return reply(`Kirim atau balas gambar/video dengan perintah *${prefix + command}*`);

    await sendReact(m.key, 0); // ⏳

    try {
        const media = await kyami.downloadAndSaveMediaMessage(quoted);

        if (/image|video/.test(mime)) {
            const response = await CatBox(media);
            const fileSize = (fs.statSync(media).size / 1024).toFixed(2);
            const caption = `> Ukuran file : ${fileSize} KB\n> Pengunggah : ${pushname}\n\n*Link:* ${response}`;

            await sendButtons(kyami, m.chat, {
                title: "☁️ MEDIA UPLOADER",
                text: caption,
                footer: "© Luxxy | Leo",
                buttons: [
                    {
                        name: 'cta_copy',
                        buttonParamsJson: JSON.stringify({
                            display_text: '📋 Salin Link',
                            copy_code: response
                        })
                    }
                ]
            });
        } else {
            const response = await CatBox(media);
            await kyami.sendMessage(m.chat, { text: response }, { quoted: m });
        }

        fs.unlinkSync(media);

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply('Terjadi kesalahan saat mengunggah media.');
    }
}
break
case 'tourl4': {
    if (!isPremium) return reply(mess.prem);
    if (!mime) return reply(`Kirim atau balas gambar/video dengan perintah *${prefix + command}*`);

    try {
        await sendReact(m.key, 0); // ⏳

        const FormData = require('form-data');
        const axios = require('axios');
        const mimeTypes = require('mime-types');
        
        const media = await kyami.downloadAndSaveMediaMessage(quoted);
        const ext = mimeTypes.extension(mime);
        const filename = `upload.${ext}`;

        const form = new FormData();
        form.append('file', fs.createReadStream(media), filename);

        const { data } = await axios.post('https://cloudkuimages.guru/upload.php', form, {
            headers: form.getHeaders(),
        });

        let url = data?.url || data?.directLink || data?.result || null;

        if (url && url.startsWith('http')) {
            const caption = `✅ *UPLOAD SUCCESS*

📁 *File:* ${filename}
📊 *Size:* ${(fs.statSync(media).size / 1024).toFixed(2)} KB
📝 *Type:* ${mime}

*Link:* ${url}`;

            await sendButtons(kyami, m.chat, {
                title: "☁️ CLOUDKU UPLOADER",
                text: caption,
                footer: "© Luxxy | Leo",
                buttons: [
                    {
                        name: 'cta_copy',
                        buttonParamsJson: JSON.stringify({
                            display_text: '📋 Salin Link',
                            copy_code: url
                        })
                    }
                ]
            });
        } else {
            let fallback = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
            await kyami.sendMessage(m.chat, { text: `📄 *Respon:*\n${fallback}` }, { quoted: m });
        }

        fs.unlinkSync(media);
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply('Terjadi kesalahan saat upload gambar.');
    }
}
break
case 'tourl5': {
    if (!isPremium) return reply(mess.prem);
    if (!mime) return reply(`Kirim atau balas gambar/video dengan perintah *${prefix + command}*`);

    const GITHUB_TOKEN = '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';
    const GITHUB_USERNAME = 'LuxxyCOMBACK';
    const GITHUB_REPO = 'Leo';
    const GITHUB_BRANCH = 'main';

    try {
        await sendReact(m.key, 0); // ⏳

        const media = await kyami.downloadAndSaveMediaMessage(quoted);
        
        let fileExtension = 'jpg';
        if (m.quoted?.mtype === 'video') fileExtension = 'mp4';
        if (m.quoted?.mtype === 'sticker') fileExtension = 'webp';
        if (m.quoted?.mtype === 'imageMessage') fileExtension = 'jpg';
        if (m.quoted?.mtype === 'videoMessage') fileExtension = 'mp4';
        
        const fileName = `upload_${Date.now()}.${fileExtension}`;
        const fileBuffer = fs.readFileSync(media);
        const fileContent = fileBuffer.toString('base64');

        const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/uploads/${fileName}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Upload ${fileName}`,
                content: fileContent,
                branch: GITHUB_BRANCH
            })
        });

        const result = await response.json();

        if (result.content) {
            const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/uploads/${fileName}`;
            const caption = `✅ *GITHUB UPLOAD SUCCESS*

📁 *File:* ${fileName}
📊 *Size:* ${(fs.statSync(media).size / 1024).toFixed(2)} KB
📝 *Type:* ${m.quoted?.mtype || 'unknown'}

*Link:* ${rawUrl}`;

            await sendButtons(kyami, m.chat, {
                title: "🐙 GITHUB UPLOADER",
                text: caption,
                footer: "© Luxxy | Leo",
                buttons: [
                    {
                        name: 'cta_copy',
                        buttonParamsJson: JSON.stringify({
                            display_text: '📋 Salin Link Raw',
                            copy_code: rawUrl
                        })
                    }
                ]
            });

        } else {
            await sendReact(m.key, 1); // ❌
            throw new Error('Upload ke GitHub gagal');
        }

        if (fs.existsSync(media)) fs.unlinkSync(media);

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply('Gagal mengupload ke GitHub');
    }
}
break
case "chatgpt":
case "ai": {
    if (!isPremium) return reply(mess.prem);
    if (!text) return reply(`Kirim perintah *${prefix + command}* diikuti pertanyaan.`);

    await sendReact(m.key, 0); // ⏳

    try {
        const apiUrl = `https://z7.veloria.my.id/ai/gpt35?query=${encodeURIComponent(text)}`;
        const res = await (await fetch(apiUrl)).json();

        if (!res.status || !res.result) {
            await sendReact(m.key, 1); // ❌
            return reply("Gagal mendapatkan jawaban dari ChatGPT.");
        }

        await kyami.sendMessage(m.chat, {
            text: res.result
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan saat menghubungi ChatGPT. Coba lagi nanti.");
    }
}
break
case 'editai': {
    if (!isPremium) return reply(mess.prem);
    if (!text) return reply(`Reply gambar dengan caption *${prefix+command} <prompt>*`)

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime.startsWith('image/')) return reply(`Reply gambar dengan caption *${prefix+command} <prompt>*`)

    try {
        await sendReact(m.key, 0);

        const imagePath = await kyami.downloadAndSaveMediaMessage(q)
        const { url: uploadedUrl } = await UploadFileUgu(imagePath)

        if (!uploadedUrl) {
            await sendReact(m.key, 1)
            return reply("Gagal upload gambar.")
        }

        const apiUrl = `https://magma-api.biz.id/edits/edit?url=${encodeURIComponent(uploadedUrl)}&prompt=${encodeURIComponent(text)}`

        await kyami.sendMessage(m.chat, {
            image: { url: apiUrl },
            caption: `✅ Hasil edit AI\n\nPrompt: *${text}*`
        }, { quoted: m })

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1)
        reply("Gagal memproses edit AI.")
    }
}
break
case 'hytamkan': {
    if (!isPremium) return reply(mess.prem);
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime.startsWith('image/')) return reply(`Reply gambar dengan caption *${prefix + command}*`)

    try {
        await sendReact(m.key, 0); // ⏳

        const imagePath = await kyami.downloadAndSaveMediaMessage(q)
        const { url: uploadedUrl } = await UploadFileUgu(imagePath)

        if (!uploadedUrl) {
            await sendReact(m.key, 1)
            return reply("Gagal upload gambar.")
        }

        const apiUrl = `https://magma-api.biz.id/edits/tohitam?image=${encodeURIComponent(uploadedUrl)}`

        await kyami.sendMessage(m.chat, {
            image: { url: apiUrl },
            caption: `✅ Hasil *hytamkan*`
        }, { quoted: m })

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1) // ❌
        reply("Gagal memproses hytamkan.")
    }
}
break
case 'autotype':
case 'autoread':
case 'autovn':
case 'autobio': {
    if (!isCreator) return reply(mess.owner);
    if (args.length < 1) return reply(`Contoh: *${prefix + command} on* atau *off*`);

    const fitur = command.toLowerCase();
    const status = args[0].toLowerCase();

    // daftar semua fitur & emoji-nya
    const emojiMap = {
        autotype: '⌨️',
        autoread: '👁️‍🗨️',
        autovn: '🎙️',
        autobio: '📝'
    };

    if (!['on', 'off'].includes(status)) {
        return reply(`⚠️ Pilih *on* atau *off*\nContoh: *${prefix + command} on*`);
    }

    const fiturAktif = global[fitur] || false;

    if (status === 'on') {
        if (fiturAktif) return reply(`⚠️ *${fitur}* sudah aktif!`);
        global[fitur] = true;
        reply(`Fitur *${fitur}* berhasil diaktifkan! ${emojiMap[fitur] || ''}`);
    } else {
        if (!fiturAktif) return reply(`⚠️ *${fitur}* sudah nonaktif!`);
        global[fitur] = false;
        reply(`Fitur *${fitur}* berhasil dimatikan! 🚫${emojiMap[fitur] || ''}`);
    }
}
break
case 'sifat':
case 'karakter': {
    if (!text) return reply(`Contoh: *${prefix + command} Dika, 1, 1, 2000*`);

    await sendReact(m.key, 0); // ⏳

    try {
        const [nama, tgl, bln, thn] = text.split(',');
        const anu = await primbon.sifat_karakter_tanggal_lahir(nama?.trim(), tgl?.trim(), bln?.trim(), thn?.trim());

        if (!anu.status) {
            await sendReact(m.key, 1) // ❌
            return reply(anu.message);
        }

        reply(
            `*➤ Hasil Sifat & Karakter:*\n\n` +
            `• *Nama:* ${anu.message.nama}\n` +
            `• *Tanggal Lahir:* ${anu.message.tgl_lahir}\n` +
            `• *Garis Hidup:* ${anu.message.garis_hidup}`
        );

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Terjadi kesalahan saat memproses permintaan kamu. Coba lagi nanti.');
    }
}
break
case 'gctime': {
  if (!m.isGroup) return reply(mess.group);
  if (!isBotAdmins) return reply(mess.botAdmin);
  if (!isAdmins && !isCreator) return reply(mess.admin);

  const type = args[0]?.toLowerCase();
  const waktu = args[1];
  let db = JSON.parse(fs.readFileSync('./lib/database/gctime.json'));
  if (!db[m.chat]) db[m.chat] = {};

  if (!type) return reply(
    `Contoh penggunaan:\n` +
    `• ${prefix}gctime open 06:00\n` +
    `• ${prefix}gctime close 21:00\n` +
    `• ${prefix}gctime off`
  );

  await sendReact(m.key, 0); // ⏳

  try {
    if (type === 'open' || type === 'close') {
      if (!waktu) return reply(`Masukkan waktu\nContoh: *${prefix}gctime ${type} 06:00*`);
      if (!/^([01]?\d|2[0-3]):([0-5]\d)$/.test(waktu)) 
        return reply(`Format waktu salah\nContoh: *${prefix}gctime ${type} 21:00*`);

      let [jam, menit] = waktu.split(':').map(n => parseInt(n));
      db[m.chat] = {
        jam,
        menit,
        opsi: type === 'close' ? 'announcement' : 'not_announcement'
      };

      fs.writeFileSync('./lib/database/gctime.json', JSON.stringify(db, null, 2));
      
      reply(`Gʀᴜᴘ akan otomatis ${type === 'close' ? 'ditutup' : 'dibuka'} pada pukul ${waktu}WIB`);

    } else if (type === 'off') {
      delete db[m.chat];
      fs.writeFileSync('./lib/database/gctime.json', JSON.stringify(db, null, 2));
      
      reply('Jadwal otomatis grup dimatikan');
    }
  } catch (err) {
    console.error(err);
    await sendReact(m.key, 1) // ❌
    reply('Gagal mengatur jadwal grup');
  }
}
break
case 'artimimpi':
case 'tafsirmimpi': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    if (!text) return reply(`Contoh: *${prefix + command} belanja*`);

    await sendReact(m.key, 0); // ⏳

    try {
        let anu = await primbon.tafsir_mimpi(text);

        if (!anu.status) {
            await sendReact(m.key, 1) // ❌
            return reply(anu.message);
        }

        reply(
            `Mimpi: ${anu.message.mimpi}\n` +
            `Arti: ${anu.message.arti}\n` +
            `Solusi: ${anu.message.solusi}`
        );

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Terjadi kesalahan saat memproses permintaan. Coba lagi nanti.');
    }
}
break
case 'artinama': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    if (!text) return reply(`Contoh: *${prefix + command} Dika Ardianta*`);

    await sendReact(m.key, 0); // ⏳

    try {
        const anu = await primbon.arti_nama(text);

        if (!anu.status) {
            await sendReact(m.key, 1) // ❌
            return reply(anu.message);
        }

        reply(
            `*➤ Hasil Arti Nama:*\n\n` +
            `• *Nama:* ${anu.message.nama}\n` +
            `• *Arti:* ${anu.message.arti}\n` +
            `• *Catatan:* ${anu.message.catatan}`
        );


        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Terjadi kesalahan saat memproses permintaan kamu. Coba lagi nanti.');
    }
}
break
case 'upch': {
if (!isCreator) return reply(mess.owner)
        		try {
					ppuser = await kyami.profilePictureUrl(m.sender, 'image');
				} catch (err) {
					ppuser = 'https://raw.githubusercontent.com/LuxxyCOMBACK/Leo/main/uploads/upload_1761120405051.jpg'
				}	
				let fotoProfil = await getBuffer(ppuser);
				let pelers = `Message from ${m.pushName}`
				try {
					if (!mime && !text) {
						return reply(`Uh-oh, sis! You haven't sent any media or text yet. Please try again! 🤭`)
					}
					media = mime ? await quoted.download() : null
					let defaultCaption = "✨ This media is sent via an automated system✨"
					if (/image/.test(mime)) {
						kyami.sendMessage(channel, {
					contextInfo: {	
		        externalAdReply: {
						showAdAttribution: true,
						title: pelers,
						mediaType: 1,
						previewType: 1,
						body: 'Massage to channel',
						thumbnail: fotoProfil,
					    renderLargerThumbnail: false,
						mediaUrl: '',
					    sourceUrl: ''
			        }
			        },
							image: media,
							caption: text ? text : defaultCaption
						})
						reply(`📸 Image successfully uploaded to channel with caption: "${text ? text : defaultCaption}"`)
					} else if (/video/.test(mime)) {
						kyami.sendMessage(channel, {
					contextInfo: {
						
		        externalAdReply: {
						showAdAttribution: true,
						title: pelers,
						mediaType: 1,
						previewType: 1,
						body: 'Massage to channel',
						thumbnail: fotoProfil,
					    renderLargerThumbnail: false,
						mediaUrl: '',
					    sourceUrl: ''
			        }
			        },
							video: media,
							caption: text ? text : defaultCaption
						})
						reply(`🎥 Video successfully uploaded to channel with caption: "${text ? text : defaultCaption}"`)
					} else if (/audio/.test(mime)) {
						kyami.sendMessage(channel, {
					contextInfo: {
						
		        externalAdReply: {
						showAdAttribution: true,
						title: pelers,
						mediaType: 1,
						previewType: 1,
						body: 'Massage to channel',
						thumbnail: fotoProfil,
					    renderLargerThumbnail: false,
						mediaUrl: '',
					    sourceUrl: ''
			        }
			        },
							audio: media,
							mimetype: mime,
						})
						reply(`🎵 Audio successfully uploaded to the channel, sis!`)
					} else if (/text/.test(mime) || text) {
						kyami.sendMessage(channel, {
					contextInfo: {
						
		        externalAdReply: {
						showAdAttribution: true,
						title: pelers,
						mediaType: 1,
						previewType: 1,
						body: 'Massage to channel',
						thumbnail: fotoProfil,
					    renderLargerThumbnail: false,
						mediaUrl: '',
					    sourceUrl: ''
			        }
			        },
							text: text ? text : defaultCaption
						})
						reply(`💬 Text message successfully sent to channel: "${text ? text : defaultCaption}"`)
					} else {
						reply(`Hmm... I don't know what kind of media this is. Please check again, sis! 🧐`)
					}
				} catch (err) {
					console.error(err);
					reply(`Oh, sis! 😣 There was a problem uploading to the channel. Try again later, OK!`)
				}
			}
			break
			case 'rules': {
  const cap = `┏━━━°❀ ❬ *Rules ${namaBot} MultiDevice* ❭ ❀°━━━┓

1. ✧ *Dilarang Melakukan Spam Kepada Bot*, Jika Ketahuan Akan Di Banned.

2. ✧ Jika Bot Tidak Menjawab 1x, Silahkan Dicoba Lagi. Tapi Jika Bot Tidak Menjawab 2x, Itu Artinya Delay, Jangan Dipakai Dulu.

3. ✧ *Jangan Spam Bot, Kalau Belum Donasi, Sadar Diri Aja Makenya* :)

4. ✧ Jika Limit Habis, Silahkan Bermain Game Untuk Mendapatkan Exp. Contoh Game: Tebak-Tebakan, RPG Game, dll.

5. ✧ *Dilarang Mengirim Virtex/Bug Ke Bot*, Walaupun Tidak Ada Efeknya :v

6. ✧ *Dilarang Keras Menelpon Bot*, Jika Menelpon Akan Otomatis Diblokir.

7. ✧ Jika Tidak Mengerti Cara Menggunakan Bot, Silahkan Bertanya Pada Member Lain. Atau Jika Belum Join Group Bot, Ketik #gcbot Dan Masuk Group Bot.

8. ✧ Jika Ada Fitur Error/Tidak Mengerti Cara Menggunakannya, Silahkan Laporkan/Tanyakan Kepada Owner.

9. ✧ Jika Bot Delay, Jangan Di Spam Terlebih Dahulu.

10. ✧ Untuk User *Premium*, *Dilarang Keras Mengirim Bug Asal Ke Orang Lain*.

┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
`
reply(cap)
}
break
case 'robloxstalk': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1); // ❌
        return reply(mess.limit);
    }

    if (!text) return reply(`Masukkan username Roblox\n\nContoh: *${prefix + command} builderman*`);

    await sendReact(m.key, 0); // ⏳

    try {
        const apiUrl = `https://api.siputzx.my.id/api/stalk/roblox?user=${encodeURIComponent(text)}`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json.status || !json.data) {
            await sendReact(m.key, 1); // ❌
            return reply("Gagal mendapatkan data pengguna. Pastikan username benar.");
        }

        const { basic, social, presence, avatar } = json.data;

        const caption = `
🎮 *ROBLOX STALK*

➤ *Nama:* ${basic.name}
➤ *Display:* ${basic.displayName}
➤ *ID:* ${basic.id}
➤ *Status:* ${presence.userPresences[0]?.lastLocation || 'Offline'}
➤ *Banned:* ${basic.isBanned ? 'Ya' : 'Tidak'}
➤ *Badge Verif:* ${basic.hasVerifiedBadge ? 'Ya' : 'Tidak'}
➤ *Friends:* ${social.friends.count.toLocaleString()}
➤ *Followers:* ${social.followers.count.toLocaleString()}
➤ *Following:* ${social.following.count.toLocaleString()}
➤ *Dibuat:* ${new Date(basic.created).toLocaleDateString('id-ID')}
`.trim();

        await kyami.sendMessage(m.chat, {
            image: { url: avatar.headshot.data[0].imageUrl },
            caption: caption
        }, { quoted: m });

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan saat mengakses data Roblox.");
    }
}
break
case 'ttstalk': {
    if (!isPremium) return reply(mess.prem);
    if (!text) return reply(`Contoh: *${prefix + command} mrbeast*`);
    
    await sendReact(m.key, 0); // ⏳

    try {
        const res = await fetch(`https://api.siputzx.my.id/api/stalk/tiktok?username=${encodeURIComponent(text)}`);
        const json = await res.json();
        
        if (!json.status || !json.data) {
            await sendReact(m.key, 1); // ❌
            return reply('Akun tidak ditemukan atau API sedang bermasalah.');
        }

        const user = json.data.user;
        const stats = json.data.stats;

        const caption = `
╭─〔 TIKTOK STALK 〕
│ 👤 *Username:* @${user.uniqueId}
│ 📛 *Nickname:* ${user.nickname}
│ ✅ *Verified:* ${user.verified ? 'Ya' : 'Tidak'}
│ 👥 *Followers:* ${stats.followerCount.toLocaleString()}
│ 👣 *Following:* ${stats.followingCount.toLocaleString()}
│ ❤️ *Likes:* ${stats.heartCount.toLocaleString()}
│ 🎞️ *Video:* ${stats.videoCount.toLocaleString()}
│ 📝 *Bio:* ${user.signature || '-'}
╰──────•••
`.trim();

        await kyami.sendMessage(m.chat, {
            image: { url: user.avatarLarger },
            caption: caption
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply('Gagal mengambil data TikTok.');
    }
}
break
case 'igstalk': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1); // ❌
        return reply(mess.limit);
    }

    if (!text) {
        return reply(`Masukkan username\n\nContoh: *${prefix + command} google*`);
    }

    await sendReact(m.key, 0); // ⏳

    try {
        const apiUrl = `https://api.baguss.xyz/api/stalker/instagram?username=${encodeURIComponent(text)}`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json.status || (!json.fullname && !json.posts)) {
            await sendReact(m.key, 1); // ❌
            return reply("User tidak ditemukan atau API sedang maintenance.");
        }

        const caption = `📷 *Instagram Stalk*\n
👤 Username: ${text}
🏷️ Nama: ${json.fullname || '-'}
📌 Bio: ${json.bio || '-'}
📝 Post: ${json.posts || '0'}
👥 Followers: ${json.followers || '0'}
👣 Following: ${json.following || '0'}`;

        await kyami.sendMessage(m.chat, {
            image: { url: json.profile_pic || "https://telegra.ph/file/7e13f1b8b1b3a3f3b3b2d.jpg" },
            caption: caption
        }, { quoted: m });

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply("Gagal mengambil data dari API.");
    }
}
break
case 'spotify':
case 'sspotify': {
    if (!text) return reply(`Masukkan kata pencarian\n\nContoh: *${prefix + command} serana*`);

    await sendReact(m.key, 0);

    try {
        const apiUrl = `https://api.siputzx.my.id/api/s/spotify?query=${encodeURIComponent(text)}`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json.status || !json.data || json.data.length === 0) {
            await sendReact(m.key, 1);
            return reply("Tidak dapat menemukan lagu");
        }

        let caption = `🎶 *SPOTIFY SEARCH (Top 3)*\n\n`;
        const results = json.data.slice(0, 3);
        const buttons = [];
        
        results.forEach((track, i) => {
            caption += `*${i + 1}. ${track.title}*\n`;
            caption += `👤 Artis: ${track.artist}\n`;
            caption += `⏱ Durasi: ${track.duration}\n\n`;
            
            buttons.push({
                id: `${prefix}spotifydl ${track.track_url}`,
                text: `🎧 Download #${i + 1}`
            });
        }, { quoted: m });

        await sendButtons(kyami, m.chat, {
            image: results[0].thumbnail,
            title: "Spotify Search Results",
            text: caption,
            footer: '© Luxxy | Leo',
            buttons: buttons
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1);
        reply("Gagal mencari lagu");
    }
}
break
case 'spotifydl': {
    initUserLimit(m.sender, isPremium)
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit)
    }

    if (!text || !text.includes('spotify.com')) {
        return reply(`Masukkan link Spotify yang valid\n\nContoh: *${prefix + command} https://open.spotify.com/track/xxxx*`)
    }

    await sendReact(m.key, 0); // ⏳

    try {
        const apiUrl = `https://api.baguss.xyz/api/download/spotify?url=${encodeURIComponent(text)}`
        const res = await fetch(apiUrl)
        const data = await res.json()

        if (!data.status || !data.download) {
            await sendReact(m.key, 1) // ❌
            return reply("Gagal mendapatkan audio dari Spotify")
        }

        const { title, artist, images } = data.metadata
        const audioUrl = data.download

        await kyami.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            fileName: `${title.substring(0, 100)}.mp3`,
            contextInfo: {
                externalAdReply: {
                    title: title.substring(0, 50),
                    body: `Artist: ${artist}`,
                    thumbnailUrl: images,
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    sourceUrl: text
                }
            }
        }, { quoted: m })

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1) // ❌
        reply("Terjadi kesalahan saat mengunduh audio Spotify")
    }
}
break;
case "hackwa": {
    let teks = `🔍 *Memulai proses hack WhatsApp...*\n\n⏳ Menghubungkan ke server...\n📡 Mengakses database...\n🔑 Mengambil kode OTP...\n🛑 *Wowkwk Gimik doang bg ya kali beneran 😭*`;

    setTimeout(() => { reply(teks); }, 2000);
};
break;
case 'quoteshacker': {
  function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
const heker = [
  "Dear kamu yang tertulis di halaman defacementku, Kapan jadi pacarku?",
  "Aku rela ko jadi Processor yg kepanasan, asalkan kmu yg jadi heatsink'y yg setiap saat bisa mendinginkan ku.",
  "Gak usah nyari celah xss deh, karena ketika kamu ngeklik hatiku udah muncul pop up namamu.",
  "berharap setelah aku berhasil login di hati kamu ga akan ada tombol logout, dan sessionku ga bakal pernah expired.",
  "Masa aku harus pake teknik symlink bypass buat buka-buka folder hatimu yg open_basedir enabled.",
  "Diriku dan Dirimu itu ibarat PHP dan MySQL yang belum terkoneksi.",
  "Jangan cuma bisa inject hatinya,tapi harus bisa patchnya juga. Biar tidak selingkuh sama hacker lain.",
  "Aku memang programmer PHP,tapi aku nggak akan php-in kamu kok.",
  "Eneeeng. | Apache? | Km wanita yg paling Unix yg pernah aku kenal |",
  "Sayang, capslock kamu nyala ya? | ngga, kenapa emangnya? | soalnya nama kamu ketulis gede bgt di hati aku | zzz! smile",
  "Aku deketin kamu cuma untuk redirect ke hati temenmu.",
  "Domain aja bisa parkir, masa cintaku ga bisa parkir dihatimu?",
  "Aku boleh jadi pacarmu? | 400(Bad Request) | Aku cium boleh? | 401(Authorization Required) | Aku buka bajumu yah | 402(Payment Required) sad",
  "kamu tau ga beda'y kamu sama sintax PHP, kalo sintax PHP itu susah di hafalin kalo kamu itu susah di lupain",
  "Kamu dulu sekolah SMK ambil kejuruan apa? | Teknik Komputer Jaringan | Terus sekarang bisa apa aja? | Menjaring hatimu lewat komputerku | biggrin",
  "Jika cinta itu Array, maka,cintaku padamu tak pernah empty jika di unset().",
  "SQLI ( Structured Query Love Injection )",
  "aku ingin kamu rm -rf kan semua mantan di otak mu,akulah root hati kamu",
  "Senyumu bagaikan cooler yang menyejukan hatiku ketika sedang overclock.",
  "kamu adalah terminalku, dimana aku menghabiskan waktuku untuk mengetikan beribu baris kode cinta untukmu smile",
  "Aku seneng nongkrong di zone-h, karena disanalah aku arsipkan beberapa website yang ada foto kamunya.",
  "hatiku ibarat vps hanya untukmu saja bukan shared hosting yg bisa tumpuk berbagai domain cinta.",
  "Aku bukanlah VNC Server Tanpa Authentication yg bisa kamu pantau kapan saja.",
  "Jangan men-dualboot-kan hatiku kepadamu.",
  "cintaku kan ku Ctrl+A lalu kan ku Ctrl+C dan kan ku Ctrl+V tepat di folder system hatimu.",
  "KDE kalah Cantiknya, GNOME kalah Simplenya, FluxBox kalah Ringannya, pokonya Semua DE itu Kalah Sama Kamu.",
  "Cintamu bagaikan TeamViewer yang selalu mengendalikan hatiku",
  "cinta kita tak akan bisa dipisahkan walau setebal apapun itu firewall...!!"
]

let bacotan = pickRandom(heker)
  reply(bacotan)
}
break
case 'quotesgombal': {
    function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
const gombal = [
    "Hal yang paling aku suka yaitu ngemil, namun tau gak ngemil apa yang paling aku suka? ngemilikin kamu sepenuhnya.",
    "Seandainya sekarang adalah tanggal 28 oktober 1928, aku akan ubah naskah sumpah pemuda menjadi sumpah aku cinta kamu.",
    "Aku gak pernah merasakan ketakutan sedikit pun ketika berada didekat kamu, karena kamulah kekuatanku.",
    "Kamu tahu apa persamaan rasa sayangku ke kamu dengan matahari? Persamaannya adalah sama-sama terbit setiap hari dan hanya akan berakhir sampai kiamat.",
    "Kalau bus kota jauh dekat ongkosnya sama, tapi cinta ini dekat-dekat makin saling cinta.",
    "Kalausaja aku harus mengorbankan semua kebahagiaanku hanya untuk sekedar membuat kamu tertawa. Aku rela.",
    "Anjing menggonggong kafilah berlalu, tiap hari bengong mikirin kamu melulu.",
    "Kalau aku jadi wakil rakyat kayaknya bakalan gagal deh. Gimana aku mau mikiran rakyat kalau yang ada dipikiran aku itu cuman ada kamu.",
    "denganambah satu sama dengan dua. Aku sama kamu sama dengan saling cinta.",
    "Kalo kita beda kartu GSM, itu gak masalah asalkan nantinya nama kita berdua ada di kartu Keluarga yang sama.",
    "Masalah yang selalu sulit untukku membuat mu mencintai ku, tapi lebih sulit memaksa hatiku untuk berhenti memikirkan dirimu.",
    "Aku harap kamu tidak menanyakan hal terindah yang pernah singgah di kehidupanku, karena jawaban nya adalah kamu.",
    "Hal yang paling aku suka yaitu ngemil, namun tau gak ngemil apa yang paling aku suka? ngemilikin kamu sepenuhnya.",
    "seandainyaa sekarang adalah tanggal 28 oktober 1928, aku akan ubah naskah sumpah pemuda menjadi sumpah aku cinta kamu.",
    "kuu gak pernah merasakan ketakutan sedikit pun ketika berada didekat kamu, karena kamulah kekuatanku.",
    "kamuu tahu apa persamaan rasa sayangku ke kamu dengan matahari? Persamaannya adalah sama-sama terbit setiap hari dan hanya akan berakhir sampai kiamat.",
    "Kalau bus kota jauh dekat ongkosnya sama, tapi cinta ini dekat-dekat makin saling cinta.",
    "jikaa saja aku harus mengorbankan semua kebahagiaanku hanya untuk sekedar membuat kamu tertawa. Aku rela.",
    "Anjing menggonggong kafilah berlalu, tiap hari bengong mikirin kamu melulu.",
    "Kalau aku jadi wakil rakyat kayaknya bakalan gagal deh. Gimana aku mau mikiran rakyat kalau yang ada dipikiran aku itu cuman ada kamu.",
    "atuu tambah satu sama dengan dua. Aku sama kamu sama dengan saling cinta,.",
    "aloo kita beda kartu GSM, itu gak masalah asalkan nantinya nama kita berdua ada di kartu Keluarga yang sama.",
    "Masalah yang selalu sulit untukku membuat mu mencintai ku, tapi lebih sulit memaksa hatiku untuk berhenti memikirkan dirimu.",
    "Aku tak pernah berjanji untuk sebuah perasaan, namun aku berusaha berjanji untuk sebuah kesetiaan.",
    "Aku sangat berharap kamu tau, kalau aku tidak pernah menyesali cintaku untuk mu, karena bagiku memiliki kamu sudah cukup bagi ku.",
    "Jangankan memilikimu, mendengar kamu kentut aja aku sudah bahagia.",
    "Aku mohon jangan jalan-jalan terus di pikiranku, duduk yang manis di hatiku saja.",
    "Berulang tahun memang indah, namun bagiku yang lebih indah jika berulang kali bersamamu.",
    "Napas aku kok sesek banget ya?, karena separuh nafasku ada di kamu.",
    "Jika ada seseorang lebih memilih pergi meninggalkan kamu, jangan pernah memohon padanya untuk tetap bertahan. Karena jika dia cinta, dia tak akan mau pergi.",
    "jangann diam aja dong, memang diam itu emas, tapi ketahuilah suara kamu itu seperti berlian.",
    "Kesasar itu serasa rugi banget, namun aku nggak merasa rugi karena cintaku sudah Biasanya orang yang lagi nyasar itu rugi ya, tapi tau gak? Aku gak merasa rugi sebab cintaku sudah nyasar ke hati bidadari.",
    "Ada 3 hal yang paling aku sukai di dunia ini, yaitu Matahari, Bulan dan Kamu. Matahari untuk siang hari, Bulan untuk malam hari dan Kamu untuk selamanya dihatiku.",
    "Sayang, kamu itu seperti garam di lautan, tidak terlihat namun akan selalu ada untuk selamanya.",
    "kuu gak perlu wanita yang sholeha, tapi bagaimana menuntun wanita yang aku cintai menjadi seorang yang sholehah.",
    "Aku tidak minta bintang atau bulan kepadamu. Cukup temani aku selamanya di bawah cahayanya.",
    "Akuana kalo kita berdua jadi komplotan penjahat: Aku mencuri hatimu, dan kamu mencuri hatiku?",
    "Aku gak perlu wanita yang cantik, tapi bagaimana aku menyanjung wanita yang aku cintai seperti wanita yang paling cantik di bumi ini.",
    "Aku pengen bersamamu cuma pada dua waktu: SEKARANG dan SELAMANYA.",
    "Akuu tuh bikin aku ga bisa tidur tau ga?",
    "Soalnya kamu selalu ada dibayang-bayang aku terus.",
    "Jika aku bisa jadi bagian dari dirimu,aku mau jadi air matamu,yang tersimpan di hatimu, lahir dari matamu, hidup di pipimu, dan mati di bibirmu.",
    "Papa kamu pasti kerja di apotik ya? | kenapa bang? | karena cuma kamu obat sakit hatiku.",
    "akuu selalu berusaha tak menangis karenamu, karena setiap butir yang jatuh, hanya makin mengingatkan, betapa aku tak bisa melepaskanmu.",
    "mauu nanya jalan nih. Jalan ke hatimu lewat mana ya?",
    "Andai sebuah bintang akan jatuh setiap kali aku mengingatmu, bulan pasti protes. Soalnya dia bakal sendirian di angkasa.",
    "Andai kamu gawang aku bolanya. Aku rela ditendang orang-orang demi aku dapat bersamamu,",
    "Dingin malam ini menusuk tulang. Kesendirian adalah kesepian. Maukah kau jadi selimut penghangat diriku?",
    "Keindahan Borobudur keajaiban dunia, keindahan kamu keajaiban cinta.",
    "Aku ingin mengaku dosa. Jangan pernah marah ya. Maafkan sebelumnya. Tadi malam aku mimpiin kamu jadi pacarku. Setelah bangun, akankah mimpiku jadi nyata?",
    "Kalau nggak sih aku bilang aku cinta kamu hari ini? Kalau besok gimana? Besok lusa? Besoknya besok lusa? Gimana kalau selamanya?",
    "Orangtuamu pengrajin bantal yah? Karena terasa nyaman jika di dekatmu.",
    "Jika malam adalah jeruji gelap yang menjadi sangkar, saya ingin terjebak selamanya di sana bersamamu.",
    "Sekarang aku gendutan gak sih? Kamu tau gak kenapa ? Soalnya kamu sudah mengembangkan cinta yang banyak di hatiku.",
    "Di atas langit masih ada langit. Di bawah langit masih ada aku yang mencintai kamu.",
    "Tau tidak kenapa malam ini tidak ada bintang? Soalnya bintangnya pindah semua ke matamu?",
    "Aku mencintaimu! Jika kamu benci aku, panah saja diriku. Tapi jangan di hatiku ya, karena di situ kamu berada.",
    "Bapak kamu pasti seorang astronot? | kok tau? | Soalnya aku melihat banyak bintang di matamu.",
    "Bapak kamu dosen ya? | kok tau? | karena nilai kamu A+ di hatiku.",
    "Kamu pasti kuliah di seni pahat ya? | kok tau sih? | Soalnya kamu pintar sekali memahat namamu di hatiku.",
    "Ya Tuhan, jika dia jodohku, menangkanlah tender pembangunan proyek menara cintaku di hatinya.",
    "Kamu mantan pencuri ya? | kok tau? | Abisnya kamu mencuri hatiku sih!",
    "Cowok : Aku suka senyum-senyum sendiri lho. | Cewek : Hah .. Gila Ya | Cowok : Nggak. Aku sedang mikirin kamu.",
    "Setiap malam aku berjalan-jalan di suatu tempat. Kamu tau di mana itu ? | gatau, emang dimana? | Di hatimu.",
    "Kamu pake Telkomesl ya? Karena sinyal-sinyal cintamu sangat kuat sampai ke hatiku.",
    "Kamu tahu gak sih? AKu tuh capek banget. Capek nahan kangen terus sama kamu.",
    "katanyaa kalau sering hujan itu bisa membuat seseorang terhanyut, kalau aku sekarang sedang terhanyut di dalam cintamu.",
    "Aku harap kamu jangan pergi lagi ya? karena, bila aku berpisah dengamu sedetik saja bagaikan 1000 tahun rasanya.",
    "Aku sih gak butuh week end, yang aku butuhkan hanyalah love you till the end.",
    "Emak kamu tukang Gado gado ya?, kok tau sih?, Pantesan saja kamu telah mencampur adukan perasaanku",
    "Walau hari ini cerah, tetapi tanpa kamu disisiku sama saja berselimutkan awan gelap di hati ini",
    "Kamu ngizinin aku kangen sehari berapa kali neng? Abang takut over dosis.",
    "cintaa aku ke kamu tuh bagaikan hutang, awalnya kecil, lama-lama didiemin malah tambah gede.",
    "Berulang tahun adalah hari yang indah. Tapih akin lebih indah kalo udah berulang-ulang kali bersama kamu."
]
let bacotan = pickRandom(gombal)
  reply(bacotan)

}
break
case 'quotesgalau': {
  function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
const galau = [
    "Gak salah kalo aku lebih berharap sama orang yang lebih pasti tanpa khianati janji-janji",
    "Kalau aku memang tidak sayang sama kamu ngapain aku mikirin kamu. Tapi semuanya kamu yang ngganggap aku gak sayang sama kamu",
    "Jangan iri dan sedih jika kamu tidak memiliki kemampuan seperti yang orang miliki. Yakinlah orang lain juga tidak memiliki kemampuan sepertimu",
    "Hanya kamu yang bisa membuat langkahku terhenti, sambil berkata dalam hati mana bisa aku meninggalkanmu",
    "Tetap tersenyum walaluku masih dibuat menunggu dan rindu olehmu, tapi itu demi kamu",
    "Tak semudah itu melupakanmu",
    "Secuek-cueknya kamu ke aku, aku tetap sayang sama kamu karena kamu telah menerima aku apa adanya",
    "Aku sangat bahagia jika kamu bahagia didekatku, bukan didekatnya",
    "Jadilah diri sendiri, jangan mengikuti orang lain, tetapi tidak sanggup untuk menjalaninya",
    "Cobalah terdiam sejenak untuk memikirkan bagaimana caranya agar kita dapat menyelesaikan masalah ini bersama-sama",
    "Bisakah kita tidak bermusuhan setelah berpisah, aku mau kita seperti dulu sebelum kita jadian yang seru-seruan bareng, bercanda dan yang lainnya",
    "Aku ingin kamu bisa langgeng sama aku dan yang aku harapkan kamu bisa jadi jodohku",
    "Cinta tak bisa dijelaskan dengan kata-kata saja, karena cinta hanya mampu dirasakan oleh hati",
    "Masalah terbesar dalam diri seseorang adalah tak sanggup melawan rasa takutnya",
    "Selamat pagi buat orang yang aku sayang dan orang yang membenciku, semoga hari ini hari yang lebih baik daripada hari kemarin buat aku dan kamu",
    "Jangan menyerah dengan keadaanmu sekarang, optimis karena optimislah yang bikin kita kuat",
    "Kepada pria yang selalu ada di doaku aku mencintaimu dengan tulus apa adanya",
    "Tolong jangan pergi saat aku sudah sangat sayang padamu",
    "Coba kamu yang berada diposisiku, lalu kamu ditinggalin gitu aja sama orang yang lo sayang banget",
    "Aku takut kamu kenapa-napa, aku panik jika kamu sakit, itu karena aku cinta dan sayang padamu",
    "Sakit itu ketika cinta yang aku beri tidak kamu hargai",
    "Kamu tiba-tiba berubah tanpa sebab tapi jika memang ada sebabnya kamu berubah tolong katakan biar saya perbaiki kesalahan itu",
    "Karenamu aku jadi tau cinta yang sesungguhnya",
    "Senyum manismu sangatlah indah, jadi janganlah sampai kamu bersedih",
    "Berawal dari kenalan, bercanda bareng, ejek-ejekan kemudian berubah menjadi suka, nyaman dan akhirnya saling sayang dan mencintai",
    "Tersenyumlah pada orang yang telah menyakitimu agar sia tau arti kesabaran yang luar biasa",
    "Aku akan ingat kenangan pahit itu dan aku akan jadikan pelajaran untuk masa depan yang manis",
    "Kalau memang tak sanggup menepati janjimu itu setidaknya kamu ingat dan usahakan jagan membiarkan janjimu itu sampai kau lupa",
    "Hanya bisa diam dan berfikir Kenapa orang yang setia dan baik ditinggalin yang nakal dikejar-kejar giliran ditinggalin bilangnya laki-laki itu semuanya sama",
    "Walaupun hanya sesaat saja kau membahagiakanku tapi rasa bahagia yang dia tidak cepat dilupakan",
    "Aku tak menyangka kamu pergi dan melupakan ku begitu cepat",
    "Jomblo gak usah diam rumah mumpung malam minggu ya keluar jalan lah kan jomblo bebas bisa dekat sama siapapun pacar orang mantan sahabat bahkan sendiri atau bareng setan pun bisa",
    "Kamu adalah teman yang selalu di sampingku dalam keadaan senang maupun susah Terimakasih kamu selalu ada di sampingku",
    "Aku tak tahu sebenarnya di dalam hatimu itu ada aku atau dia",
    "Tak mudah melupakanmu karena aku sangat mencintaimu meskipun engkau telah menyakiti aku berkali-kali",
    "Hidup ini hanya sebentar jadi lepaskan saja mereka yang menyakitimu Sayangi Mereka yang peduli padamu dan perjuangan mereka yang berarti bagimu",
    "Tolong jangan pergi meninggalkanku aku masih sangat mencintai dan menyayangimu",
    "Saya mencintaimu dan menyayangimu jadi tolong jangan engkau pergi dan meninggalkan ku sendiri",
    "Saya sudah cukup tahu bagaimana sifatmu itu kamu hanya dapat memberikan harapan palsu kepadaku",
    "Aku berusaha mendapatkan cinta darimu tetapi Kamunya nggak peka",
    "Aku bangkit dari jatuh ku setelah kau jatuhkan aku dan aku akan memulainya lagi dari awal Tanpamu",
    "Mungkin sekarang jodohku masih jauh dan belum bisa aku dapat tapi aku yakin jodoh itu Takkan kemana-mana dan akan ku dapatkan",
    "Datang aja dulu baru menghina orang lain kalau memang dirimu dan lebih baik dari yang kau hina",
    "Membelakanginya mungkin lebih baik daripada melihatnya selingkuh didepan mata sendiri",
    "Bisakah hatimu seperti angsa yang hanya setia pada satu orang saja",
    "Aku berdiri disini sendiri menunggu kehadiran dirimu",
    "Aku hanya tersenyum padamu setelah kau menyakitiku agar kamu tahu arti kesabaran",
    "Maaf aku lupa ternyata aku bukan siapa-siapa",
    "Untuk memegang janjimu itu harus ada buktinya jangan sampai hanya janji palsu",
    "Aku tidak bisa selamanya menunggu dan kini aku menjadi ragu Apakah kamu masih mencintaiku",
    "Jangan buat aku terlalu berharap jika kamu tidak menginginkanku",
    "Lebih baik sendiri daripada berdua tapi tanpa kepastian",
    "Pergi bukan berarti berhenti mencintai tapi kecewa dan lelah karena harus berjuang sendiri",
    "Bukannya aku tidak ingin menjadi pacarmu Aku hanya ingin dipersatukan dengan cara yang benar",
    "Akan ada saatnya kok aku akan benar-benar lupa dan tidak memikirkan mu lagi",
    "Kenapa harus jatuh cinta kepada orang yang tak bisa dimiliki",
    "Jujur aku juga memiliki perasaan terhadapmu dan tidak bisa menolakmu tapi aku juga takut untuk mencintaimu",
    "Maafkan aku sayang tidak bisa menjadi seperti yang kamu mau",
    "Jangan memberi perhatian lebih seperti itu cukup biasa saja tanpa perlu menimbulkan rasa",
    "Aku bukan mencari yang sempurna tapi yang terbaik untukku",
    "Sendiri itu tenang tidak ada pertengkaran kebohongan dan banyak aturan",
    "Cewek strong itu adalah yang sabar dan tetap tersenyum meskipun dalam keadaan terluka",
    "Terima kasih karena kamu aku menjadi lupa tentang masa laluku",
    "Cerita cinta indah tanpa masalah itu hanya di dunia dongeng saja",
    "Kamu tidak akan menemukan apa-apa di masa lalu Yang ada hanyalah penyesalan dan sakit hati",
    "Mikirin orang yang gak pernah mikirin kita itu emang bikin gila",
    "Dari sekian lama menunggu apa yang sudah didapat",
    "Perasaan Bodo gue adalah bisa jatuh cinta sama orang yang sama meski udah disakiti berkali-kali",
    "Yang sendiri adalah yang bersabar menunggu pasangan sejatinya",
    "Aku terlahir sederhana dan ditinggal sudah biasa",
    "Aku sayang kamu tapi aku masih takut untuk mencintaimu",
    "Bisa berbagi suka dan duka bersamamu itu sudah membuatku bahagia",
    "Aku tidak pernah berpikir kamu akan menjadi yang sementara",
    "Jodoh itu bukan seberapa dekat kamu dengannya tapi seberapa yakin kamu dengan Allah",
    "Jangan paksa aku menjadi cewek seperti seleramu",
    "Hanya yang sabar yang mampu melewati semua kekecewaan",
    "Balikan sama kamu itu sama saja bunuh diri dan melukai perasaan ku sendiri",
    "Tak perlu membalas dengan menyakiti biar Karma yang akan urus semua itu",
    "Aku masih ingat kamu tapi perasaanku sudah tidak sakit seperti dulu",
    "Punya kalimat sendiri & mau ditambahin? chat *.owner*"
]
    let bacotan = pickRandom(galau)
  reply(bacotan)
}
break
case 'quotesmotivasi': {
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const motivasi = [
"ᴊᴀɴɢᴀɴ ʙɪᴄᴀʀᴀ, ʙᴇʀᴛɪɴᴅᴀᴋ ꜱᴀᴊᴀ. ᴊᴀɴɢᴀɴ ᴋᴀᴛᴀᴋᴀɴ, ᴛᴜɴᴊᴜᴋᴋᴀɴ ꜱᴀᴊᴀ. ᴊᴀɴɢᴀɴ ᴊᴀɴᴊɪ, ʙᴜᴋᴛɪᴋᴀɴ ꜱᴀᴊᴀ.",
"ᴊᴀɴɢᴀɴ ᴘᴇʀɴᴀʜ ʙᴇʀʜᴇɴᴛɪ ᴍᴇʟᴀᴋᴜᴋᴀɴ ʏᴀɴɢ ᴛᴇʀʙᴀɪᴋ ʜᴀɴʏᴀ ᴋᴀʀᴇɴᴀ ꜱᴇꜱᴇᴏʀᴀɴɢ ᴛɪᴅᴀᴋ ᴍᴇᴍʙᴇʀɪ ᴀɴᴅᴀ ᴘᴇɴɢʜᴀʀɢᴀᴀɴ.",
"ʙᴇᴋᴇʀᴊᴀ ꜱᴀᴀᴛ ᴍᴇʀᴇᴋᴀ ᴛɪᴅᴜʀ. ʙᴇʟᴀᴊᴀʀ ꜱᴀᴀᴛ ᴍᴇʀᴇᴋᴀ ʙᴇʀᴘᴇꜱᴛᴀ. ʜᴇᴍᴀᴛ ꜱᴇᴍᴇɴᴛᴀʀᴀ ᴍᴇʀᴇᴋᴀ ᴍᴇɴɢʜᴀʙɪꜱᴋᴀɴ. ʜɪᴅᴜᴘʟᴀʜ ꜱᴇᴘᴇʀᴛɪ ᴍɪᴍᴘɪ ᴍᴇʀᴇᴋᴀ.",
"ᴋᴜɴᴄɪ ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇᴍᴜꜱᴀᴛᴋᴀɴ ᴘɪᴋɪʀᴀɴ ꜱᴀᴅᴀʀ ᴋɪᴛᴀ ᴘᴀᴅᴀ ʜᴀʟ-ʜᴀʟ ʏᴀɴɢ ᴋɪᴛᴀ ɪɴɢɪɴᴋᴀɴ, ʙᴜᴋᴀɴ ʜᴀʟ-ʜᴀʟ ʏᴀɴɢ ᴋɪᴛᴀ ᴛᴀᴋᴜᴛɪ.",
"ᴊᴀɴɢᴀɴ ᴛᴀᴋᴜᴛ ɢᴀɢᴀʟ. ᴋᴇᴛᴀᴋᴜᴛᴀɴ ʙᴇʀᴀᴅᴀ ᴅɪ ᴛᴇᴍᴘᴀᴛ ʏᴀɴɢ ꜱᴀᴍᴀ ᴛᴀʜᴜɴ ᴅᴇᴘᴀɴ ꜱᴇᴘᴇʀᴛɪ ᴀɴᴅᴀ ꜱᴀᴀᴛ ɪɴɪ.",
"ᴊɪᴋᴀ ᴋɪᴛᴀ ᴛᴇʀᴜꜱ ᴍᴇʟᴀᴋᴜᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋɪᴛᴀ ʟᴀᴋᴜᴋᴀɴ, ᴋɪᴛᴀ ᴀᴋᴀɴ ᴛᴇʀᴜꜱ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋɪᴛᴀ ᴅᴀᴘᴀᴛᴋᴀɴ.",
"ᴊɪᴋᴀ ᴀɴᴅᴀ ᴛɪᴅᴀᴋ ᴅᴀᴘᴀᴛ ᴍᴇɴɢᴀᴛᴀꜱɪ ꜱᴛʀᴇꜱ, ᴀɴᴅᴀ ᴛɪᴅᴀᴋ ᴀᴋᴀɴ ᴍᴇɴɢᴇʟᴏʟᴀ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ.",
"ʙᴇʀꜱɪᴋᴀᴘ ᴋᴇʀᴀꜱ ᴋᴇᴘᴀʟᴀ ᴛᴇɴᴛᴀɴɢ ᴛᴜᴊᴜᴀɴ ᴀɴᴅᴀ ᴅᴀɴ ꜰʟᴇᴋꜱɪʙᴇʟ ᴛᴇɴᴛᴀɴɢ ᴍᴇᴛᴏᴅᴇ ᴀɴᴅᴀ.",
"ᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱ ᴍᴇɴɢᴀʟᴀʜᴋᴀɴ ʙᴀᴋᴀᴛ ᴋᴇᴛɪᴋᴀ ʙᴀᴋᴀᴛ ᴛɪᴅᴀᴋ ʙᴇᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱ.",
"ɪɴɢᴀᴛʟᴀʜ ʙᴀʜᴡᴀ ᴘᴇʟᴀᴊᴀʀᴀɴ ᴛᴇʀʙᴇꜱᴀʀ ᴅᴀʟᴀᴍ ʜɪᴅᴜᴘ ʙɪᴀꜱᴀɴʏᴀ ᴅɪᴘᴇʟᴀᴊᴀʀɪ ᴅᴀʀɪ ꜱᴀᴀᴛ-ꜱᴀᴀᴛ ᴛᴇʀʙᴜʀᴜᴋ ᴅᴀɴ ᴅᴀʀɪ ᴋᴇꜱᴀʟᴀʜᴀɴ ᴛᴇʀʙᴜʀᴜᴋ.",
"ʜɪᴅᴜᴘ ʙᴜᴋᴀɴ ᴛᴇɴᴛᴀɴɢ ᴍᴇɴᴜɴɢɢᴜ ʙᴀᴅᴀɪ ʙᴇʀʟᴀʟᴜ, ᴛᴇᴛᴀᴘɪ ʙᴇʟᴀᴊᴀʀ ᴍᴇɴᴀʀɪ ᴅɪ ᴛᴇɴɢᴀʜ ʜᴜᴊᴀɴ.",
"ᴊɪᴋᴀ ʀᴇɴᴄᴀɴᴀɴʏᴀ ᴛɪᴅᴀᴋ ʙᴇʀʜᴀꜱɪʟ, ᴜʙᴀʜ ʀᴇɴᴄᴀɴᴀɴʏᴀ ʙᴜᴋᴀɴ ᴛᴜᴊᴜᴀɴɴʏᴀ.",
"ᴊᴀɴɢᴀɴ ᴛᴀᴋᴜᴛ ᴋᴀʟᴀᴜ ʜɪᴅᴜᴘᴍᴜ ᴀᴋᴀɴ ʙᴇʀᴀᴋʜɪʀ; ᴛᴀᴋᴜᴛʟᴀʜ ᴋᴀʟᴀᴜ ʜɪᴅᴜᴘᴍᴜ ᴛᴀᴋ ᴘᴇʀɴᴀʜ ᴅɪᴍᴜʟᴀɪ.",
"ᴏʀᴀɴɢ ʏᴀɴɢ ʙᴇɴᴀʀ-ʙᴇɴᴀʀ ʜᴇʙᴀᴛ ᴀᴅᴀʟᴀʜ ᴏʀᴀɴɢ ʏᴀɴɢ ᴍᴇᴍʙᴜᴀᴛ ꜱᴇᴛɪᴀᴘ ᴏʀᴀɴɢ ᴍᴇʀᴀꜱᴀ ʜᴇʙᴀᴛ.",
"ᴘᴇɴɢᴀʟᴀᴍᴀɴ ᴀᴅᴀʟᴀʜ ɢᴜʀᴜ ʏᴀɴɢ ʙᴇʀᴀᴛ ᴋᴀʀᴇɴᴀ ᴅɪᴀ ᴍᴇᴍʙᴇʀɪᴋᴀɴ ᴛᴇꜱ ᴛᴇʀʟᴇʙɪʜ ᴅᴀʜᴜʟᴜ, ᴋᴇᴍᴜᴅɪᴀɴ ᴘᴇʟᴀᴊᴀʀᴀɴɴʏᴀ.",
"ᴍᴇɴɢᴇᴛᴀʜᴜɪ ꜱᴇʙᴇʀᴀᴘᴀ ʙᴀɴʏᴀᴋ ʏᴀɴɢ ᴘᴇʀʟᴜ ᴅɪᴋᴇᴛᴀʜᴜɪ ᴀᴅᴀʟᴀʜ ᴀᴡᴀʟ ᴅᴀʀɪ ʙᴇʟᴀᴊᴀʀ ᴜɴᴛᴜᴋ ʜɪᴅᴜᴘ.",
"ꜱᴜᴋꜱᴇꜱ ʙᴜᴋᴀɴʟᴀʜ ᴀᴋʜɪʀ, ᴋᴇɢᴀɢᴀʟᴀɴ ᴛɪᴅᴀᴋ ꜰᴀᴛᴀʟ. ʏᴀɴɢ ᴛᴇʀᴘᴇɴᴛɪɴɢ ᴀᴅᴀʟᴀʜ ᴋᴇʙᴇʀᴀɴɪᴀɴ ᴜɴᴛᴜᴋ ᴍᴇʟᴀɴᴊᴜᴛᴋᴀɴ.",
"ʟᴇʙɪʜ ʙᴀɪᴋ ɢᴀɢᴀʟ ᴅᴀʟᴀᴍ ᴏʀɪꜱɪɴᴀʟɪᴛᴀꜱ ᴅᴀʀɪᴘᴀᴅᴀ ʙᴇʀʜᴀꜱɪʟ ᴍᴇɴɪʀᴜ.",
"ʙᴇʀᴀɴɪ ʙᴇʀᴍɪᴍᴘɪ, ᴛᴀᴘɪ ʏᴀɴɢ ʟᴇʙɪʜ ᴘᴇɴᴛɪɴɢ, ʙᴇʀᴀɴɪ ᴍᴇʟᴀᴋᴜᴋᴀɴ ᴛɪɴᴅᴀᴋᴀɴ ᴅɪ ʙᴀʟɪᴋ ɪᴍᴘɪᴀɴᴍᴜ.",
"ᴛᴇᴛᴀᴘᴋᴀɴ ᴛᴜᴊᴜᴀɴ ᴀɴᴅᴀ ᴛɪɴɢɢɪ-ᴛɪɴɢɢɪ, ᴅᴀɴ ᴊᴀɴɢᴀɴ ʙᴇʀʜᴇɴᴛɪ ꜱᴀᴍᴘᴀɪ ᴀɴᴅᴀ ᴍᴇɴᴄᴀᴘᴀɪɴʏᴀ.",
"ᴋᴇᴍʙᴀɴɢᴋᴀɴ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ ᴅᴀʀɪ ᴋᴇɢᴀɢᴀʟᴀɴ. ᴋᴇᴘᴜᴛᴜꜱᴀꜱᴀᴀɴ ᴅᴀɴ ᴋᴇɢᴀɢᴀʟᴀɴ ᴀᴅᴀʟᴀʜ ᴅᴜᴀ ʙᴀᴛᴜ ʟᴏɴᴄᴀᴛᴀɴ ᴘᴀʟɪɴɢ ᴘᴀꜱᴛɪ ᴍᴇɴᴜᴊᴜ ꜱᴜᴋꜱᴇꜱ.",
"ᴊᴇɴɪᴜꜱ ᴀᴅᴀʟᴀʜ ꜱᴀᴛᴜ ᴘᴇʀꜱᴇɴ ɪɴꜱᴘɪʀᴀꜱɪ ᴅᴀɴ ꜱᴇᴍʙɪʟᴀɴ ᴘᴜʟᴜʜ ꜱᴇᴍʙɪʟᴀɴ ᴘᴇʀꜱᴇɴ ᴋᴇʀɪɴɢᴀᴛ.",
"ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴛᴇᴍᴘᴀᴛ ᴘᴇʀꜱɪᴀᴘᴀɴ ᴅᴀɴ ᴋᴇꜱᴇᴍᴘᴀᴛᴀɴ ʙᴇʀᴛᴇᴍᴜ.",
"ᴋᴇᴛᴇᴋᴜɴᴀɴ ɢᴀɢᴀʟ 19 ᴋᴀʟɪ ᴅᴀɴ ʙᴇʀʜᴀꜱɪʟ ᴘᴀᴅᴀ ᴋᴇꜱᴇᴍᴘᴀᴛᴀᴍ ʏᴀɴɢ ᴋᴇ-20.",
"ᴊᴀʟᴀɴ ᴍᴇɴᴜᴊᴜ ꜱᴜᴋꜱᴇꜱ ᴅᴀɴ ᴊᴀʟᴀɴ ᴍᴇɴᴜᴊᴜ ᴋᴇɢᴀɢᴀʟᴀɴ ʜᴀᴍᴘɪʀ ᴘᴇʀꜱɪꜱ ꜱᴀᴍᴀ.",
"ꜱᴜᴋꜱᴇꜱ ʙɪᴀꜱᴀɴʏᴀ ᴅᴀᴛᴀɴɢ ᴋᴇᴘᴀᴅᴀ ᴍᴇʀᴇᴋᴀ ʏᴀɴɢ ᴛᴇʀʟᴀʟᴜ ꜱɪʙᴜᴋ ᴍᴇɴᴄᴀʀɪɴʏᴀ.",
"ᴊᴀɴɢᴀɴ ᴛᴜɴᴅᴀ ᴘᴇᴋᴇʀᴊᴀᴀɴᴍᴜ ꜱᴀᴍᴘᴀɪ ʙᴇꜱᴏᴋ, ꜱᴇᴍᴇɴᴛᴀʀᴀ ᴋᴀᴜ ʙɪꜱᴀ ᴍᴇɴɢᴇʀᴊᴀᴋᴀɴɴʏᴀ ʜᴀʀɪ ɪɴɪ.",
"20 ᴛᴀʜᴜɴ ᴅᴀʀɪ ꜱᴇᴋᴀʀᴀɴɢ, ᴋᴀᴜ ᴍᴜɴɢᴋɪɴ ʟᴇʙɪʜ ᴋᴇᴄᴇᴡᴀ ᴅᴇɴɢᴀɴ ʜᴀʟ-ʜᴀʟ ʏᴀɴɢ ᴛɪᴅᴀᴋ ꜱᴇᴍᴘᴀᴛ ᴋᴀᴜ ʟᴀᴋᴜᴋᴀɴ ᴀʟɪʜ-ᴀʟɪʜ ʏᴀɴɢ ꜱᴜᴅᴀʜ.",
"ᴊᴀɴɢᴀɴ ʜᴀʙɪꜱᴋᴀɴ ᴡᴀᴋᴛᴜᴍᴜ ᴍᴇᴍᴜᴋᴜʟɪ ᴛᴇᴍʙᴏᴋ ᴅᴀɴ ʙᴇʀʜᴀʀᴀᴘ ʙɪꜱᴀ ᴍᴇɴɢᴜʙᴀʜɴʏᴀ ᴍᴇɴᴊᴀᴅɪ ᴘɪɴᴛᴜ.",
"ᴋᴇꜱᴇᴍᴘᴀᴛᴀɴ ɪᴛᴜ ᴍɪʀɪᴘ ꜱᴇᴘᴇʀᴛɪ ᴍᴀᴛᴀʜᴀʀɪ ᴛᴇʀʙɪᴛ. ᴋᴀʟᴀᴜ ᴋᴀᴜ ᴍᴇɴᴜɴɢɢᴜ ᴛᴇʀʟᴀʟᴜ ʟᴀᴍᴀ, ᴋᴀᴜ ʙɪꜱᴀ ᴍᴇʟᴇᴡᴀᴛᴋᴀɴɴʏᴀ.",
"ʜɪᴅᴜᴘ ɪɴɪ ᴛᴇʀᴅɪʀɪ ᴅᴀʀɪ 10 ᴘᴇʀꜱᴇɴ ᴀᴘᴀ ʏᴀɴɢ ᴛᴇʀᴊᴀᴅɪ ᴘᴀᴅᴀᴍᴜ ᴅᴀɴ 90 ᴘᴇʀꜱᴇɴ ʙᴀɢᴀɪᴍᴀɴᴀ ᴄᴀʀᴀᴍᴜ ᴍᴇɴʏɪᴋᴀᴘɪɴʏᴀ.",
"ᴀᴅᴀ ᴛɪɢᴀ ᴄᴀʀᴀ ᴜɴᴛᴜᴋ ᴍᴇɴᴄᴀᴘᴀɪ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ ᴛᴇʀᴛɪɴɢɢɪ: ᴄᴀʀᴀ ᴘᴇʀᴛᴀᴍᴀ ᴀᴅᴀʟᴀʜ ʙᴇʀꜱɪᴋᴀᴘ ʙᴀɪᴋ. ᴄᴀʀᴀ ᴋᴇᴅᴜᴀ ᴀᴅᴀʟᴀʜ ʙᴇʀꜱɪᴋᴀᴘ ʙᴀɪᴋ. ᴄᴀʀᴀ ᴋᴇᴛɪɢᴀ ᴀᴅᴀʟᴀʜ ᴍᴇɴᴊᴀᴅɪ ʙᴀɪᴋ.",
"ᴀʟᴀꜱᴀɴ ɴᴏᴍᴏʀ ꜱᴀᴛᴜ ᴏʀᴀɴɢ ɢᴀɢᴀʟ ᴅᴀʟᴀᴍ ʜɪᴅᴜᴘ ᴀᴅᴀʟᴀʜ ᴋᴀʀᴇɴᴀ ᴍᴇʀᴇᴋᴀ ᴍᴇɴᴅᴇɴɢᴀʀᴋᴀɴ ᴛᴇᴍᴀɴ, ᴋᴇʟᴜᴀʀɢᴀ, ᴅᴀɴ ᴛᴇᴛᴀɴɢɢᴀ ᴍᴇʀᴇᴋᴀ.",
"ᴡᴀᴋᴛᴜ ʟᴇʙɪʜ ʙᴇʀʜᴀʀɢᴀ ᴅᴀʀɪᴘᴀᴅᴀ ᴜᴀɴɢ. ᴋᴀᴍᴜ ʙɪꜱᴀ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ʟᴇʙɪʜ ʙᴀɴʏᴀᴋ ᴜᴀɴɢ, ᴛᴇᴛᴀᴘɪ ᴋᴀᴍᴜ ᴛɪᴅᴀᴋ ʙɪꜱᴀ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ʟᴇʙɪʜ ʙᴀɴʏᴀᴋ ᴡᴀᴋᴛᴜ.",
"ᴘᴇɴᴇᴛᴀᴘᴀɴ ᴛᴜᴊᴜᴀɴ ᴀᴅᴀʟᴀʜ ʀᴀʜᴀꜱɪᴀ ᴍᴀꜱᴀ ᴅᴇᴘᴀɴ ʏᴀɴɢ ᴍᴇɴᴀʀɪᴋ.",
"ꜱᴀᴀᴛ ᴋɪᴛᴀ ʙᴇʀᴜꜱᴀʜᴀ ᴜɴᴛᴜᴋ ᴍᴇɴᴊᴀᴅɪ ʟᴇʙɪʜ ʙᴀɪᴋ ᴅᴀʀɪ ᴋɪᴛᴀ, ꜱᴇɢᴀʟᴀ ꜱᴇꜱᴜᴀᴛᴜ ᴅɪ ꜱᴇᴋɪᴛᴀʀ ᴋɪᴛᴀ ᴊᴜɢᴀ ᴍᴇɴᴊᴀᴅɪ ʟᴇʙɪʜ ʙᴀɪᴋ.",
"ᴘᴇʀᴛᴜᴍʙᴜʜᴀɴ ᴅɪᴍᴜʟᴀɪ ᴋᴇᴛɪᴋᴀ ᴋɪᴛᴀ ᴍᴜʟᴀɪ ᴍᴇɴᴇʀɪᴍᴀ ᴋᴇʟᴇᴍᴀʜᴀɴ ᴋɪᴛᴀ ꜱᴇɴᴅɪʀɪ.",
"ᴊᴀɴɢᴀɴʟᴀʜ ᴘᴇʀɴᴀʜ ᴍᴇɴʏᴇʀᴀʜ ᴋᴇᴛɪᴋᴀ ᴀɴᴅᴀ ᴍᴀꜱɪʜ ᴍᴀᴍᴘᴜ ʙᴇʀᴜꜱᴀʜᴀ ʟᴀɢɪ. ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴋᴀᴛᴀ ʙᴇʀᴀᴋʜɪʀ ꜱᴀᴍᴘᴀɪ ᴀɴᴅᴀ ʙᴇʀʜᴇɴᴛɪ ᴍᴇɴᴄᴏʙᴀ.",
"ᴋᴇᴍᴀᴜᴀɴ ᴀᴅᴀʟᴀʜ ᴋᴜɴᴄɪ ꜱᴜᴋꜱᴇꜱ. ᴏʀᴀɴɢ-ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ, ʙᴇʀᴜꜱᴀʜᴀ ᴋᴇʀᴀꜱ ᴀᴘᴀ ᴘᴜɴ ʏᴀɴɢ ᴍᴇʀᴇᴋᴀ ʀᴀꜱᴀᴋᴀɴ ᴅᴇɴɢᴀɴ ᴍᴇɴᴇʀᴀᴘᴋᴀɴ ᴋᴇɪɴɢɪɴᴀɴ ᴍᴇʀᴇᴋᴀ ᴜɴᴛᴜᴋ ᴍᴇɴɢᴀᴛᴀꜱɪ ꜱɪᴋᴀᴘ ᴀᴘᴀᴛɪꜱ, ᴋᴇʀᴀɢᴜᴀɴ ᴀᴛᴀᴜ ᴋᴇᴛᴀᴋᴜᴛᴀɴ.",
"ᴊᴀɴɢᴀɴʟᴀʜ ᴘᴇʀɴᴀʜ ᴍᴇɴʏᴇʀᴀʜ ᴋᴇᴛɪᴋᴀ ᴀɴᴅᴀ ᴍᴀꜱɪʜ ᴍᴀᴍᴘᴜ ʙᴇʀᴜꜱᴀʜᴀ ʟᴀɢɪ. ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴋᴀᴛᴀ ʙᴇʀᴀᴋʜɪʀ ꜱᴀᴍᴘᴀɪ ᴀɴᴅᴀ ʙᴇʀʜᴇɴᴛɪ ᴍᴇɴᴄᴏʙᴀ.",
"ᴋᴇᴍᴀᴜᴀɴ ᴀᴅᴀʟᴀʜ ᴋᴜɴᴄɪ ꜱᴜᴋꜱᴇꜱ. ᴏʀᴀɴɢ-ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ, ʙᴇʀᴜꜱᴀʜᴀ ᴋᴇʀᴀꜱ ᴀᴘᴀ ᴘᴜɴ ʏᴀɴɢ ᴍᴇʀᴇᴋᴀ ʀᴀꜱᴀᴋᴀɴ ᴅᴇɴɢᴀɴ ᴍᴇɴᴇʀᴀᴘᴋᴀɴ ᴋᴇɪɴɢɪɴᴀɴ ᴍᴇʀᴇᴋᴀ ᴜɴᴛᴜᴋ ᴍᴇɴɢᴀᴛᴀꜱɪ ꜱɪᴋᴀᴘ ᴀᴘᴀᴛɪꜱ, ᴋᴇʀᴀɢᴜᴀɴ ᴀᴛᴀᴜ ᴋᴇᴛᴀᴋᴜᴛᴀɴ.",
"ʜᴀʟ ᴘᴇʀᴛᴀᴍᴀ ʏᴀɴɢ ᴅɪʟᴀᴋᴜᴋᴀɴ ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇᴍᴀɴᴅᴀɴɢ ᴋᴇɢᴀɢᴀʟᴀɴ ꜱᴇʙᴀɢᴀɪ ꜱɪɴʏᴀʟ ᴘᴏꜱɪᴛɪꜰ ᴜɴᴛᴜᴋ ꜱᴜᴋꜱᴇꜱ.",
"ᴄɪʀɪ ᴋʜᴀꜱ ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇʀᴇᴋᴀ ꜱᴇʟᴀʟᴜ ʙᴇʀᴜꜱᴀʜᴀ ᴋᴇʀᴀꜱ ᴜɴᴛᴜᴋ ᴍᴇᴍᴘᴇʟᴀᴊᴀʀɪ ʜᴀʟ-ʜᴀʟ ʙᴀʀᴜ.",
"ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋᴀᴍᴜ ɪɴɢɪɴᴋᴀɴ, ᴋᴇʙᴀʜᴀɢɪᴀᴀɴ ᴍᴇɴɢɪɴɢɪɴᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋᴀᴍᴜ ᴅᴀᴘᴀᴛᴋᴀɴ.",
"ᴏʀᴀɴɢ ᴘᴇꜱɪᴍɪꜱ ᴍᴇʟɪʜᴀᴛ ᴋᴇꜱᴜʟɪᴛᴀɴ ᴅɪ ꜱᴇᴛɪᴀᴘ ᴋᴇꜱᴇᴍᴘᴀᴛᴀɴ. ᴏʀᴀɴɢ ʏᴀɴɢ ᴏᴘᴛɪᴍɪꜱ ᴍᴇʟɪʜᴀᴛ ᴘᴇʟᴜᴀɴɢ ᴅᴀʟᴀᴍ ꜱᴇᴛɪᴀᴘ ᴋᴇꜱᴜʟɪᴛᴀɴ.",
"ᴋᴇʀᴀɢᴜᴀɴ ᴍᴇᴍʙᴜɴᴜʜ ʟᴇʙɪʜ ʙᴀɴʏᴀᴋ ᴍɪᴍᴘɪ ᴅᴀʀɪᴘᴀᴅᴀ ᴋᴇɢᴀɢᴀʟᴀɴ.",
"ʟᴀᴋᴜᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ʜᴀʀᴜꜱ ᴋᴀᴍᴜ ʟᴀᴋᴜᴋᴀɴ ꜱᴀᴍᴘᴀɪ ᴋᴀᴍᴜ ᴅᴀᴘᴀᴛ ᴍᴇʟᴀᴋᴜᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ɪɴɢɪɴ ᴋᴀᴍᴜ ʟᴀᴋᴜᴋᴀɴ.",
"ᴏᴘᴛɪᴍɪꜱᴛɪꜱ ᴀᴅᴀʟᴀʜ ꜱᴀʟᴀʜ ꜱᴀᴛᴜ ᴋᴜᴀʟɪᴛᴀꜱ ʏᴀɴɢ ʟᴇʙɪʜ ᴛᴇʀᴋᴀɪᴛ ᴅᴇɴɢᴀɴ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ ᴅᴀɴ ᴋᴇʙᴀʜᴀɢɪᴀᴀɴ ᴅᴀʀɪᴘᴀᴅᴀ ʏᴀɴɢ ʟᴀɪɴ.",
"ᴘᴇɴɢʜᴀʀɢᴀᴀɴ ᴘᴀʟɪɴɢ ᴛɪɴɢɢɪ ʙᴀɢɪ ꜱᴇᴏʀᴀɴɢ ᴘᴇᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱ ʙᴜᴋᴀɴʟᴀʜ ᴀᴘᴀ ʏᴀɴɢ ᴅɪᴀ ᴘᴇʀᴏʟᴇʜ ᴅᴀʀɪ ᴘᴇᴋᴇʀᴊᴀᴀɴ ɪᴛᴜ, ᴛᴀᴘɪ ꜱᴇʙᴇʀᴀᴘᴀ ʙᴇʀᴋᴇᴍʙᴀɴɢ ɪᴀ ᴅᴇɴɢᴀɴ ᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱɴʏᴀ ɪᴛᴜ.",
"ᴄᴀʀᴀ ᴛᴇʀʙᴀɪᴋ ᴜɴᴛᴜᴋ ᴍᴇᴍᴜʟᴀɪ ᴀᴅᴀʟᴀʜ ᴅᴇɴɢᴀɴ ʙᴇʀʜᴇɴᴛɪ ʙᴇʀʙɪᴄᴀʀᴀ ᴅᴀɴ ᴍᴜʟᴀɪ ᴍᴇʟᴀᴋᴜᴋᴀɴ.",
"ᴋᴇɢᴀɢᴀʟᴀɴ ᴛɪᴅᴀᴋ ᴀᴋᴀɴ ᴘᴇʀɴᴀʜ ᴍᴇɴʏᴜꜱᴜʟ ᴊɪᴋᴀ ᴛᴇᴋᴀᴅ ᴜɴᴛᴜᴋ ꜱᴜᴋꜱᴇꜱ ᴄᴜᴋᴜᴘ ᴋᴜᴀᴛ."
]
let motivasii = pickRandom(motivasi)
    reply(`"${motivasii}"`)
}
break
case 'quotesbucin': {
const bucin = [
    "Aku memilih untuk sendiri, bukan karena menunggu yang sempurna, tetapi butuh yang tak pernah menyerah.",
    "Seorang yang single diciptakan bersama pasangan yang belum ditemukannya.",
    "Jomblo. Mungkin itu cara Tuhan untuk mengatakan 'Istirahatlah dari cinta yang salah'.",
    "Jomblo adalah anak muda yang mendahulukan pengembangan pribadinya untuk cinta yang lebih berkelas nantinya.",
    "Aku bukan mencari seseorang yang sempurna, tapi aku mencari orang yang menjadi sempurna berkat kelebihanku.",
    "Pacar orang adalah jodoh kita yang tertunda.",
    "Jomblo pasti berlalu. Semua ada saatnya, saat semua kesendirian menjadi sebuah kebersamaan dengannya kekasih halal. Bersabarlah.",
    "Romeo rela mati untuk juliet, Jack mati karena menyelamatkan Rose. Intinya, kalau tetap mau hidup, jadilah single.",
    "Aku mencari orang bukan dari kelebihannya tapi aku mencari orang dari ketulusan hatinya.",
    "Jodoh bukan sendal jepit, yang kerap tertukar. Jadi teruslah berada dalam perjuangan yang semestinya.",
    "Kalau kamu jadi senar gitar, aku nggak mau jadi gitarisnya. Karena aku nggak mau mutusin kamu.",
    "Bila mencintaimu adalah ilusi, maka izinkan aku berimajinasi selamanya.",
    "Sayang... Tugas aku hanya mencintaimu, bukan melawan takdir.",
    "Saat aku sedang bersamamu rasanya 1 jam hanya 1 detik, tetapi jika aku jauh darimu rasanya 1 hari menjadi 1 tahun.",
    "Kolak pisang tahu sumedang, walau jarak membentang cintaku takkan pernah hilang.",
    "Aku ingin menjadi satu-satunya, bukan salah satunya.",
    "Aku tidak bisa berjanji untuk menjadi yang baik. Tapi aku berjanji akan selalu mendampingi kamu.",
    "Kalau aku jadi wakil rakyat aku pasti gagal, gimana mau mikirin rakyat kalau yang selalu ada dipikiran aku hanyalah dirimu.",
    "Lihat kebunku, penuh dengan bunga. Lihat matamu, hatiku berbunga-bunga.",
    "Berjanjilah untuk terus bersamaku sekarang, esok, dan selamanya.",
    "Rindu tidak hanya muncul karena jarak yang terpisah. Tapi juga karena keinginan yang tidak terwujud.",
    "Kamu tidak akan pernah jauh dariku, kemanapun aku pergi kamu selalu ada, karena kamu selalu di hatiku, yang jauh hanya raga kita bukan hati kita.",
    "Aku tahu dalam setiap tatapanku, kita terhalang oleh jarak dan waktu. Tapi aku yakin kalau nanti kita pasti bisa bersatu.",
    "Merindukanmu tanpa pernah bertemu sama halnya dengan menciptakan lagu yang tak pernah ternyayikan.",
    "Ada kalanya jarak selalu menjadi penghalang antara aku sama kamu, namun tetap saja di hatiku kita selalu dekat.",
    "Jika hati ini tak mampu membendung segala kerinduan, apa daya tak ada yang bisa aku lakukan selain mendoakanmu.",
    "Mungkin di saat ini aku hanya bisa menahan kerinduan ini. Sampai tiba saatnya nanti aku bisa bertemu dan melepaskan kerinduan ini bersamamu.",
    "Melalui rasa rindu yang bergejolak dalam hati, di situ terkadang aku sangat membutuhkan dekap peluk kasih sayangmu.",
    "Dalam dinginnya malam, tak kuingat lagi; Berapa sering aku memikirkanmu juga merindukanmu.",
    "Merindukanmu itu seperti hujan yang datang tiba-tiba dan bertahan lama. Dan bahkan setelah hujan reda, rinduku masih terasa.",
    "Sejak mengenalmu bawaannya aku pengen belajar terus, belajar menjadi yang terbaik buat kamu.",
    "Tahu gak perbedaan pensi sama wajah kamu? Kalau pensil tulisannya bisa dihapus, tapi kalau wajah kamu gak akan ada yang bisa hapus dari pikiran aku.",
    "Bukan Ujian Nasional besok yang harus aku khawatirkan, tapi ujian hidup yang aku lalui setelah kamu meninggalkanku.",
    "Satu hal kebahagiaan di sekolah yang terus membuatku semangat adalah bisa melihat senyumanmu setiap hari.",
    "Kamu tahu gak perbedaanya kalau ke sekolah sama ke rumah kamu? Kalo ke sekolah pasti yang di bawa itu buku dan pulpen, tapi kalo ke rumah kamu, aku cukup membawa hati dan cinta.",
    "Aku gak sedih kok kalo besok hari senin, aku sedihnya kalau gak ketemu kamu.",
    "Momen cintaku tegak lurus dengan momen cintamu. Menjadikan cinta kita sebagai titik ekuilibrium yang sempurna.",
    "Aku rela ikut lomba lari keliling dunia, asalkan engkai yang menjadi garis finishnya.",
    "PR-ku adalah merindukanmu. Lebih kuat dari Matematika, lebih luas dari Fisika, lebih kerasa dari Biologi.",
    "Cintaku kepadamu itu bagaikan metabolisme, yang gak akan berhenti sampai mati.",
    "Kalau jelangkungnya kaya kamu, dateng aku jemput, pulang aku anter deh.",
    "Makan apapun aku suka asal sama kamu, termasuk makan ati.",
    "Cinta itu kaya hukuman mati. Kalau nggak ditembak, ya digantung.",
    "Mencintaimu itu kayak narkoba: sekali coba jadi candu, gak dicoba bikin penasaran, ditinggalin bikin sakaw.",
    "Gue paling suka ngemil karena ngemil itu enak. Apalagi ngemilikin kamu sepenuhnya...",
    "Dunia ini cuma milik kita berdua. Yang lainnya cuma ngontrak.",
    "Bagi aku, semua hari itu adalah hari Selasa. Selasa di Surga bila dekat denganmu...",
    "Bagaimana kalau kita berdua jadi komplotan penjahat? Aku curi hatimu dan kamu curi hatiku.",
    "Kamu itu seperti kopi yang aku seruput pagi ini. Pahit, tapi bikin nagih.",
    "Aku sering cemburu sama lipstikmu. Dia bisa nyium kamu tiap hari, dari pagi sampai malam.",
    "Hanya mendengar namamu saja sudah bisa membuatku tersenyum seperti orang bodoh.",
    "Aku tau teman wanitamu bukan hanya satu, dan menyukaimu pun bukan hanya aku.",
    "Semenjak aku berhenti berharap pada dirimu, aku jadi tidak semangat dalam segala hal..",
    "Denganmu, jatuh cinta adalah patah hati paling sengaja.",
    "Sangat sulit merasakan kebahagiaan hidup tanpa kehadiran kamu disisiku.",
    "Melalui rasa rindu yang bergejolak dalam hati, di situ terkadang aku sangat membutuhkan dekap peluk kasih sayangmu.",
    "Sendainya kamu tahu, sampai saat ini aku masih mencintaimu.",
    "Terkadang aku iri sama layangan..talinya putus saja masih dikejar kejar dan gak rela direbut orang lain...",
    "Aku tidak tahu apa itu cinta, sampai akhirnya aku bertemu denganmu. Tapi, saat itu juga aku tahu rasanya patah hati.",
    "Mengejar itu capek, tapi lebih capek lagi menunggu\nMenunggu kamu menyadari keberadaanku...",
    "Jangan berhenti mencinta hanya karena pernah terluka. Karena tak ada pelangi tanpa hujan, tak ada cinta sejati tanpa tangisan.",
    "Aku punya sejuta alasan unutk melupakanmu, tapi tak ada yang bisa memaksaku untuk berhenti mencintaimu.",
    "Terkadang seseorang terasa sangat bodoh hanya untuk mencintai seseorang.",
    "Kamu adalah patah hati terbaik yang gak pernah aku sesali.",
    "Bukannya tak pantas ditunggu, hanya saja sering memberi harapan palsu.",
    "Sebagian diriku merasa sakit, Mengingat dirinya yang sangat dekat, tapi tak tersentuh.",
    "Hal yang terbaik dalam mencintai seseorang adalah dengan diam-diam mendo akannya.",
    "Kuharap aku bisa menghilangkan perasaan ini secepat aku kehilanganmu.",
    "Demi cinta kita menipu diri sendiri. Berusaha kuat nyatanya jatuh secara tak terhormat.",
    "Anggaplah aku rumahmu, jika kamu pergi kamu mengerti kemana arah pulang. Menetaplah bila kamu mau dan pergilah jika kamu bosan...",
    "Aku bingung, apakah aku harus kecewa atu tidak? Jika aku kecewa, emang siapa diriku baginya?\n\nKalau aku tidak kecewa, tapi aku menunggu ucapannya.",
    "Rinduku seperti ranting yang tetap berdiri.Meski tak satupun lagi dedaunan yang menemani, sampai akhirnya mengering, patah, dan mati.",
    "Kurasa kita sekarang hanya dua orang asing yang memiliki kenangan yang sama.",
    "Buatlah aku bisa membencimu walau hanya beberapa menit, agar tidak terlalu berat untuk melupakanmu.",
    "Aku mencintaimu dengan segenap hatiku, tapi kau malah membagi perasaanmu dengan orang lain.",
    "Mencintaimu mungkin menghancurkanku, tapi entah bagaimana meninggalkanmu tidak memperbaikiku.",
    "Kamu adalah yang utama dan pertama dalam hidupku. Tapi, aku adalah yang kedua bagimu.",
    "Jika kita hanya bisa dipertemukan dalam mimpi, aku ingin tidur selamanya.",
    "Melihatmu bahagia adalah kebahagiaanku, walaupun bahagiamu tanpa bersamaku.",
    "Aku terkadang iri dengan sebuah benda. Tidak memiliki rasa namun selalu dibutuhkan. Berbeda dengan aku yang memiliki rasa, namun ditinggalkan dan diabaikan...",
    "Bagaimana mungkin aku berpindah jika hanya padamu hatiku bersinggah?",
    "Kenangan tentangmu sudah seperti rumah bagiku. Sehingga setiap kali pikiranku melayang, pasti ujung-ujungnya akan selalu kembali kepadamu.",
    "Kenapa tisue bermanfaat? Karena cinta tak pernah kemarau. - Sujiwo Tejo",
    "Kalau mencintaimu adalah kesalahan, yasudah, biar aku salah terus saja.",
    "Sejak kenal kamu, aku jadi pengen belajar terus deh. Belajar jadi yang terbaik buat kamu.",
    "Ada yang bertingkah bodoh hanya untuk melihatmu tersenyum. Dan dia merasa bahagia akan hal itu.",
    "Aku bukan orang baik, tapi akan belajar jadi yang terbaik untuk kamu.",
    "Kita tidak mati, tapi lukanya yang membuat kita tidak bisa berjalan seperti dulu lagi.",
    "keberadaanmu bagaikan secangkir kopi yang aku butuhkan setiap pagi, yang dapat mendorongku untuk tetap bersemangat menjalani hari.",
    "Aku mau banget ngasih dunia ke kamu. Tapi karena itu nggak mungkin, maka aku akan kasih hal yang paling penting dalam hidupku, yaitu duniaku.",
    "Mending sing humoris tapi manis, ketimbang sok romantis tapi akhire tragis.",
    "Ben akhire ora kecewa, dewe kudu ngerti kapan waktune berharap lan kapan kudu mandeg.",
    "Aku ki wong Jowo seng ora ngerti artine 'I Love U'. Tapi aku ngertine mek 'Aku tresno awakmu'.",
    "Ora perlu ayu lan sugihmu, aku cukup mok setiani wes seneng ra karuan.",
    "Cintaku nang awakmu iku koyok kamera, fokus nang awakmu tok liyane mah ngeblur.",
    "Saben dino kegowo ngimpi tapi ora biso nduweni.",
    "Ora ketemu koe 30 dino rasane koyo sewulan.",
    "Aku tanpamu bagaikan sego kucing ilang karete. Ambyar.",
    "Pengenku, Aku iso muter wektu. Supoyo aku iso nemokne kowe lewih gasik. Ben Lewih dowo wektuku kanggo urip bareng sliramu.",
    "Aku ora pernah ngerti opo kui tresno, kajaba sak bare ketemu karo sliramu.",
    "Cinta aa ka neng moal leungit-leungit sanajan aa geus kawin deui.",
    "Kasabaran kaula aya batasna, tapi cinta kaula ka anjeun henteu aya se epna.",
    "Kanyaah akang moal luntur najan make Bayclean.",
    "Kenangan endah keur babarengan jeung anjeun ek tuluy diinget-inget nepi ka poho.",
    "Kuring moal bakal tiasa hirup sorangan, butuh bantosan jalmi sejen.",
    "Nyaahna aa ka neg teh jiga tukang bank keur nagih hutang (hayoh mumuntil).",
    "Kasabaran urang aya batasna, tapi cinta urang ka maneh moal aya beakna.",
    "Hayang rasana kuring ngarangkai kabeh kata cinta anu aya di dunya ieu, terus bade ku kuring kumpulkeun, supaya anjeun nyaho gede pisan rasa cinta kuring ka anjeun.",
    "Tenang wae neng, ari cinta Akang mah sapertos tembang krispatih; Tak lekang oleh waktu.",
    "Abdi sanes jalmi nu sampurna pikeun anjeun, sareng sanes oge nu paling alus kanggo anjeun. Tapi nu pasti, abdi jalmi hiji-hijina nu terus emut ka anjeun.",
    "Cukup jaringan aja yang hilang, kamu jangan.",
    "Sering sih dibikin makan ati. Tapi menyadari kamu masih di sini bikin bahagia lagi.",
    "Musuhku adalah mereka yang ingin memilikimu juga.",
    "Banyak yang selalu ada, tapi kalo cuma kamu yang aku mau, gimana?",
    "Jam tidurku hancur dirusak rindu.",
    "Cukup China aja yang jauh, cinta kita jangan.",
    "Yang penting itu kebahagiaan kamu, aku sih gak penting..",
    "Cuma satu keinginanku, dicintai olehmu..",
    "Aku tanpamu bagaikan ambulans tanpa wiuw wiuw wiuw.",
    "Cukup antartika aja yang jauh. Antarkita jangan."
]
const kyamitruth = bucin[Math.floor(Math.random() * bucin.length)]
	reply(`${kyamitruth}`)
}
break
case 'quotesbacot': {
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const bacot = [
'Kamu suka kopi nggak? Aku sih suka. Tau kenapa alesannya? Kopi itu ibarat kamu, pahit sih tapi bikin candu jadi pingin terus.',
'Gajian itu kayak mantan ya? Bisanya cuman lewat sebentar saja.',
'Kata pak haji, cowok yang nggak mau pergi Sholat Jumat disuruh pakai rok aja.',
'Kamu tahu mantan nggak? Mantan itu ibarat gajian, biasa numpang lewat dong di kehidupan kita.',
'Aku suka kamu, kamu suka dia, tapi dia sayangnya nggak ke kamu. Wkwkw lucu ya? Cinta serumit ini.',
'Google itu hebat ya? Tapi sayang sehebat-hebatnya Google nggak bisa menemukan jodoh kita.',
'Terlalu sering memegang pensil alis dapat membuat mata menjadi buta, jika dicolok-colokkan ke mata.',
'Saya bekerja keras karena sadar kalau uang nggak punya kaki buat jalan sendiri ke kantong saya.',
'Jika kamu tak mampu meyakinkan dan memukau orang dengan kepintaranmu, bingungkan dia dengan kebodohanmu.',
'Selelah-lelahnya bekerja, lebih lelah lagi kalau nganggur.',
'Kita hidup di masa kalau salah kena marah, pas bener dibilang tumben.',
'Nggak ada bahu pacar? Tenang aja, masih ada bahu jalan buat nyandar.',
'Mencintai dirimu itu wajar, yang gak wajar mencintai bapakmu.',
'Katanya enggak bisa bohong. Iyalah, mata kan cuma bisa melihat.',
'Madu di tangan kananmu, racun di tangan kirimu, jodoh tetap di tangan tuhan.',
'Selingkuh terjadi bukan karena ada niat, selingkuh terjadi karna pacar kamu masih laku.',
'Netizen kalau senam jempol di ponsel nggak pakai pendinginan, pantes komennya bikin panas terus.',
'Jodoh memang enggak kemana, tapi saingannya ada dimana-mana.',
'Perasaan aku salah terus di matamu. Kalu gitu, besok aku pindah ke hidungmu.',
'Jomblo tidak perlu malu, jomblo bukan berarti tidak laku, tapi memang tidak ada yang mau.',
'Jika doamu belum terkabul maka bersabar, ingatlah bahwa yang berdoa bukan cuma kamu!',
'Masih berharap dan terus berharap lama-lama aku jadi juara harapan.',
'Manusia boleh berencana, tapi akhirnya saldo juga yang menentukan.',
'Statusnya rohani, kelakuannya rohalus.',
'Kegagalan bukan suatu keberhasilan.',
'Tadi mau makan bakso, cuma kok panas banget, keliatannya baksonya lagi demam.',
'Aku juga pernah kaya, waktu gajian.',
'Aku diputusin sama pacar karena kita beda keyakinan. Aku yakin kalau aku ganteng, tapi dia enggak.',
'Masa depanmu tergantung pada mimpimu, maka perbanyaklah tidur.',
'Seberat apapun pekerjaanmu, akan semakin ringan jika tidak dibawa.',
'Jangan terlalu berharap! nanti jatuhnya sakit!',
'Ingat! Anda itu jomblo',
'Gak tau mau ngetik apa',
]
    let bacotan = pickRandom(bacot)
  reply(bacotan)
}
break
case 'aksarasunda': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }
    
   if (!text) return reply(`Example: *${prefix + command} apip*`);


   const latinToSundanese = {
      'a': 'ᮅ',
      'b': 'ᮘ',
      'c': 'ᮎ',
      'd': 'ᮓ',
      'e': 'ᮌ',
      'f': 'ᮕ',
      'g': 'ᮎ',
      'h': 'ᮠ',
      'i': 'ᮄ',
      'j': 'ᮏ',
      'k': 'ᮊ',
      'l': 'ᮜ',
      'm': 'ᮙ',
      'n': 'ᮔ',
      'o': 'ᮇ',
      'p': 'ᮕ',
      'q': 'ᮃ',
      'r': 'ᮛ',
      's': 'ᮞ',
      't': 'ᮒ',
      'u': 'ᮅ',
      'v': 'ᮗ',
      'w': 'ᮝ',
      'x': 'ᮞ',
      'y': 'ᮌ',
      'z': 'ᮚ',
      ' ': ' '
   };

   async function convertToSundanese(text) {
      return [...text.toLowerCase()]
         .map(char => latinToSundanese[char] || char)
         .join('');
   }

   const hasil = await convertToSundanese(text);

   await kyami.sendMessage(m.chat, { text: hasil });

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

   await sendReact(m.key, 0); // ⏳
}
break
case "addprem": {
    if (!isCreator) return reply(mess.owner);

    if (!text && !m.quoted) return reply(`Contoh: *${prefix + command} 6285xxxx\nAtau reply pesan pengguna*`);

    const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const input2 = input.split("@")[0];
    
    await sendReact(m.key, 0); // ⏳
    
    if (premium.includes(input)) {
        await sendReact(m.key, 1) // ❌
        return reply(`Nomor *${input2}* sudah terdaftar sebagai *premium*`);
    }
    
    try {
        premium.push(input);
        fs.writeFileSync("./lib/database/premium.json", JSON.stringify(premium, null, 2));
        
        const premiumMessage = `*Selamat!*\n\nAnda sekarang pengguna premium\n• Akses fitur premium tanpa limit\n• Prioritas response bot\n• Mendapatkan akses fitur AI\n• Fitur eksklusif lainnya\n\nKetik *.menu* untuk mulai`;

        await kyami.sendMessage(input, { 
            text: premiumMessage,
            contextInfo: {
                mentionedJid: [input]
            }
        });
        
        reply(`Berhasil! Nomor *${input2}* telah menjadi pengguna premium`);
        
    } catch {
        await sendReact(m.key, 1) // ❌
        reply("Gagal menambahkan premium");
    }
}
break
case "delprem": {
    if (!isCreator) return reply(mess.owner);

    if (!text && !m.quoted) return reply(`*Contoh:*\n*${prefix + command} 6285xxxx*\n*Atau reply pesan pengguna*`);

    const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const input2 = input.split("@")[0];

    await sendReact(m.key, 0); // ⏳

    if (!premium.includes(input)) {
        await sendReact(m.key, 1) // ❌
        return reply(`Nomor *${input2}* tidak terdaftar sebagai pengguna premium`);
    }

    try {
        const index = premium.indexOf(input);
        if (index !== -1) premium.splice(index, 1); // ubah isi array secara langsung

        fs.writeFileSync("./lib/database/premium.json", JSON.stringify(premium, null, 2));

        try {
            await kyami.sendMessage(input, {
                text: "*Pemberitahuan*\n\nStatus *premium* kamu telah *dihapus*.\n\nHubungi admin jika ini merupakan kesalahan."
            });
        } catch (err) {
            console.log(err)
        }

        reply(`Berhasil menghapus status premium dari nomor *${input2}*`);

    } catch (err) {
        await sendReact(m.key, 1) // ❌
        reply("Gagal menghapus status premium");
        console.error(err);
    }
}
break
case 'findsong': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    if (!args[0]) return reply('Masukkan beberapa kata dari lirik lagu');

    await sendReact(m.key, 0); // ⏳

    const query = args.join(' ');
    const apiKey = 'P3QcawG2xePU7sIxOD-4KeVMU-2mti77t6RHbo93q84Xon8hvKniFYDpphcA1kjckDXBnhdnh5spgGzpB_EQgw';
    const url = `https://api.genius.com/search?q=${encodeURIComponent(query)}&access_token=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.response?.hits?.length) {
            await sendReact(m.key, 1) // ❌
            return reply('Lagu tidak ditemukan berdasarkan lirik tersebut');
        }

        const song = data.response.hits[0].result;
        const caption = `
*Lagu Ditemukan:*
▢ Judul: ${song.title}
▢ Artis: ${song.primary_artist.name}
▢ Link: ${song.url}
        `.trim();

        if (song.song_art_image_url) {
            await kyami.sendMessage(m.chat, {
                image: { url: song.song_art_image_url },
                caption
            }, { quoted: m });
        } else {
            reply(caption);
        }


        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Terjadi kesalahan saat mencari lagu');
    }
}
			break;
case 'setppbot': {
    if (!isCreator) return reply(mess.owner);
    if (!quoted) return reply(`Balas gambar dengan caption: *${prefix + command}*`);
    if (!/image/.test(mime)) return reply(`Media yang dibalas harus berupa gambar`);
    if (/webp/.test(mime)) return reply(`Format webp tidak didukung, kirim gambar biasa`);

    await sendReact(m.key, 0); // ⏳

    try {
        const media = await kyami.downloadAndSaveMediaMessage(quoted);
        await kyami.updateProfilePicture(botNumber, { url: media });
        fs.unlinkSync(media);

        reply(`Foto profil bot berhasil diperbarui`);
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply(`Gagal memperbarui foto profil bot`);
    }
}
			break
case 'deleteppbot':
case 'delppbot': {
    if (!isCreator) return reply(mess.owner);

    await sendReact(m.key, 0); // ⏳

    try {
        await kyami.removeProfilePicture(kyami.user.id);
        reply('Foto profil bot berhasil dihapus');
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Gagal menghapus foto profil bot');
    }
}
break
case 'setppgroup':
case 'setppgrup':
case 'setppgc': {
    if (!m.isGroup) return reply(mess.group);
    if (!isAdmins) return reply(mess.admin);
    if (!isBotAdmins) return reply(mess.botAdmin);
    if (!quoted) return reply(`Send/reply Image With Caption ${prefix + command}`);
    if (!/image/.test(mime)) return reply(`Send/reply Image With Caption ${prefix + command}`);
    if (/webp/.test(mime)) return reply(`Send/reply Image With Caption ${prefix + command}`);

    await sendReact(m.key, 0); // ⏳

    try {
        const medis = await kyami.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg');

        if (args[0] == 'full') {
            const { img } = await generateProfilePicture(medis);
            await kyami.query({
                tag: 'iq',
                attrs: {
                    to: m.chat,
                    type: 'set',
                    xmlns: 'w:profile:picture'
                },
                content: [{
                    tag: 'picture',
                    attrs: { type: 'image' },
                    content: img
                }]
            });
            fs.unlinkSync(medis);
            reply('Foto profil grup berhasil diubah (full)');
        } else {
            await kyami.updateProfilePicture(m.chat, { url: medis });
            fs.unlinkSync(medis);
            reply('Foto profil grup berhasil diubah');
        }
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Gagal mengubah foto profil grup');
    }
}
break
case 'antilink': {
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply(mess.botAdmin);
    if (!isAdmins) return reply(mess.onlyAdmin);

    if (/on/i.test(args[0])) {
        if (Antilink.includes(m.chat)) return reply("⚠️ *Antilink* sudah aktif sebelumnya di grup ini.");

        Antilink.push(m.chat);
        fs.writeFileSync('./lib/database/antilink.json', JSON.stringify(Antilink));
        reply("✅ Berhasil mengaktifkan *Antilink* di grup ini.");
    
    } else if (/off/i.test(args[0])) {
        if (!Antilink.includes(m.chat)) return reply("❌ *Antilink* belum aktif sebelumnya di grup ini.");

        Antilink.splice(Antilink.indexOf(m.chat), 1);
        fs.writeFileSync('./lib/database/antilink.json', JSON.stringify(Antilink));
        reply("❌ Berhasil menonaktifkan *Antilink* di grup ini.");
    
    } else {
        reply(`Ketik: *${prefix + command} on* atau *${prefix + command} off*`);
    }
}
break
case "antilinkall": {
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply(mess.botAdmin);
    if (!isAdmins) return reply(mess.onlyAdmin);

    if (/on/i.test(args[0])) {
        if (AntilinkAll.includes(m.chat)) return reply("⚠️ *AntilinkAll* sudah aktif sebelumnya di grup ini.");

        AntilinkAll.push(m.chat);
        fs.writeFileSync("./lib/database/antilinkall.json", JSON.stringify(AntilinkAll));
        reply("✅ Berhasil mengaktifkan *AntilinkAll* di grup ini.");

    } else if (/off/i.test(args[0])) {
        if (!AntilinkAll.includes(m.chat)) return reply("❌ *AntilinkAll* belum aktif sebelumnya di grup ini.");

        const index = AntilinkAll.indexOf(m.chat);
        AntilinkAll.splice(index, 1);
        fs.writeFileSync("./lib/database/antilinkall.json", JSON.stringify(AntilinkAll));
        reply("❌ Berhasil menonaktifkan *AntilinkAll* di grup ini.");

    } else {
        reply(`Ketik: *${prefix + command} on* atau *${prefix + command} off*`);
    }
}
break
case "antitaggc": {
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply(mess.botAdmin);
    if (!isAdmins) return reply(mess.onlyAdmin);

    if (/on/i.test(args[0])) {
        if (AntitagGc.includes(m.chat)) return reply("⚠️ *AntitagGc* sudah aktif sebelumnya di grup ini.");

        AntitagGc.push(m.chat);
        fs.writeFileSync("./lib/database/antitaggc.json", JSON.stringify(AntitagGc, null, 2));
        reply("✅ Berhasil mengaktifkan *Anti Tag Grup* di grup ini.");
    } else if (/off/i.test(args[0])) {
        if (!AntitagGc.includes(m.chat)) return reply("❌ *AntitagGc* belum aktif sebelumnya di grup ini.");

        const index = AntitagGc.indexOf(m.chat);
        AntitagGc.splice(index, 1);
        fs.writeFileSync("./lib/database/antitaggc.json", JSON.stringify(AntitagGc, null, 2));
        reply("❌ Berhasil menonaktifkan *Anti Tag Grup* di grup ini.");
    } else {
        reply(`Ketik: *${prefix + command} on* atau *${prefix + command} off*`);
    }
}
break
case "antispamgc": {
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply(mess.botAdmin);
    if (!isAdmins) return reply(mess.onlyAdmin);

    if (/on/i.test(args[0])) {
        if (AntispamGc.includes(m.chat)) return reply("⚠️ *AntispamGc* sudah aktif sebelumnya di grup ini.");

        AntispamGc.push(m.chat);
        fs.writeFileSync("./lib/database/antispamgc.json", JSON.stringify(AntispamGc));
        reply("✅ Berhasil mengaktifkan *Antispam Grup* di grup ini.");
    } else if (/off/i.test(args[0])) {
        if (!AntispamGc.includes(m.chat)) return reply("❌ *AntispamGc* belum aktif sebelumnya di grup ini.");

        const index = AntispamGc.indexOf(m.chat);
        AntispamGc.splice(index, 1);
        fs.writeFileSync("./lib/database/antispamgc.json", JSON.stringify(AntispamGc));
        reply("❌ Berhasil menonaktifkan *Antispam Grup* di grup ini.");
    } else {
        reply(`Ketik: *${prefix + command} on* atau *${prefix + command} off*`);
    }
}
break
case "welcome": {
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply(mess.botAdmin);
    if (!isAdmins) return reply(mess.onlyAdmin);

    const WelcomeGc = JSON.parse(fs.readFileSync('./lib/database/welcome.json'));

    if (text?.toLowerCase() === "on") {
        if (WelcomeGc.includes(m.chat)) return reply("⚠️ *Welcome* sudah aktif sebelumnya di grup ini.");
        WelcomeGc.push(m.chat);
        fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(WelcomeGc, null, 2));
        return reply("✅ Berhasil mengaktifkan *Welcome* di grup ini.");
    }

    if (text?.toLowerCase() === "off") {
        if (!WelcomeGc.includes(m.chat)) return reply("❌ *Welcome* belum aktif sebelumnya di grup ini.");
        const index = WelcomeGc.indexOf(m.chat);
        WelcomeGc.splice(index, 1);
        fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(WelcomeGc, null, 2));
        return reply("❌ Berhasil menonaktifkan *Welcome* di grup ini.");
    }
    else {
        reply(`Ketik: *${prefix + command} on* atau *${prefix + command} off*`);
    }
}
break
case 'antisticker': {
    if (!m.isGroup) return reply(mess.group)
    if (!isAdmins) return reply(mess.onlyAdmin)
    if (!isBotAdmins) return reply(mess.botAdmin)

    const AntiSticker = JSON.parse(fs.readFileSync('./lib/database/antisticker.json'))

    if (/on/i.test(args[0])) {
        if (AntiSticker.includes(m.chat)) return reply("⚠️ *Antisticker* sudah aktif sebelumnya di grup ini.");
        AntiSticker.push(m.chat)
        fs.writeFileSync('./lib/database/antisticker.json', JSON.stringify(AntiSticker, null, 2))
        reply("✅ Berhasil mengaktifkan *AntiSticker* di grup ini.")
    } else if (/off/i.test(args[0])) {
        if (!AntiSticker.includes(m.chat)) return reply("❌ *Antisticker* belum aktif sebelumnya di grup ini.");
        const index = AntiSticker.indexOf(m.chat)
        AntiSticker.splice(index, 1)
        fs.writeFileSync('./lib/database/antisticker.json', JSON.stringify(AntiSticker, null, 2))
        reply("✅ Berhasil menonaktifkan *AntiSticker* di grup ini.")
    } else {
        reply(`Ketik: *${prefix + command} on* atau *${prefix + command} off*`)
    }
}
break
case "grupevent": {
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply(mess.botAdmin);
    if (!isAdmins) return reply(mess.onlyAdmin);

    const GrupEvent = JSON.parse(fs.readFileSync('./lib/database/grupevent.json'));

    if (text?.toLowerCase() === "on") {
        if (GrupEvent.includes(m.chat)) return reply("⚠️ *GrupEvent* sudah aktif sebelumnya di grup ini.");
        GrupEvent.push(m.chat);
        fs.writeFileSync('./lib/database/grupevent.json', JSON.stringify(GrupEvent, null, 2));
        return reply("✅ Berhasil mengaktifkan *GrupEvent* di grup ini.");
    }

    if (text?.toLowerCase() === "off") {
        if (!GrupEvent.includes(m.chat)) return reply("❌ *GrupEvent* belum aktif sebelumnya di grup ini.");
        const index = GrupEvent.indexOf(m.chat);
        GrupEvent.splice(index, 1);
        fs.writeFileSync('./lib/database/grupevent.json', JSON.stringify(GrupEvent, null, 2));
        return reply("❌ Berhasil menonaktifkan *GrupEvent* di grup ini.");
    }
    else {
        reply(`Ketik: *${prefix + command} on* atau *${prefix + command} off*`);
    }
}
break
case "adminevent": {
    if (!m.isGroup) return reply(mess.group);
    if (!isBotAdmins) return reply(mess.botAdmin);
    if (!isAdmins) return reply(mess.onlyAdmin);

    const AdminEvent = JSON.parse(fs.readFileSync('./lib/database/adminevent.json'));

    if (text?.toLowerCase() === "on") {
        if (AdminEvent.includes(m.chat)) return reply("⚠️ *AdminEvent* sudah aktif sebelumnya di grup ini.");
        AdminEvent.push(m.chat);
        fs.writeFileSync('./lib/database/adminevent.json', JSON.stringify(AdminEvent, null, 2));
        return reply("✅ Berhasil mengaktifkan *AdminEvent* di grup ini.");
    }

    if (text?.toLowerCase() === "off") {
        if (!AdminEvent.includes(m.chat)) return reply("❌ *AdminEvent* belum aktif sebelumnya di grup ini.");
        const index = AdminEvent.indexOf(m.chat);
        AdminEvent.splice(index, 1);
        fs.writeFileSync('./lib/database/adminevent.json', JSON.stringify(AdminEvent, null, 2));
        return reply("❌ Berhasil menonaktifkan *AdminEvent* di grup ini.");
    }
    else {
        reply(`Ketik: *${prefix + command} on* atau *${prefix + command} off*`);
    }
}
break
case "figure": {
    if (!isPremium) return reply(mess.prem);

    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || "";
    if (!/image/.test(mime)) return reply(`Reply gambar dengan caption *${prefix + command}*`);

    await sendReact(m.key, 0);

    try {
        const imagePath = await kyami.downloadAndSaveMediaMessage(q);
        const { url: uploadedUrl } = await UploadFileUgu(imagePath);

        const fs = require("fs");
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

        const apiUrl = `https://magma-api.biz.id/edits/tofigure?image=${encodeURIComponent(uploadedUrl)}`;

        await kyami.sendMessage(m.chat, {
            image: { url: apiUrl },
            caption: `Berhasil menjadikan foto *figure*!`
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1);
        reply("Terjadi kesalahan saat memproses figure.");
    }
}
break
case 'anticall': {
    if (!isCreator) return reply(mess.owner);
    if (!args[0]) return reply(`⚠️ Pilih *on* atau *off*!\nContoh: *${prefix + command} on*`);

    await sendReact(m.key, 0); // ⏳ proses

    const status = args[0].toLowerCase();
    if (!['on', 'off'].includes(status)) {
        await sendReact(m.key, 1); //
        return reply(`⚠️ Pilih *on* atau *off*!\nContoh: *${prefix + command} on*`);
    }

    const aktif = global.anticall || false;

    if (status === 'on') {
        if (aktif) {
            await sendReact(m.key, 1);
            return reply('⚠️ *AntiCall* sudah aktif sebelumnya.');
        }
        global.anticall = true;
        return reply('✅ *AntiCall diaktifkan!*\nPanggilan akan otomatis *ditolak dan diblokir*.');
    } else {
        if (!aktif) {
            await sendReact(m.key, 1);
            return reply('⚠️ *AntiCall* sudah nonaktif sebelumnya.');
        }
        global.anticall = false;
        return reply('✅ *AntiCall dinonaktifkan.*');
    }
}
break
case 'join': {  
    try {  
    if (!isCreator) return reply(mess.owner);
        if (!text) {  
            return reply(`Masukkan link grup WhatsApp yang valid

Contoh: *${prefix + command} https://chat.whatsapp.com/xx*`);  
        }  
        
        await sendReact(m.key, 0); // ⏳  

        const inviteCode = text.match(/chat\.whatsapp\.com\/([\w-]+)/i)?.[1];  
        if (!inviteCode) {  
            await sendReact(m.key, 1)  
            return reply("Link grup tidak valid");  
        }  

        reply("Memulai proses gabung grup...");  
        
        const joinResult = await Promise.race([  
            kyami.groupAcceptInvite(inviteCode),  
            new Promise((_, reject) =>   
                setTimeout(() => reject(new Error("timeout")), 30000)  
            )  
        ]);  
  
        reply("Berhasil gabung grup");  
  
    } catch (err) {  
        console.error(err);  
        await sendReact(m.key, 1) // ❌  

        const errorMsg = err.message.includes("invite") ? "Link sudah kadaluarsa" :  
                         err.message.includes("timed out") ? "Proses terlalu lama" :  
                         "Gagal gabung grup";  
        
        console.error(err);
    }  
}
break
case 'autojoin': {
    if (!isCreator) return reply(mess.owner);

    const text = q || m.text || '';
    const regex = /https?:\/\/chat\.whatsapp\.com\/([\w\d]+)/gi;

    let matches = [...text.matchAll(regex)];
    let links = matches.map(v => v[0]);
    let codes = matches.map(v => v[1]);

    if (!codes.length) return reply('Tidak ada link grup ditemukan');

    await sendReact(m.key, 0);

    reply(`⏳ *Memulai proses auto join...*\nDitemukan *${codes.length} link*.`);

    let success = [];
    let failed = [];

    for (let i = 0; i < codes.length; i++) {
        let code = codes[i];
        let link = links[i];

        // 🔄 progress loading tiap link
        await kyami.sendMessage(m.chat, { text: `⏳ *Sedang join:* ${link}` });

        try {
            let res = await kyami.groupAcceptInvite(code);
            let id = res?.gid || res;

            if (id) {
                await kyami.updateMuteSettings(id, {
                    mute: true,
                    muteEndTimestamp: 0
                });
            }

            success.push(link);

            // ⏺ Update status berhasil join
            await kyami.sendMessage(m.chat, {
                text: `✅ *Berhasil join:* ${link}`
            });

        } catch (err) {
            console.error(err);
            failed.push(link);

            await kyami.sendMessage(m.chat, {
                text: `❌ *Gagal join:* ${link}`
            });
        }

        // jeda 1 detik
        await new Promise(r => setTimeout(r, 1000));
    }

    let result = ``;

    if (success.length) {
        result += `\n*Berhasil join:*\n${success.map(v => '• ' + v).join('\n')}\n`;
    }

    if (failed.length) {
        result += `\n*Gagal join:*\n${failed.map(v => '• ' + v).join('\n')}\n`;
    }

    reply(result.trim());
}
break
case 'keluargc': {
    if (!isCreator) return reply(mess.owner);
    
    try {
        await sendReact(m.key, 0); // ⏳
        const groups = await kyami.groupFetchAllParticipating();
        const groupList = Object.values(groups);

        const groupRows = groupList.map(group => ({
            header: "ID: " + group.id.split('@')[0],
            title: group.subject?.substring(0, 20) || 'Unknown Group',
            description: `Klik untuk keluar dari grup ini`,
            id: `${prefix}outgc ${group.id}`
        }));

        await sendInteractiveMessage(kyami, m.chat, {
            text: `📋 *DAFTAR GRUP*\n\nTotal: *${groupList.length}* grup terdeteksi.\n\nPilih grup yang ingin ditinggalkan melalui daftar di bawah ini.`,
            footer: "© Luxxy | Leo",
            interactiveButtons: [
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: '🚪 PILIH GRUP',
                        sections: [
                            {
                                title: 'Daftar Grup Aktif',
                                rows: groupRows
                            },
                            {
                                title: 'Opsi Lain',
                                rows: [
                                    {
                                        title: '🔄 REFRESH LIST',
                                        description: 'Update daftar grup terbaru',
                                        id: `${prefix}listgc`
                                    }
                                ]
                            }
                        ]
                    })
                }
            ]
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply('❌ Gagal mengambil daftar grup!');
    }
}
break
case 'outgc': {
    if (!isCreator) return reply(mess.owner);
    
    const groupId = text || m.key.remoteJid;
    
    if (!groupId) {
        return reply(`❓ *Format Perintah*\n\n` +
            `${prefix + command} <id_grup>\n` +
            `Contoh: ${prefix + command} 62812xxxxxxxxx@g.us\n\n` +
            `Atau ketik ${prefix + command} di dalam grup yang ingin ditinggalkan`);
    }
    
    try {
        if (!groupId.endsWith('@g.us')) {
            return reply('Format ID grup tidak valid! Harus berakhiran @g.us');
        }
        
        await sendReact(m.key, 0); // ⏳

        try {
            const groupInfo = await safeGroupMetadata(kyami, groupId);
            
            await kyami.groupLeave(groupId);
            reply(`✅ Berhasil keluar dari grup:\n*${groupInfo.subject}*`);
            
        } catch (err) {
            if (error.message.includes('not in group')) {
                reply('Bot tidak berada dalam grup tersebut!');
            } else {
                throw error;
            }
        }
        
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply('Gagal keluar dari grup! Pastikan ID grup valid.');
    }
}
break
case 'pesanallgc': {
    if (!isCreator) return reply(mess.owner);

    let teks = q || "";
    if (!teks.includes("http")) 
        return reply(`Format salah!\n\n${prefix + command} textnya\nlink1\nlink2`);

    await sendReact(m.key, 0); // ⏳

    let lines = teks.split("\n");
    let messageText = lines[0];
    let linkLines = lines.slice(1).join("\n");

    const regex = /https?:\/\/chat\.whatsapp\.com\/([\w\d]+)/gi;

    let matches = [...linkLines.matchAll(regex)];
    let links = matches.map(v => v[0]);
    let codes = matches.map(v => v[1]);

    if (!codes.length) return reply("Tidak ada link grup valid.");

    reply(`⏳ *Memulai pesan massal...*\nTarget: *${codes.length} grup*`);

    let success = [];
    let failed = [];

    for (let i = 0; i < codes.length; i++) {
        let link = links[i];
        let code = codes[i];

        try {
            let metadata;
            try {
                metadata = await kyami.groupGetInviteInfo(code);
            } catch {
                failed.push(`${link} (INVALID LINK)`);
                continue;
            }

            let groupId = metadata.id;

            let inGroup = false;
            try {
                let groupInfo = await safeGroupMetadata(kyami, groupId);
                if (groupInfo) inGroup = true;
            } catch {
                inGroup = false;
            }

            if (!inGroup) {
                failed.push(`${link} (BOT TIDAK JOIN)`);
                continue;
            }

            // kirim pesan
            await kyami.sendMessage(groupId, { text: messageText });
            success.push(link);

        } catch {
            failed.push(`${link} (ERROR)`);
        }

        await new Promise(r => setTimeout(r, 1000)); // 1 detik
    }

    // LAPORAN AKHIR
    let report = `〽 *Laporan Pesan Massal*\n\n`;
    report += `📨 *Total link:* ${codes.length}\n`;
    report += `✅ *Berhasil:* ${success.length}\n`;
    report += `❌ *Gagal:* ${failed.length}\n\n`;

    if (success.length)
        report += `*Berhasil:*\n${success.map(v => "• " + v).join("\n")}\n\n`;

    if (failed.length)
        report += `*Gagal:*\n${failed.map(v => "• " + v).join("\n")}\n`;

    reply(report.trim());
}
break
case 'snackvideo': {
    const cheerio = require('cheerio');

    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    if (!text) return reply(`Masukkan link snackvideo.\nContoh: *${prefix + command} https://snackvideo.com/s/abc123*`);

    if (!text.includes('snackvideo.com')) return reply('Link snackvideo tidak valid');

    await sendReact(m.key, 0); // ⏳

    try {
        const response = await axios.get(text);
        const $ = cheerio.load(response.data);
        const json = JSON.parse($("#VideoObject").text().trim());

        const result = {
            metadata: {
                title: json.name,
                thumbnail: json.thumbnailUrl[0],
                watch: json.interactionStatistic[0].userInteractionCount,
                likes: json.interactionStatistic[1].userInteractionCount,
                share: json.interactionStatistic[2].userInteractionCount,
                author: json.creator.mainEntity.name
            },
            download: json.contentUrl
        };

        const caption = `
*Hasil Unduhan:*
▢ Judul: ${result.metadata.title}
▢ Penonton: ${result.metadata.watch}
▢ Like: ${result.metadata.likes}
▢ Share: ${result.metadata.share}
▢ Uploader: ${result.metadata.author}`.trim();

        await kyami.sendMessage(m.chat, {
            video: { url: result.download },
            caption: caption
        }, { quoted: m });


        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}
    } catch (err) {
        console.error(err)
        await sendReact(m.key, 1) // ❌
        reply("Gagal mengunduh video snackvideo");
    }
}
break
case 'play':
case 'ytplay': {
    if (!text) return reply(`Contoh: *${prefix + command} lagu sad*`);

    await sendReact(m.key, 0); // ⏳

    try {
        let search = await yts(text);
        if (!search || search.all.length === 0) {
            await sendReact(m.key, 1); // ❌
            return reply(`Lagu tidak ditemukan ☹️`);
        }

        let { videoId, image, title, views, duration, author, ago, url, description } = search.all[0];
        let caption = `🎶 *YouTube Play*\n\n🆔 ID: ${videoId}\n🎵 Judul: ${title}\n📺 Views: ${views}\n⏱ Durasi: ${duration.timestamp}\n📤 Channel: ${author.name}\n📅 Upload: ${ago}\n🔗 URL: ${url}\n📝 Deskripsi: ${description}`;

        await sendButtons(kyami, m.chat, {
            image: image,
            title: "YouTube Play",
            text: caption,
            footer: '© Luxxy | Leo',
            buttons: [
                { 
                    id: `${prefix}ytmp3 ${url}`, 
                    text: '🎧 YouTube Music' 
                },
                { 
                    id: `${prefix}ytmp4 ${url}`, 
                    text: '🎬 YouTube Video' 
                }
            ]
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply(`Terjadi kesalahan 😭`);
    }
}
break
case 'videy': {
    if (!isPremium) return reply(mess.prem);

    if (!text) return reply("Masukkan link dari *videy* yang ingin diunduh.")
    if (!text.includes('videy')) return reply("Link tidak valid. Harap kirim link dari *videy.com*")

    await sendReact(m.key, 0); // ⏳ proses

    try {
        let res = await fetchJson(`https://api.agatz.xyz/api/videydl?url=${text}`)
        let videoUrl = res?.data

        if (!videoUrl) {
            await sendReact(m.key, 1) // ❌
            return reply("Gagal mengambil video. Pastikan link masih aktif.")
        }

        await kyami.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: "Berikut video yang berhasil diunduh dari Videy."
        }, { quoted: m });

    } catch (err) {
        await sendReact(m.key, 1) // ❌
        reply("Terjadi kesalahan saat mengambil data dari Videy.")
    }
}
break
case 'wangy': {
    if (!text) return reply(`Contoh : ${prefix}wangy Elaina`);

    qq = q.toUpperCase();
    awikwok = `${qq} ${qq} ${qq} ❤️ ❤️ ❤️ WANGY WANGY WANGY WANGY HU HA HU HA HU HA, aaaah baunya rambut ${qq} wangyy aku mau nyiumin aroma wangynya ${qq} AAAAAAAAH ~ Rambutnya.... aaah rambutnya juga pengen aku elus-elus ~~ AAAAAH ${qq} keluar pertama kali di anime juga manis ❤️ ❤️ ❤️ banget AAAAAAAAH ${qq} AAAAA LUCCUUUUUUUUUUUUUUU............ ${qq} AAAAAAAAAAAAAAAAAAAAGH ❤️ ❤️ ❤️apa ? ${qq} itu gak nyata ? Cuma HALU katamu ? nggak, ngak ngak ngak ngak NGAAAAAAAAK GUA GAK PERCAYA ITU DIA NYATA NGAAAAAAAAAAAAAAAAAK PEDULI BANGSAAAAAT !! GUA GAK PEDULI SAMA KENYATAAN POKOKNYA GAK PEDULI. ❤️ ❤️ ❤️ ${qq} gw ... ${qq} di laptop ngeliatin gw, ${qq} .. kamu percaya sama aku ? aaaaaaaaaaah syukur ${q} aku gak mau merelakan ${qq} aaaaaah ❤️ ❤️ ❤️ YEAAAAAAAAAAAH GUA MASIH PUNYA ${qq} SENDIRI PUN NGGAK SAMA AAAAAAAAAAAAAAH`;

    await sendReact(m.key, 0); // Emoji proses "⏳"
    reply(awikwok);
}
			break
			case 'sayang': {
				if (!text) return reply(`Contoh : ${prefix}sayang Elaina`)
				qq = q.toUpperCase()
				awikwok = `${qq} ${qq} ${qq} ❤️ ❤️ ❤️ AKU SAYANG KAMUUU ${qq} SAYANG BANGET MAU GA NIKAH AMA GW ${qq} AAAAAAAAH ~ Rambutnya.... aaah rambutnya juga pengen aku elus-elus ~~ AAAAAH ${qq} keluar pertama kali di Sekolah juga manis ❤️ ❤️ ❤️ banget AAAAAAAAH ${qq} AAAAA LUCCUUUUUUUUUUUUUUU............ ${qq} AAAAAAAAAAAAAAAAAAAAGH ❤️ ❤️ ❤️apa ? ${qq} itu gak nyata ? Cuma HALU katamu ? nggak, ngak ngak ngak ngak NGAAAAAAAAK GUA GAK PERCAYA ITU DIA NYATA NGAAAAAAAAAAAAAAAAAK PEDULI BANGSAAAAAT !! GUA GAK PEDULI SAMA KENYATAAN POKOKNYA GAK PEDULI. ❤️ ❤️ ❤️ ${qq} gw ... ${qq} di laptop ngeliatin gw, ${qq} .. kamu percaya sama aku ? aaaaaaaaaaah syukur ${q} aku gak mau merelakan ${qq} aaaaaah ❤️ ❤️ ❤️ YEAAAAAAAAAAAH GUA MASIH PUNYA ${qq} SENDIRI PUN NGGAK SAMA AAAAAAAAAAAAAAH`
    await sendReact(m.key, 0); // Emoji proses "⏳"
    reply(awikwok);
			}
break
case 'yts': {
    if (!text) return reply(`Contoh: *${prefix + command} we dont talk*`);

    try {
        await sendReact(m.key, 0); // ⏳

        let ytsSearch = await yts(text);
        const anuan = ytsSearch.all;

        let teks = '';
        for (let res of anuan) {
            teks += `🎬 *${res.title}*
⏱️ Durasi: *${res.timestamp}*
📅 Upload: *${res.ago}*
👁️ Views: *${res.views}*
👤 Author: *${res?.author?.name || "Unknown"}*
🔗 Link: ${res.url}\n\n`;
        }

        reply(teks.trim());
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply('Gagal mencari video YouTube');
    }
}
break
case 'ytmp3': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    if (!text || (!text.includes('youtube.com/watch') && !text.includes('youtu.be/'))) {
        return reply(`Link YouTube tidak valid.\nContoh:\n*${prefix + command} https://youtu.be/xxxx*`, m);
    }

    await sendReact(m.key, 0); // ⏳

    try {
        const apiUrl = `https://api.privatezia.biz.id/api/downloader/ytmp3?url=${encodeURIComponent(text)}`
        const response = await fetch(apiUrl)
        const data = await response.json()

        if (!data.status || !data.result?.downloadUrl) {
            await sendReact(m.key, 1) // ❌
            return reply("Gagal mendapatkan audio dari YouTube", m)
        }

        const { title, quality, duration, thumbnail, downloadUrl } = data.result

        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        const res = await fetch(downloadUrl)
        const buffer = await res.arrayBuffer()

        await kyami.sendMessage(m.chat, {
            audio: Buffer.from(buffer),
            mimetype: 'audio/mpeg',
            fileName: `${title.substring(0, 100)}.mp3`,
            contextInfo: {
                externalAdReply: {
                    title: title.substring(0, 50),
                    body: `Kualitas: ${quality}`,
                    thumbnailUrl: thumbnail,
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    sourceUrl: text
                }
            }
        }, { quoted: m })

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1) // ❌
        reply("Terjadi kesalahan saat mengunduh audio YouTube")
    }
}
break
case 'ytmp4': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 1) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    if (!text || (!text.includes('youtube.com/watch') && !text.includes('youtu.be/'))) {
        return reply(`Link YouTube tidak valid.\nContoh:\n*${prefix + command} https://youtube.com/watch?v=xx*`, m)
    }

    await sendReact(m.key, 0); // ⏳

    try {
        const apiUrl = `https://api.privatezia.biz.id/api/downloader/ytmp4?url=${encodeURIComponent(text)}`
        const response = await fetch(apiUrl)
        const data = await response.json()

        if (!data.status || !data.result?.downloadUrl) {
            await sendReact(m.key, 1) // ❌
            return reply("Gagal mendapatkan video dari YouTube", m)
        }

        const { title, duration, quality, thumbnail, downloadUrl } = data.result

        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        const res = await fetch(downloadUrl)
        const buffer = await res.arrayBuffer()

        await kyami.sendMessage(m.chat, {
            video: Buffer.from(buffer),
            mimetype: 'video/mp4',
            fileName: `${title.substring(0, 100)}.mp4`
        }, { quoted: m })

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1) // ❌
        reply("Terjadi kesalahan saat mengunduh video YouTube")
    }
}
break
case "public":{
    if (!isCreator) return reply(mess.owner);
                kyami.public = true
                reply(`successfully changed to ${command}`)
}
break
case "self":{
    if (!isCreator) return reply(mess.owner);
                kyami.public = false
                reply(`successfully changed to ${command}`)
}
break
case 'done': {
    let t = text.split(',');

    if (t.length < 3) return reply(`*Format salah!*

Penggunaan:
${prefix + command} barang,nominal,sistem`);
    
    let barang = t[0];
    let nominal = t[1];
    let sistem = t[2];
    let tanggal = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    reply(`╔════════════════════╗
     *TRANSAKSI BERHASIL*  
          BY *LUXXY*
╚════════════════════╝

📦 *Barang:* ${barang}  
💵 *Nominal:* Rp${nominal}  
📅 *Tanggal:* ${tanggal}
🏢 *Nama Store:* © Luxxy

━━━━━━━━━━━━

🙏 *TERIMA KASIH TELAH ORDER DI LUXXY*  
🔁 *JANGAN LUPA ORDER LAGI YA!*  


*🪷TESTIMONI SALURAN :* 
https://whatsapp.com/channel/0029VayeXS2L2AU3pM32263b

━━━━━━━━━━━━`);
}
break
case 'brat': {
    initUserLimit(m.sender, isPremium);
    if (!isPremium && cekLimit(m.sender) < 2) {
        await sendReact(m.key, 1) // ❌
        return reply(mess.limit);
    }

    if (!text) return reply(`Text dibutuhkan.\nContoh: *${prefix + command} hai*`);

    try {
        await sendReact(m.key, 0); // ⏳

        const apiUrl = `https://api.yupra.my.id/api/image/brat?text=${encodeURIComponent(text)}`;
        const buffer = await getBuffer(apiUrl);

        await kyami.sendImageAsSticker(m.chat, buffer, m, {
            packname: global.packname,
            author: global.author
        });

        if (!isPremium) {
    kurangiLimit(m.sender)
    const limitSisa = cekLimit(m.sender)

    if (limitSisa === 5) {
        reply(`*_PERINGATAN‼️ LIMIT KAMU TERSISA_* *${limitSisa}*`)
    }
}

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1) // ❌
        reply("Gagal membuat stiker brat");
    }
}
break
case 'bratvid': {
    if (!isPremium) return reply(mess.prem);

    if (!text) return reply(`Text dibutuhkan.\nContoh: *${prefix + command} hai*`);

    try {
        await sendReact(m.key, 0); // ⏳

        const apiUrl = `https://api.yupra.my.id/api/video/bratv?text=${encodeURIComponent(text)}`;
        const buffer = await getBuffer(apiUrl);

        await kyami.sendImageAsSticker(m.chat, buffer, m, {
            packname: global.packname,
            author: global.author
        });

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply("Gagal membuat stiker brat video");
    }
}
break
case "spamngl": {
    if (!isPremium) return reply(mess.prem);
    
    if (!text.split("|")[0] || !text.split("|")[1] || !text.split("|")[2]) {
      await sendReact(m.key, 1); // ❌
      return reply("Masukan username, pesan, dan jumlah spam!\nContoh: .nglspam Dinz|haloo|5");
    }
    
    await sendReact(m.key, 0); // ⏳
    
    async function sendSpamMessage(username, message, spamCount) {
      let counter = 0;
      while (counter < spamCount) {
        try {
          const date = new Date();
          const minutes = date.getMinutes();
          const hours = date.getHours();
          const formattedDate = `${hours}:${minutes}`;
          const deviceId = crypto.randomBytes(21).toString("hex");
          const url = "https://ngl.link/api/submit";
          const headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
            Accept: "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            Referer: `https://ngl.link/${username}`,
            Origin: "https://ngl.link"
          };
          const body = `username=${username}&question=${message}&deviceId=${deviceId}&gameSlug=&referrer=`;
          const response = await fetch(url, {
            method: "POST",
            headers,
            body,
            mode: "cors",
            credentials: "include"
          });
          if (response.status !== 200) {
            console.log(`[${formattedDate}] [Err] Ratelimited`);
            await new Promise(resolve => setTimeout(resolve, 25000));
          } else {
            counter++;
            console.log(`[${formattedDate}] [Msg] Sent: ${counter}`);
          }
        } catch (err) {
          console.error(`[${formattedDate}] [Err] ${error}`);
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }
    }
    ;
    const [username, message, count] = text.split("|");
    const spamCount = parseInt(count, 10);
    if (isNaN(spamCount) || spamCount <= 0) {
      await sendReact(m.key, 1); // ❌
      return reply("Jumlah spam harus berupa angka positif!");
    }
    try {
      await sendSpamMessage(username, message, spamCount);
      reply(`Sukses mengirim ${spamCount} pesan NGL ke ${username}`);
    } catch (e) {
      console.error(e);
      await sendReact(m.key, 1); // ❌
      return reply("Fitur error, coba lagi nanti.");
    }
  }
break
case 'pushkontak': {

    if (!isGroup) return reply('Fitur ini hanya dapat digunakan di grup.');

    if (!isCreator) return reply(mess.owner);

    const groupMetadata = await safeGroupMetadata(kyami, from);
    const participants = groupMetadata.participants;

    if (!text) return reply('Silakan masukkan pesan yang ingin dikirim.');

    const pesan = text.trim(); 
    let success = 0;
    let failed = 0;

    for (let member of participants) {
        const memberId = member.id; 
        try {
            // Kirim pesan ke anggota grup
            await kyami.sendMessage(memberId, { text: pesan });
            console.log(`Pesan berhasil dikirim ke: ${memberId}`);
            success++;
        } catch (err) {
            console.error(err);
            failed++;
        }
        await sleep(global.delayPushkontak);
    }

    reply(`Push pesan selesai.\nBerhasil: ${success}\nGagal: ${failed}`);
    break;
}
break
case 'pushkontakid': {
    if (!isCreator) return reply(mess.owner);
    const args = text.split('|');
    if (args.length < 2) return reply(`Gunakan format:\n${prefix}pushkontakid <id_grup>|<pesan>\n\nContoh:\n*${prefix}pushkontakid 1234567890123456789@g.us|Woi Jawir*`);

    const groupId = args[0].trim(); 
    const pesan = args[1].trim(); 
    try {
        const groupMetadata = await safeGroupMetadata(kyami, groupId);
        const participants = groupMetadata.participants;

        let success = 0;
        let failed = 0;

        for (let member of participants) {
            const nomor = member.id.split('@')[0];  
            const jid = nomor + '@s.whatsapp.net';

            try {
                await kyami.sendMessage(jid, { text: pesan });
                console.log(`Pesan berhasil dikirim ke: ${nomor}`);
                success++;
            } catch (err) {
                console.error(err);
                failed++;
            }
            await sleep(global.delayPushkontak);
        }

        reply(`Push pesan selesai.\nBerhasil: ${success}\nGagal: ${failed}`);
    } catch (err) {
        console.error(err);
        reply('Gagal mendapatkan metadata grup. Pastikan ID grup benar dan bot ada di dalam grup tersebut.');
    }
}
break
case 'sewa':
case 'listsewa': {
    await sendReact(m.key, 0); // ⏳

    const teksList = `
〔 *LIST SEWA BOT ${namaBot}* 〕
💰 *700p / Hari*
💰 *5K / Minggu*
💰 *15K / Bulan*

📦 *Fitur Tersedia:*
* AntiLink
> (mencegah member kirim link grup lain)
* AntiSpamGrup
> (mencegah spam di grup)
* Welcome
> (sambutan otomatis untuk member baru)
* Upswgc
> (upload status grup cocok untuk promosi)
* AntiStiker
> (hapus stiker otomatis di grup)
* GcTime
> (buka/tutup grup otomatis sesuai jadwal)
    `.trim();

    try {
        await sendButtons(kyami, m.chat, {
            title: `💎 SEWA BOT ${namaBot}`,
            text: teksList,
            footer: "© Luxxy | Leo",
            buttons: [
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "📱 Hubungi Owner",
                        url: "https://wa.me/6285655636044"
                    })
                }
            ]
        }, { quoted: m });
    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        await reply('Terjadi kesalahan saat menampilkan list sewa.');
    }
}
break  
case 'h':
case 'hidetag': {
    if (!m.isGroup) return reply(mess.group);
    if (!isAdmins && !isCreator) return reply(mess.admin);

    let textMessage = args.join(" ") || (m.quoted?.text || "");

    if (!textMessage) textMessage = " ";

    await sendReact(m.key, 0); // ⏳

    try {

        await kyami.sendMessage(m.chat, {
            text: textMessage,
            mentions: participants.map(p => p.id)
        }, { quoted: m });


    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply("Gagal mengirim hidetag");
    }
}
break
case 'addsewa': {
    try {
        if (!isCreator) return reply(mess.owner)

        let [link, dur] = text.split(" ");

        if (!link || !dur) {
            return reply(`Format salah!

Contoh:
.addsewa https://chat.whatsapp.com/xxxxx 30hari
.addsewa https://chat.whatsapp.com/xxxxx 12jam
.addsewa https://chat.whatsapp.com/xxxxx 7hari`);
        }

        const code = link.match(/chat\.whatsapp\.com\/([\w-]+)/i)?.[1];
        if (!code) return reply("❌ Link grup tidak valid!");

        await sendReact(m.key, 0); // ⏳

        // Join grup
        const groupId = await kyami.groupAcceptInvite(code);
        const meta = await safeGroupMetadata(kyami, groupId);
        const namaGrup = meta.subject;

        // Konversi durasi ke ms
        let timeMs;
        if (/menit/i.test(dur)) timeMs = parseInt(dur) * 60 * 1000;
        else if (/jam/i.test(dur)) timeMs = parseInt(dur) * 60 * 60 * 1000;
        else if (/hari/i.test(dur)) timeMs = parseInt(dur) * 24 * 60 * 60 * 1000;
        else if (/minggu/i.test(dur)) timeMs = parseInt(dur) * 7 * 24 * 60 * 60 * 1000;
        else if (/bulan/i.test(dur)) timeMs = parseInt(dur) * 30 * 24 * 60 * 60 * 1000;
        else return reply("Durasi tidak valid! (menit, jam, hari, minggu, bulan)");

        const endTime = Date.now() + timeMs;

        // Simpan ke database
        Sewa[groupId] = {
            groupName: namaGrup,
            end: endTime,
            durasi: dur,
            addedBy: m.sender,
            addedAt: Date.now()
        };
        saveSewa();

        reply(`Sewa berhasil ditambahkan!

📌 *Nama Grup:* ${namaGrup}
⏳ *Durasi:* ${dur}
🕒 *Ditambahkan:* ${new Date(Sewa[groupId].addedAt).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
🕒 *Berakhir:* ${new Date(endTime).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}`);

    } catch (err) {
        console.error(err);
        await sendReact(m.key, 1); // ❌
        reply("Gagal menambahkan sewa.");
    }
}
break
case 'statussewa': {
    try {
        if (!isCreator) return reply(mess.owner);

        if (!Object.keys(Sewa).length) {
            return reply("Belum ada grup yang sedang dalam masa sewa.");
        }

        let teks = `📊 *STATUS SEWA BOT*\n\n`;

        for (let id in Sewa) {
            let data = Sewa[id];
            let sisa = data.end - Date.now();

            teks += `🏷️ *Nama Grup:* ${data.groupName}\n`;
            teks += `⏳ *Durasi:* ${data.durasi}\n`;
            teks += `🕒 *Ditambahkan:* ${formatWIB(data.addedAt)}\n`;
            teks += `📅 *Berakhir:* ${formatWIB(data.end)}\n`;
            teks += `⌛ *Sisa:* ${getSisaWaktu(sisa)}\n`;
            teks += `━━━━━━━━━━━━━━\n\n`;
        }

        reply(teks.trim());

    } catch (err) {
        console.error(err);
        reply("Gagal menampilkan status sewa.");
    }
}
break
case '1gb': {
    if (!isCreator) return reply(mess.owner)
    let t = text.split(',')
    if (t.length < 2) return reply(`Format salah!\nContoh: *${prefix + command} user,6281234567890*`)
    
    let username = t[0]
    let nomorhp = t[1].replace(/[^0-9]/g, '')
    let u = username + '@gmail.com'
    let password = Math.random().toString(36).slice(-8)
    let jid = nomorhp + '@s.whatsapp.net'

    await sendReact(m.key, 0); // ⏳

    try {
        let resUser = await fetch(global.domain + "/api/application/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                email: u,
                username: username,
                first_name: username,
                last_name: "1GB",
                language: "en",
                password: password
            })
        })
        let dataUser = await resUser.json()
        if (dataUser.errors) return reply(`Gagal buat user: ${dataUser.errors[0].detail}`)
        let user = dataUser.attributes

        let resServer = await fetch(global.domain + "/api/application/servers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                name: username + " 1GB",
                user: user.id,
                egg: parseInt(global.egg),
                nest: parseInt(global.nest),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: "npm start",
                limits: {
                    memory: 1024,
                    swap: 0,
                    disk: 1024,
                    io: 500,
                    cpu: 90
                },
                feature_limits: {
                    databases: 1,
                    backups: 1,
                    allocations: 1
                },
                deploy: {
                    locations: [parseInt(global.loc)],
                    dedicated_ip: false,
                    port_range: []
                },
                environment: {
                    NODE_PACKAGES: "npm",
                    UNS_TRACK: "master",
                    CMD_RUN: "npm start"
                }
            })
        })
        let dataServer = await resServer.json()
        if (dataServer.errors) return reply(`Gagal buat server: ${dataServer.errors[0].detail}`)
        let server = dataServer.attributes

        let kePembeli = `Hai @${nomorhp}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${global.domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================`

        await kyami.sendMessage(jid, { text: kePembeli, mentions: [jid] })

        let keOwner = `🚀 *CREATE PANEL SUCCESS* 🚀\n\n` +
                    `ID: ${user.id}\n` +
                    `NAME: ${user.first_name} ${user.last_name}\n` +
                    `MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB\n` +
                    `DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB\n` +
                    `CPU: ${server.limits.cpu}%`

        reply(keOwner)

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan sistem!")
    }
}
break
case '2gb': {
    if (!isCreator) return reply(mess.owner)
    let t = text.split(',')
    if (t.length < 2) return reply(`Format salah!\nContoh: *${prefix + command} user,6281234567890*`)
    
    let username = t[0]
    let nomorhp = t[1].replace(/[^0-9]/g, '')
    let u = username + '@gmail.com'
    let password = Math.random().toString(36).slice(-8)
    let jid = nomorhp + '@s.whatsapp.net'

    await sendReact(m.key, 0); // ⏳

    try {
        let resUser = await fetch(global.domain + "/api/application/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                email: u,
                username: username,
                first_name: username,
                last_name: "2GB",
                language: "en",
                password: password
            })
        })
        let dataUser = await resUser.json()
        if (dataUser.errors) return reply(`Gagal buat user: ${dataUser.errors[0].detail}`)
        let user = dataUser.attributes

        let resServer = await fetch(global.domain + "/api/application/servers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                name: username + " 2GB",
                user: user.id,
                egg: parseInt(global.egg),
                nest: parseInt(global.nest),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: "npm start",
                limits: {
                    memory: 2048,
                    swap: 0,
                    disk: 2048,
                    io: 500,
                    cpu: 100
                },
                feature_limits: {
                    databases: 2,
                    backups: 2,
                    allocations: 1
                },
                deploy: {
                    locations: [parseInt(global.loc)],
                    dedicated_ip: false,
                    port_range: []
                },
                environment: {
                    NODE_PACKAGES: "npm",
                    UNS_TRACK: "master",
                    CMD_RUN: "npm start"
                }
            })
        })
        let dataServer = await resServer.json()
        if (dataServer.errors) return reply(`Gagal buat server: ${dataServer.errors[0].detail}`)
        let server = dataServer.attributes

        let kePembeli = `Hai @${nomorhp}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${global.domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================`

        await kyami.sendMessage(jid, { text: kePembeli, mentions: [jid] })

        let keOwner = `🚀 *CREATE PANEL SUCCESS* 🚀\n\n` +
                    `ID: ${user.id}\n` +
                    `NAME: ${user.first_name} ${user.last_name}\n` +
                    `MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB\n` +
                    `DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB\n` +
                    `CPU: ${server.limits.cpu}%`

        reply(keOwner)

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan sistem!")
    }
}
break
case '3gb': {
    if (!isCreator) return reply(mess.owner)
    let t = text.split(',')
    if (t.length < 2) return reply(`Format salah!\nContoh: *${prefix + command} user,6281234567890*`)
    
    let username = t[0]
    let nomorhp = t[1].replace(/[^0-9]/g, '')
    let u = username + '@gmail.com'
    let password = Math.random().toString(36).slice(-8)
    let jid = nomorhp + '@s.whatsapp.net'

    await sendReact(m.key, 0); // ⏳

    try {
        let resUser = await fetch(global.domain + "/api/application/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                email: u,
                username: username,
                first_name: username,
                last_name: "3GB",
                language: "en",
                password: password
            })
        })
        let dataUser = await resUser.json()
        if (dataUser.errors) return reply(`Gagal buat user: ${dataUser.errors[0].detail}`)
        let user = dataUser.attributes

        let resServer = await fetch(global.domain + "/api/application/servers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                name: username + " 3GB",
                user: user.id,
                egg: parseInt(global.egg),
                nest: parseInt(global.nest),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: "npm start",
                limits: {
                    memory: 3072,
                    swap: 0,
                    disk: 3072,
                    io: 500,
                    cpu: 120
                },
                feature_limits: {
                    databases: 3,
                    backups: 3,
                    allocations: 1
                },
                deploy: {
                    locations: [parseInt(global.loc)],
                    dedicated_ip: false,
                    port_range: []
                },
                environment: {
                    NODE_PACKAGES: "npm",
                    UNS_TRACK: "master",
                    CMD_RUN: "npm start"
                }
            })
        })
        let dataServer = await resServer.json()
        if (dataServer.errors) return reply(`Gagal buat server: ${dataServer.errors[0].detail}`)
        let server = dataServer.attributes

        let kePembeli = `Hai @${nomorhp}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${global.domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================`

        await kyami.sendMessage(jid, { text: kePembeli, mentions: [jid] })

        let keOwner = `🚀 *CREATE PANEL SUCCESS* 🚀\n\n` +
                    `ID: ${user.id}\n` +
                    `NAME: ${user.first_name} ${user.last_name}\n` +
                    `MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB\n` +
                    `DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB\n` +
                    `CPU: ${server.limits.cpu}%`

        reply(keOwner)

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan sistem!")
    }
}
break
case '4gb': {
    if (!isCreator) return reply(mess.owner)
    let t = text.split(',')
    if (t.length < 2) return reply(`Format salah!\nContoh: *${prefix + command} user,6281234567890*`)
    
    let username = t[0]
    let nomorhp = t[1].replace(/[^0-9]/g, '')
    let u = username + '@gmail.com'
    let password = Math.random().toString(36).slice(-8)
    let jid = nomorhp + '@s.whatsapp.net'

    await sendReact(m.key, 0); // ⏳

    try {
        let resUser = await fetch(global.domain + "/api/application/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                email: u,
                username: username,
                first_name: username,
                last_name: "4GB",
                language: "en",
                password: password
            })
        })
        let dataUser = await resUser.json()
        if (dataUser.errors) return reply(`Gagal buat user: ${dataUser.errors[0].detail}`)
        let user = dataUser.attributes

        let resServer = await fetch(global.domain + "/api/application/servers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                name: username + " 4GB",
                user: user.id,
                egg: parseInt(global.egg),
                nest: parseInt(global.nest),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: "npm start",
                limits: {
                    memory: 4096,
                    swap: 0,
                    disk: 4096,
                    io: 500,
                    cpu: 150
                },
                feature_limits: {
                    databases: 4,
                    backups: 4,
                    allocations: 1
                },
                deploy: {
                    locations: [parseInt(global.loc)],
                    dedicated_ip: false,
                    port_range: []
                },
                environment: {
                    NODE_PACKAGES: "npm",
                    UNS_TRACK: "master",
                    CMD_RUN: "npm start"
                }
            })
        })
        let dataServer = await resServer.json()
        if (dataServer.errors) return reply(`Gagal buat server: ${dataServer.errors[0].detail}`)
        let server = dataServer.attributes

        let kePembeli = `Hai @${nomorhp}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${global.domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================`

        await kyami.sendMessage(jid, { text: kePembeli, mentions: [jid] })

        let keOwner = `🚀 *CREATE PANEL SUCCESS* 🚀\n\n` +
                    `ID: ${user.id}\n` +
                    `NAME: ${user.first_name} ${user.last_name}\n` +
                    `MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB\n` +
                    `DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB\n` +
                    `CPU: ${server.limits.cpu}%`

        reply(keOwner)

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan sistem!")
    }
}
break
case '5gb': {
    if (!isCreator) return reply(mess.owner)
    let t = text.split(',')
    if (t.length < 2) return reply(`Format salah!\nContoh: *${prefix + command} user,6281234567890*`)
    
    let username = t[0]
    let nomorhp = t[1].replace(/[^0-9]/g, '')
    let u = username + '@gmail.com'
    let password = Math.random().toString(36).slice(-8)
    let jid = nomorhp + '@s.whatsapp.net'

    await sendReact(m.key, 0); // ⏳

    try {
        let resUser = await fetch(global.domain + "/api/application/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                email: u,
                username: username,
                first_name: username,
                last_name: "5GB",
                language: "en",
                password: password
            })
        })
        let dataUser = await resUser.json()
        if (dataUser.errors) return reply(`Gagal buat user: ${dataUser.errors[0].detail}`)
        let user = dataUser.attributes

        let resServer = await fetch(global.domain + "/api/application/servers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                name: username + " 5GB",
                user: user.id,
                egg: parseInt(global.egg),
                nest: parseInt(global.nest),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: "npm start",
                limits: {
                    memory: 5120,
                    swap: 0,
                    disk: 5120,
                    io: 500,
                    cpu: 180
                },
                feature_limits: {
                    databases: 5,
                    backups: 5,
                    allocations: 1
                },
                deploy: {
                    locations: [parseInt(global.loc)],
                    dedicated_ip: false,
                    port_range: []
                },
                environment: {
                    NODE_PACKAGES: "npm",
                    UNS_TRACK: "master",
                    CMD_RUN: "npm start"
                }
            })
        })
        let dataServer = await resServer.json()
        if (dataServer.errors) return reply(`Gagal buat server: ${dataServer.errors[0].detail}`)
        let server = dataServer.attributes

        let kePembeli = `Hai @${nomorhp}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${global.domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================`

        await kyami.sendMessage(jid, { text: kePembeli, mentions: [jid] })

        let keOwner = `🚀 *CREATE PANEL SUCCESS* 🚀\n\n` +
                    `ID: ${user.id}\n` +
                    `NAME: ${user.first_name} ${user.last_name}\n` +
                    `MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB\n` +
                    `DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB\n` +
                    `CPU: ${server.limits.cpu}%`

        reply(keOwner)

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan sistem!")
    }
}
break
case '6gb': {
    if (!isCreator) return reply(mess.owner)
    let t = text.split(',')
    if (t.length < 2) return reply(`Format salah!\nContoh: *${prefix + command} user,6281234567890*`)
    
    let username = t[0]
    let nomorhp = t[1].replace(/[^0-9]/g, '')
    let u = username + '@gmail.com'
    let password = Math.random().toString(36).slice(-8)
    let jid = nomorhp + '@s.whatsapp.net'

    await sendReact(m.key, 0); // ⏳

    try {
        let resUser = await fetch(global.domain + "/api/application/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                email: u,
                username: username,
                first_name: username,
                last_name: "6GB",
                language: "en",
                password: password
            })
        })
        let dataUser = await resUser.json()
        if (dataUser.errors) return reply(`Gagal buat user: ${dataUser.errors[0].detail}`)
        let user = dataUser.attributes

        let resServer = await fetch(global.domain + "/api/application/servers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                name: username + " 6GB",
                user: user.id,
                egg: parseInt(global.egg),
                nest: parseInt(global.nest),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: "npm start",
                limits: {
                    memory: 6144,
                    swap: 0,
                    disk: 6144,
                    io: 500,
                    cpu: 200
                },
                feature_limits: {
                    databases: 5,
                    backups: 5,
                    allocations: 1
                },
                deploy: {
                    locations: [parseInt(global.loc)],
                    dedicated_ip: false,
                    port_range: []
                },
                environment: {
                    NODE_PACKAGES: "npm",
                    UNS_TRACK: "master",
                    CMD_RUN: "npm start"
                }
            })
        })
        let dataServer = await resServer.json()
        if (dataServer.errors) return reply(`Gagal buat server: ${dataServer.errors[0].detail}`)
        let server = dataServer.attributes

        let kePembeli = `Hai @${nomorhp}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${global.domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================`

        await kyami.sendMessage(jid, { text: kePembeli, mentions: [jid] })

        let keOwner = `🚀 *CREATE PANEL SUCCESS* 🚀\n\n` +
                    `ID: ${user.id}\n` +
                    `NAME: ${user.first_name} ${user.last_name}\n` +
                    `MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB\n` +
                    `DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB\n` +
                    `CPU: ${server.limits.cpu}%`

        reply(keOwner)

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan sistem!")
    }
}
break
case '7gb': {
    if (!isCreator) return reply(mess.owner)
    let t = text.split(',')
    if (t.length < 2) return reply(`Format salah!\nContoh: *${prefix + command} user,6281234567890*`)
    
    let username = t[0]
    let nomorhp = t[1].replace(/[^0-9]/g, '')
    let u = username + '@gmail.com'
    let password = Math.random().toString(36).slice(-8)
    let jid = nomorhp + '@s.whatsapp.net'

    await sendReact(m.key, 0); // ⏳

    try {
        let resUser = await fetch(global.domain + "/api/application/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                email: u,
                username: username,
                first_name: username,
                last_name: "7GB",
                language: "en",
                password: password
            })
        })
        let dataUser = await resUser.json()
        if (dataUser.errors) return reply(`Gagal buat user: ${dataUser.errors[0].detail}`)
        let user = dataUser.attributes

        let resServer = await fetch(global.domain + "/api/application/servers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                name: username + " 7GB",
                user: user.id,
                egg: parseInt(global.egg),
                nest: parseInt(global.nest),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: "npm start",
                limits: {
                    memory: 7168,
                    swap: 0,
                    disk: 7168,
                    io: 500,
                    cpu: 220
                },
                feature_limits: {
                    databases: 5,
                    backups: 5,
                    allocations: 1
                },
                deploy: {
                    locations: [parseInt(global.loc)],
                    dedicated_ip: false,
                    port_range: []
                },
                environment: {
                    NODE_PACKAGES: "npm",
                    UNS_TRACK: "master",
                    CMD_RUN: "npm start"
                }
            })
        })
        let dataServer = await resServer.json()
        if (dataServer.errors) return reply(`Gagal buat server: ${dataServer.errors[0].detail}`)
        let server = dataServer.attributes

        let kePembeli = `Hai @${nomorhp}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${global.domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================`

        await kyami.sendMessage(jid, { text: kePembeli, mentions: [jid] })

        let keOwner = `🚀 *CREATE PANEL SUCCESS* 🚀\n\n` +
                    `ID: ${user.id}\n` +
                    `NAME: ${user.first_name} ${user.last_name}\n` +
                    `MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB\n` +
                    `DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB\n` +
                    `CPU: ${server.limits.cpu}%`

        reply(keOwner)

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan sistem!")
    }
}
break
case '8gb': {
    if (!isCreator) return reply(mess.owner)
    let t = text.split(',')
    if (t.length < 2) return reply(`Format salah!\nContoh: *${prefix + command} user,6281234567890*`)
    
    let username = t[0]
    let nomorhp = t[1].replace(/[^0-9]/g, '')
    let u = username + '@gmail.com'
    let password = Math.random().toString(36).slice(-8)
    let jid = nomorhp + '@s.whatsapp.net'

    await sendReact(m.key, 0); // ⏳

    try {
        let resUser = await fetch(global.domain + "/api/application/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                email: u,
                username: username,
                first_name: username,
                last_name: "8GB",
                language: "en",
                password: password
            })
        })
        let dataUser = await resUser.json()
        if (dataUser.errors) return reply(`Gagal buat user: ${dataUser.errors[0].detail}`)
        let user = dataUser.attributes

        let resServer = await fetch(global.domain + "/api/application/servers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                name: username + " 8GB",
                user: user.id,
                egg: parseInt(global.egg),
                nest: parseInt(global.nest),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: "npm start",
                limits: {
                    memory: 8192,
                    swap: 0,
                    disk: 8192,
                    io: 500,
                    cpu: 240
                },
                feature_limits: {
                    databases: 5,
                    backups: 5,
                    allocations: 1
                },
                deploy: {
                    locations: [parseInt(global.loc)],
                    dedicated_ip: false,
                    port_range: []
                },
                environment: {
                    NODE_PACKAGES: "npm",
                    UNS_TRACK: "master",
                    CMD_RUN: "npm start"
                }
            })
        })
        let dataServer = await resServer.json()
        if (dataServer.errors) return reply(`Gagal buat server: ${dataServer.errors[0].detail}`)
        let server = dataServer.attributes

        let kePembeli = `Hai @${nomorhp}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${global.domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================`

        await kyami.sendMessage(jid, { text: kePembeli, mentions: [jid] })

        let keOwner = `🚀 *CREATE PANEL SUCCESS* 🚀\n\n` +
                    `ID: ${user.id}\n` +
                    `NAME: ${user.first_name} ${user.last_name}\n` +
                    `MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB\n` +
                    `DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB\n` +
                    `CPU: ${server.limits.cpu}%`

        reply(keOwner)

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan sistem!")
    }
}
break
case '9gb': {
    if (!isCreator) return reply(mess.owner)
    let t = text.split(',')
    if (t.length < 2) return reply(`Format salah!\nContoh: *${prefix + command} user,6281234567890*`)
    
    let username = t[0]
    let nomorhp = t[1].replace(/[^0-9]/g, '')
    let u = username + '@gmail.com'
    let password = Math.random().toString(36).slice(-8)
    let jid = nomorhp + '@s.whatsapp.net'

    await sendReact(m.key, 0); // ⏳

    try {
        let resUser = await fetch(global.domain + "/api/application/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                email: u,
                username: username,
                first_name: username,
                last_name: "9GB",
                language: "en",
                password: password
            })
        })
        let dataUser = await resUser.json()
        if (dataUser.errors) return reply(`Gagal buat user: ${dataUser.errors[0].detail}`)
        let user = dataUser.attributes

        let resServer = await fetch(global.domain + "/api/application/servers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                name: username + " 9GB",
                user: user.id,
                egg: parseInt(global.egg),
                nest: parseInt(global.nest),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: "npm start",
                limits: {
                    memory: 9216,
                    swap: 0,
                    disk: 9216,
                    io: 500,
                    cpu: 250
                },
                feature_limits: {
                    databases: 5,
                    backups: 5,
                    allocations: 1
                },
                deploy: {
                    locations: [parseInt(global.loc)],
                    dedicated_ip: false,
                    port_range: []
                },
                environment: {
                    NODE_PACKAGES: "npm",
                    UNS_TRACK: "master",
                    CMD_RUN: "npm start"
                }
            })
        })
        let dataServer = await resServer.json()
        if (dataServer.errors) return reply(`Gagal buat server: ${dataServer.errors[0].detail}`)
        let server = dataServer.attributes

        let kePembeli = `Hai @${nomorhp}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${global.domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================`

        await kyami.sendMessage(jid, { text: kePembeli, mentions: [jid] })

        let keOwner = `🚀 *CREATE PANEL SUCCESS* 🚀\n\n` +
                    `ID: ${user.id}\n` +
                    `NAME: ${user.first_name} ${user.last_name}\n` +
                    `MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB\n` +
                    `DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB\n` +
                    `CPU: ${server.limits.cpu}%`

        reply(keOwner)

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan sistem!")
    }
}
break
case '10gb': {
    if (!isCreator) return reply(mess.owner)
    let t = text.split(',')
    if (t.length < 2) return reply(`Format salah!\nContoh: *${prefix + command} user,6281234567890*`)
    
    let username = t[0]
    let nomorhp = t[1].replace(/[^0-9]/g, '')
    let u = username + '@gmail.com'
    let password = Math.random().toString(36).slice(-8)
    let jid = nomorhp + '@s.whatsapp.net'

    await sendReact(m.key, 0); // ⏳

    try {
        let resUser = await fetch(global.domain + "/api/application/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                email: u,
                username: username,
                first_name: username,
                last_name: "10GB",
                language: "en",
                password: password
            })
        })
        let dataUser = await resUser.json()
        if (dataUser.errors) return reply(`Gagal buat user: ${dataUser.errors[0].detail}`)
        let user = dataUser.attributes

        let resServer = await fetch(global.domain + "/api/application/servers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                name: username + " 10GB",
                user: user.id,
                egg: parseInt(global.egg),
                nest: parseInt(global.nest),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: "npm start",
                limits: {
                    memory: 10240,
                    swap: 0,
                    disk: 10240,
                    io: 500,
                    cpu: 280
                },
                feature_limits: {
                    databases: 5,
                    backups: 5,
                    allocations: 1
                },
                deploy: {
                    locations: [parseInt(global.loc)],
                    dedicated_ip: false,
                    port_range: []
                },
                environment: {
                    NODE_PACKAGES: "npm",
                    UNS_TRACK: "master",
                    CMD_RUN: "npm start"
                }
            })
        })
        let dataServer = await resServer.json()
        if (dataServer.errors) return reply(`Gagal buat server: ${dataServer.errors[0].detail}`)
        let server = dataServer.attributes

        let kePembeli = `Hai @${nomorhp}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${global.domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================`

        await kyami.sendMessage(jid, { text: kePembeli, mentions: [jid] })

        let keOwner = `🚀 *CREATE PANEL SUCCESS* 🚀\n\n` +
                    `ID: ${user.id}\n` +
                    `NAME: ${user.first_name} ${user.last_name}\n` +
                    `MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB\n` +
                    `DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB\n` +
                    `CPU: ${server.limits.cpu}%`

        reply(keOwner)

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan sistem!")
    }
}
break
case 'unli': {
    if (!isCreator) return reply(mess.owner)
    let t = text.split(',')
    if (t.length < 2) return reply(`Format salah!\nContoh: *${prefix + command} user,6281234567890*`)
    
    let username = t[0]
    let nomorhp = t[1].replace(/[^0-9]/g, '')
    let u = username + '@gmail.com'
    let password = Math.random().toString(36).slice(-8)
    let jid = nomorhp + '@s.whatsapp.net'

    await sendReact(m.key, 0); // ⏳

    try {
        let resUser = await fetch(global.domain + "/api/application/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                email: u,
                username: username,
                first_name: username,
                last_name: "UNLI",
                language: "en",
                password: password
            })
        })
        let dataUser = await resUser.json()
        if (dataUser.errors) return reply(`Gagal buat user: ${dataUser.errors[0].detail}`)
        let user = dataUser.attributes

        let resServer = await fetch(global.domain + "/api/application/servers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + global.ptla
            },
            body: JSON.stringify({
                name: username + " UNLI",
                user: user.id,
                egg: parseInt(global.egg),
                nest: parseInt(global.nest),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: "npm start",
                limits: {
                    memory: 0,
                    swap: 0,
                    disk: 0,
                    io: 500,
                    cpu: 0
                },
                feature_limits: {
                    databases: 5,
                    backups: 5,
                    allocations: 1
                },
                deploy: {
                    locations: [parseInt(global.loc)],
                    dedicated_ip: false,
                    port_range: []
                },
                environment: {
                    NODE_PACKAGES: "npm",
                    UNS_TRACK: "master",
                    CMD_RUN: "npm start"
                }
            })
        })
        let dataServer = await resServer.json()
        if (dataServer.errors) return reply(`Gagal buat server: ${dataServer.errors[0].detail}`)
        let server = dataServer.attributes

        let kePembeli = `Hai @${nomorhp}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${global.domain}

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================`

        await kyami.sendMessage(jid, { text: kePembeli, mentions: [jid] })

        let keOwner = `🚀 *CREATE PANEL SUCCESS* 🚀\n\n` +
                    `ID: ${user.id}\n` +
                    `NAME: ${user.first_name} ${user.last_name}\n` +
                    `MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB\n` +
                    `DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB\n` +
                    `CPU: ${server.limits.cpu}%`

        reply(keOwner)

    } catch (err) {
        console.log(err)
        await sendReact(m.key, 1); // ❌
        reply("Terjadi kesalahan sistem!")
    }
}
            break
              
            default:
			if (budy.startsWith('>')) {
            if (!isCreator) return reply(mess.owner);
    try {
        const evaled = await eval(`(async()=>{ ${q} })()`)
        const result = util.format(evaled)
        m.reply(result)
    } catch (err) {
        m.reply(util.format(err))
    }
}
			if (budy.startsWith('<')) {
				if (!isCreator) return reply(mess.owner);
				try {
					let evaled = await eval(`(async () => { ${budy.slice(2)} })()`)
					if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
					await m.reply(evaled)
				} catch (err) {
					await m.reply(String(err))
				}
			}
			if (budy.startsWith('$')) {
				if (!isCreator) return reply(mess.owner);
				if (!text) return
				exec(budy.slice(2), (err, stdout) => {
					if (err) return m.reply(`${err}`)
					if (stdout) return m.reply(stdout)
				})
			}
			if (body.startsWith("=>")) {
            if (!isCreator) return reply(mess.owner);
    try {
        let result = await eval(`(async()=>{ return ${q} })()`);
        if (typeof result !== "string") result = util.inspect(result, { depth: 1 });
        m.reply(result);
    } catch (e) {
        m.reply(`*Eval Error:*\n${e.message}`);
    }
}
        }
    } catch (err) {
        console.error(require("util").format(err));
    }
};

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})