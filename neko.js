require('./db/config')
let autoGetLayanan = false;
let intervalId;
let antilinkEnabled = false;

const { BufferJSON, WA_DEFAULT_EPHEMERAL, makeWASocket, useMultiFileAuthState, getAggregateVotesInPollMessage, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, downloadContentFromMessage, areJidsSameUser, getContentType } = require("baileys-mod")
const fs = require('fs')
const pino = require('pino')
const logger = require('./logger') // Enhanced logger with libsignal fixes
const { libsignalConfig, handleLibsignalError, performanceTracker } = require('./lib/libsignalConfig')
const pushname = m.pushName || "No Name"
let defaultMarkupPercentage = 0.01; 

const { firefox } = require('playwright');
const FormData = require('form-data');
const admin = require('firebase-admin');
const serviceAccount = require('./db/serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-project-id.firebaseio.com',
  });
}

const antilink = JSON.parse(fs.readFileSync('./src/antilink.json'));
const md5 = require('md5');
const isCreator = [nomerBot, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const firestore = admin.firestore();
const path = require('path');
const util = require('util')
const chalk = require('chalk')
const os = require('os')
const axios = require('axios')
const fsx = require('fs-extra')
const crypto = require('crypto')
const moment = require('moment-timezone')
const { color, bgcolor } = require('./lib/color')
const jsonFilePath = './db/custom_commands.json';
const botgroupFile = './db/botgroup.json';
const configPath = './db/groupConfig.json';
const { exec, spawn, execSync } = require("child_process")
const { smsg, tanggal, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins, generateUniqueRefID, connect } = require('./lib/myfunc')
// H2H business imports removed for broadcast-only functionality
const BroadcastManager = require('./lib/broadcastManager')

// Initialize broadcast manager  
const broadcastManager = new BroadcastManager();

module.exports = client = async (client, m, chatUpdate, store, db_respon_list) => {
  try {
      // Libsignal fixes: Enhanced message logging
      const tracker = performanceTracker.start('message-processing')
      logger.debug(`� NEKO.JS: Message received from ${m.key?.remoteJid || 'unknown'}`);
      
      // Skip if message is from bot itself (prevent loop)
      const botNumber = await client.decodeJid(client.user.id);
      if (m.key.fromMe || m.sender === botNumber) {
        console.log('⏭️ Skipping bot message to prevent loop');
        return;
      }
      
      const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
    var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype === 'messageContextInfo') ? (m.text) : ''
    var budy = (typeof m.text == 'string' ? m.text : '')
    var prefix = "."
    const hariini = moment.tz('Asia/Jakarta').locale('id').format('dddd,DD MMMM YYYY');
    const productData = './db/datadigi.json';
      const productData2 = './db/dataevilbee.json';
    const db = admin.firestore();
    const pathUser = './db/user_down.json'
    const afk = require('./lib/afk');
    const _afk = JSON.parse(fs.readFileSync('./db/afk.json'));
      const ms = require('parse-ms');
      const fetch = require('node-fetch');
      const { createCanvas, loadImage } = require("canvas");
      const { prepareWAMessageMedia } = require('baileys-mod');
      const moment2 = require('moment-timezone');
      const QRCode = require('qrcode');
    let localUserData = [];
if (fs.existsSync(pathUser)) {
  const rawData = fs.readFileSync(pathUser, 'utf8');
  localUserData = JSON.parse(rawData);
}
//  const isCmd = body.startsWith(prefix)
      const isCmd = (body || '').startsWith(prefix)

    const cleanBody = typeof body === 'string' ? body : ''
const command = cleanBody.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
    //const args = body.trim().split(/ +/).slice(1)
    const args = (typeof body === 'string') ? body.trim().split(/ +/).slice(1) : [];
    const pushname = m.pushName || "No Name"
    const text = q = args.join(" ")
    
    // Simple log format - only for private chats to reduce spam
    if (!m.isGroup && body && body.trim()) {
        const currentTime = moment().tz('Asia/Jakarta').format('HH:mm:ss');
        const senderNumber = m.sender.replace('@s.whatsapp.net', '');
        console.log(`[ PESAN ] => ${body}`);
        console.log(`=> Dari ${pushname} | ${senderNumber}`);
        console.log(`=> Di ${pushname}`);
        console.log(`Jam : ${currentTime}`);
        console.log(''); // Empty line for spacing
    }
    
    const { type, quotedMsg, mentioned, now, fromMe } = m
    const quoted = m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ''
    const from = mek.key.remoteJid
    // botNumber already defined above
    const isOwner = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
    const groupMetadata = m.isGroup ? await client.groupMetadata(from).catch(e => {}) : ''
    const groupName = m.isGroup ? (groupMetadata && groupMetadata.subject ? groupMetadata.subject : 'Unknown Group') : ''
    const participants = m.isGroup ? (groupMetadata && groupMetadata.participants ? groupMetadata.participants : []) : ''
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const isGroup = m.key.remoteJid.endsWith('@g.us')
    const isAfkOn = afk.checkAfkUser(m.sender, _afk)
    const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm z')
    const harisekarang = moment.tz('Asia/Jakarta').format('DD MMMM YYYY')
    const time1 = moment().tz('Asia/Jakarta').format('HH:mm:ss');
    if (time1 < "23:59:00") {
      var ucapanWaktu1 = 'Malam'
    }
    if (time1 < "19:00:00") {
      var ucapanWaktu1 = 'Malam'
    }
    if (time1 < "18:00:00") {
      var ucapanWaktu1 = 'Sore'
    }
    if (time1 < "15:00:00") {
      var ucapanWaktu1 = 'Siang'
    }
    if (time1 < "10:00:00") {
      var ucapanWaktu1 = 'Pagi'
    }
    if (time1 < "05:00:00") {
      var ucapanWaktu1 = 'Pagi'
    }
    if (time1 < "03:00:00") {
      var ucapanWaktu1 = 'Malam'
    }
    const poster = fs.readFileSync('./lib/poster.jpg')
    const content = JSON.stringify(m.message)
   
    const fdocc = {
      key: {
        participant: '0@s.whatsapp.net',
        ...(m.chat ? {
          remoteJid: `status@broadcast`
        } : {})
      },
 
      message: {
        documentMessage: {
          title: `*Selamat ${ucapanWaktu1} ${pushname}*`,
          jpegThumbnail: m,
        }
      }
    }
    
   
function wrapText(text, maxLineLength) {
  const lines = [];
  while (text.length > maxLineLength) {
    let spaceIndex = text.lastIndexOf(" ", maxLineLength);
    if (spaceIndex === -1) {
      spaceIndex = maxLineLength; // Jika tidak ada spasi, potong pada batas maksimum
    }
    lines.push(text.substring(0, spaceIndex));
    text = text.substring(spaceIndex).trim(); // Hilangkan spasi yang tidak perlu
  }
  lines.push(text); // Tambahkan sisa teks
  return lines;
}
      function loadGroupConfig() {
  try {
    if (!fs.existsSync(configPath)) return {};
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (e) {
    console.error('âŒ Gagal load config grup:', e);
    return {};
  }
}

function saveGroupConfig(config) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  } catch (e) {
    console.error('âŒ Gagal simpan config grup:', e);
  }
}

function saveGroupConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

    
     async function downloadAndSaveMediaMessage (type_file, path_file) {
        	if (type_file === 'image') {
                var stream = await downloadContentFromMessage(m.message.imageMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'video') {
                var stream = await downloadContentFromMessage(m.message.videoMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'sticker') {
                var stream = await downloadContentFromMessage(m.message.stickerMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'audio') {
                var stream = await downloadContentFromMessage(m.message.audioMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	}
        }
      
    const sendContact = (jid, numbers, name, quoted, mn) => {
      let number = numbers.replace(/[^0-9]/g, '')
      const vcard = 'BEGIN:VCARD\n' +
        'VERSION:3.0\n' +
        'FN:' + name + '\n' +
        'ORG:;\n' +
        'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n' +
        'END:VCARD'
      return client.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions: mn ? mn : [] }, { quoted: quoted })
    }
    const owned = `${global.nomerOwner}@s.whatsapp.net`
    const numberQuery = text.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net"
    const kiw = sender.split("@")[0]
    const isUser = pathUser.includes(m.kiw)
   const mentionByTag = (m && m.mtype === "extendedTextMessage" && m.message && m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo && m.message.extendedTextMessage.contextInfo.mentionedJid) ? m.message.extendedTextMessage.contextInfo.mentionedJid : [];

const Input = Array.isArray(mentionByTag) && mentionByTag.length > 0 ? mentionByTag[0] : (q ? numberQuery : false);


    if (!client.public) {
      if (!m.key.fromMe) return
    }
    if (m.message) {
      // Simple command log format for private chats only
      if ((body.startsWith('.') || body.startsWith('broadcast')) && !m.isGroup) {
        const currentTime = moment().tz('Asia/Jakarta').format('HH:mm:ss');
        const senderNumber = m.sender.replace('@s.whatsapp.net', '');
        console.log(`[ COMMAND ] => ${body}`);
        console.log(`=> Dari ${pushname} | ${senderNumber}`);
        console.log(`=> Di ${pushname}`);
        console.log(`Jam : ${currentTime}`);
        console.log(''); // Empty line for spacing
      }
    }

      function getOrderFormat(aliasKey) {
  if (!aliasKey) return '[KODE] [TUJUAN]';

  const key = aliasKey.toLowerCase();
  const info = aliasMap[key];
  if (!info) return '[KODE] [TUJUAN]';

  const brand = info.brand.toUpperCase();
  const category = info.category.toLowerCase();

  if (brand.includes('MOBILE LEGENDS')) {
    return '[KODE] [ID] [SERVER]';
  } else if (['pulsa', 'e-money', 'pln', 'masa aktif', 'paket sms & telpon'].includes(category)) {
    return '[KODE] [NOHP]';
  } else {
    return '[KODE] [ID]'; // Default format untuk game umum
  }
}

      /*
function getContoh(aliasKey) {
  const format = getOrderFormat(aliasKey);
  // Contoh dinamis
  if (format === '[KODE] [ID] [SERVER]') return 'QR ML5 972066397 12864';
  if (format === '[KODE] [ID]') return 'QR FF10 123456789';
  if (format === '[KODE] [NOHP]') return 'QR PTL5 085123456789';
  return '`QR KODE TUJUAN`'; // fallback default
}
*/

    function readCustomCommands() {
      try {
        const data = fs.readFileSync(jsonFilePath, 'utf8');
        return JSON.parse(data);
      } catch (error) {
        return {};
      }
    }
      
      function generateSignature(key, unique_code, service, amount, valid_time) {
    return md5(key + unique_code + service + amount + valid_time + 'NewTransaction');
}
    function saveCustomCommands(commands) {
      fs.writeFileSync(jsonFilePath, JSON.stringify(commands, null, 2), 'utf8');
    }

    function addCustomCommand(groupID, command, response) {
      const customCommands = readCustomCommands();
      if (!customCommands[groupID]) {
        customCommands[groupID] = {};
      }
      customCommands[groupID][command] = response;
      saveCustomCommands(customCommands);
    }
      // Antilink
const isAntiLink = isGroup ? antilink.includes(from) : false
if (isGroup && isAntiLink && !isOwner && !isAdmins && isBotAdmins){
            if (chath.includes(`https://chat.whatsapp.com`)) {
                await client.sendMessage(from, { delete: m.key })
                m.reply(`ðŸ›¡ *GROUP LINK DETECTOR* ðŸ›¡\n\nBudayakan baca Deskribsi grup ka, mari saling menghargai sesama seller`)
                let number = sender
client.groupParticipantsUpdate(from, [number], "remove")
            }
    }   
    function handleCustomCommands(groupID, command, reply) {
      const customCommands = readCustomCommands();
      if (customCommands[groupID]) {
        const customResponse = customCommands[groupID][command.toUpperCase()];
        if (customResponse) {
          m.reply(customResponse);
        }
      }
    }

   if (isGroup && !isCmd) {
  const groupID = from;
  const customCommand = (body || '').trim().toLowerCase();
  handleCustomCommands(groupID, customCommand, m.reply);
}

//fungsi custom edit message
function sendOrEditMessage(msg, text, initialMsgKey = null) {
  if (initialMsgKey && global.sock && typeof global.sock.editMessage === 'function') {
    return global.sock.editMessage(initialMsgKey.remoteJid, initialMsgKey, { text });
  } else {
    return msg.reply(text);
  }
}      
// Fungsi utilitas untuk membaca database
function readDatabase() {
    try {
        const rawData = fs.readFileSync('database.json', 'utf8');
        return JSON.parse(rawData);
    } catch (err) {
        console.error("Error reading database:", err.message);
        return { issuerRefs: [] }; // Return default jika file tidak ada atau error
    }
}

// Fungsi utilitas untuk menyimpan database
function saveDatabase(db) {
    try {
        fs.writeFileSync('database.json', JSON.stringify(db, null, 2), 'utf8');
    } catch (err) {
        console.error("Error saving database:", err.message);
    }
}
    function listCustomCommands(groupID, reply) {
      const customCommands = readCustomCommands();
      if (customCommands[groupID]) {
        const commands = Object.keys(customCommands[groupID]);
        if (commands.length > 0) {
          let responseText =
            `Ꮺ ָ࣪ ۰ 𝗁𝖾𝗅𝗅𝗈 𝖽𝖾𝖺𝗋 *${pushname}* ‹！𝗐𝖾𝗅𝖼𝗈𝗆𝖾 𖦆 𝗍𝗁𝗂𝗌 𝗂𝗌 𝗐𝗁𝖺𝗍 𝗐𝖾 𝗍𝗁𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 ┈─ ꒱ 𝆬

᪤ ٠ 𝖽𝖺𝗍𝖾 ⦂ ${harisekarang}
᪤ ٠ 𝗍𝗂𝗆𝖾 ⦂ ${time}

╭───┈ \`𝖼𝖺𝗍𝖺𝗅𝗈𝗀𝗎𝖾\` 𝗈𝗇 𝗍𝗁𝖾 𝖻𝖾𝗅𝗈𝗐\n`;

          commands.forEach((command, index) => {

            responseText += `𑣿 ꒰ 🥧 ${command}\n`;

          });
                   responseText += `╰──━

*${namaStore}*
ⓘ 𝗺𝗶𝗻𝗶 𝗻𝗼𝘁𝗲 ⦂
⊹ 𝗄𝖾𝗍𝗂𝗄 𝗅𝗂𝗌𝗍 𝖽𝗂𝖺𝗍𝖺𝗌 𝗎𝗇𝗍𝗎𝗄 𝗆𝖾𝗅𝗂𝗁𝖺𝗍 𝗉𝗋𝗈𝖽𝗎𝗄`
          m.reply(responseText)
        } else {
          m.reply("Custom Command belum ditambah di group ini");
        }
      } else {
        m.reply("Custom Command belum ditambah di group ini");
      }
    }

//FITUR AFK
if (m.isGroup && !m.key.fromMe) {
    let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let ment of mentionUser) {
    if (afk.checkAfkUser(ment, _afk)) {
    let getId2 = afk.getAfkId(ment, _afk)
    let getReason2 = afk.getAfkReason(getId2, _afk)
    let getTimee = Date.now() - afk.getAfkTime(getId2, _afk)
    let heheh2 = ms(getTimee)
    m.reply(`Jangan tag dia bang, orangnya lagi afk.\n\n*Alasan :* ${getReason2}\n*Sejak :* ${heheh2.hours} jam, ${heheh2.minutes} menit, ${heheh2.seconds} detik yg lalu\n`)
    }
    }
	if (afk.checkAfkUser(m.sender, _afk)) {
    let getId = afk.getAfkId(m.sender, _afk)
    let getReason = afk.getAfkReason(getId, _afk)
    let getTime = Date.now() - afk.getAfkTime(getId, _afk)
    let heheh = ms(getTime)
    _afk.splice(afk.getAfkPosition(m.sender, _afk), 1)
    fs.writeFileSync('./db/afk.json', JSON.stringify(_afk))
    client.sendTextWithMentions(m.chat, `@${m.sender.split('@')[0]} telah kembali dari afk\n\n*Alasan :* ${getReason}\n*Selama :* ${heheh.hours} jam ${heheh.minutes} menit ${heheh.seconds} detik\n`, m)
    }
}    
      
// Middleware to block commands from groups except in private chats or for admins/owners
if (m.isGroup && !global.owner.includes(m.sender.split("@")[0])) {
    return; // Block command execution in groups for non-owners
}
      // middleware semua command di private chat, kecuali admin/owner
      if (!m.isGroup && ! global.owner.includes(m.sender.split("@")[0])) {
          return;
      }
      //  Middleware untuk blokir command berdasarkan config grup
const groupConfigs = loadGroupConfig();
if (m.isGroup && groupConfigs[m.chat] && groupConfigs[m.chat].lockedCommands?.includes(command.toLowerCase())) {
  return ;
    //m.reply(`‼️ Command *${command}* sedang dinonaktifkan di grup ini.\n_Silahkan hubungi *Owner* untuk meminta group khusus Topup Otomatis_`);
}
      m.body = m.body || ''
      
      // Handle interactive message response untuk konfirmasi buy
      if (m.message?.interactiveResponseMessage) {
        const interactiveResponse = m.message.interactiveResponseMessage;
        const selectedId = interactiveResponse.nativeFlowResponseMessage?.paramsJson;
        
        if (selectedId) {
          try {
            const params = JSON.parse(selectedId);
            const buttonId = params.id;
            
            // Handle buy confirmation buttons
            if (buttonId.startsWith('confirm_buy_') || buttonId.startsWith('cancel_buy_')) {
              const action = buttonId.split('_')[0]; // 'confirm' atau 'cancel'
              
              if (action === 'cancel') {
                // Batalkan transaksi menggunakan fungsi dari library
                await handleCancelBuy(buttonId, sender, pendingTransactions, m);
                return;
              }

              if (action === 'confirm') {
                // Redirect ke proses konfirmasi
                body = buttonId; // langsung gunakan buttonId sebagai body
                command = 'confirm_buy';
              }
            }
          } catch (err) {
            console.error('Error handling interactive response:', err);
          }
        }
      }
      
    switch (command) {
  		
            case 'setcmd': {
  if (!m.isGroup) return m.reply('‼️ Hanya bisa digunakan dalam grup.');
  if (!isAdmins) return m.reply('‼️ Hanya admin grup yang bisa mengatur command.');

  const [cmdName, status] = args;
  if (!cmdName || !status) return m.reply('Format: *setcmd [namaCommand] [on/off]*');

  const groupConfigs = loadGroupConfig();
  const groupSetting = groupConfigs[m.chat] || { lockedCommands: [], allowedCommands: [] };

  const cmd = cmdName.toLowerCase();
  const mode = status.toLowerCase();

  if (mode === 'off') {
    if (!groupSetting.lockedCommands.includes(cmd)) {
      groupSetting.lockedCommands.push(cmd);
    }
    groupSetting.allowedCommands = groupSetting.allowedCommands.filter(c => c !== cmd);
  } else if (mode === 'on') {
    if (!groupSetting.allowedCommands.includes(cmd)) {
      groupSetting.allowedCommands.push(cmd);
    }
    groupSetting.lockedCommands = groupSetting.lockedCommands.filter(c => c !== cmd);
  } else {
    return m.reply('‼️ Status hanya bisa "on" atau "off".');
  }

  groupConfigs[m.chat] = groupSetting;
  saveGroupConfig(groupConfigs);

  return m.reply(`✅ Command *${cmd}* telah di *${mode.toUpperCase()}* kan untuk grup ini.`);
}

            case 'listcmd': {
  const groupConfigs = loadGroupConfig();
  const groupSetting = groupConfigs[m.chat] || {};
  const locked = groupSetting.lockedCommands || [];
  const allowed = groupSetting.allowedCommands || [];

  return m.reply(
    `📝 *Status Command Grup*\n\n` +
    `🔒 *Terkunci* : ${locked.length ? locked.join(', ') : 'Tidak ada'}\n`
      
  );
}


     case 'help': {

  return m.reply(
`╭─ ꒰  *${namaStore}*  ꒱ ─ ʚɞ⸼─╮ 

ⓘ 𝖻𝖾𝗋𝗂𝗄𝗎𝗍 𝖿𝗂𝗍𝗎𝗋 𝗒𝖺𝗇𝗀 𝗍𝖾𝗋𝗌𝖾𝖽𝗂𝖺 𝖽𝗂 𝖻𝗈𝗍 𝗂𝗇𝗂,
𝗌𝗂𝗅𝖺𝗁𝗄𝖺𝗇 𝗁𝗎𝖻𝗎𝗇𝗀𝗂 𝗈𝗐𝗇𝖾𝗋 𝗃𝗂𝗄𝖺 𝖺𝖽𝖺 𝗄𝖾𝗇𝖽𝖺𝗅𝖺!

─── • ┈ ┈ ୨♡୧  ┈ ┈ • ───

ꕮ ࣪ ׅ  *Bot Name* : ${global.botName}
ꕮ ࣪ ׅ  *Owner Name* : ATLAN

╭─ ꒰ *menu utama* ꒱ ─ ʚɞ⸼─╮ 
│☍ ࣪ ׅ  *list*
│☍ ࣪ ׅ  *owner*
│☍ ࣪ ׅ  *cekml*
│☍ ࣪ ׅ  *mlid*
│☍ ࣪ ׅ  *cekff*
│☍ ࣪ ׅ  *cekpln*
╰── ʚɞ  ⸼────────────╯

╭─ ꒰ *menu owner* ꒱ ─ ʚɞ⸼─╮ 
│☍ ࣪ ׅ  *addsewa*
│☍ ࣪ ׅ  *setcmd*
│☍ ࣪ ׅ  *join*
╰── ʚɞ  ⸼────────────╯

╭─ ꒰ *menu group* ꒱ ─ ʚɞ⸼─╮ 
│☍ ࣪ ׅ  *addlist*
│☍ ࣪ ׅ  *updatelist*
│☍ ࣪ ׅ  *renamelist*
│☍ ࣪ ׅ  *dellist*
│☍ ࣪ ׅ  *proses*
│☍ ࣪ ׅ  *done*
│☍ ࣪ ׅ  *linkgc*
│☍ ࣪ ׅ  *hidetag*
│☍ ࣪ ׅ  *open*
│☍ ࣪ ׅ  *close*
│☍ ࣪ ׅ  *join*
│☍ ࣪ ׅ  *kick*
│☍ ࣪ ׅ  *antilink*
╰── ʚɞ  ⸼────────────╯`);
}
           
       
			case "mlreg": 
case "mlid":
case "idml":
case "regml": {
  const { format } = require("util");
  if (Array.from(text).filter((x) => (x == "(" || x == ")")).length == 2) {
    if (isNaN(parseInt(text)) || !isNaN(parseInt(text)) && (format(parseInt(text)).length < 6 || format(parseInt(text)).length > 10)) {
      return m.reply("Invalid users id");
    } else if (!text.includes("(") && !text.includes(")") || text.includes("(") && text.includes(")") && !isNaN(parseInt(text.split("(")[1])) && (format(parseInt(text.split("(")[1])).length < 4 || format(parseInt(text.split("(")[1])).length > 5)) {
      return m.reply("Invalid servers id");
    }
    var userId = format(parseInt(text)).trim();
    var serverId = format(parseInt(text.split("(")[1])).trim();
  } else if (text.split(" ").filter((x) => (x !== "" && !isNaN(parseInt(x)))).length == 2) {
    const getdata = text.split(" ").filter((x) => (x !== "" && !isNaN(parseInt(x)))).map((x) => x.trim());
    if (getdata[0].length < 6 || getdata[0].length > 10) {
      return m.reply("Invalid users id");
    } else if (getdata[1].length < 4 || getdata[1].length > 5) {
      return m.reply("Invalid servers id");
    }
    var userId = format(parseInt(getdata[0])).trim();
    var serverId = format(parseInt(getdata[1])).trim();
  } else {
    return m.reply("Example not found!!");
  }

  // Kirim pesan awal dan simpen key
  const initialMsg = await m.reply('dih, kepo amat dah');
  const msgKey = initialMsg.key;

  const fetch = require("node-fetch");
  const url = `https://dev.luckycat.my.id/api/stalker/mobile-legend?users=${userId}&servers=${serverId}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result.status && result.data) {
      const { nickname, country } = result.data;
      // Edit pesan awal dengan hasil
      await client.sendMessage(msgKey.remoteJid, {
        text: `Mobile Legends\n\n> *Nickname:* ${nickname}\n> *Country:* ${country}\n\n© AtlanticGate`,
        edit: msgKey
      });
    } else {
      // Edit pesan awal dengan error
      await client.sendMessage(msgKey.remoteJid, {
        text: "*_ID Salah_*",
        edit: msgKey
      });
    }
  } catch (error) {
    console.error('Error fetching API:', error.message);
    // Edit pesan awal dengan error
    await client.sendMessage(msgKey.remoteJid, {
      text: "*_ID Salah_*",
      edit: msgKey
    });
  }

  break;
}
            
            //latest update cekganda
            //case 'cekml':
        case 'cekganja':
case 'cekganda': {
  if (!q) return m.reply(`🔍CEK NICK MLBB & FIRST TOPUP\nContoh: cekganda 566055979 8250`);
  const [gameId, server] = text.split(' ');
  if (!gameId || !server) return m.reply('Game ID dan Server wajib di isi');

  // Kirim pesan awal dan simpen key
  const initialMsg = await m.reply('Sedang mengecek data akun MLBB...');
  const msgKey = initialMsg.key;

  // Queue sederhana di dalam case
  const queue = [];
  let isProcessing = false;

  const processQueue = async () => {
    if (isProcessing || queue.length === 0) return;
    isProcessing = true;
    const { msg, gameId, server, msgKey } = queue.shift();
    try {
      await handleCekganda(msg, gameId, server, msgKey);
    } catch (error) {
      console.error(`Error in queue: ${error.message}`);
      // Edit pesan awal dengan error
      await client.sendMessage(msgKey.remoteJid, {
        text: 'Proses gagal, coba lagi nanti. Server mungkin sibuk.',
        edit: msgKey
      }, { quoted: m });
    }
    isProcessing = false;
    processQueue();
  };

  const handleCekganda = async (msg, gameId, server, msgKey) => {
    const browser = await firefox.launch({ headless: true });
    const page = await browser.newPage();

    try {
      console.log(`Mengisi Game ID: ${gameId} dan Server: ${server}...`);
      await page.setExtraHTTPHeaders({ 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' });
      await page.goto('https://www.mobapay.com/mlbb/?r=ID', { waitUntil: 'domcontentloaded', timeout: 10000 });

      const gameIdInput = await page.waitForSelector('#userInput', { timeout: 10000 })
        .catch(() => console.log('Elemen #userInput nggak ditemukan.'));
      if (!gameIdInput) throw new Error('Elemen Game ID nggak ketemu');

      const serverInput = await page.waitForSelector('#serverInput', { timeout: 10000 })
        .catch(() => console.log('Elemen #serverInput nggak ditemukan.'));
      if (!serverInput) throw new Error('Elemen Server nggak ketemu');

      await page.fill('#userInput', gameId);
      await page.fill('#serverInput', server);

      await page.dispatchEvent('#userInput', 'blur');
      await page.dispatchEvent('#serverInput', 'blur');

      const firstItem = await page.waitForSelector('.tracker-recharge-item', { timeout: 10000 });
      if (firstItem) {
        await firstItem.click({ timeout: 5000 }).catch(async (e) => {
          console.log('Klik gagal, coba tutup modal:', e.message);
          const modal = await page.$('.mobapay-modal-body', { timeout: 5000 });
          if (modal) {
            const closeButton = await page.$('.mobapay-modal-close', { timeout: 5000 });
            if (closeButton) await closeButton.click({ timeout: 5000 });
          }
          await firstItem.click({ timeout: 5000 });
        });
      } else throw new Error('Elemen item top-up nggak ketemu');

      await page.waitForFunction(
        () => !document.querySelector('.mobapay-user-character-name')?.textContent.includes('Display after verification'),
        { timeout: 30000, polling: 500 }
      ).catch(() => console.log('Verifikasi belum selesai dalam 30 detik.'));

      await page.waitForTimeout(3000);
      await page.waitForSelector('.mobapay-user-character-name', { timeout: 10000 });
      await page.waitForSelector('.mobapay-recharge-wrapper', { timeout: 10000 });
      await page.waitForSelector('.tracker-recharge-item', { timeout: 10000 });

      let nickname = '[Cek di Mobapay]';
      const nicknameElement = await page.$('.mobapay-user-character-name')
        .catch(() => console.log('Elemen nickname nggak ditemukan.'));
      if (nicknameElement) nickname = await nicknameElement.innerText();

      let isValidData = true;
      try {
        const apiUrl = `https://dev.luckycat.my.id/api/stalker/mobile-legend?users=${gameId}&servers=${server}`;
        const apiResponse = await page.evaluate(async (url) => {
          const response = await fetch(url);
          return response.json();
        }, apiUrl);
        if (!apiResponse.status || !apiResponse.data) {
          console.log('API gagal atau data tidak lengkap:', apiResponse.msg);
          isValidData = false;
          // Edit pesan awal dengan error
          await client.sendMessage(msgKey.remoteJid, {
            text: 'Data akun tidak valid: ' + apiResponse.msg,
            edit: msgKey
          }, { quoted: m });
          return;
        }
        nickname = apiResponse.data.nickname || nickname;
        const country = `${apiResponse.data.country} ${apiResponse.data.emoji}`;
        let output = `👤 *Nickname:* ${nickname}\n`;
        output += `🆔 *User ID:* ${gameId}\n`;
        output += `🌐 *Zone ID:* ${server}\n`;
        output += `🌍 *Negara:* ${country}\n`;

        if (isValidData) {
          output += `\n💎 *First Topup Status:*\n`;
          const rechargeItems = await page.$$('.tracker-recharge-item');
          const firstTopupTiers = [50, 150, 250, 500];
          for (const item of rechargeItems) {
            const diamonds = parseInt(await item.getAttribute('data-diamonds') || '0');
            const bonus = await item.getAttribute('data-bonus') || '';
            if (firstTopupTiers.includes(diamonds)) {
              const hasActive = await item.$('.mobapay-recharge-item-active') !== null;
              let hasReachLimit = false;
              const limitElement = await item.$('.mobapay-recharge-item-reachlimit');
              if (limitElement) {
                const limitText = await limitElement.innerText();
                hasReachLimit = limitText.includes('Purchase limit reached');
              }
              const status = hasReachLimit ? '❌' : (hasActive ? '✅' : '✅');
              output += `• ${diamonds} + ${bonus.replace('+', '')} ${status}\n`;
            }
          }
        }
        // Edit pesan awal dengan hasil
        await client.sendMessage(msgKey.remoteJid, {
          text: output,
          edit: msgKey
        });
      } catch (error) {
        console.log('Error mengakses API:', error.message);
        isValidData = false;
        // Edit pesan awal dengan error
        await client.sendMessage(msgKey.remoteJid, {
          text: 'Data akun tidak valid: Error saat mengakses.',
          edit: msgKey
        });
      }
    } catch (error) {
      console.log('error:', error);
      // Edit pesan awal dengan error
      await client.sendMessage(msgKey.remoteJid, {
        text: 'Sabar sayang aku ga kemana, satu-satu gw prosesnya ini pelerrr!\n\n> Usahakan jeda beberapa detik sebelum input data baru ya sayang...\n> Atau mungkin orang lain sedang menggunakan fitur ini juga dalam waktu bersamaan.\n> Coba lagi dalam beberapa saat.',
        edit: msgKey
      });
    } finally {
      await browser.close();
    }
  };

  // Tambah ke queue
  queue.push({ msg: m, gameId, server, msgKey });
  processQueue();
  break;
}
            
