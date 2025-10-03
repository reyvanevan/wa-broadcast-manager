const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * Session Manager untuk mengatasi konflik session WhatsApp
 */
class SessionManager {
    constructor(sessionPath = './session') {
        this.sessionPath = sessionPath;
    }

    /**
     * Hapus session files untuk clean restart
     */
    clearSession() {
        try {
            if (fs.existsSync(this.sessionPath)) {
                fs.rmSync(this.sessionPath, { recursive: true, force: true });
                console.log(chalk.yellow('🗑️  Session cleared successfully'));
                return true;
            }
            console.log(chalk.blue('ℹ️  No session found to clear'));
            return true;
        } catch (error) {
            console.error(chalk.red('❌ Error clearing session:'), error.message);
            return false;
        }
    }

    /**
     * Backup session sebelum restart
     */
    backupSession() {
        try {
            if (fs.existsSync(this.sessionPath)) {
                const backupPath = `${this.sessionPath}_backup_${Date.now()}`;
                fs.cpSync(this.sessionPath, backupPath, { recursive: true });
                console.log(chalk.green(`💾 Session backed up to: ${backupPath}`));
                return backupPath;
            }
            return null;
        } catch (error) {
            console.error(chalk.red('❌ Error backing up session:'), error.message);
            return null;
        }
    }

    /**
     * Periksa apakah session corrupted
     */
    isSessionCorrupted() {
        try {
            const credsPath = path.join(this.sessionPath, 'creds.json');
            if (!fs.existsSync(credsPath)) {
                return false; // No session yet
            }

            const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
            
            // Check if essential fields exist
            if (!creds.noiseKey || !creds.signedIdentityKey || !creds.registrationId) {
                console.log(chalk.yellow('⚠️  Session appears corrupted'));
                return true;
            }

            return false;
        } catch (error) {
            console.log(chalk.yellow('⚠️  Session file corrupted or unreadable'));
            return true;
        }
    }

    /**
     * Smart session cleanup berdasarkan error
     */
    handleSessionError(errorType) {
        console.log(chalk.cyan(`🔧 Handling session error: ${errorType}`));
        
        switch (errorType) {
            case 'conflict':
            case 'replaced':
                console.log(chalk.yellow('🔄 Session conflict detected, clearing session...'));
                this.clearSession();
                break;
                
            case 'badSession':
            case 'corrupted':
                console.log(chalk.yellow('🔧 Bad session detected, backing up and clearing...'));
                this.backupSession();
                this.clearSession();
                break;
                
            default:
                console.log(chalk.blue('ℹ️  Standard reconnection, keeping session...'));
        }
    }

    /**
     * Get session info
     */
    getSessionInfo() {
        try {
            if (!fs.existsSync(this.sessionPath)) {
                return { exists: false, size: 0, files: 0 };
            }

            const files = fs.readdirSync(this.sessionPath);
            let totalSize = 0;

            files.forEach(file => {
                const filePath = path.join(this.sessionPath, file);
                if (fs.statSync(filePath).isFile()) {
                    totalSize += fs.statSync(filePath).size;
                }
            });

            return {
                exists: true,
                size: totalSize,
                files: files.length,
                lastModified: fs.statSync(this.sessionPath).mtime
            };
        } catch (error) {
            return { exists: false, error: error.message };
        }
    }
}

module.exports = SessionManager;