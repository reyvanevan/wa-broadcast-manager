const fs = require('fs')
const path = require('path')
const cron = require('node-cron')
const logger = require('../logger')

class BroadcastManager {
    constructor() {
        this.broadcastHistory = []
        this.scheduledBroadcasts = []
        this.contacts = []
        this.contactGroups = []
        this.templates = this.loadTemplates()
        this.cronJobs = new Map()
        this.loadBroadcastData()
        this.loadContacts()
        this.initializeScheduler()
    }

    // Load contacts and contact groups
    loadContacts() {
        try {
            const contactsPath = path.join(__dirname, '../db/contacts.json')
            if (fs.existsSync(contactsPath)) {
                const data = JSON.parse(fs.readFileSync(contactsPath, 'utf8'))
                this.contacts = data.contacts || []
                this.contactGroups = data.groups || []
            }
        } catch (err) {
            logger.error('Error loading contacts:', err)
        }
    }

    // Save contacts data
    saveContacts() {
        try {
            const contactsPath = path.join(__dirname, '../db/contacts.json')
            const data = {
                contacts: this.contacts,
                groups: this.contactGroups
            }
            fs.writeFileSync(contactsPath, JSON.stringify(data, null, 2))
            logger.debug('📱 Contacts saved successfully')
        } catch (err) {
            logger.error('Error saving contacts:', err)
        }
    }

    // Add contact
    addContact(number, name = '', tags = []) {
        // Format number to WhatsApp format
        const formattedNumber = this.formatWhatsAppNumber(number)
        
        // Check if contact already exists
        const existingIndex = this.contacts.findIndex(c => c.number === formattedNumber)
        
        if (existingIndex !== -1) {
            // Update existing contact
            this.contacts[existingIndex] = {
                ...this.contacts[existingIndex],
                name: name || this.contacts[existingIndex].name,
                tags: [...new Set([...this.contacts[existingIndex].tags, ...tags])],
                updatedAt: new Date()
            }
            logger.info(`📝 Updated contact: ${formattedNumber}`)
        } else {
            // Add new contact
            const contact = {
                id: this.generateContactId(),
                number: formattedNumber,
                name: name || '',
                tags: tags,
                addedAt: new Date(),
                updatedAt: new Date(),
                active: true
            }
            this.contacts.push(contact)
            logger.info(`➕ Added new contact: ${formattedNumber}`)
        }
        
        this.saveContacts()
        return this.contacts.find(c => c.number === formattedNumber)
    }

    // Remove contact
    removeContact(number) {
        const formattedNumber = this.formatWhatsAppNumber(number)
        const index = this.contacts.findIndex(c => c.number === formattedNumber)
        
        if (index !== -1) {
            const removed = this.contacts.splice(index, 1)[0]
            this.saveContacts()
            logger.info(`➖ Removed contact: ${formattedNumber}`)
            return removed
        }
        return null
    }

    // Get contact by number
    getContact(number) {
        const formattedNumber = this.formatWhatsAppNumber(number)
        return this.contacts.find(c => c.number === formattedNumber)
    }

    // Get contacts by tag
    getContactsByTag(tag) {
        return this.contacts.filter(c => c.active && c.tags.includes(tag))
    }

    // Create contact group
    createContactGroup(name, description = '', contactNumbers = []) {
        const group = {
            id: this.generateGroupId(),
            name: name,
            description: description,
            contacts: contactNumbers.map(num => this.formatWhatsAppNumber(num)),
            createdAt: new Date(),
            updatedAt: new Date(),
            active: true
        }
        
        this.contactGroups.push(group)
        this.saveContacts()
        logger.info(`👥 Created contact group: ${name}`)
        return group
    }

    // Add contact to group
    addContactToGroup(groupId, number) {
        const group = this.contactGroups.find(g => g.id === groupId)
        const formattedNumber = this.formatWhatsAppNumber(number)
        
        if (group && !group.contacts.includes(formattedNumber)) {
            group.contacts.push(formattedNumber)
            group.updatedAt = new Date()
            this.saveContacts()
            logger.info(`👥 Added ${formattedNumber} to group ${group.name}`)
            return true
        }
        return false
    }

