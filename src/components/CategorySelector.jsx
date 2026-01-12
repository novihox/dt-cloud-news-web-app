import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './CategorySelector.css'

const CATEGORIES = [
    { id: 'general', label: 'General', icon: '' },
    { id: 'technology', label: 'Technology', icon: '' },
    { id: 'business', label: 'Business', icon: '' },
    { id: 'sports', label: 'Sports', icon: '' },
    { id: 'health', label: 'Health', icon: '' },
    { id: 'entertainment', label: 'Entertainment', icon: '' },
    { id: 'science', label: 'Science', icon: '' }
]

function CategorySelector({ selectedCategories, onCategoryChange, allowMultiple = false }) {
    const { isAuthenticated } = useAuth()
    const [showAuthPrompt, setShowAuthPrompt] = useState(false)

    const handleCategoryClick = (categoryId) => {
        if (!isAuthenticated && allowMultiple) {
            setShowAuthPrompt(true)
            setTimeout(() => setShowAuthPrompt(false), 3000)
            return
        }

        if (allowMultiple) {
            const currentSelected = Array.isArray(selectedCategories) ? selectedCategories : [selectedCategories]
            if (currentSelected.includes(categoryId)) {
                const newSelection = currentSelected.filter(id => id !== categoryId)
                onCategoryChange(newSelection.length > 0 ? newSelection : ['general'])
            } else {
                onCategoryChange([...currentSelected, categoryId])
            }
        } else {
            onCategoryChange(categoryId)
        }
    }

    const isSelected = (categoryId) => {
        if (Array.isArray(selectedCategories)) {
            return selectedCategories.includes(categoryId)
        }
        return selectedCategories === categoryId
    }

    return (
        <div className="category-selector">
            <div className="category-header">
                <h2 className="category-title">Topics</h2>
                {isAuthenticated && (
                    <span className="category-hint">Select your interests</span>
                )}
            </div>

            {showAuthPrompt && (
                <div className="category-auth-prompt">
                    <span>Sign in to personalize your feed</span>
                </div>
            )}

            <div className="category-chips">
                {CATEGORIES.map(category => (
                    <button
                        key={category.id}
                        className={`category-chip ${isSelected(category.id) ? 'active' : ''} ${!isAuthenticated && allowMultiple ? 'guest' : ''}`}
                        onClick={() => handleCategoryClick(category.id)}
                        aria-pressed={isSelected(category.id)}
                    >
                        <span className="category-chip-icon">{category.icon}</span>
                        <span className="category-chip-label">{category.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CategorySelector
