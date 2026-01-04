
require('./config');

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    jidDecode,
    proto,
    delay,
    getContentType,
    getAggregateVotesInPollMessage,
    downloadContentFromMessage,
    fetchLatestWaWebVersion,
    makeCacheableSignalKeyStore,
    Browsers
} = require("@whiskeysockets/baileys");
const cfonts = require('cfonts');
const path = require('path');
const pino = require('pino');
const chalk = require('chalk')
const FileType = require('file-type');
const readline = require("readline");
const fs = require('fs');
const crypto = require("crypto")
const colors = require('colors')
const moment = require("moment-timezone");
const NodeCache = require("node-cache")
const WelcomeGc = JSON.parse(fs.readFileSync('./lib/database/welcome.json'));
const GrupEvent = JSON.parse(fs.readFileSync('./lib/database/grupevent.json'));
const AdminEvent = JSON.parse(fs.readFileSync('./lib/database/adminevent.json'));
const makeInMemoryStore = require('./lib/store')
const { safeGroupMetadata, fetchAllGroupsSafe, pMapLimit } = require('./lib/wa-utils')
const {
    Boom 
} = require('@hapi/boom');
const { 
    color 
} = require('./lib/color');
const { TelegraPh } = require('./lib/uploader')
const {
    smsg,
    sleep,
    getBuffer
} = require('./lib/myfunction');

const { 
    imageToWebp,
    videoToWebp,
    writeExifImg,
    writeExifVid,
    writeExif,
    addExif
} = require('./lib/exif')

const usePairingCode = true;
const session = './session'
const groupCache = new NodeCache({ stdTTL: 5 * 60, useClones: false })

