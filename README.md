# 🤖 WA Broadcast Manager v2.0# 📢 WA Broadcast Manager - Advanced WhatsApp Broadcasting Tool



**WhatsApp Personal Broadcasting Tool with Advanced Contact Management & Scheduling**WA Broadcast Manager adalah alat broadcasting WhatsApp canggih yang dibangun untuk manajemen broadcast yang efisien dan otomatisasi pesan massal dengan dukungan AI Assistant.



## ✨ Features## ✨ Fitur Utama



### 📢 Broadcasting Features### 📢 **Advanced Broadcasting Features**

- **Personal Number Broadcasting** - Send messages to individual phone numbers- 🎯 **Smart Broadcast** - Kirim pesan ke multiple groups/contacts

- **Contact Management** - Add, remove, and organize your contacts- 📊 **Delivery Tracking** - Monitor status pengiriman broadcast

- **Contact Groups** - Create groups for targeted broadcasting- ⏱️ **Scheduled Broadcasting** - Jadwal broadcast otomatis

- **Tag-based Targeting** - Tag contacts and broadcast to specific tags- 🎭 **Message Templates** - Template pesan untuk broadcast

- **Scheduled Broadcasting** - Schedule daily, weekly, or monthly broadcasts- 🔄 **Auto Retry** - Retry gagal kirim otomatis

- **Broadcast Analytics** - Track delivery success rates and statistics- 📈 **Broadcast Analytics** - Analitik performa broadcast



### 🎯 Target Options### 🤖 **AI Assistant Integration** 

- `all` - Broadcast to all active contacts- 🤖 **Smart Conversations** - Percakapan cerdas dengan AI

- `group:groupname` - Broadcast to specific contact group- 🎯 **Context Understanding** - Memahami konteks percakapan

- `tag:tagname` - Broadcast to contacts with specific tag- 🔍 **Smart Search** - Pencarian cerdas dengan AI

- `628123456789` - Broadcast to specific number- 📝 **Auto Response** - Respon otomatis yang kontekstual

- 🌐 **Multi-Language Support** - Dukungan berbagai bahasa

### ⏰ Scheduling Options- 🧩 **Plugin System** - Sistem plugin yang dapat diperluas

- **Daily** - Every day at specified time

- **Weekly** - Every week on specified day at specified time### 🔥 **Enhanced WhatsApp Features**

- **Monthly** - Every month on specified date at specified time- 💬 **Send Messages to Channels** - Kirim pesan ke channel WhatsApp

- 🔘 **Button & Interactive Messages** - Button dan pesan interaktif

## 🚀 Quick Start- 🖼️ **Send Album Messages** - Kirim multiple gambar sebagai album

- 👥 **Group with LID Support** - Support grup dengan @lid

### Installation- 🤖 **AI Message Icon** - Icon AI untuk pesan

```bash- 🖼️ **Full-Size Profile Pictures** - Upload foto profil ukuran penuh

# Clone repository- 📱 **Custom Pairing Codes** - Kode pairing custom "WABC-MGR"

git clone https://github.com/reyvanevan/wa-broadcast-manager.git

cd wa-broadcast-manager### 🛠️ **Libsignal Fixes & Performance**

- 🧹 **Clean Console Output** - Output console yang bersih tanpa noise

# Install dependencies- 📝 **Enhanced Logging** - Sistem logging dual transport (file + console)

npm install- ⚡ **Performance Monitoring** - Real-time performance tracking

- 🛡️ **Enhanced Error Handling** - Error handling dengan context yang jelas

# Copy environment file- 🔌 **Smart Connection Management** - Manajemen koneksi yang lebih stabil

cp .env.example .env- 📊 **Data Protection** - Automatic redaction untuk data sensitif



# Edit your configuration### 🛠️ **Management Features**

nano .env- 👥 **Smart Group Management** - Manajemen grup otomatis

- 🔒 **Advanced Security** - Sistem keamanan berlapis

# Start the bot- 📊 **Analytics & Monitoring** - Analitik penggunaan bot

npm start- 🎛️ **Admin Dashboard** - Dashboard admin lengkap

```- 🔄 **Auto Backup** - Backup otomatis data

- ⚡ **Performance Optimization** - Optimasi performa

### Basic Setup

1. Run the bot and scan QR code## 🚀 Instalasi

2. Add your first contact: `.addcontact 628123456789 John customer`

3. Send your first broadcast: `.broadcast all Hello everyone!`### 1. **Clone Repository**

```bash

## 📱 Contact Management Commandsgit clone https://github.com/reyvanevan/wa-broadcast-manager.git

cd wa-broadcast-manager

### Add Contact```