    // Schedule recurring broadcast
    scheduleRecurringBroadcast(message, targets, schedule, options = {}) {
        const scheduleId = this.generateScheduleId()
        
        const scheduledBroadcast = {
            id: scheduleId,
            message: message,
            targets: targets,
            schedule: schedule, // { type: 'daily|weekly|monthly', time: 'HH:MM', day: number }
            createdTime: new Date(),
            status: 'active',
            options: options,
            nextRun: this.calculateNextRun(schedule),
            runHistory: []
        }

        this.scheduledBroadcasts.push(scheduledBroadcast)
        this.saveBroadcastData()
        
        // Create cron job
        this.createCronJob(scheduledBroadcast)
        
        logger.info(`⏰ Recurring broadcast ${scheduleId} scheduled: ${schedule.type} at ${schedule.time}`)
        return scheduledBroadcast
    }

    // Create cron job for scheduled broadcast
    createCronJob(scheduledBroadcast) {
        const { schedule, id } = scheduledBroadcast
        let cronExpression = ''

        switch (schedule.type) {
            case 'daily':
                const [hour, minute] = schedule.time.split(':')
                cronExpression = `${minute} ${hour} * * *`
                break
            case 'weekly':
                const [wHour, wMinute] = schedule.time.split(':')
                const dayOfWeek = schedule.day || 1 // Default Monday
                cronExpression = `${wMinute} ${wHour} * * ${dayOfWeek}`
                break
            case 'monthly':
                const [mHour, mMinute] = schedule.time.split(':')
                const dayOfMonth = schedule.day || 1 // Default 1st day
                cronExpression = `${mMinute} ${mHour} ${dayOfMonth} * *`
                break
            default:
                logger.error(`Unknown schedule type: ${schedule.type}`)
                return
        }

        try {
            const job = cron.schedule(cronExpression, () => {
                this.executeScheduledBroadcast(id)
            }, {
                scheduled: true,
                timezone: "Asia/Jakarta"
            })

            this.cronJobs.set(id, job)
            logger.info(`🕒 Cron job created for broadcast ${id}: ${cronExpression}`)
        } catch (err) {
            logger.error(`Error creating cron job for ${id}:`, err)
        }
    }

    // Execute scheduled broadcast
    async executeScheduledBroadcast(scheduleId) {
        const scheduledBroadcast = this.scheduledBroadcasts.find(s => s.id === scheduleId)
        
        if (!scheduledBroadcast || scheduledBroadcast.status !== 'active') {
            return
        }

        try {
            logger.info(`⏰ Executing scheduled broadcast ${scheduleId}`)
            
            // Get target numbers
            const targetNumbers = await this.resolveTargets(scheduledBroadcast.targets)
            
            // Execute broadcast
            const result = await this.sendBroadcast(
                global.client, // Assuming global client is available
                scheduledBroadcast.message,
                targetNumbers,
                scheduledBroadcast.options
            )

            // Update run history
            scheduledBroadcast.runHistory.push({
                executedAt: new Date(),
                result: {
                    success: result.results.success.length,
                    failed: result.results.failed.length,
                    total: result.results.total
                }
            })

            scheduledBroadcast.lastRun = new Date()
            scheduledBroadcast.nextRun = this.calculateNextRun(scheduledBroadcast.schedule)
            
            this.saveBroadcastData()
            
            logger.info(`✅ Scheduled broadcast ${scheduleId} executed successfully`)
            
        } catch (err) {
            logger.error(`❌ Error executing scheduled broadcast ${scheduleId}:`, err)
            
            scheduledBroadcast.runHistory.push({
                executedAt: new Date(),
                error: err.message
            })
            
            this.saveBroadcastData()
        }
    }

    // Resolve targets (groups, tags, individual numbers)
    async resolveTargets(targets) {
        const resolvedNumbers = new Set()

        for (const target of targets) {
            if (typeof target === 'string') {
                if (target.startsWith('group:')) {
                    // Contact group
                    const groupName = target.replace('group:', '')
                    const group = this.contactGroups.find(g => g.name === groupName && g.active)
                    if (group) {
                        group.contacts.forEach(num => resolvedNumbers.add(num))
                    }
                } else if (target.startsWith('tag:')) {
                    // Tag-based selection
                    const tag = target.replace('tag:', '')
                    const taggedContacts = this.getContactsByTag(tag)
                    taggedContacts.forEach(contact => resolvedNumbers.add(contact.number))
                } else if (target === 'all') {
                    // All active contacts
                    this.contacts.filter(c => c.active).forEach(contact => resolvedNumbers.add(contact.number))
                } else {
                    // Individual number
                    resolvedNumbers.add(this.formatWhatsAppNumber(target))
                }
            }
        }

        return Array.from(resolvedNumbers)
    }

