const express = require('express')
const { updateInterests, getProfile } = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware)
router.get('/profile', getProfile)
router.put('/interests', updateInterests)

module.exports = router
