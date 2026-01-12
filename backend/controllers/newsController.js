const axios = require('axios')

const NEWS_API_BASE = 'https://newsapi.org/v2'

const VALID_CATEGORIES = [
    'general',
    'technology',
    'business',
    'sports',
    'health',
    'entertainment',
    'science'
]

const cache = new Map()
const CACHE_DURATION = 10 * 60 * 1000 // 10 dakika

const fetchFromNewsAPI = async (category = 'general', country = 'us') => {
    const cacheKey = `${category}_${country}`
    const cached = cache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log(`Cache hit: ${cacheKey}`)
        return cached.articles
    }

    console.log(`Fetching from API: ${cacheKey}`)
    const response = await axios.get(`${NEWS_API_BASE}/top-headlines`, {
        params: {
            category,
            country,
            apiKey: process.env.NEWS_API_KEY,
            pageSize: 20
        }
    })

    const articles = response.data.articles || []

    cache.set(cacheKey, {
        articles,
        timestamp: Date.now()
    })

    return articles
}

const getNews = async (req, res) => {
    try {
        const { category = 'general', country = 'us' } = req.query

        if (!VALID_CATEGORIES.includes(category)) {
            return res.status(400).json({
                message: `Invalid category. Valid options: ${VALID_CATEGORIES.join(', ')}`
            })
        }

        const articles = await fetchFromNewsAPI(category, country)

        res.json({
            success: true,
            category,
            count: articles.length,
            articles
        })
    } catch (error) {
        console.error('News API error:', error.message)

        if (error.response) {
            const status = error.response.status
            if (status === 401) {
                return res.status(500).json({
                    message: 'News API key is invalid or rate limit exceeded',
                    hint: 'Free plan: 100 requests/day. Try again later or upgrade.'
                })
            }
            if (status === 429) {
                return res.status(500).json({
                    message: 'Rate limit exceeded',
                    hint: 'Please wait a few minutes before trying again.'
                })
            }
        }

        res.status(500).json({ message: 'Failed to fetch news' })
    }
}

const getPersonalizedNews = async (req, res) => {
    try {
        const userInterests = req.user.interests

        if (!userInterests || userInterests.length === 0) {
            const articles = await fetchFromNewsAPI('general', 'us')
            return res.json({
                success: true,
                message: 'No interests set, showing general news',
                interests: [],
                count: articles.length,
                articles
            })
        }

        const allArticles = []

        for (const interest of userInterests) {
            if (VALID_CATEGORIES.includes(interest)) {
                const articles = await fetchFromNewsAPI(interest, 'us')
                allArticles.push(...articles)
            }
        }

        const uniqueArticles = []
        const seenUrls = new Set()

        for (const article of allArticles) {
            if (article.url && !seenUrls.has(article.url)) {
                seenUrls.add(article.url)
                uniqueArticles.push(article)
            }
        }

        res.json({
            success: true,
            interests: userInterests,
            count: uniqueArticles.length,
            articles: uniqueArticles
        })
    } catch (error) {
        console.error('Personalized news error:', error.message)
        res.status(500).json({ message: 'Failed to fetch personalized news' })
    }
}

module.exports = { getNews, getPersonalizedNews, VALID_CATEGORIES }