case 'bot': {
  let pesanBot;
  if (isGroup) {
    // Cek apakah ada pesan bot spesifik untuk grup ini
    let botgroup = {};
    if (fs.existsSync(botgroupFile)) {
      botgroup = JSON.parse(fs.readFileSync(botgroupFile));
    }
    pesanBot = botgroup[m.chat] || global.bot; // fallback ke global.bot
  } else {
    pesanBot = global.bot;
  }

  m.reply(pesanBot);
  break;
}

// === BROADCAST COMMANDS ===
case 'broadcast': {
  if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan command ini');
  if (!args[0]) return m.reply(`❌ Format: ${prefix}broadcast [target] [message]

🎯 *Target Options:*
• all - Semua kontak aktif
• group:namagroup - Grup kontak tertentu
• tag:tagname - Kontak dengan tag tertentu
• 628123456789 - Nomor spesifik

📝 *Contoh:*
• ${prefix}broadcast all Halo semua!
• ${prefix}broadcast group:vip Promo khusus VIP
• ${prefix}broadcast tag:customer Info penting`);
  
  const target = args[0];
  const message = args.slice(1).join(' ');
  
  if (!message) return m.reply('❌ Pesan tidak boleh kosong');
  
  try {
    m.reply('📤 Memulai broadcast...');
    
    const targets = [target];
    const broadcastMessage = { text: message };
    const targetNumbers = await broadcastManager.resolveTargets(targets);
    
    if (targetNumbers.length === 0) {
      return m.reply('❌ Tidak ada target yang valid ditemukan');
    }
    
    const result = await broadcastManager.sendBroadcast(client, broadcastMessage, targetNumbers);
    
    const report = `✅ *Broadcast Selesai*

📊 *Report:*
• ID: ${result.id}
• Target: ${target}
• Total: ${result.results.total}
• Berhasil: ${result.results.success.length}
• Gagal: ${result.results.failed.length}
• Success Rate: ${((result.results.success.length / result.results.total) * 100).toFixed(1)}%`;
    
    m.reply(report);
  } catch (error) {
    console.log('Broadcast error:', error);
    m.reply('❌ Error: ' + error.message);
  }
  break;
}

