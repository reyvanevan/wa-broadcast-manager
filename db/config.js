const fs = require('fs')
const chalk = require('chalk')

global.owner = process.env.OWNER_NUMBERS ? process.env.OWNER_NUMBERS.split(',') : ['6281224258870', '6289653544913']
global.nomerOwner = process.env.NOMER_OWNER || '6281224258870'

global.nomerBot = process.env.NOMER_BOT || '6285169545258'
global.botName = process.env.BOT_NAME || 'WA Broadcast Manager'
global.ownerName = process.env.OWNER_NAME || 'Reyvan'
global.sessionName = process.env.SESSION_NAME || 'session'

// Broadcast Configuration
global.broadcast = {
  maxTargets: process.env.MAX_BROADCAST_TARGETS || 100,
  delay: process.env.BROADCAST_DELAY || 1000,
  enableTracking: process.env.ENABLE_DELIVERY_TRACKING || true
}

module.exports = {
  broadcast: global.broadcast
}

global.bot = "y"
global.min = `tag aja etminnya kalo ngartis`

// AI Icon Configuration
global.aiInGroups = false;  // Toggle AI support in groups  
global.aiInPrivate = true;  // Toggle AI support in private chat

// Link untuk testing dan fitur bot - menggunakan services yang lebih reliable
global.linkLOGO = 'https://picsum.photos/400/400'
global.linkGC = 'https://picsum.photos/500/300'
global.poster1 = 'https://picsum.photos/600/400'
global.linksl = 'https://dummyimage.com/500x400/28a745/ffffff&text=Success+Image'
global.testButtonImg = 'https://picsum.photos/600/350'
global.testAlbumImg1 = 'https://picsum.photos/500/300'
global.testAlbumImg2 = 'https://picsum.photos/500/400'


// Respon Bot
global.mess = {
  wait: "Loading...",
  owner: "Maaf kak, fitur ini khusus Owner",
  waitdata: "Melihat Data Terkini...",
  admin: "Fitur Khusus Admin Group!",
  group: "Fitur Khusus Group!",
  private: 'Silahkan menggunakan Fitur ini di Private Chat!',
  botAdmin: "Bot Harus Menjadi Admin Terlebih Dahulu!",
  broadcast: {
    success: "✅ Broadcast berhasil terkirim!",
    failed: "❌ Broadcast gagal terkirim!",
    inProgress: "📤 Sedang mengirim broadcast...",
    scheduled: "⏰ Broadcast telah dijadwalkan",
    cancelled: "❌ Broadcast dibatalkan"
  }
};


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})