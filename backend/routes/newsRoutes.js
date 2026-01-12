const express = require('express')
const { getNews, getPersonalizedNews } = require('../controllers/newsController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', getNews)
router.get('/personalized', authMiddleware, getPersonalizedNews)

module.exports = router