const question = (text) => {
    const rl = readline.createInterface({ 
        input: process.stdin, 
        output: process.stdout 
    });
    return new Promise((resolve) => { rl.question(text, resolve) });
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
cfonts.say('Luxxy', 
{
    font: 'block',
    align: 'left',
    colors: ['blue', 'blueBright'],
    background: 'transparent',
    maxLength: 20,
    rawMode: false,
});

async function kyamistart() {
	const { state, saveCreds } = await useMultiFileAuthState(session);
	const { version } = await fetchLatestWaWebVersion();
	const kyami = makeWASocket({
		printQRInTerminal: !usePairingCode,
		syncFullHistory: true,
		markOnlineOnConnect: true,
		connectTimeoutMs: 60000, 
		defaultQueryTimeoutMs: 0,
		keepAliveIntervalMs: 10000,
		generateHighQualityLinkPreview: true, 
		patchMessageBeforeSending: (message) => {
			const requiresPatch = !!(
				message.buttonsMessage 
				|| message.templateMessage
				|| message.listMessage
			);
			if (requiresPatch) {
				message = {
					viewOnceMessage: {
						message: {
							messageContextInfo: {
								deviceListMetadataVersion: 2,
								deviceListMetadata: {},
							},
							...message,
						},
					},
				};
			}

			return message;
		},
		version,
		browser: ["Ubuntu", "Chrome", "20.0.04"],
		logger: pino({ level: 'fatal' }),
		auth: { 
			creds: state.creds, 
			keys: makeCacheableSignalKeyStore(state.keys, pino().child({ 
				level: 'silent', 
				stream: 'store' 
			})), 
		}
	});
    
    const logger = pino({ level: "silent" }).child({ level: "silent" })
    const store = makeInMemoryStore({ socket: kyami, logger })

    if (usePairingCode && !kyami.authState.creds.registered) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const ask = (text) => new Promise((resolve) => rl.question(text, resolve));

    const input = await ask(`
‹⧼ Takanashi Hoshino Multi Device ⧽›
‹⧼ Kyami Silence ⧽›
=========================================
 ❖ Welcome To Takanashi Hoshino ❖ 
╭────────────────╼
╎ 𝙼𝚊𝚜𝚞𝚔𝚊𝚗 𝙽𝚘𝚖𝚎𝚛 𝚈𝚊𝚗𝚐 𝙰𝚔𝚝𝚒𝚏 𝙰𝚠𝚊𝚕𝚒 𝙳𝚎𝚗𝚐𝚊𝚗 𝟼𝟸 : 
╰────────────────╼ 
> `);

    rl.close();

    let phoneNumber = input.replace(/\D/g, "");
    const pair = "LUXXYABC"
    const code = await kyami.requestPairingCode(phoneNumber, pair)

    console.log(`
╭────────────────╼
╎ This Your Pairing Code: ${code}
╰────────────────╼
`);
}
   store.bind(kyami.ev)
   kyami.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode;

        if (reason === DisconnectReason.badSession) {
            console.log("❌ Aduh, sesi-nya bermasalah nih, kak! Hapus sesi dulu terus coba lagi ya~ 🛠️");
            process.exit();
        } else if (reason === DisconnectReason.connectionClosed) {
            console.log("🔌 Yahh, koneksinya putus... Sabar ya, Mora coba sambungin lagi! 🔄");
            kyamistart();
        } else if (reason === DisconnectReason.connectionLost) {
            console.log("📡 Oops, koneksi ke server hilang, kak! Tunggu bentar, Mora sambungin lagi ya~ 🚀");
            kyamistart();
        } else if (reason === DisconnectReason.connectionReplaced) {
            console.log("🔄 Hmm, sesi ini kayaknya lagi dipakai di tempat lain deh... Coba restart bot-nya ya, kak! 💻");
            process.exit();
        } else if (reason === DisconnectReason.loggedOut) {
            console.log("🚪 Kak, perangkatnya udah keluar... Hapus folder sesi terus scan QR lagi ya! 📲");
            process.exit();
        } else if (reason === DisconnectReason.restartRequired) {
            console.log("🔄 Sebentar ya, Mora lagi mulai ulang koneksinya biar lancar lagi! ♻️");
            kyamistart();
        } else if (reason === DisconnectReason.timedOut) {
            console.log("⏳ Hmm, koneksinya timeout nih, kak! Mora coba sambungin ulang ya~ 🌐");
            kyamistart();
        } else {
            console.log(`❓ Eh, alasan disconnect-nya gak jelas nih, kak... (${reason} | ${connection}) 🤔 Tapi tenang, Mora coba sambungin lagi ya! 💪`);
            kyamistart();
        }
    } else if (connection === "open") {
        console.log(
            chalk.white.bold('\n🎉 Horeee! Berhasil terhubung ke nomor:'),
            chalk.yellow(JSON.stringify(kyami.user, null, 2))
        )
    }
});

    kyami.ev.on("messages.upsert", async (chatUpdate) => {
    try {
        const mek = chatUpdate.messages[0];
        if (!mek.message) return;

        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage')
            ? mek.message.ephemeralMessage.message
            : mek.message;

        if (mek.key && mek.key.remoteJid === 'status@broadcast') return;

        // Cek owner
        const ownerNumber = "6285655636044";
        const ownerJid = ownerNumber.endsWith('@s.whatsapp.net') ? ownerNumber : `${ownerNumber}@s.whatsapp.net`;
        const senderJid = mek.key.remoteJid || '';
        const isOwner = senderJid === ownerJid || senderJid.replace(/@s\.whatsapp\.net$/, '') === ownerNumber;

        if (!kyami.public && !mek.key.fromMe && !isOwner && chatUpdate.type === 'notify') return;
        if (!store.groupMetadata || !Object.keys(store.groupMetadata).length) {
        store.groupMetadata = await fetchAllGroupsSafe(kyami)
        }

        const m = smsg(kyami, mek, store);
        require("./system")(kyami, m, chatUpdate, store);

    } catch (err) {
        console.log("Error handler:", err);
    }
});

    kyami.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };
    
    kyami.ev.on("contacts.update", update => {
        for (let contact of update) {
            let id = contact.id
            if (store && store.contacts)
                store.contacts[id] = {
                    ...(store.contacts?.[id] || {}),
                    ...(contact || {})
                }
        }
    })
    
    kyami.ev.on("contacts.upsert", update => {
        for (let contact of update) {
            let id = contact.id
            if (store && store.contacts)
                store.contacts[id] = { ...(contact || {}), isContact: true }
        }
    })  
    
    kyami.ev.on("groups.update", async updates => {
        for (const update of updates) {
            const metadata = await safeGroupMetadata(kyami, update.id)
            groupCache.set(update.id, metadata)
            if (store.groupMetadata[update.id]) {
                store.groupMetadata[update.id] = {
                    ...(store.groupMetadata[update.id] || {}),
                    ...(update || {})
                }
            }
        }
    })

  kyami.public = global.status
  kyami.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
  let type = await kyami.getFile(path, true);
  let { res, data: file, filename: pathFile } = type;

  if (res && res.status !== 200 || file.length <= 65536) {
    try {
      throw {
        json: JSON.parse(file.toString())
      };
    } catch (e) {
      if (e.json) throw e.json;
    }
  }

  let opt = {
    filename
  };

  if (quoted) opt.quoted = quoted;
  if (!type) options.asDocument = true;

  let mtype = '',
    mimetype = type.mime,
    convert;

  if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
  else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
  else if (/video/.test(type.mime)) mtype = 'video';
  else if (/audio/.test(type.mime)) {
    convert = await (ptt ? toPTT : toAudio)(file, type.ext);
    file = convert.data;
    pathFile = convert.filename;
    mtype = 'audio';
    mimetype = 'audio/ogg; codecs=opus';
  } else mtype = 'document';

  if (options.asDocument) mtype = 'document';

  delete options.asSticker;
  delete options.asLocation;
  delete options.asVideo;
  delete options.asDocument;
  delete options.asImage;

  let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
  let m;

  try {
    m = await kyami.sendMessage(jid, message, { ...opt, ...options });
  } catch (e) {
    //console.error(e)
    m = null;
  } finally {
    if (!m) m = await kyami.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
    file = null;
    return m;
  }
}
kyami.ev.on('call', async (calls) => {
    if (!global.anticall) return;

    for (let call of calls) {
        if (!call.isGroup && call.status === 'offer') {
            const user = call.from;
            console.log(`📞 Panggilan dari ${user}`);

            try {
                // 📨 Kirim pesan dulu
                await kyami.sendMessage(user, {
                    text: '⚠️ Anda *dilarang* menelpon bot!\n\n📵 Bot akan *memblokir* Anda. Hubungi owner jika ini tidak sengaja.'
                });

                // ✅ Tunggu sedikit agar pesan benar-benar dikirim
                await delay(1500);

                // ❌ Tolak panggilan (kalau fungsi tersedia di versi kamu)
                if (typeof kyami.rejectCall === 'function') {
                    await kyami.rejectCall(call.id, user);
                    console.log(`📵 Panggilan dari ${user} ditolak`);
                }

                // 🔒 Blokir user
                await kyami.updateBlockStatus(user, 'block');
                console.log(`🚫 ${user} telah diblokir`);

            } catch (err) {
                console.error(`❌ Gagal proses panggilan dari ${user}:`, err);
            }
        }
    }
});
exports.smsg = async (kyami, m, hasParent) => {
    if (!m) return m
    let M = proto.WebMessageInfo
    m = M.fromObject(m)
    if (m.key) {
        m.id = m.key.id
        m.isBaileys = m.id && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || false
        m.chat = m.key.remoteJid.endsWith('@g.us') ? m.key.remoteJid : Object.values(m.key).find(v => typeof v === 'string' && v.endsWith('@s.whatsapp.net')) || m.key.remoteJid;
        m.lid = Object.values(m.key).find(v => typeof v === 'string' && v.endsWith('@lid')) || m.key.remoteJid;
        m.isGroup = m.chat.endsWith('@g.us')
        m.participant = jidNormalizedUser(Object.values(m.key).find(v => typeof v === 'string' && v.endsWith('@s.whatsapp.net'))) || false;
        m.sender = jidNormalizedUser(m.fromMe ? sock.user.id : m.isGroup ? m.participant : m.chat)
        m.fromMe = m.key.fromMe || areJidsSameUser(m.sender, kyami.user.id)
    }
    if (m.message) {
        let mtype = Object.keys(m.message)
        m.mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype[0]) && mtype[0]) || // Sometimes message in the front
            (mtype.length >= 3 && mtype[1] !== 'messageContextInfo' && mtype[1]) || // Sometimes message in midle if mtype length is greater than or equal to 3!
            mtype[mtype.length - 1] // common case
        m.msg = m.message[m.mtype]
        if (m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = (m.key.remoteJid !== 'status@broadcast' && m.key.remoteJid) || m.sender
        if (m.mtype == 'protocolMessage' && m.msg.key) {
            if (m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
            if (!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
            m.msg.key.fromMe = kyami.decodeJid(m.msg.key.participant) === kyami.decodeJid(kyami.user.id)
            if (!m.msg.key.fromMe && m.msg.key.remoteJid === kyami.decodeJid(kyami.user.id)) m.msg.key.remoteJid = m.sender
        }
        m.text = m.msg.text || m.msg.caption || m.msg.contentText || m.msg || ''
        if (typeof m.text !== 'string') {
            if ([
                'protocolMessage',
                'messageContextInfo',
                'stickerMessage',
                'audioMessage',
                'senderKeyDistributionMessage'
            ].includes(m.mtype)) m.text = ''
            else m.text = m.text.selectedDisplayText || m.text.hydratedTemplate?.hydratedContentText || m.text
        }
        m.mentionedJid = m.msg?.contextInfo?.mentionedJid?.length && m.msg.contextInfo.mentionedJid || []
        let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage ? m.msg.contextInfo.quotedMessage : null
        if (m.quoted) {
            let type = Object.keys(m.quoted)[0]
            m.quoted = m.quoted[type]
            if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
            m.quoted.mtype = type
            m.quoted.id = m.msg.contextInfo.stanzaId
            m.quoted.chat = kyami.decodeJid(m.msg.contextInfo.remoteJid || m.chat || m.sender)
            m.quoted.isBaileys = m.quoted.id && m.quoted.id.length === 16 || false
            m.quoted.isGroup = m.quoted.from.endsWith('@g.us')
            m.quoted.participant = jidNormalizedUser(await lidToJid(m.msg?.contextInfo?.participant, m)) || false
            m.quoted.sender = jidNormalizedUser(await lidToJid(m.msg?.contextInfo?.participant, m) || m.quoted.from)
            m.quoted.fromMe = m.quoted.sender === kyami.user.jid
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.contentText || ''
            m.quoted.name = kyami.getName(m.quoted.sender)
            m.quoted.mentionedJid = m.quoted.contextInfo?.mentionedJid?.length && m.quoted.contextInfo.mentionedJid || []
            m.quoted.key = {
                    remoteJid: m.msg?.contextInfo?.remoteJid || m.chat,
                    participant: jidNormalizedUser(await lidToJid(m.msg?.contextInfo?.participant, m)),
                    fromMe: areJidsSameUser(jidNormalizedUser(await lidToJid(m.msg?.contextInfo?.participant, m)), getLid(sock.user, m)),
                    id: m.msg?.contextInfo?.stanzaId,
                }
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    fromMe: m.quoted.fromMe,
                    remoteJid: m.quoted.chat,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            })
            m.getQuotedObj = m.getQuotedMessage = async () => {
                if (!m.quoted.id) return null
                let q = M.fromObject(await kyami.loadMessage(m.quoted.id) || vM)
                return exports.smsg(kyami, q)
            }
            if (m.quoted.url || m.quoted.directPath) m.quoted.download = (saveToFile = false) => kyami.downloadM(m.quoted, m.quoted.mtype.replace(/message/i, ''), saveToFile)
            
 
/*exports.smsg = (conn, m, hasParent) => {
    if (!m) return m
    let M = proto.WebMessageInfo
    m = M.fromObject(m)
    if (m.key) {
        m.id = m.key.id
        m.isBaileys = m.id && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || false
        let mtype = Object.keys(m.message || {})[0]
        m.chat = kyami.decodeJid(m.key.remoteJid || m.message[mtype] && m.message[mtype].groupId || '')
        m.isGroup = m.chat.endsWith('@lid')
        m.sender = kyami.decodeJid(m.fromMe && kyami.user.id || m.participant || m.key.participant || m.chat || '')
        m.fromMe = m.key.fromMe || areJidsSameUser(m.sender, kyami.user.id)
    }
    if (m.message) {
        let mtype = Object.keys(m.message)
        m.mtype = mtype[mtype[0] === 'messageContextInfo' && mtype.length == 2 ? 1 : 0]
        m.msg = m.message[m.mtype]
        if (m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = m.sender
        // if (m.mtype === 'ephemeralMessage') {
        //     exports.smsg(conn, m.msg)
        //     m.mtype = m.msg.mtype
        //     m.msg = m.msg.msg
        //   }
        if (m.mtype == 'protocolMessage' && m.msg.key) {
            if (m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
            if (!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
            m.msg.key.fromMe = kyami.decodeJid(m.msg.key.participant) === kyami.decodeJid(kyami.user.id)
            if (!m.msg.key.fromMe && m.msg.key.remoteJid === kyami.decodeJid(kyami.user.id)) m.msg.key.remoteJid = m.sender
        }
        m.text = m.msg.text || m.msg.caption || m.msg.contentText || m.msg || ''
        m.mentionedJid = m.msg && m.msg.contextInfo && m.msg.contextInfo.mentionedJid && m.msg.contextInfo.mentionedJid.length && m.msg.contextInfo.mentionedJid || []
        let quoted = m.quoted = m.msg && m.msg.contextInfo && m.msg.contextInfo.quotedMessage ? m.msg.contextInfo.quotedMessage : null
        if (m.quoted) {
            let type = Object.keys(m.quoted)[0]
            m.quoted = m.quoted[type]
            if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
            m.quoted.mtype = type
            m.quoted.id = m.msg.contextInfo.stanzaId
            m.quoted.chat = kyami.decodeJid(m.msg.contextInfo.remoteJid || m.chat || m.sender)
            m.quoted.isBaileys = m.quoted.id && m.quoted.id.length === 16 || false
            m.quoted.sender = kyami.decodeJid(m.msg.contextInfo.participant)
            m.quoted.fromMe = m.quoted.sender === kyami.user.jid
            m.quoted.text = m.quoted.text || m.quoted.caption || ''
            m.quoted.name = kyami.getName(m.quoted.sender)
            m.quoted.mentionedJid = m.quoted.contextInfo && m.quoted.contextInfo.mentionedJid && m.quoted.contextInfo.mentionedJid.length && m.quoted.contextInfo.mentionedJid || []
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    fromMe: m.quoted.fromMe,
                    remoteJid: m.quoted.chat,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            })
            m.getQuotedObj = m.getQuotedMessage = () => {
                if (!m.quoted.id) return false
                let q = M.fromObject(((kyami.chats[m.quoted.chat] || {}).messages || {})[m.quoted.id])
                return exports.smsg(conn, q ? q : vM)
            }

            if (m.quoted.url || m.quoted.directPath) m.quoted.download = (saveToFile = false) => kyami.downloadM(m.quoted, m.quoted.mtype.replace(/message/i, ''), saveToFile)*/

            /**
             * Reply to quoted message
             * @param {String|Object} text
             * @param {String|false} chatId
             * @param {Object} options
             */
            m.quoted.reply = (text, chatId, options) => kyami.reply(chatId ? chatId : m.chat, text, vM, options)

            /**
             * Copy quoted message
             */
            m.quoted.copy = () => exports.smsg(kyami, M.fromObject(M.toObject(vM)))

            /**
             * Forward quoted message
             * @param {String} jid
             *  @param {Boolean} forceForward
            */
            m.quoted.forward = (jid, forceForward = false) => kyami.forwardMessage(jid, vM, forceForward)

            /**
             * Exact Forward quoted message
             * @param {String} jid
             * @param {Boolean|Number} forceForward
             * @param {Object} options
            */
            m.quoted.copyNForward = (jid, forceForward = true, options = {}) => kyami.copyNForward(jid, vM, forceForward, options)

            /**
             * Modify quoted Message
             * @param {String} jid
             * @param {String} text
             * @param {String} sender
             * @param {Object} options
            */
            m.quoted.cMod = (jid, text = '', sender = m.quoted.sender, options = {}) => kyami.cMod(jid, vM, text, sender, options)

            /**
             * Delete quoted message
             */
            m.quoted.delete = () => kyami.sendMessage(m.quoted.chat, { delete: vM.key })
        }
    }
    m.name = kyami.getName(m.lid)
    if (m.msg && m.msg.url) m.download = (saveToFile = false) => kyami.downloadM(m.msg, m.mtype.replace(/message/i, ''), saveToFile)
    /**
     * Reply to this message
     * @param {String|Object} text
     * @param {String|false} chatId
     * @param {Object} options
     */
    m.reply = (text, chatId, options) => kyami.reply(chatId ? chatId : m.chat, text, m, options)

    /**
     * Copy this message
     */
    m.copy = () => exports.smsg(kyami, M.fromObject(M.toObject(m)))

    /**
     * Forward this message
     * @param {String} jid
     * @param {Boolean} forceForward
     */
    m.forward = (jid = m.chat, forceForward = false) => kyami.copyNForward(jid, m, forceForward, options)
    
    // BY JOHANNES
    /**
     * Reply to this message
     * @param {String|Object} text
     * @param {String|false} chatId
     * @param {Object} options
     */
     m.reply = async (text, chatId, options) => kyami.reply(chatId ? chatId : m.chat, text, m, options)
     
     /**m.reply = async (text, chatId, options) => {
    const msg = await generateWAMessageFromContent(
      m.chat,
      {
        interactiveMessage: {
          body: {
            text: "\n" + text + "\n",
          },
          footer: {
            text: "Powered by : dcodekemii",
          },
          header: {
            title: "",
            hasMediaAttachment: false,
          },
          nativeFlowMessage: {
            buttons: [],
          },
        },
      },
      {
        quoted: global.fkontak,
      },
    );
    return kyami.relayMessage(m.chat, msg.message, {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    });
   };/**
    
    /**
     * Exact Forward this message
     * @param {String} jid
     * @param {Boolean} forceForward
     * @param {Object} options
     */
    
    m.copyNForward = (jid = m.chat, forceForward = true, options = {}) => kyami.copyNForward(jid, m, forceForward, options)

    /**
     * Modify this Message
     * @param {String} jid 
     * @param {String} text 
     * @param {String} sender 
     * @param {Object} options 
     */
    m.cMod = (jid, text = '', sender = m.sender, options = {}) => kyami.cMod(jid, m, text, sender, options)

    /**
     * Delete this message
     */
    m.delete = () => kyami.sendMessage(m.chat, { delete: m.key })

    try {
        if (m.msg && m.mtype == 'protocolMessage') kyami.ev.emit('message.delete', m.msg.key)
    } catch (e) {
        console.error(e)
    }
    return m
}
    kyami.sendText = async (jid, text, quoted = 'Kyami', options) => {
        kyami.sendMessage(jid, {
            text: text,
            ...options
        },{ quoted });
    }
    
    kyami.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])}
        return buffer
    }

    kyami.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? 
            path : /^data:.*?\/.*?;base64,/i.test(path) ?
            Buffer.from(path.split`, `[1], 'base64') : /^https?:\/\//.test(path) ?
            await (await getBuffer(path)) : fs.existsSync(path) ? 
            fs.readFileSync(path) : Buffer.alloc(0);
        
        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options);
        } else {
            buffer = await addExif(buff);
        }
        
        await kyami.sendMessage(jid, { 
            sticker: { url: buffer }, 
            ...options }, { quoted });
        return buffer;
    };
    kyami.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || "";
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")[0];

        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        let type = await FileType.fromBuffer(buffer);
        let trueFileName = attachExtension ? filename + "." + type.ext : filename;
        await fs.writeFileSync(trueFileName, buffer);
        
        return trueFileName;
    };

    kyami.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? 
            path : /^data:.*?\/.*?;base64,/i.test(path) ?
            Buffer.from(path.split`, `[1], 'base64') : /^https?:\/\//.test(path) ?
            await (await getBuffer(path)) : fs.existsSync(path) ? 
            fs.readFileSync(path) : Buffer.alloc(0);

        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options);
        } else {
            buffer = await videoToWebp(buff);
        }

        await kyami.sendMessage(jid, {
            sticker: { url: buffer }, 
            ...options }, { quoted });
        return buffer;
    };
	kyami.sendAsSticker = async (jid, path, quoted, options = {}) => {
		const buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
		let buffer
	 if (options && (options.packname || options.author)) {
            buffer = await writeExif(buff, options);
        } else {
            buffer = await videoToWebp(buff);
        }
		await kyami.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
		return buff;
	}
	kyami.imgToSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split`,`[1], "base64")
      : /^https?:\/\//.test(path)
      ? await await fetchBuffer(path)
      : fs.existsSync(path)
      ? fs.readFileSync(path)
      : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifImg(buff, options);
    } else {
      buffer = await imageToWebp(buff);
    }
    await kyami.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      }
    );
    return buffer;
  };
    kyami.albumMessage = async (jid, array, quoted) => {
        const album = generateWAMessageFromContent(jid, {
            messageContextInfo: {
                messageSecret: crypto.randomBytes(32),
            },
            
            albumMessage: {
                expectedImageCount: array.filter((a) => a.hasOwnProperty("image")).length,
                expectedVideoCount: array.filter((a) => a.hasOwnProperty("video")).length,
            },
        }, {
            userJid: kyami.user.jid,
            quoted,
            upload: kyami.waUploadToServer
        });

        await kyami.relayMessage(jid, album.message, {
            messageId: album.key.id,
        });
        
        kyami.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'}
filename = path.join(__filename, './lib' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
size: await getSizeMedia(data),
...type,
data}}