    // Initialize scheduler
    initializeScheduler() {
        // Recreate cron jobs for existing scheduled broadcasts
        this.scheduledBroadcasts.filter(s => s.status === 'active').forEach(broadcast => {
            this.createCronJob(broadcast)
        })
        
        logger.info('📅 Scheduler initialized')
    }

    // Load message templates
    loadTemplates() {
        try {
            const templatesPath = path.join(__dirname, '../templates/message-templates.json')
            if (fs.existsSync(templatesPath)) {
                return JSON.parse(fs.readFileSync(templatesPath, 'utf8'))
            }
        } catch (err) {
            logger.error('Error loading templates:', err)
        }
        return {}
    }

    // Load broadcast history and scheduled broadcasts
    loadBroadcastData() {
        try {
            const broadcastPath = path.join(__dirname, '../db/broadcast.json')
            if (fs.existsSync(broadcastPath)) {
                const data = JSON.parse(fs.readFileSync(broadcastPath, 'utf8'))
                this.broadcastHistory = data.history || []
                this.scheduledBroadcasts = data.scheduled || []
            }
        } catch (err) {
            logger.error('Error loading broadcast data:', err)
        }
    }

    // Save broadcast data
    saveBroadcastData() {
        try {
            const broadcastPath = path.join(__dirname, '../db/broadcast.json')
            const data = {
                history: this.broadcastHistory,
                scheduled: this.scheduledBroadcasts
            }
            fs.writeFileSync(broadcastPath, JSON.stringify(data, null, 2))
        } catch (err) {
            logger.error('Error saving broadcast data:', err)
        }
    }

    // Generate broadcast ID
    generateBroadcastId() {
        return 'BC' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()
    }

    // Send broadcast to multiple targets
    async sendBroadcast(client, message, targets, options = {}) {
        const broadcastId = this.generateBroadcastId()
        
        try {
            logger.info(`📢 Starting broadcast ${broadcastId} to ${targets.length} targets`)
            
            const broadcast = {
                id: broadcastId,
                message: message,
                targets: targets,
                startTime: new Date(),
                status: 'sending',
                results: {
                    success: [],
                    failed: [],
                    total: targets.length
                },
                options: options
            }

            // Add to history
            this.broadcastHistory.push(broadcast)
            
            // Send messages
            for (let i = 0; i < targets.length; i++) {
                try {
                    const target = targets[i]
                    logger.debug(`📤 Sending broadcast to ${target} (${i + 1}/${targets.length})`)
                    
                    // Add AI icon to broadcast message based on config
                    const isGroup = target.endsWith('@g.us');
                    const useAI = isGroup ? global.aiInGroups : global.aiInPrivate;
                    
                    // Log AI configuration for debugging
                    logger.debug(`🤖 AI config for ${target}: isGroup=${isGroup}, aiInGroups=${global.aiInGroups}, aiInPrivate=${global.aiInPrivate}, useAI=${useAI}`)
                    
                    // Prepare message with AI icon if enabled
                    const messageWithAI = {
                        ...message,
                        ...(useAI && { ai: true })
                    };
                    
                    await client.sendMessage(target, messageWithAI, options)
                    broadcast.results.success.push({
                        target: target,
                        timestamp: new Date()
                    })
                    
                    // Add delay to prevent flooding
                    if (i < targets.length - 1) {
                        await this.delay(options.delay || 1000)
                    }
                } catch (err) {
                    logger.error(`❌ Failed to send broadcast to ${targets[i]}:`, err)
                    broadcast.results.failed.push({
                        target: targets[i],
                        error: err.message,
                        timestamp: new Date()
                    })
                }
            }
            
            broadcast.status = 'completed'
            broadcast.endTime = new Date()
            broadcast.duration = broadcast.endTime - broadcast.startTime
            
            this.saveBroadcastData()
            
            logger.info(`📊 Broadcast ${broadcastId} completed - Success: ${broadcast.results.success.length}, Failed: ${broadcast.results.failed.length}`)
            return broadcast
            
        } catch (err) {
            logger.error(`❌ Error in broadcast ${broadcastId}:`, err)
            throw err
        }
    }

    // Send broadcast to all groups
    async broadcastToGroups(client, message, options = {}) {
        try {
            const groups = await this.getAllGroups(client)
            return await this.sendBroadcast(client, message, groups, options)
        } catch (err) {
            logger.error('Error broadcasting to groups:', err)
            throw err
        }
    }

    // Send broadcast to contacts
    async broadcastToContacts(client, message, contacts, options = {}) {
        try {
            return await this.sendBroadcast(client, message, contacts, options)
        } catch (err) {
            logger.error('Error broadcasting to contacts:', err)
            throw err
        }
    }

