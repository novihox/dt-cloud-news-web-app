// Load environment variables first
require('dotenv').config()

const app = require('./app')
const { initDB } = require('./config/db')

// Get port from environment or use default
const PORT = process.env.PORT || 5000

// Start server
const startServer = () => {
    try {
        // Initialize SQLite database
        initDB()

        // Start listening for requests
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
            console.log(`Health check: http://localhost:${PORT}/api/health`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()