kyami.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
let types = await kyami.getFile(path, true)
let { mime, ext, res, data, filename } = types
if (res && res.status !== 200 || file.length <= 65536) {
try { throw { json: JSON.parse(file.toString()) } }
catch (e) { if (e.json) throw e.json }}
let type = '', mimetype = mime, pathFile = filename
if (options.asDocument) type = 'document'
if (options.asSticker || /webp/.test(mime)) {
let { writeExif } = require('./lib/exif')
let media = { mimetype: mime, data }
pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
await fs.promises.unlink(filename)
type = 'sticker'
mimetype = 'image/webp'}
else if (/image/.test(mime)) type = 'image'
else if (/video/.test(mime)) type = 'video'
else if (/audio/.test(mime)) type = 'audio'
else type = 'document'
await kyami.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
return fs.promises.unlink(pathFile)}

kyami.sendText = (jid, text, quoted = '', options) => kyami.sendMessage(jid, { text: text, ...options }, { quoted })

kyami.serializeM = (m) => smsg(kyami, m, store)

kyami.before = (teks) => smsg(kyami, m, store)

kyami.serializeM = (m) => {
        return exports.smsg(kyami , m)
    }


        for (let content of array) {
            const img = await generateWAMessage(jid, content, {
                upload: kyami.waUploadToServer,
            });

            img.message.messageContextInfo = {
                messageSecret: crypto.randomBytes(32),
                messageAssociation: {
                    associationType: 1,
                    parentMessageKey: album.key,
                },    
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast",
                forwardingScore: 99999,
                isForwarded: true,
                mentionedJid: [jid],
                starred: true,
                labels: ["Y", "Important"],
                isHighlighted: true,
                businessMessageForwardInfo: {
                    businessOwnerJid: jid,
                },
                dataSharingContext: {
                    showMmDisclosure: true,
                },
            };

            img.message.forwardedNewsletterMessageInfo = {
                newsletterJid: "0@newsletter",
                serverMessageId: 1,
                newsletterName: `WhatsApp`,
                contentType: 1,
                timestamp: new Date().toISOString(),
                senderName: "✧ Dittsans",
                content: "Text Message",
                priority: "high",
                status: "sent",
            };

            img.message.disappearingMode = {
                initiator: 3,
                trigger: 4,
                initiatorDeviceJid: jid,
                initiatedByExternalService: true,
                initiatedByUserDevice: true,
                initiatedBySystem: true,
                initiatedByServer: true,
                initiatedByAdmin: true,
                initiatedByUser: true,
                initiatedByApp: true,
                initiatedByBot: true,
                initiatedByMe: true,
            };

            await kyami.relayMessage(jid, img.message, {
                messageId: img.key.id,
                quoted: {
                    key: {
                        remoteJid: album.key.remoteJid,
                        id: album.key.id,
                        fromMe: true,
                        participant: kyami.user.jid,
                    },
                    message: album.message,
                },
            });
        }
        return album;
    };