    // Schedule broadcast
    scheduleBroadcast(message, targets, scheduleTime, options = {}) {
        const broadcastId = this.generateBroadcastId()
        
        const scheduledBroadcast = {
            id: broadcastId,
            message: message,
            targets: targets,
            scheduleTime: new Date(scheduleTime),
            createdTime: new Date(),
            status: 'scheduled',
            options: options
        }

        this.scheduledBroadcasts.push(scheduledBroadcast)
        this.saveBroadcastData()
        
        logger.info(`⏰ Broadcast ${broadcastId} scheduled for ${scheduleTime}`)
        return scheduledBroadcast
    }

    // Process scheduled broadcasts
    async processScheduledBroadcasts(client) {
        const now = new Date()
        
        for (const broadcast of this.scheduledBroadcasts) {
            if (broadcast.status === 'scheduled' && broadcast.scheduleTime <= now) {
                try {
                    logger.info(`⏰ Executing scheduled broadcast ${broadcast.id}`)
                    broadcast.status = 'executing'
                    
                    const result = await this.sendBroadcast(
                        client, 
                        broadcast.message, 
                        broadcast.targets, 
                        broadcast.options
                    )
                    
                    broadcast.status = 'completed'
                    broadcast.executedTime = now
                    broadcast.result = result
                    
                } catch (err) {
                    logger.error(`❌ Error executing scheduled broadcast ${broadcast.id}:`, err)
                    broadcast.status = 'failed'
                    broadcast.error = err.message
                }
                
                this.saveBroadcastData()
            }
        }
    }

    // Get broadcast status
    getBroadcastStatus(broadcastId) {
        const broadcast = this.broadcastHistory.find(b => b.id === broadcastId) || 
                         this.scheduledBroadcasts.find(b => b.id === broadcastId)
        return broadcast
    }

    // Get all groups
    async getAllGroups(client) {
        try {
            const groups = []
            const chats = await client.groupFetchAllParticipating()
            
            for (const groupId in chats) {
                if (chats[groupId].id.endsWith('@g.us')) {
                    groups.push(groupId)
                }
            }
            
            return groups
        } catch (err) {
            logger.error('Error getting groups:', err)
            return []
        }
    }