case 'bchelp':
case 'broadcasthelp': {
  const helpText = `🤖 *WA BROADCAST MANAGER*

📢 *BROADCAST COMMANDS:*
• ${prefix}broadcast [target] [message] - Send broadcast
• ${prefix}schedulebc [type] [time] [target] [message] - Schedule broadcast
• ${prefix}listschedule - List scheduled broadcasts
• ${prefix}stopschedule [id] - Stop scheduled broadcast

📱 *CONTACT MANAGEMENT:*
• ${prefix}addcontact [nomor] [nama] [tags] - Add contact
• ${prefix}removecontact [nomor] - Remove contact  
• ${prefix}listcontacts - List all contacts
• ${prefix}creategroup [nama] [deskripsi] - Create contact group

📊 *STATISTICS & INFO:*
• ${prefix}stats - Show broadcast statistics
• ${prefix}bchelp - Show this menu

🎯 *Target Examples:*
• all - All active contacts
• group:vipgroup - Specific contact group
• tag:customer - Contacts with specific tag
• 628123456789 - Specific number

⏰ *Schedule Types:*
• daily - Every day
• weekly - Every week (add day 1-7)
• monthly - Every month (add date 1-31)

📝 *Examples:*
• ${prefix}broadcast all Hello everyone!
• ${prefix}addcontact 628123456789 John customer,vip
• ${prefix}schedulebc daily 09:00 tag:customer Good morning!

✨ *WA Broadcast Manager v2.0*`;

  m.reply(helpText);
  break;
}

