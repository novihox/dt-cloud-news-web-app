const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { db } = require('../config/db')

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
}

const register = async (req, res) => {
    try {
        const { username, name, email, password, interests } = req.body
        const displayName = username || name

        if (!displayName || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' })
        }

        const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const interestsJson = JSON.stringify(interests || [])

        const result = db.prepare(`
            INSERT INTO users (username, email, password, interests)
            VALUES (?, ?, ?, ?)
        `).run(displayName, email, hashedPassword, interestsJson)

        const userId = result.lastInsertRowid
        const token = generateToken(userId)

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: userId,
                username: displayName,
                email: email,
                interests: interests || []
            }
        })
    } catch (error) {
        console.error('Register error:', error)
        res.status(500).json({ message: 'Server error during registration' })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' })
        }

        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const token = generateToken(user.id)
        const interests = JSON.parse(user.interests || '[]')

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                interests: interests
            }
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ message: 'Server error during login' })
    }
}

module.exports = { register, login }
