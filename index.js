// File Watcher and Logger

const fs = require('fs');
const path = require('path');






// Directory to watch
const watchDir = path.join(__dirname, 'watched_files');

// Log file path
const logFile = path.join(__dirname, 'file_changes_log.txt');

// Ensure directory exists
if (!fs.existsSync(watchDir)) {
    fs.mkdirSync(watchDir);
}

// Function to log file changes
function logFileChange(eventType, filename) {
    if (!filename) return;
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${eventType}: ${filename}\n`;
    fs.appendFile(logFile, logEntry, (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
    console.log(`File Change Detected - ${eventType}: ${filename}`);
}

// Start watching the directory
const watcher = fs.watch(watchDir, (eventType, filename) => {
    logFileChange(eventType, filename);
});

// Initial log message
logFileChange('SYSTEM', 'File Watcher started.');
console.log('File Watcher started. Monitoring directory:', watchDir);

// Stop after 1 minute
setTimeout(() => {
    watcher.close();
    logFileChange('SYSTEM', 'File Watcher stopped.');
    console.log('File Watcher stopped.');
    process.exit(0);
}, 60000);