kyami.ev.on('group-participants.update', async (update) => {
    const { id, author, participants, action } = update;
    try {
        if (!WelcomeGc.includes(id)) return; // Hanya grup yang aktif

        const metadata = await kyami.groupMetadata(id);
        const groupName = metadata.subject;

        const qtext = {
            key: { remoteJid: "status@broadcast", participant: "0@s.whatsapp.net" },
            message: { extendedTextMessage: { text: "[ Group Notification ❗ ]" } }
        };

        for (let n of participants) {
            let jid = typeof n === 'string' ? n : n.id;
    if (!jid) continue;
            const sender = author || jid;
            const jidNumber = jid.split('@')[0];
            const senderNumber = typeof sender === 'string' ? sender.split('@')[0] : sender.id.split('@')[0];

            if (action === 'add') {
                let teks = sender !== jid
                    ? `🎉 Selamat datang @${jidNumber} Kamu telah ditambahkan oleh @${senderNumber} ke grup *${groupName}*
📌 Jangan lupa baca deskripsi yaa` 
                    : `🎉 Selamat datang di grup *${groupName}*, @${jidNumber}
📌 Jangan lupa baca deskripsi yaa`;

                await kyami.sendMessage(id, { text: teks, mentions: [sender, jid] }, { quoted: qtext });

            } else if (action === 'remove') {
                let teks = sender !== jid
                    ? `👋 @${senderNumber} telah mengeluarkan @${jidNumber} dari grup *${groupName}*` 
                    : `👋 @${jidNumber} telah meninggalkan grup *${groupName}*`;

                await kyami.sendMessage(id, { text: teks, mentions: [sender, jid] }, { quoted: qtext });
            }
        }
    } catch (e) {
        console.error(e);
    }
});