case 'addcontact': {
  if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan command ini');
  if (!args[0]) return m.reply(`❌ Format: ${prefix}addcontact [nomor] [nama] [tag1,tag2]

📝 *Contoh:*
• ${prefix}addcontact 628123456789 John customer,vip
• ${prefix}addcontact 081234567890 Jane member`);
  
  const number = args[0];
  const name = args[1] || '';
  const tags = args[2] ? args[2].split(',').map(tag => tag.trim()) : [];
  
  try {
    const contact = broadcastManager.addContact(number, name, tags);
    
    m.reply(`✅ *Kontak Ditambahkan*

📱 *Nomor:* ${contact.number}
👤 *Nama:* ${contact.name || 'Tidak ada'}
🏷️ *Tags:* ${contact.tags.length > 0 ? contact.tags.join(', ') : 'Tidak ada'}
📅 *Ditambahkan:* ${new Date(contact.addedAt).toLocaleString('id-ID')}`);
  } catch (error) {
    m.reply('❌ Error: ' + error.message);
  }
  break;
}

case 'removecontact': {
  if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan command ini');
  if (!args[0]) return m.reply(`❌ Format: ${prefix}removecontact [nomor]`);
  
  const number = args[0];
  
  try {
    const removed = broadcastManager.removeContact(number);
    
    if (removed) {
      m.reply(`✅ *Kontak Dihapus*

📱 *Nomor:* ${removed.number}
👤 *Nama:* ${removed.name || 'Tidak ada'}`);
    } else {
      m.reply('❌ Kontak tidak ditemukan');
    }
  } catch (error) {
    m.reply('❌ Error: ' + error.message);
  }
  break;
}

case 'listcontacts': {
  if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan command ini');
  
  try {
    const contacts = broadcastManager.contacts.filter(c => c.active);
    
    if (contacts.length === 0) {
      return m.reply('📱 Belum ada kontak yang ditambahkan');
    }
    
    let contactList = `📱 *DAFTAR KONTAK* (${contacts.length})\n\n`;
    
    contacts.slice(0, 20).forEach((contact, index) => {
      contactList += `${index + 1}. ${contact.name || 'No Name'}\n`;
      contactList += `   📞 ${contact.number.replace('@s.whatsapp.net', '')}\n`;
      contactList += `   🏷️ ${contact.tags.length > 0 ? contact.tags.join(', ') : 'No tags'}\n\n`;
    });
    
    if (contacts.length > 20) {
      contactList += `... dan ${contacts.length - 20} kontak lainnya`;
    }
    
    m.reply(contactList);
  } catch (error) {
    m.reply('❌ Error: ' + error.message);
  }
  break;
}

case 'creategroup': {
  if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan command ini');
  if (!args[0]) return m.reply(`❌ Format: ${prefix}creategroup [nama] [deskripsi]

📝 *Contoh:*
• ${prefix}creategroup VIP "Pelanggan VIP"`);
  
  const groupName = args[0];
  const description = args.slice(1).join(' ') || '';
  
  try {
    const group = broadcastManager.createContactGroup(groupName, description);
    
    m.reply(`✅ *Grup Kontak Dibuat*

👥 *Nama:* ${group.name}
📝 *Deskripsi:* ${group.description || 'Tidak ada'}
🆔 *ID:* ${group.id}
📅 *Dibuat:* ${new Date(group.createdAt).toLocaleString('id-ID')}`);
  } catch (error) {
    m.reply('❌ Error: ' + error.message);
  }
  break;
}

case 'schedulebc': {
  if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan command ini');
  if (args.length < 4) return m.reply(`❌ Format: ${prefix}schedulebc [type] [time] [target] [message]

⏰ *Schedule Types:*
• daily - Setiap hari
• weekly - Setiap minggu (tambahkan hari: 1-7)
• monthly - Setiap bulan (tambahkan tanggal: 1-31)

📝 *Contoh:*
• ${prefix}schedulebc daily 09:00 all Selamat pagi!
• ${prefix}schedulebc weekly 09:00,1 tag:vip Info mingguan VIP
• ${prefix}schedulebc monthly 08:00,1 group:member Newsletter bulanan`);
  
  const scheduleType = args[0]; // daily, weekly, monthly
  const timeAndDay = args[1].split(','); // ["09:00"] or ["09:00", "1"]
  const time = timeAndDay[0];
  const day = timeAndDay[1] ? parseInt(timeAndDay[1]) : undefined;
  const target = args[2];
  const message = args.slice(3).join(' ');
  
  if (!['daily', 'weekly', 'monthly'].includes(scheduleType)) {
    return m.reply('❌ Type harus: daily, weekly, atau monthly');
  }
  
  if (!/^\d{2}:\d{2}$/.test(time)) {
    return m.reply('❌ Format waktu harus HH:MM (contoh: 09:00)');
  }
  
  try {
    const schedule = {
      type: scheduleType,
      time: time,
      day: day
    };
    
    const targets = [target];
    const scheduled = broadcastManager.scheduleRecurringBroadcast(
      { text: message }, 
      targets, 
      schedule
    );
    
    let scheduleInfo = `⏰ *Broadcast Terjadwal*

🆔 *ID:* ${scheduled.id}
📅 *Type:* ${scheduleType}
🕐 *Waktu:* ${time}`;
    
    if (day) {
      scheduleInfo += `\n📆 *${scheduleType === 'weekly' ? 'Hari' : 'Tanggal'}:* ${day}`;
    }
    
    scheduleInfo += `\n🎯 *Target:* ${target}
📝 *Pesan:* ${message}
⏭️ *Next Run:* ${new Date(scheduled.nextRun).toLocaleString('id-ID')}`;
    
    m.reply(scheduleInfo);
  } catch (error) {
    m.reply('❌ Error: ' + error.message);
  }
  break;
}

