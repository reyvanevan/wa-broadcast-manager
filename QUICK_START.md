# WA Broadcast Manager - Quick Start Guide

## 🚀 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env file with your settings
# - OWNER_NUMBERS: Your WhatsApp numbers (comma separated)
# - BOT_NAME: Your bot name
# - Enable/disable features as needed
```

### 3. Run the Bot
```bash
npm start
# or
node index.js
```

### 4. Pairing Process
1. Enter your WhatsApp number (format: 62xxx)
2. Use pairing code: **"WABC-MGR"**
3. Scan QR code if needed

## 📢 Broadcast Commands

### Basic Broadcasting
- `.broadcast [message]` - Broadcast to all groups
- `.broadcast-groups [message]` - Broadcast to groups only
- `.schedule-broadcast [time] [message]` - Schedule broadcast

### Broadcast Management
- `.broadcast-status` - Check broadcast statistics
- `.delivery-report [id]` - Check delivery report
- `.cancel-broadcast [id]` - Cancel scheduled broadcast

## 👥 Group Management

### Admin Commands
- `.hidetag [message]` - Tag all members
- `.kick [user]` - Remove member
- `.add [number]` - Add member
- `.antilink on/off` - Toggle antilink protection

### Utility Commands
- `.help` - Show all commands
- `.ping` - Check bot status
- `.stats` - Show bot statistics
- `.runtime` - Show uptime

## 🤖 AI Features
- `.ask [question]` - Ask AI assistant
- `.translate [text]` - Translate text

## 🛠️ Owner Commands
- `.join [link]` - Join group
- `.leave` - Leave current group
- `.restart` - Restart bot

## 📊 Features Overview

✅ **Core Features:**
- Advanced broadcasting with delivery tracking
- Scheduled broadcasting
- Group management tools
- AI assistant integration
- Performance monitoring
- Clean console output

✅ **Security:**
- Owner-only commands
- Admin-only group commands
- Antilink protection
- AFK system

✅ **Performance:**
- Libsignal fixes for stability
- Enhanced logging system
- Memory and CPU monitoring
- Error handling with context

## 🔧 Configuration

Edit `db/config.js` for advanced settings:
- Broadcast delays and limits
- Welcome/goodbye messages
- Response messages
- Feature toggles

## 📝 Message Templates

Templates are stored in `templates/message-templates.json`:
- Welcome messages
- Announcements
- Promotions
- Reminders
- Surveys

## 🆘 Troubleshooting

### Common Issues:
1. **Bot not responding**: Check if bot number is correct in .env
2. **Broadcast failed**: Check group permissions and bot admin status
3. **Commands not working**: Ensure correct prefix (.) and format
4. **Memory issues**: Restart bot or check system resources

### Logs:
- Check `logs/` directory for detailed logs
- Console output shows real-time status
- Error logs include context and solutions

## 📈 Best Practices

1. **Broadcasting:**
   - Test with small groups first
   - Use appropriate delays between messages
   - Monitor delivery reports
   - Use templates for consistent messaging

2. **Group Management:**
   - Make bot admin in all groups
   - Configure antilink per group needs
   - Use welcome messages to explain bot features

3. **Maintenance:**
   - Regular bot restarts for optimal performance
   - Monitor logs for errors
   - Keep dependencies updated
   - Backup important data

## 🎯 Next Steps

1. Configure AI API keys for enhanced AI features
2. Customize message templates
3. Set up automated broadcasts
4. Monitor performance and optimize
5. Scale to multiple accounts if needed

---

**Happy Broadcasting! 📢**

*WA Broadcast Manager - Your Advanced WhatsApp Broadcasting Solution*