kyami.ev.on('group-participants.update', async (update) => {
    const { id, author, participants, action } = update;

    try {
        if (!AdminEvent.includes(id)) return;

        const qtext = {
            key: { remoteJid: "status@broadcast", participant: "0@s.whatsapp.net" },
            message: { extendedTextMessage: { text: "[ Admin Notification ❗ ]" } }
        };

        for (let n of participants) {
            let jid = typeof n === 'string' ? n : n.id;
            let admin = typeof author === 'string' ? author : author?.id || author;
            
            if (!jid) continue;

            const jidNumber = jid.split('@')[0];
            const adminNumber = admin ? admin.split('@')[0] : '';

            let teks = "";

            if (action === 'promote') {
                teks = admin === jid 
                    ? `@${jidNumber} telah menjadi admin grup`
                    : `@${adminNumber} telah menjadikan @${jidNumber} sebagai admin grup`;

            } else if (action === 'demote') {
                teks = admin === jid 
                    ? `@${jidNumber} telah berhenti menjadi admin`
                    : `@${adminNumber} telah menghentikan @${jidNumber} sebagai admin grup`;
            }

            if (teks) {
                await kyami.sendMessage(id, {
                    text: teks,
                    mentions: admin ? [admin, jid] : [jid]
                }, { quoted: qtext });
            }
        }
    } catch (e) {
        console.error(e);
    }
});