```

.addcontact [nomor] [nama] [tags]### 2. **Install Dependencies**

``````bash

**Examples:**npm install

- `.addcontact 628123456789 John customer,vip````

- `.addcontact 081234567890 Jane member`

### 3. **Konfigurasi**

### Remove Contact- Copy `.env.example` ke `.env`

``````bash

.removecontact [nomor]cp .env.example .env

``````

- Edit file `.env` dan isi konfigurasi yang diperlukan:

### List Contacts  - API keys untuk AI features

```  - Nomor admin dan owner

.listcontacts  - Database configuration

```  - Broadcast settings

- Edit file `db/config.js` sesuai kebutuhan

### Create Contact Group

```### 4. **Jalankan Bot**

.creategroup [nama] [deskripsi]```bash

```npm start

**Example:**# atau

- `.creategroup VIP "Pelanggan VIP"`node index.js

```

## 📢 Broadcasting Commands

### 5. **Pairing Code**

### Send Broadcast- Masukkan nomor WhatsApp (format: 62xxx)

```- Gunakan kode pairing "WABC-MGR" untuk connect

.broadcast [target] [message]- Scan QR code atau gunakan pairing code

```

**Examples:**## 📢 Broadcasting Usage

- `.broadcast all Good morning everyone!`

- `.broadcast group:vip Special offer for VIP members`### 1. **Basic Broadcast**

- `.broadcast tag:customer Important announcement````bash

- `.broadcast 628123456789 Personal message`# Kirim broadcast ke semua grup

.broadcast [message]

### Schedule Broadcast

```# Kirim broadcast ke grup tertentu  

.schedulebc [type] [time] [target] [message].broadcast-group [group_id] [message]

```

**Examples:**# Kirim broadcast ke contact list

- `.schedulebc daily 09:00 all Good morning daily!`.broadcast-contacts [message]

- `.schedulebc weekly 09:00,1 tag:vip Weekly VIP update` (Monday)```

- `.schedulebc monthly 08:00,1 group:members Monthly newsletter` (1st day)

### 2. **Advanced Broadcast**

### Manage Scheduled Broadcasts```bash

```# Broadcast dengan gambar

.listschedule          # List all scheduled broadcasts.broadcast-image [caption] [image_url]

.stopschedule [id]     # Stop scheduled broadcast

```# Broadcast terjadwal

.schedule-broadcast [time] [message]

## 📊 Analytics & Statistics

# Broadcast dengan template

### View Statistics.broadcast-template [template_name] [variables]

``````

.stats

```### 3. **Broadcast Management**

Shows:```bash

- Total broadcasts sent# Lihat status broadcast

- Success rates.broadcast-status

- Contact statistics

- System information# Cek delivery report

.delivery-report [broadcast_id]

## 📝 Message Templates

# Cancel scheduled broadcast

The system includes pre-built templates for common use cases:.cancel-broadcast [broadcast_id]

- **welcome** - Welcome messages```

- **announcement** - General announcements

- **promotion** - Product/service promotions## 📋 Command List

- **reminder** - Event reminders

- **survey** - Surveys and polls### 📢 Broadcast Commands

- **personal_greeting** - Personal greetings- `.broadcast [message]` - Broadcast ke semua grup aktif

- **birthday** - Birthday wishes- `.broadcast-group [group] [message]` - Broadcast ke grup tertentu

- **newsletter** - Regular newsletters- `.broadcast-contacts [message]` - Broadcast ke contact list

- **follow_up** - Customer follow-ups- `.broadcast-image [caption] [url]` - Broadcast dengan gambar

- `.schedule-broadcast [time] [message]` - Jadwal broadcast

## ⚙️ Configuration- `.broadcast-status` - Status broadcast aktif

- `.delivery-report [id]` - Report pengiriman

### Environment Variables

```env### 🤖 AI Commands  

# Bot Configuration- `.ask [question]` - Tanya AI assistant

BOT_NAME=WA Broadcast Manager- `.chat [message]` - Chat dengan AI

OWNER_NAME=Your Name- `.analyze [text]` - Analisis teks dengan AI

OWNER_NUMBER=628123456789- `.translate [text]` - Terjemahkan dengan AI

- `.summarize [text/url]` - Ringkas konten

# Database Configuration

DB_HOST=localhost### 🔧 Smart Commands

DB_PORT=3306- `.help` - Bantuan cerdas dan menu

DB_NAME=wa_broadcast- `.search [query]` - Pencarian cerdas

DB_USER=root- `.weather [location]` - Info cuaca real-time

DB_PASS=password- `.news [category]` - Berita terkini

