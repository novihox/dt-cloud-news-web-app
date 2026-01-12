import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CategorySelector from '../components/CategorySelector'
import NewsCard from '../components/NewsCard'
import { newsApi } from '../services/api'
import './NewsFeed.css'

function NewsFeed() {
    const { isAuthenticated, user } = useAuth()
    const [selectedCategory, setSelectedCategory] = useState('general')
    const [news, setNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true)
            setError('')

            try {
                const categoryToFetch = Array.isArray(selectedCategory) 
                    ? selectedCategory[0] 
                    : selectedCategory
                const response = await newsApi.getNews(categoryToFetch)
                const articles = response.data?.articles || []

                const formattedArticles = articles.map((article, index) => ({
                    id: index,
                    title: article.title,
                    description: article.description,
                    source: article.source?.name || 'Unknown',
                    publishedAt: article.publishedAt,
                    url: article.url,
                    imageUrl: article.urlToImage
                }))

                setNews(formattedArticles)
            } catch (err) {
                console.error('News fetch error:', err)
                const message = err.response?.data?.message || 'Failed to load news'
                const hint = err.response?.data?.hint || ''
                setError(hint ? `${message} - ${hint}` : message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchNews()
    }, [selectedCategory])

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good morning'
        if (hour < 18) return 'Good afternoon'
        return 'Good evening'
    }

    return (
        <div className="news-feed">
            <div className="news-feed-container">
                {/* Hero Section */}
                <header className="news-feed-hero">
                    <div className="hero-content">
                        {isAuthenticated ? (
                            <>
                                <h1 className="hero-title">
                                    {getGreeting()}, {user?.name?.split(' ')[0] || 'there'}
                                </h1>
                                <p className="hero-subtitle">
                                    Your personalized news feed, updated just for you
                                </p>
                            </>
                        ) : (
                            <>
                                <h1 className="hero-title">
                                    Stay informed, stay ahead
                                </h1>
                                <p className="hero-subtitle">
                                    Discover news that matters to you from trusted sources worldwide
                                </p>
                            </>
                        )}
                    </div>

                    {!isAuthenticated && (
                        <div className="hero-cta">
                            <p className="hero-cta-text">
                                Personalize your news experience by selecting your interests
                            </p>
                            <div className="hero-cta-actions">
                                <Link to="/register" className="btn-primary">
                                    Create free account
                                </Link>
                                <Link to="/login" className="btn-secondary">
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    )}
                </header>

                {/* Category Selection */}
                <CategorySelector
                    selectedCategories={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    allowMultiple={isAuthenticated}
                />

                {/* Feed Status */}
                {isAuthenticated && (
                    <div className="feed-status">
                        <span className="feed-status-dot"></span>
                        <span className="feed-status-text">
                            Showing personalized results
                        </span>
                    </div>
                )}

                {/* News Content */}
                {isLoading ? (
                    <div className="news-feed-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading latest stories...</p>
                    </div>
                ) : error ? (
                    <div className="news-feed-error">
                        <div className="error-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                        </div>
                        <p className="error-title">Unable to load news</p>
                        <p className="error-message">{error}</p>
                        <button className="btn-primary" onClick={() => window.location.reload()}>
                            Try again
                        </button>
                    </div>
                ) : news.length === 0 ? (
                    <div className="news-feed-empty">
                        <p className="empty-title">No articles found</p>
                        <p className="empty-message">Try selecting a different category to discover more stories.</p>
                    </div>
                ) : (
                    <div className="news-grid">
                        {news.map(article => (
                            <NewsCard key={article.id} article={article} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default NewsFeed
