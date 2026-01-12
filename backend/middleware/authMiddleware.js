const jwt = require('jsonwebtoken')
const { db } = require('../config/db')

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided, access denied' })
        }

        // Extract the token part (after "Bearer ")
        const token = authHeader.split(' ')[1]

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Find the user from the token's id
        const user = db.prepare('SELECT id, username, email, interests, createdAt FROM users WHERE id = ?').get(decoded.id)

        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }

        // Parse interests from JSON string
        user.interests = JSON.parse(user.interests || '[]')

        // Attach user to request object for use in next middleware/route
        req.user = user
        next()
    } catch (error) {
        console.error('Auth middleware error:', error.message)
        return res.status(401).json({ message: 'Invalid token, access denied' })
    }
}

module.exports = authMiddleware
