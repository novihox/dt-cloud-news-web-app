const { db } = require('../config/db')
const { VALID_CATEGORIES } = require('./newsController')

const updateInterests = async (req, res) => {
    try {
        const { interests } = req.body

        if (!interests || !Array.isArray(interests)) {
            return res.status(400).json({ message: 'Interests must be an array' })
        }

        const invalidInterests = interests.filter(i => !VALID_CATEGORIES.includes(i))
        if (invalidInterests.length > 0) {
            return res.status(400).json({
                message: `Invalid interests: ${invalidInterests.join(', ')}`,
                validCategories: VALID_CATEGORIES
            })
        }

        const interestsJson = JSON.stringify(interests)
        db.prepare('UPDATE users SET interests = ? WHERE id = ?').run(interestsJson, req.user.id)

        res.json({
            message: 'Interests updated successfully',
            interests: interests
        })
    } catch (error) {
        console.error('Update interests error:', error)
        res.status(500).json({ message: 'Failed to update interests' })
    }
}

const getProfile = async (req, res) => {
    try {
        res.json({
            user: {
                id: req.user.id,
                username: req.user.username,
                email: req.user.email,
                interests: req.user.interests,
                createdAt: req.user.createdAt
            }
        })
    } catch (error) {
        console.error('Get profile error:', error)
        res.status(500).json({ message: 'Failed to get profile' })
    }
}

module.exports = { updateInterests, getProfile }
