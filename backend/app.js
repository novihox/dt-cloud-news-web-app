const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const newsRoutes = require('./routes/newsRoutes')
const userRoutes = require('./routes/userRoutes')
const errorMiddleware = require('./middleware/errorMiddleware')

const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
    next()
})

app.use('/api/auth', authRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/user', userRoutes)

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' })
})

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' })
})

app.use(errorMiddleware)

module.exports = app