    // Use template for broadcast
    useTemplate(templateName, variables = {}) {
        const template = this.templates[templateName]
        if (!template) {
            throw new Error(`Template ${templateName} not found`)
        }

        let message = template.template
        
        // Replace variables
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`{{${key}}}`, 'g')
            message = message.replace(regex, value)
        }

        return {
            text: message,
            templateUsed: templateName,
            variables: variables
        }
    }

    // Get delivery report
    getDeliveryReport(broadcastId) {
        const broadcast = this.getBroadcastStatus(broadcastId)
        if (!broadcast || !broadcast.results) {
            return null
        }

        return {
            broadcastId: broadcastId,
            totalTargets: broadcast.results.total,
            successful: broadcast.results.success.length,
            failed: broadcast.results.failed.length,
            successRate: ((broadcast.results.success.length / broadcast.results.total) * 100).toFixed(2) + '%',
            duration: broadcast.duration ? `${broadcast.duration}ms` : 'N/A',
            status: broadcast.status,
            failedTargets: broadcast.results.failed.map(f => ({
                target: f.target,
                error: f.error
            }))
        }
    }

    // Cancel scheduled broadcast
    cancelScheduledBroadcast(broadcastId) {
        const index = this.scheduledBroadcasts.findIndex(b => b.id === broadcastId)
        if (index !== -1) {
            this.scheduledBroadcasts[index].status = 'cancelled'
            this.saveBroadcastData()
            logger.info(`❌ Cancelled scheduled broadcast ${broadcastId}`)
            return true
        }
        return false
    }

    // Get broadcast statistics
    getBroadcastStats() {
        const totalBroadcasts = this.broadcastHistory.length
        const completedBroadcasts = this.broadcastHistory.filter(b => b.status === 'completed').length
        const totalMessages = this.broadcastHistory.reduce((sum, b) => sum + (b.results?.total || 0), 0)
        const successfulMessages = this.broadcastHistory.reduce((sum, b) => sum + (b.results?.success?.length || 0), 0)
        
        return {
            totalBroadcasts,
            completedBroadcasts,
            totalMessages,
            successfulMessages,
            successRate: totalMessages > 0 ? ((successfulMessages / totalMessages) * 100).toFixed(2) + '%' : '0%',
            scheduledBroadcasts: this.scheduledBroadcasts.filter(b => b.status === 'scheduled').length
        }
    }

    // Helper functions
    formatWhatsAppNumber(number) {
        // Remove any non-numeric characters except +
        let cleaned = number.toString().replace(/[^\d+]/g, '')
        
        // Remove leading + if present
        if (cleaned.startsWith('+')) {
            cleaned = cleaned.slice(1)
        }
        
        // Add 62 prefix for Indonesian numbers if needed
        if (cleaned.startsWith('0')) {
            cleaned = '62' + cleaned.slice(1)
        } else if (!cleaned.startsWith('62')) {
            cleaned = '62' + cleaned
        }
        
        // Add @s.whatsapp.net suffix
        return cleaned + '@s.whatsapp.net'
    }

    generateContactId() {
        return 'CNT' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()
    }

    generateGroupId() {
        return 'GRP' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()
    }

    generateScheduleId() {
        return 'SCH' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()
    }

    calculateNextRun(schedule) {
        const now = new Date()
        const [hour, minute] = schedule.time.split(':').map(Number)
        
        let nextRun = new Date()
        nextRun.setHours(hour, minute, 0, 0)
        
        switch (schedule.type) {
            case 'daily':
                if (nextRun <= now) {
                    nextRun.setDate(nextRun.getDate() + 1)
                }
                break
            case 'weekly':
                const dayOfWeek = schedule.day || 1
                nextRun.setDate(nextRun.getDate() + (dayOfWeek - nextRun.getDay() + 7) % 7)
                if (nextRun <= now) {
                    nextRun.setDate(nextRun.getDate() + 7)
                }
                break
            case 'monthly':
                const dayOfMonth = schedule.day || 1
                nextRun.setDate(dayOfMonth)
                if (nextRun <= now) {
                    nextRun.setMonth(nextRun.getMonth() + 1)
                }
                break
        }
        
        return nextRun
    }

    // Stop scheduled broadcast
    stopScheduledBroadcast(scheduleId) {
        const broadcast = this.scheduledBroadcasts.find(s => s.id === scheduleId)
        
        if (broadcast) {
            broadcast.status = 'stopped'
            broadcast.stoppedAt = new Date()
            
            // Stop cron job
            const job = this.cronJobs.get(scheduleId)
            if (job) {
                job.stop()
                this.cronJobs.delete(scheduleId)
            }
            
            this.saveBroadcastData()
            logger.info(`⏹️ Stopped scheduled broadcast ${scheduleId}`)
            return true
        }
        
        return false
    }

    // Get contact statistics
    getContactStats() {
        const totalContacts = this.contacts.length
        const activeContacts = this.contacts.filter(c => c.active).length
        const totalGroups = this.contactGroups.length
        const activeGroups = this.contactGroups.filter(g => g.active).length
        
        const tagStats = {}
        this.contacts.forEach(contact => {
            contact.tags.forEach(tag => {
                tagStats[tag] = (tagStats[tag] || 0) + 1
            })
        })
        
        return {
            totalContacts,
            activeContacts,
            totalGroups,
            activeGroups,
            tagStats,
            scheduledBroadcasts: this.scheduledBroadcasts.filter(s => s.status === 'active').length
        }
    }

    // Export contacts
    exportContacts() {
        return {
            contacts: this.contacts,
            groups: this.contactGroups,
            exportedAt: new Date()
        }
    }

    // Import contacts
    importContacts(data) {
        try {
            if (data.contacts && Array.isArray(data.contacts)) {
                this.contacts = [...this.contacts, ...data.contacts]
            }
            
            if (data.groups && Array.isArray(data.groups)) {
                this.contactGroups = [...this.contactGroups, ...data.groups]
            }
            
            this.saveContacts()
            logger.info('📥 Contacts imported successfully')
            return true
        } catch (err) {
            logger.error('Error importing contacts:', err)
            return false
        }
    }

    // Helper function for delay
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    // Clean old broadcast history (older than 30 days)
    cleanOldHistory() {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        
        this.broadcastHistory = this.broadcastHistory.filter(broadcast => {
            return new Date(broadcast.startTime) > thirtyDaysAgo
        })
        
        // Clean old run history from scheduled broadcasts
        this.scheduledBroadcasts.forEach(broadcast => {
            if (broadcast.runHistory) {
                broadcast.runHistory = broadcast.runHistory.filter(run => {
                    return new Date(run.executedAt) > thirtyDaysAgo
                })
            }
        })
        
        this.saveBroadcastData()
        logger.info('🧹 Cleaned old broadcast history')
    }
}

module.exports = BroadcastManager