- `.calculator [expression]` - Kalkulator pintar

# Timezone

TZ=Asia/Jakarta### 👥 Group Management

```- `.smartmod on/off` - Moderasi otomatis

- `.autoresponse` - Setup auto response

## 🛠️ Advanced Features- `.groupanalysis` - Analisis aktivitas grup

- `.antilink on/off` - Toggle antilink protection

### Bulk Contact Import- `.welcome on/off` - Toggle pesan sambutan

You can import contacts programmatically using the BroadcastManager API:

### 🛠️ Admin Commands

```javascript- `.broadcast-admin [message]` - Admin broadcast

const data = {- `.addpremium [number]` - Tambah user premium

  contacts: [- `.ban [number]` - Ban user

    { number: "628123456789", name: "John", tags: ["customer"] },- `.unban [number]` - Unban user

    { number: "628987654321", name: "Jane", tags: ["vip"] }- `.restart` - Restart bot

  ]- `.stats` - Statistik bot

};

broadcastManager.importContacts(data);## 🔧 Teknologi

```

- **Node.js** - Runtime JavaScript

### Custom Message Templates- **baileys-mod v6.8.5** - WhatsApp Web API (Modified version dengan libsignal fixes)

Add your own templates in `templates/message-templates.json`:- **AI Integration** - OpenAI GPT, Google Gemini

- **Database** - JSON untuk penyimpanan

```json- **Pino Logger** - Enhanced logging dengan pino-pretty

{- **Node-cron** - Scheduled broadcasting

  "custom_template": {- **Moment.js** - Date/time handling

    "name": "Custom Template",

    "description": "Your custom template",## 🎯 Roadmap

    "template": "Hello {{name}}, {{message}}",

    "variables": ["name", "message"]### Phase 1 (Current) ✅

  }- [x] Basic WhatsApp bot functionality

}- [x] Enhanced broadcasting capabilities

```- [x] Custom pairing code "WABC-MGR"

- [x] Group management with smart features

## 📋 Best Practices- [x] AI integration for smart responses

- [x] Libsignal fixes for enhanced performance

1. **Contact Organization**: Use tags and groups to organize contacts effectively- [x] Delivery tracking and analytics

2. **Message Timing**: Schedule broadcasts during appropriate hours

3. **Content Quality**: Keep messages relevant and valuable### Phase 2 (In Progress) 🚧

4. **Frequency Management**: Don't over-broadcast to avoid being marked as spam- [ ] Web dashboard for broadcast management

5. **Analytics Monitoring**: Regularly check success rates and adjust strategies- [ ] Advanced scheduling system

- [ ] Template management system

## 🔧 Troubleshooting- [ ] Broadcasting analytics dashboard

- [ ] Multi-account support

### Common Issues- [ ] API for external integrations



**Bot not responding:**### Phase 3 (Future) 🔮

- Check if WhatsApp Web is connected- [ ] Advanced AI-powered broadcast optimization

- Verify bot is running with `npm start`- [ ] Voice message broadcasting

- Check console for error messages- [ ] Image/video broadcast with processing

- [ ] Integration with CRM systems

**Broadcast not working:**- [ ] Advanced reporting and analytics

- Verify contacts are properly formatted- [ ] Enterprise features

- Check if targets exist in your contact list

- Ensure bot has permission to send messages## 📁 Project Structure



**Scheduled broadcasts not running:**```

- Verify cron syntax is correctwa-broadcast-manager/

- Check timezone settings├── 📄 package.json          # Project configuration

- Ensure bot stays running for scheduled tasks├── 📄 index.js             # Main bot entry point with broadcast features

├── 📄 logger.js            # Enhanced logger dengan dual transport

## 📚 API Reference├── 📄 neko.js              # Message handler with performance tracking

├── 📄 .env.example         # Environment template

### BroadcastManager Methods├── 📄 LIBSIGNAL_FIXES.md   # Libsignal implementation guide

├── 📁 db/                  # Database files

```javascript│   ├── config.js           # Bot configuration

// Contact Management│   ├── broadcast.json      # Broadcast history and schedules

addContact(number, name, tags)│   └── *.json             # Data storage

removeContact(number)├── 📁 lib/                 # Library files

getContact(number)│   ├── myfunc.js          # Utility functions

getContactsByTag(tag)│   ├── color.js           # Console colors

│   ├── broadcastManager.js # Broadcast management functions

// Group Management│   ├── libsignalConfig.js # Libsignal optimization config

createContactGroup(name, description, contacts)│   └── *.js               # Other utilities

addContactToGroup(groupId, number)├── 📁 src/                 # Source files

├── 📁 logs/                # Enhanced log files with auto-rotation

// Broadcasting├── 📁 templates/           # Message templates for broadcasting

sendBroadcast(client, message, targets, options)└── 📁 session/             # WhatsApp session (auto-generated)

scheduleRecurringBroadcast(message, targets, schedule, options)```