case 'listschedule': {
  if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan command ini');
  
  try {
    const schedules = broadcastManager.scheduledBroadcasts.filter(s => s.status === 'active');
    
    if (schedules.length === 0) {
      return m.reply('📅 Belum ada broadcast terjadwal');
    }
    
    let scheduleList = `� *BROADCAST TERJADWAL* (${schedules.length})\n\n`;
    
    schedules.forEach((schedule, index) => {
      scheduleList += `${index + 1}. ${schedule.id}\n`;
      scheduleList += `   📅 ${schedule.schedule.type} at ${schedule.schedule.time}\n`;
      scheduleList += `   🎯 Target: ${schedule.targets.join(', ')}\n`;
      scheduleList += `   ⏭️ Next: ${new Date(schedule.nextRun).toLocaleString('id-ID')}\n\n`;
    });
    
    m.reply(scheduleList);
  } catch (error) {
    m.reply('❌ Error: ' + error.message);
  }
  break;
}

case 'stopschedule': {
  if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan command ini');
  if (!args[0]) return m.reply(`❌ Format: ${prefix}stopschedule [schedule_id]`);
  
  const scheduleId = args[0];
  
  try {
    const stopped = broadcastManager.stopScheduledBroadcast(scheduleId);
    
    if (stopped) {
      m.reply(`✅ *Schedule Dihentikan*

🆔 *ID:* ${scheduleId}
⏹️ *Status:* Stopped`);
    } else {
      m.reply('❌ Schedule tidak ditemukan atau sudah dihentikan');
    }
  } catch (error) {
    m.reply('❌ Error: ' + error.message);
  }
  break;
}

case 'broadcaststats':
case 'stats': {
  if (!isOwner) return m.reply('❌ Hanya owner');
  
  try {
    const broadcastStats = broadcastManager.getBroadcastStats();
    const contactStats = broadcastManager.getContactStats();
    const used = process.memoryUsage();
    
    const statsText = `📊 *WA BROADCAST MANAGER STATS*

📢 *Broadcast Statistics:*
• Total Broadcasts: ${broadcastStats.totalBroadcasts}
• Completed: ${broadcastStats.completedBroadcasts}
• Total Messages: ${broadcastStats.totalMessages}
• Success Rate: ${broadcastStats.successRate}
• Scheduled Active: ${broadcastStats.scheduledBroadcasts}

📱 *Contact Statistics:*
• Total Contacts: ${contactStats.totalContacts}
• Active Contacts: ${contactStats.activeContacts}
• Contact Groups: ${contactStats.totalGroups}
• Active Groups: ${contactStats.activeGroups}

🤖 *System:*
• Runtime: ${runtime(process.uptime())}
• Memory: ${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`;

    m.reply(statsText);
  } catch (error) {
    m.reply('❌ Error: ' + error.message);
  }
  break;
}

            
case 'setbot': {
  if (!isGroup) return m.reply('❌ Perintah ini hanya bisa dilakukan di dalam grup.');
  if (!isAdmins && !isOwner) return m.reply('❌ Hanya Admin/Owner yang bisa.');

  if (!text) return m.reply('Format salah!\nContoh:\n> setbot Halo semua!');

  // Baca file botgroup
  let botgroup = {};
  if (fs.existsSync(botgroupFile)) {
    botgroup = JSON.parse(fs.readFileSync(botgroupFile));
  }

  botgroup[m.chat] = text;
  fs.writeFileSync(botgroupFile, JSON.stringify(botgroup, null, 2));

  m.reply(`✅ Pesan bot grup berhasil diupdate:\n\n"${text}"`);
  break;
}
           
   case 'min':
   case 'admin':
   case 'etmin':
            {
    m.reply(global.min);
    break;
}
 
   case 'list':
case 'lists': {
  if (!m.isGroup) return m.reply("Command ini hanya bisa digunakan di Group.");
  const groupID = from;
  listCustomCommands(groupID, m);
}
break;

//tourl custom name-file
      case 'tourl': {
  try {
    if (!m.quoted || !/image/.test(m.quoted.mimetype)) return m.reply('❌ Balas gambar dengan caption *tourl [nama_file]*');

    const namaFile = (args[0] || `${Date.now()}`).replace(/[^a-zA-Z0-9_-]/g, '');
    const filePath = `./tmp/${namaFile}.jpg`;

    // Pastikan folder ./tmp ada
    const tmpDir = './tmp';
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    // Pake fungsi downloader lokal lo sendiri
    await downloadAndSaveMediaMessage('image', filePath);

    const FormData = require('form-data');
    const form = new FormData();
    form.append('img', fs.createReadStream(filePath));
    form.append('content_type', '0');
    form.append('max_th_size', '420');

    const axiosRes = await axios.post('https://api.pixhost.to/images', form, {
      headers: form.getHeaders()
    });

    const json = axiosRes.data;
    if (!json.show_url) return m.reply('❌ Gagal upload: show_url kosong.');

    // Ambil path file dari show_url
    const match = /\/show\/(\d+)\/(\d+_.+)/.exec(json.show_url);
    if (!match) return m.reply('❌ Gagal parsing URL.');

    const folderId = match[1];
    const filename = match[2];
    const finalUrl = `https://img1.pixhost.to/images/${folderId}/${filename}`;

    m.reply(`✅ Gambar berhasil diupload:\n${finalUrl}`);

    // Opsional: hapus file setelah upload
    fs.unlinkSync(filePath);

  } catch (err) {
    console.error('Error upload PixHost:', err);
    m.reply('❌ Terjadi kesalahan saat upload gambar.');
  }
  break;
}
        
            
        case 'hidetag':
case 'h': {
  if (!m.isGroup) return
  if (!isAdmins) return

  // Fungsi untuk mempertahankan spasi di awal baris
  const fixIndent = (text) => {
    return text.split('\n').map(line => {
      return line.replace(/^ +/g, (spaces) => spaces.replace(/ /g, '\u00A0'))
    }).join('\n')
  }

  // Pastikan teksnya ada & fix indentasi
  const finalText = text ? fixIndent(text) : ''

  client.sendMessage(m.chat, {
    text: finalText,
    mentions: participants.map(a => a.id)
  }, {
    quoted: m
  })
}

      break
      case 'join': {
        if (!isOwner) return
        if (!text) return m.reply(`Link Groupnya Mana?`)
        var ini_urrrl = text.split('https://chat.whatsapp.com/')[1]
        var data = await client.groupAcceptInvite(ini_urrrl).then((res) => m.reply(`Berhasil Join ke grup...`)).catch((err) => m.reply(`Eror.. Munkin bot telah di kick Dari grup tersebut`))
      }
      break
      case 'getip': {
        if (!isOwner) return
        var http = require('http')
        http.get({
          'host': 'api.ipify.org',
          'port': 80,
          'path': '/'
        }, function(resp) {
          resp.on('data', function(ip) {
            m.reply("IP : " + ip);
          })
        })
      }
      break
      case 'kick': {
        if (!m.isGroup) return
        if (!isAdmins && !isOwner) return
        if (!isBotAdmins) return
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        await client.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => m.reply(`${users} telah di kick...`)).catch((err) => m.reply('hmmm gagal kick dia'))
      }
      break
            
    case 'del': {
    if (!m.isGroup) return; // Pastikan pesan diterima dari grup
    if (!isAdmins && !isOwner) return; // Hanya admin atau owner yang bisa menghapus pesan
    if (!m.quoted) return; // Pastikan ada pesan yang dibalas

    let target = m.quoted.sender; // Ambil pengirim pesan yang dibalas

    // Hapus pesan yang dibalas
    await client.deleteMessage(m.chat, {
        id: m.quoted.id,
        remoteJid: target,
        fromMe: false
    });

    m.reply('Pesan berhasil dihapus.');
}
break;

      
      case 'linkgroup':
      case 'linkgrup':
      case 'linkgc': {
        if (!m.isGroup) return
        if (!isAdmins && !isOwner) return
        if (!isBotAdmins) return
        let response = await client.groupInviteCode(m.chat)
        client.sendText(m.chat, `*『 INFO LINK GROUP 』*\n\n» *Nama Grup :* ${groupMetadata && groupMetadata.subject ? groupMetadata.subject : 'Unknown Group'}\n» *Owner Grup :* ${groupMetadata && groupMetadata.owner !== undefined ? '@' + groupMetadata.owner.split`@`[0] : 'Tidak diketahui'}\n» *ID Grup:* ${groupMetadata && groupMetadata.id ? groupMetadata.id : 'Unknown'}\n» *Link Grup :* https://chat.whatsapp.com/${response}\n» *Member :* ${groupMetadata && groupMetadata.participants ? groupMetadata.participants.length : 0}\n`, m, {
          detectLink: true
        })
      }
      break
      case 'updatelist': {
  if (!m.isGroup) return;
  if (!isAdmins) return;

  const groupID = from;
  const updateListCommand = body.slice(10).trim();
  const [updateKey, newResponse] = updateListCommand.split('||').map(s => s.trim());

  if (!updateKey || !newResponse) {
    return m.reply(`Format salah!\nContoh: *${prefix}updatelist KEY||RESPON BARU*`);
  }

  const customCommands = readCustomCommands();
  if (customCommands[groupID] && customCommands[groupID][updateKey.toUpperCase()]) {
    customCommands[groupID][updateKey.toUpperCase()] = newResponse;
    saveCustomCommands(customCommands);
    m.reply(`Sukses Update List\nKata Kunci: *${updateKey.toUpperCase()}*`);
  } else {
    m.reply(`Kata kunci *${updateKey.toUpperCase()}* tidak ditemukan`);
  }
}
break;



