const Database = require('better-sqlite3')
const path = require('path')

const dbPath = path.join(__dirname, '..', 'database.sqlite')
const db = new Database(dbPath)

const initDB = () => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            interests TEXT DEFAULT '[]',
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `)
    console.log('SQLite database initialized')
}

module.exports = { db, initDB }
