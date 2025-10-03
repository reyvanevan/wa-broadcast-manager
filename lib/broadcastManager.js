const fs = require('fs')
const path = require('path')
const logger = require('../logger')

class BroadcastManager {
    constructor() {
        this.broadcastHistory = []
        this.scheduledBroadcasts = []
        this.templates = this.loadTemplates()
        this.loadBroadcastData()
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
                    
                    await client.sendMessage(target, message, options)
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
        
        this.scheduledBroadcasts = this.scheduledBroadcasts.filter(broadcast => {
            return broadcast.status === 'scheduled' || new Date(broadcast.createdTime) > thirtyDaysAgo
        })
        
        this.saveBroadcastData()
        logger.info('🧹 Cleaned old broadcast history')
    }
}

module.exports = BroadcastManager