break;
  case 'list':
case 'lists': {
  if (!isGroup) return m.reply('Command ini hanya bisa digunakan di grup.');

  const groupID = from;
  const customCommands = readCustomCommands();

  if (!customCommands[groupID] || Object.keys(customCommands[groupID]).length === 0) {
    return m.reply('Belum ada list yang disimpan untuk grup ini.');
  }

  const keys = Object.keys(customCommands[groupID]);

  // Bikin Section list WhatsApp
  const sections = [{
    title: "ðŸ“¦ Daftar Produk Manual",
    rows: keys.map(key => ({
      title: key,
      rowId: `${prefix}getlist ${key}`
    }))
  }];

  const listMessage = {
    text: 'Silahkan pilih list yang ingin ditampilkan:',
    footer: `Atlantic Group - Auto Respon`,
    title: 'ðŸ“‹ LIST PRODUK MANUAL',
    buttonText: 'Klik untuk lihat',
    sections
  };

  client.sendMessage(m.chat, listMessage, { quoted: m });
}
break;

            case 'addlist': {
  if (!m.isGroup) return;

  if (!isAdmins) {
    return m.reply("Fitur ini hanya bisa digunakan oleh admin group ðŸ˜¿");
  }

  const groupID = from;
  const input = args.join(' ').trim();
  const delimiterIndex = input.indexOf('@');

  if (delimiterIndex !== -1) {
    const key = input.slice(0, delimiterIndex).trim().toUpperCase();
    const response = input.slice(delimiterIndex + 1).trim();

    if (!key || !response) {
      return m.reply(`Gunakan dengan cara *${command} key@response*\n\nContoh: *${command} tes@apa*`);
    }

    // Cek apakah key sudah ada di grup ini
    const db = readCustomCommands();
    const existing = db[groupID] && db[groupID][key];

    if (existing) {
      return m.reply(`kata kunci *"${key}"* sudah ada di hatiku ^_^ ðŸ«£`);
    }

    // Simpan key baru
    addCustomCommand(groupID, key, response);
    m.reply(`Sukses Set List Message\nKata Kunci : *${key}*`);
  } else {
    m.reply(`Gunakan dengan cara *${command} key@response*\n\nContoh: *${command} tes@apa*`);
  }
}
break;


            case 'renamelist': {
  if (!isGroup) return;
  if (!isAdmins) return;

  const groupID = from;
  const input = args.join(' ').trim();
  const [oldKey, newKey] = input.split('|').map(v => v.trim().toUpperCase());

  if (!oldKey || !newKey) {
    return m.reply(`Gunakan dengan cara: *${command} oldKey|newKey*\nContoh: *${command} PROMO|PROMO BARU*`);
  }

  const list = readCustomCommands();
  if (!list[groupID] || !list[groupID][oldKey]) {
    return m.reply(`Kata kunci *${oldKey}* tidak ditemukan`);
  }

  // Rename
  list[groupID][newKey] = list[groupID][oldKey];
  delete list[groupID][oldKey];
  saveCustomCommands(list);
  m.reply(`Berhasil rename dari *${oldKey}* menjadi *${newKey}*`);
}
break;

      case 'dellist':
case 'hapuslist': {
  if (!isAdmins) return;
  const groupID = from;
  const dellistCommand = body.slice(8).trim().toUpperCase();
  const customCommands = readCustomCommands();

  if (customCommands[groupID] && customCommands[groupID][dellistCommand]) {
    delete customCommands[groupID][dellistCommand];
    saveCustomCommands(customCommands);
    m.reply(`Sukses Delete List Message\nKata Kunci : *${dellistCommand}*`);
  } else {
    m.reply(`Gunakan dengan cara *${command} key*\n\nContoh: \`\`\`${command} tes\`\`\``);
  }
}
break;
      case 'close': {
        if (!m.isGroup) return
        if (!isAdmins) return
        if (!isBotAdmins) return
        const menu_nya = `───〔 *GROUP CLOSE* 〕──

*Group Telah Di Tutup Oleh* @${sender.split("@")[0]}

\`\`\`📆${hariini}
⏰${time1} WIB\`\`\`

اَلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ 

_Terimakasih atas orderan hari ini, semoga besok lebih lebih laris untuk kita semua aamiin... ✨_`;
        await client.groupSettingUpdate(m.chat, 'announcement').then((res) => client.sendMessage(from, { text: menu_nya, contextInfo: { mentionedJid: [sender, owned] } }))
      }
      break
      case 'open': {
        if (!m.isGroup) return
        if (!isAdmins) return
        if (!isBotAdmins) return
        const menu_nya =
          `───〔 *GROUP OPEN* 〕──

*Group Telah Di Buka Oleh* @${sender.split("@")[0]}

\`\`\`📆${hariini}
⏰${time1} WIB\`\`\`

بِسْــــــــــــــــــمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ

_Open guys, jangan lupa awali hari dengan senyuman semoga dilancarkan urusan ✨_`
        
        await client.groupSettingUpdate(m.chat, 'not_announcement').then((res) => client.sendMessage(from, { text: menu_nya, contextInfo: { mentionedJid: [sender, owned] } }))
      }
      break
            

case 'proses':
case 'p': {
    if (!m.quoted || !m.quoted.sender || !isOwner) return;
    
    const users = m.quoted.sender;
    const owned = `${global.nomerOwner}@s.whatsapp.net`;
    const menuInfo =
        `*「 TRANSAKSI PENDING 」*\n\n` +
        `⛅ HARI      : ${hariini}\n` +
        `⌚ JAM       : ${time1}\n` +
        `✨ STATUS : PENDING\n\n` +
        `*PESANAN @${users.split("@")[0]} SEDANG DIPROSES*`;
    
    client.sendMessage(from, { text: menuInfo, contextInfo: { mentionedJid: [users, owned], forwardingScore: 9999, isForwarded: true } }, );
}
break;

case 'done':       
case 'd': {
    if (!m.quoted || !m.quoted.sender || !isOwner) return;
    
    const users = m.quoted.sender;
    const owned = `${global.nomerOwner}@s.whatsapp.net`;
    const menuInfo =
        `*「 TRANSAKSI SUKSES 」*\n\n` +
        `⛅ HARI      : ${hariini}\n` +
        `⌚ JAM       : ${time1}\n` +
        `✨ STATUS : SUKSES\n\n` +
        `*PESANAN @${users.split("@")[0]} TELAH BERHASIL*`;
    
    client.sendMessage(from, { text: menuInfo, contextInfo: { mentionedJid: [users, owned], forwardingScore: 9999, isForwarded: true } }, );
}
break;
       
    
    case 'owner': {
    var owner_Nya = `${global.nomerOwner}@s.whatsapp.net`;

    // Sending the contact
    sendContact(from, owner_Nya, global.ownerName, m);

    // Adding a delay before sending the response message
    setTimeout(() => {
        // Adding respon pesan setelah mengirim kontak owner
        var responseMessage = "*_Itu Kak Kontak Admin Saya, Jika Mau Order Apapun Silahkan Hubungi Dia ya._*\n\n*Admin Juga Menyediakan Jasa Pembuatan Bot Dan Website Topup Otomatis Bagi Kamu Yang Mau Mulai Berbisnis 🤝";
        client.sendText(from, responseMessage);
    }, 1000); // Adjust the delay time as needed

    break;
}
            
case 'afk': {
    if (!m.isGroup) return m.reply("FITUR UNTUK GRUB")
    if (!isOwner) return m.reply("Fitur Ini Khusus Owner!");
    
	const cooldowns = new Map();              
    const now = Date.now();
    const cooldownTime = 5000; // Batas waktu antara eksekusi perintah AFK dalam milidetik (misalnya, 5 detik)

    if (cooldowns.has(m.sender)) {
        const lastExecutionTime = cooldowns.get(m.sender);
        const remainingTime = lastExecutionTime + cooldownTime - now;
        if (remainingTime > 0) {
            return m.reply(`Tunggu beberapa saat sebelum menggunakan perintah AFK lagi. (Sisa Waktu: ${msToDate(remainingTime)})`);
        }
    }

    let reason = text ? text : 'Nothing.';
    afk.addAfkUser(m.sender, Date.now(), reason, _afk);
    client.sendTextWithMentions(m.chat, `@${m.sender.split('@')[0]} sedang afk\nAlasan : ${reason}`, m);
    cooldowns.set(m.sender, now); // Catat waktu terakhir pengguna menjalankan perintah AFK
break;
};            
        
     case 'cekff':{
	if (!q) return m.reply(`🔍CEK NICK FREE FIRE\nContoh: cekff 12345678`)
	const id = text.split(' ')[0]
    if  (!id) return m.reply('ID wajib di isi');
	const { stalkff } = require('./lib/stalk-ff.js');
	stalkff(id).then(i=>{
        //console.log(i)
		if (i.status !== 200) return m.reply(i.msg)
		m.reply(`*CEK NICK FREE FIRE*

*ID*: ${id}
*Nickname:* ${i.nickname}`)
	})
break;
}


case 'form': {
  if (!text) {
    return m.reply(`Gunakan:\n> ${prefix + command} [jenis_order] [id] [server] [jumlah]\nContoh:\n> ${prefix + command} sl basic 735660422 8938 3`);
  }

  const parts = text.trim().split(/\s+/);

  if (parts.length < 4) {
    return m.reply(`Format salah!\nContoh:\n> ${prefix + command} sl basic 735660422 8938 3`);
  }

  // Ambil dari belakang
  const jumlah = parts.pop();
  const server = parts.pop();
  const userId = parts.pop();
  const jenisOrder = parts.join(' ').toUpperCase();

  let nickname = 'Tidak ditemukan';

  // Validasi ML: auto get nickname
  if (server !== '-' && userId) {
    try {
      const fetch = require('node-fetch');
      const params = new URLSearchParams();
      params.append('country', 'SG');
      params.append('userId', userId);
      params.append('voucherTypeName', "MOBILE_LEGENDS");
      params.append('zoneId', server);

      const response = await fetch('https://order-sg.codashop.com/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params
      });

      const data = await response.json();
      if (data.success !== false) {
        nickname = decodeURIComponent(data.result.username);
      }
    } catch (e) {
      console.error('Error fetch ML nick:', e);
    }
  }

  // Tanggal auto
  const today = new Date();
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const tanggal = today.toLocaleDateString('id-ID', options);

  // Output final
  const formatOrder =