kyami.ev.on('groups.update', async (update) => {
    try {
        const res = update[0];
        const id = res.id;
        
        if (!GrupEvent.includes(id)) return;

        const qtext = {
            key: {
                remoteJid: "status@broadcast",
                participant: "0@s.whatsapp.net"
            },
            message: {
                extendedTextMessage: { text: "[ 𝗚𝗿𝗼𝘂𝗽 𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻 ❗ ]" }
            }
        };

        if (res.announce === true) {
            await sleep(1000);
            kyami.sendMessage(id, {
                text: `🔒 *Oops, Gerbang Grup Ditutup!* 🔒\n\nSekarang cuma *admin* yang bisa ngobrol di sini. Jangan sedih ya, tunggu admin buka lagi! 🥺✨`,
            }, { quoted: qtext });
        } else if (res.announce === false) {
            await sleep(1000);
            kyami.sendMessage(id, {
                text: `🔓 *Yay, Gerbang Grup Terbuka!* 🔓\n\nSekarang semua anggota bebas ngobrol seru lagi di sini. Ayo ramein! 🎉😄`,
            }, { quoted: qtext });
        }

        if (res.restrict === true) {
            await sleep(1000);
            kyami.sendMessage(id, {
                text: `🔐 *Info Grup Dikunci!* 🔐\n\nHanya *admin* yang bisa edit info grup sekarang. Tetap tertib ya! 😇📚`,
            }, { quoted: qtext });
        } else if (res.restrict === false) {
            await sleep(1000);
            kyami.sendMessage(id, {
                text: `🔓 *Info Grup Dibuka!* 🔓\n\nSemua anggota bisa ikut edit info grup. Jangan lupa sopan dan bijak ya! 😊📢`,
            }, { quoted: qtext });
        }

        if (res.desc) {
            await sleep(1000);
            kyami.sendMessage(id, {
                text: `📝 *Deskripsi Baru Nih!* 📝\n\nGrup ini punya deskripsi baru lho:\n\n${res.desc}\n\nKeren gak? 😍✨`,
            }, { quoted: qtext });
        }

        if (res.subject) {
            await sleep(1000);
            kyami.sendMessage(id, {
                text: `🖊️ *Nama Grup Baru!* 🖊️\n\nSekarang grup kita punya nama baru:\n\n*${res.subject}*\n\nGimana, kece kan? 😎🔥`,
            }, { quoted: qtext });
        }

        if (res.memberAddMode === true) {
            await sleep(1000);
            kyami.sendMessage(id, {
                text: `🛡️ *Tambah Anggota? Tertutup Dulu!* 🛡️\n\nSekarang cuma *admin* yang bisa nambah anggota baru. Yuk, patuhi aturan ya! 👀✨`,
            }, { quoted: qtext });
        } else if (res.memberAddMode === false) {
            await sleep(1000);
            kyami.sendMessage(id, {
                text: `✅ *Tambah Anggota Bebas!* ✅\n\nSekarang semua anggota bisa ngajak teman-temannya masuk grup ini. Ayo tambah rame! 🥳🎈`,
            }, { quoted: qtext });
        }

        if (res.joinApprovalMode === true) {
            await sleep(1000);
            kyami.sendMessage(id, {
                text: `🛡️ *Pintu Masuk Dijaga Ketat!* 🛡️\n\nCalon anggota baru harus dapet *persetujuan admin* dulu ya sebelum bisa gabung. Tetap aman dan tertib! 🤝🔒`,
            }, { quoted: qtext });
        } else if (res.joinApprovalMode === false) {
            await sleep(1000);
            kyami.sendMessage(id, {
                text: `✅ *Pintu Masuk Terbuka Lebar!* ✅\n\nAnggota baru bisa langsung gabung tanpa nunggu persetujuan admin. Yuk, tambah rame di sini! 🎊😊`,
            }, { quoted: qtext });
        }

    } catch (e) {
        console.error(e);
    }
});

    kyami.ev.on('creds.update', saveCreds);
    return kyami;
}
kyamistart();

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})

 async function lidToJid(id, m) {
    if (!id.endsWith('@lid')) return id
    const meta = readGroupMetadata()[m.chat]
    if (!meta) return id
    const p = meta.participants?.find(v => Object.values(v).includes(id))
    return Object.values(p || {}).find(v => typeof v === 'string' && v.endsWith('@s.whatsapp.net')) || id
}

function getLid(user, m) {
    const v = Object.values(user || {}).filter(x => typeof x === 'string')
    return m.chat.endsWith('@g.us')
        ? v.find(x => x.endsWith('@s.whatsapp.net')) || null
        : v.find(x => x.endsWith('@lid')) || null
}