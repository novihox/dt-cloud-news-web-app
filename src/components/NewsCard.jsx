import './NewsCard.css'

function formatDate(dateString) {
    if (!dateString) return ''
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffTime / (1000 * 60))

    if (diffMinutes < 60) {
        return `${diffMinutes}m ago`
    } else if (diffHours < 24) {
        return `${diffHours}h ago`
    } else if (diffDays < 7) {
        return `${diffDays}d ago`
    } else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })
    }
}

function truncateText(text, maxLength) {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '...'
}

function NewsCard({ article }) {
    const { title, description, source, publishedAt, url, imageUrl } = article

    return (
        <article className="news-card">
            {imageUrl && (
                <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="news-card-image-link"
                >
                    <div className="news-card-image">
                        <img 
                            src={imageUrl} 
                            alt="" 
                            loading="lazy"
                            onError={(e) => {
                                e.target.parentElement.style.display = 'none'
                            }}
                        />
                    </div>
                </a>
            )}

            <div className="news-card-content">
                <div className="news-card-meta">
                    <span className="news-card-source">{source}</span>
                    <span className="news-card-separator">·</span>
                    <span className="news-card-date">{formatDate(publishedAt)}</span>
                </div>

                <h3 className="news-card-title">
                    <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        {truncateText(title, 100)}
                    </a>
                </h3>

                {description && (
                    <p className="news-card-description">
                        {truncateText(description, 120)}
                    </p>
                )}

                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-card-link"
                >
                    Read article
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                </a>
            </div>
        </article>
    )
}

export default NewsCard