`♡ ˖ *f̲o̲r̲m̲a̲t̲ ̲o̲r̲d̲e̲r̲* 𔔀˖ᣞ۪ 

ᨳ 𝗂𝖽 +﹙𝗌𝖾𝗋𝗏𝖾𝗋﹚: ${userId} (${server})
ᨳ 𝗇𝗂𝖼𝗄𝗇𝖺𝗆𝖾 : ${nickname}
ᨳ 𝗃𝖾𝗇𝗂𝗌 𝗈𝗋𝖽𝖾𝗋 : ${jenisOrder}
ᨳ 𝗃𝗎𝗆𝗅𝖺𝗁 : ${jumlah}
ᨳ 𝗍𝖺𝗇𝗀𝗀𝖺𝗅 𝗈𝗋𝖽𝖾𝗋 : ${tanggal}
ᨳ 𝗈𝗋𝖽𝖾𝗋 𝖻𝗒 : ${m.sender.split('@')[0]}

 ⋮ 𖢷 𖥦 send form to *a̲d̲m̲i̲n̲* .. 🩰`;

  m.reply(formatOrder);
}
break;

            
          case 'mlreg':{
    if (!text) {
        return m.reply(`*MOBILE LEGENDS VALIDASI ID V2.0*\n\nGunakan dengan cara :\n> ${prefix + command} ID SERVER\n\nContoh :\n> ${prefix + command} 640015932 10164`);
    }
    const fetch = require('node-fetch');
    const url = 'https://order-sg.codashop.com/validate';
    const userId = args[0];
    const zoneId = args[1];
    const country = "SG";

    if (!userId || !zoneId) {
        return m.reply(`Format Salah!\n\nSilakan gunakan dengan cara :\n\n> ${prefix + command} userId zoneId\n\nContoh :\n> ${prefix + command} 640015932 10164`);
    }

    const params = new URLSearchParams();
    params.append('country', country)
    params.append('userId', userId);
    params.append('voucherTypeName', "MOBILE_LEGENDS")
    params.append('zoneId', zoneId);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: params
        });
        const data = await response.json();
        console.log(data);
        if (data.success === false) { 
            return m.reply(`Maaf, ID tidak valid`);
        } else {
            const encodedUsername = data.result.username;
            const decodedUsername = decodeURIComponent(encodedUsername);
            const regionCountry = data.result.create_role_country.toUpperCase();
            const regionLogin = data.result.this_login_country.toUpperCase();
            
            const message = ` *DETAIL AKUN MOBILE LEGENDS*\n\n Username: ${decodedUsername}\n Region Akun: ${regionCountry}\n Region Login: ${regionLogin}`;
            m.reply(message);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return m.reply('Maaf terjadi kesalahan, silahkan cek Console untuk informasi lebih lanjut');
    }
    break;
}

case "cekpln": {
    if (!text) return m.reply(`!Silahkan isi dengan nomer meter\n\nContoh : cekpln 14331231507`)
        let data = {
          commands: 'pln-subscribe',
    customer_no: text,
        }
        fetch('https://api.digiflazz.com/v1/transaction', {
            method: 'POST',
            body: JSON.stringify(data),
            header: {
              'Content-Type': 'application/json'
            }
          }).then((response) => response.json())
          .then((res) => {
            const pesan = `*──••• 「 CEK DATA PLN 」 •••──*

Nama : ${res.data.name}
Nomor Meter: ${res.data.meter_no}
Subscribe: ${res.data.subscriber_id}
Daya : ${res.data.segment_power}`            
            client.sendMessage(m.chat,{text:pesan})
          })
break;
}    
            case 'antilink': {
  if (!isGroup) return m.reply(mess.group);
  if (!isAdmins) return m.reply(mess.admin);
  if (!isBotAdmins) return m.reply("Jadikan saya Admin dulu ya :)");
  
  const action = args[0]; // 'on' untuk mengaktifkan atau 'off' untuk menonaktifkan
  
  if (action === 'on') {
    antilink.push(from);
    fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink, null, 2));
    m.reply(`✅ Sukses mengaktifkan fitur antilink di group *${groupMetadata && groupMetadata.subject ? groupMetadata.subject : 'Unknown Group'}*`);
  } else if (action === 'off') {
    const index = antilink.indexOf(from);
    if (index !== -1) {
      antilink.splice(index, 1);
      fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink, null, 2));
      m.reply(`✅ Sukses menonaktifkan fitur antilink di group *${groupMetadata && groupMetadata.subject ? groupMetadata.subject : 'Unknown Group'}*`);
    } else {
      m.reply(`Fitur antilink tidak aktif di group *${groupMetadata && groupMetadata.subject ? groupMetadata.subject : 'Unknown Group'}*.`);
    }
  } else {
    m.reply('Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan fitur antilink.');
  };
break;
};           
      case 'buy': {
        await handleBuyCommand(args, sender, db, client, m, pendingTransactions, namaStore, global);
        break;
      }

              case 'addproduk': {
                await handleAddProduk(m.text.trim(), isOwner, db, admin, m);
                break;
              }

        case 'addstok': {
          await handleAddStok(args, isOwner, db, admin, m);
          break;
        }
		
        case 'stok': {
          await handleStok(sender, db, m);
          break;
        }

        case 'show':