stopScheduledBroadcast(scheduleId)

## 🔐 Environment Variables

// Analytics

getBroadcastStats()```env

getContactStats()# Bot Settings

getDeliveryReport(broadcastId)BOT_NAME=WA Broadcast Manager

```SESSION_NAME=session

PUBLIC_MODE=true

## 🤝 Contributing

# AI API Keys

1. Fork the repositoryOPENAI_API_KEY=your_openai_key

2. Create your feature branch: `git checkout -b feature/amazing-feature`GEMINI_API_KEY=your_gemini_key

3. Commit your changes: `git commit -m 'Add amazing feature'`

4. Push to the branch: `git push origin feature/amazing-feature`# Admin Settings

5. Open a Pull RequestOWNER_NUMBER=62xxx

ADMIN_NUMBERS=62xxx,62xxx

## 📄 License

# Broadcast Settings

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.MAX_BROADCAST_TARGETS=100

BROADCAST_DELAY=1000

## 🙏 AcknowledgmentsENABLE_DELIVERY_TRACKING=true



- Built with [baileys-mod](https://github.com/nstar-y/baileys-mod) for WhatsApp Web API# Features

- Powered by Node.js and modern JavaScriptENABLE_AI_CHAT=true

- Special thanks to the open-source communityENABLE_AUTO_RESPONSE=true

ENABLE_GROUP_MANAGEMENT=true

## 📞 SupportENABLE_LIBSIGNAL_FIXES=true

ENABLE_BROADCASTING=true

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/reyvanevan/wa-broadcast-manager/issues)

- 💬 **Questions**: [GitHub Discussions](https://github.com/reyvanevan/wa-broadcast-manager/discussions)# Logging & Performance

- 📧 **Email**: support@wabroadcast.comLOG_LEVEL=info

PERFORMANCE_TRACKING=true

---CLEAN_CONSOLE_OUTPUT=true

```

**⚠️ Disclaimer**: This tool is for legitimate business communication only. Always comply with WhatsApp's Terms of Service and local regulations regarding automated messaging.
## 📝 Lisensi

MIT License - Lihat file [LICENSE](LICENSE) untuk detail lengkap.

## 🤝 Kontribusi

Kontribusi sangat welcome! Silakan:

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/BroadcastFeature`)
3. Commit perubahan (`git commit -m 'Add broadcast feature'`)
4. Push ke branch (`git push origin feature/BroadcastFeature`)
5. Buat Pull Request

## 📞 Support & Community

- 🐛 **Issues**: [GitHub Issues](https://github.com/reyvanevan/wa-broadcast-manager/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/reyvanevan/wa-broadcast-manager/discussions)
- 📧 **Email**: [Contact Developer](mailto:your-email@example.com)
- 💬 **WhatsApp Group**: [Join Community](https://chat.whatsapp.com/your-group-link)

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/reyvanevan/wa-broadcast-manager?style=social)
![GitHub forks](https://img.shields.io/github/forks/reyvanevan/wa-broadcast-manager?style=social)
![GitHub issues](https://img.shields.io/github/issues/reyvanevan/wa-broadcast-manager)
![GitHub license](https://img.shields.io/github/license/reyvanevan/wa-broadcast-manager)

## 🙏 Acknowledgments

- [Alexa WhatsApp Bot](https://github.com/reyvanevan/alexa) - Base bot technology
- [Baileys-mod](https://github.com/nstar-y/Bail) - WhatsApp Web API dengan libsignal fixes  
- [OpenAI](https://openai.com/) - AI Integration
- [Node.js](https://nodejs.org/) - Runtime Environment
- [Pino](https://getpino.io/) - High performance logging
- Komunitas developer Indonesia 🇮🇩

### 🌟 **Special Features**
- **Advanced Broadcasting**: Smart delivery tracking dan analytics
- **Libsignal Fixes**: Enhanced development experience dengan clean logging
- **AI-Powered**: Smart conversations dan auto-response
- **Enterprise-Ready**: Production-grade logging dan monitoring

---

<div align="center">

**Made with ❤️ featuring Advanced Broadcasting Technology**

*WA Broadcast Manager - Your Intelligent WhatsApp Broadcasting Solution*

[⭐ Star this repository](https://github.com/reyvanevan/wa-broadcast-manager) if you find it useful!

</div>