case 'get': {
  const nomor = sender.split("@")[0];
  console.log('Sender:', sender);
  console.log('User Nomor:', nomor);

  // Ambil data pengguna dari Firestore
  const userRef = db.collection('users').doc(nomor);

  let userDoc;
  try {
    userDoc = await userRef.get();
  } catch (error) {
    console.error('Error accessing Firestore:', error);
    return m.reply('Terjadi kesalahan saat mengakses data pengguna. Silakan coba lagi nanti.');
  }

  if (!userDoc.exists) {
    return m.reply('Kamu belum terdaftar. Silakan ketik: *Daftar* untuk bisa mengakses.');
  }

  const userData = userDoc.data();

  // Ambil data produk dari file JSON
  let productData;
  try {
    productData = JSON.parse(fs.readFileSync('./db/datadigi.json', 'utf8'));
  } catch (error) {
    console.error('Error reading product data:', error);
    return m.reply('Terjadi kesalahan saat mengakses data produk. Silakan coba lagi nanti.');
  }

  let aliasKey = args[0] ? args[0].toLowerCase() : null;

  if (!aliasKey || !aliasMap.hasOwnProperty(aliasKey)) {
    return m.reply(`Key produk "${aliasKey}" tidak dikenali. Masukkan yang valid.`);
  }
  
  //const { marginBronze, marginSilver, marginGold, marginOwner } = require('./db/config')
  const { category, brand, type, types } = aliasMap[aliasKey];
  const requestedCategory = category.toUpperCase();
  const requestedBrand = brand.toUpperCase();

  // Filter produk berdasarkan kategori, brand, dan tipe
  let matchingProducts = productData.filter(item =>
    item.brand.toUpperCase() === requestedBrand &&
    item.category.toUpperCase() === requestedCategory &&
    (types ? types.includes(item.type) : item.type.toUpperCase() === type.toUpperCase())
  );

  if (matchingProducts.length === 0) {
    return m.reply(`Tidak ada produk ditemukan untuk Produk "${aliasKey}".`);
  }

  matchingProducts.sort((a, b) => a.price - b.price);

  const configData = require('./db/config.js');
  const defaultMarkupPercentage = configData.defaultMarkupPercentage;
  const formatOrder = getOrderFormat(aliasKey);
  const contohOrder = getContoh(aliasKey);

  let formattedResponse = `━═━═━┤❄️ *${requestedBrand}* ├━═━═━\n\n*Status* : ✅ = Ready\n*Status* : ❌ = Close\n*Order Dengan QR ketik* :\n\`QR ${formatOrder}\`\n*Order Dengan Saldo ketik* :\n\`TP ${formatOrder}\`\n*Contoh* :\n${contohOrder}\n━━═━═━━═━═━━═━═━͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏\n`;
	
    //modified
    matchingProducts.forEach(product => {
  const originalPrice = parseFloat(product.price || 0);
  if (isNaN(originalPrice) || originalPrice === 0) return;

  const statusEmoji = product.seller_product_status && product.buyer_product_status ? '✅' : '❌';

  const hargaSilver = Math.floor(originalPrice * (1 + marginSilver)).toLocaleString();
  const hargaGold = Math.floor(originalPrice * (1 + marginGold)).toLocaleString();
  const hargaOwner = Math.floor(originalPrice * (1 + marginOwner)).toLocaleString();

  // Awal teks produk
  formattedResponse += `\n❄️ *${product.product_name}*\n`;

  // Harga ditampilkan sesuai role
  if (["BRONZE", "SILVER", "GOLD"].includes(userData.role)) {
    formattedResponse += `> Harga Silver : Rp. ${hargaSilver}\n`;
    formattedResponse += `> Harga Gold : Rp. ${hargaGold}\n`;
  } else if (userData.role === "OWNER") {
    formattedResponse += `> Harga Silver : Rp. ${hargaSilver}\n`;
    formattedResponse += `> Harga Gold : Rp. ${hargaGold}\n`;
    formattedResponse += `> Harga Owner : Rp. ${hargaOwner}\n`;
  }

  formattedResponse += `> Kode : \`${product.buyer_sku_code}\`\n`;
  formattedResponse += `> Status : ${statusEmoji}\n┈ׅ──ׄ─꯭─꯭──────꯭ׄ──ׅ┈\n`;
});

    /*default
  matchingProducts.forEach(product => {
    const originalPrice = parseFloat(product.price || 0);
if (isNaN(originalPrice) || originalPrice === 0) return; // skip produk invalid

    let markupPercentage = defaultMarkupPercentage;

    // Ambil markup berdasarkan role pengguna
    if (userData) {
      switch (userData.role) {
        case "GOLD":
          markupPercentage = marginGold;
          break;
        case "SILVER":
          markupPercentage = marginSilver;
          break;
        case "BRONZE":
          markupPercentage = marginBronze;
          break;
        case "OWNER":
          markupPercentage = marginOwner;
          break;
        default:
          break;
      }
    }
	
    const increasedPrice = originalPrice * (1 + markupPercentage);
    let adjustedPrice;
    
    // Pembulatan harga berdasarkan role pengguna
    if (userData.role === "BRONZE" || userData.role === "OWNER") {
      adjustedPrice =  Math.floor(increasedPrice);
    } else if (userData.role === "SILVER" || userData.role === "GOLD") {
      adjustedPrice = Math.floor(increasedPrice);
    } else {
      adjustedPrice = increasedPrice; // Jika role tidak dikenali, gunakan harga asli tanpa pembulatan
    }

 const statusEmoji = product.seller_product_status && product.buyer_product_status ? '✅' : '❌';

//> *Harga Owner* : Rp. ${Math.floor(originalPrice * (1 + marginOwner)).toLocaleString()}
//Harga Bronze : Rp. ${Math.floor(originalPrice * (1 + marginBronze)).toLocaleString()}      
    formattedResponse += `\n❄️ *${product.product_name}*\n > Harga Silver : Rp. ${Math.floor(originalPrice * (1 + marginSilver)).toLocaleString()}
> Harga Gold : Rp. ${Math.floor(originalPrice * (1 + marginGold)).toLocaleString()}
> Harga Owner : Rp. ${Math.floor(originalPrice * (1 + marginOwner)).toLocaleString()}
> Kode : \`${product.buyer_sku_code}\`
> Status : ${statusEmoji}\n┈ׅ──ׄ─꯭─꯭──────꯭ׄ──ׅ┈\n`;
  });
*/
  m.reply(formattedResponse);
}
break;

        // H2H Automatic Transaction Cases
        case 'order': {
          await handleOrder(body, sender, db, m);
          break;
        }

        case 'cek': {
          await handleCek(body, sender, db, m);
          break;
        }

        case 'riwayat': {
          await handleRiwayat(sender, db, m);
          break;
        }

        case 'produk': {
          await handleProduk(body, sender, db, m);
          break;
        }
        case 'getlay': {
        if (!isOwner) return;
        const username = global.digiflazz.username;
        const apiKey = global.digiflazz.apiKey;
        const cmd = 'prepaid';
        const combinedString = username + apiKey + cmd;
        const signature = crypto.createHash('md5').update(combinedString).digest('hex');
        const endPoint = "https://api.digiflazz.com/v1/price-list";
        const postData = {
          cmd,
          username,
          sign: signature,
        };
        const apiResponse = await connect(endPoint, postData);
        if (apiResponse && apiResponse.data) {
          fs.writeFileSync(productData, JSON.stringify(apiResponse.data, null, 2));
          m.reply(`Layanan Berhasil di Update`);
        }
      }
      break;

      // Handle konfirmasi pembelian
      case 'confirm_buy': {
        await handleConfirmBuy(body, sender, pendingTransactions, db, m, client, moment, admin, namaStore, global);
        break;
      }

      // Test Button Message case - sesuai dokumentasi nstar-y/bail
      case 'testbutton': {
        if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan command ini.');
        
        const buttons = [
          { buttonId: 'button_1', buttonText: { displayText: 'Button 1' }, type: 1 },
          { buttonId: 'button_2', buttonText: { displayText: 'Button 2' }, type: 1 },
          { buttonId: 'button_3', buttonText: { displayText: 'Button 3' }, type: 1 }
        ];

        const buttonMessage = {
          text: "🧪 *Test Button Message*\n\nIni adalah testing fitur button message dari baileys-mod dengan AI icon!",
          footer: `© ${global.botName} - Powered by baileys-mod`,
          buttons,
          headerType: 1,
          ai: true
        };

        await client.sendMessage(m.chat, buttonMessage, { quoted: m });
        break;
      }

      // Test Button dengan Image
      case 'testbuttonimg': {
        if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan command ini.');
        
        const buttons = [
          { buttonId: 'like_button', buttonText: { displayText: '👍 Like' }, type: 1 },
          { buttonId: 'share_button', buttonText: { displayText: '📤 Share' }, type: 1 },
          { buttonId: 'more_info_button', buttonText: { displayText: 'ℹ️ More Info' }, type: 1 }
        ];

        const caption = "🖼️ *Test Button dengan Image*\n\nIni adalah testing fitur button message dengan gambar dari baileys-mod dan AI icon!";
        
        try {
          // First try with direct URL approach
          const buttonMessage = {
            image: { url: global.testButtonImg },
            caption: caption,
            footer: `© ${global.botName} - Advanced WhatsApp Bot`,
            buttons,
            headerType: 1,
            ai: true
          };

          await client.sendMessage(m.chat, buttonMessage, { quoted: m });
        } catch (error) {
          console.log('❌ Direct URL failed, trying buffer approach:', error.message);
          
          try {
            // Fallback: Try with buffer approach (as per baileys-mod docs)
            const imageBuffer = await getBuffer(global.testButtonImg);
            const buttonMessage = {
              image: imageBuffer,
              caption: caption + "\n\n*⚠️ Loaded via buffer fallback*",
              footer: `© ${global.botName} - Advanced WhatsApp Bot`,
              buttons,
              headerType: 1,
              ai: true
            };

            await client.sendMessage(m.chat, buttonMessage, { quoted: m });
          } catch (bufferError) {
            console.log('❌ Buffer approach failed:', bufferError.message);
            
            // Ultimate fallback: text only
            const textMessage = {
              text: caption + "\n\n⚠️ *Image could not be loaded due to rate limiting or network issues*\n\nButton functionality still works!",
              footer: `© ${global.botName} - Advanced WhatsApp Bot`,
              buttons,
              headerType: 1,
              ai: true
            };

            await client.sendMessage(m.chat, textMessage, { quoted: m });
          }
        }
        break;
      }

      // Test Interactive Message
      case 'testinteractive': {
        if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan command ini.');
        
        const interactiveButtons = [
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "Quick Reply",
              id: "quick_reply_1"
            })
          },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "Visit Website",
              url: "https://github.com/nstar-y/Bail"
            })
          },
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "Copy Code",
              id: "copy_code_1",
              copy_code: "BAILEYS-MOD-2025"
            })
          }
        ];

        const interactiveMessage = {
          text: "⚡ *Test Interactive Message*\n\nIni adalah testing fitur interactive message dengan berbagai jenis button dan AI icon!",
          title: "Interactive Message Test",
          footer: `© ${global.botName} - baileys-mod features`,
          interactiveButtons,
          ai: true
        };

        await client.sendMessage(m.chat, interactiveMessage, { quoted: m });
        break;
      }

      // Test AI Icon Feature
      case 'testai': {
        if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan command ini.');
        
        // Regular message without AI icon
        await client.sendMessage(m.chat, { 
          text: "📨 *Regular Message*\n\nIni adalah pesan biasa tanpa AI icon."
        }, { quoted: m });
        
        // Wait a moment
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Message with AI icon
        await client.sendMessage(m.chat, { 
          text: "🤖 *AI Message*\n\nIni adalah pesan dengan AI icon yang menunjukkan bahwa pesan ini dari bot AI!",
          ai: true
        }, { quoted: m });
        
        break;
      }

      // Test AI Debug - Compare group vs private behavior
      case 'testaidebug': {
        if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan command ini.');
        
        const chatType = m.isGroup ? "GROUP CHAT" : "PRIVATE CHAT";
        
        // Test m.reply (with AI icon)
        await m.reply(`🧪 *Testing m.reply in ${chatType}*\n\nThis should have AI icon via m.reply function.`);
        
        // Wait a moment
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Test client.sendMessage directly
        await client.sendMessage(m.chat, { 
          text: `🧪 *Testing direct sendMessage in ${chatType}*\n\nThis should have AI icon via direct client.sendMessage.`,
          ai: true
        }, { quoted: m });
        
        // Wait a moment
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Test without AI for comparison (use client.sendMessage instead of m.replyNoAI)
        await client.sendMessage(m.chat, { 
          text: `🧪 *Testing without AI in ${chatType}*\n\nThis should NOT have AI icon.`
        }, { quoted: m });
        
        break;
      }

      // Test Album Message with AI
      case 'testalbum': {
        if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan command ini.');
        
        const caption = "🖼️ *Test Album Message*\n\nIni adalah testing fitur album message dengan AI icon!";
        
        try {
          // First try with direct URL approach
          const media = [
            { image: { url: global.testAlbumImg1 } },
            { image: { url: global.testAlbumImg2 } }
          ];

          await client.sendMessage(m.chat, { 
            album: media, 
            caption: caption,
            ai: true
          }, { quoted: m });
        } catch (error) {
          console.log('❌ Direct URL album failed, trying buffer approach:', error.message);
          
          try {
            // Fallback: Try with buffer approach (as per baileys-mod docs)
            const media = [
              { image: await getBuffer(global.testAlbumImg1) },
              { image: await getBuffer(global.testAlbumImg2) }
            ];

            await client.sendMessage(m.chat, { 
              album: media, 
              caption: caption + "\n\n*⚠️ Loaded via buffer fallback*",
              ai: true
            }, { quoted: m });
          } catch (bufferError) {
            console.log('❌ Buffer album approach failed:', bufferError.message);
            
            // Ultimate fallback: text only
            await client.sendMessage(m.chat, {
              text: caption + "\n\n⚠️ *Album images could not be loaded due to rate limiting or network issues*\n\nThis should have shown multiple images in one message.",
              ai: true
            }, { quoted: m });
          }
        }
        
        break;
      }

      // Test Pay/Payment - Working example dari struktur lama
      

      default:
    }
    
    // Libsignal fixes: Complete performance tracking
    performanceTracker.end(tracker)
    
  } catch (err) {
    // Libsignal fixes: Enhanced error handling
    handleLibsignalError(err, 'neko.js main handler')
    logger.error(`❌ Error in main message handler: ${err.message}`)
    m.reply(util.format(err))
  }
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright(`Update ${__filename}`))
  delete require.cache[file]
  require(file)
})