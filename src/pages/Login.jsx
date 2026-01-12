import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authApi } from '../services/api'
import './Login.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    const validate = () => {
        const newErrors = {}

        if (!email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email'
        }

        if (!password) {
            newErrors.password = 'Password is required'
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setApiError('')

        if (!validate()) return

        setIsLoading(true)

        try {
            const response = await authApi.login(email, password)
            const { user, token } = response.data
            login(user, token)
            navigate('/')
        } catch (error) {
            if (error.response?.data?.message) {
                setApiError(error.response.data.message)
            } else {
                setApiError('Unable to sign in. Please check your credentials and try again.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <Link to="/" className="auth-logo">
                        <span className="auth-logo-icon">◆</span>
                        <span className="auth-logo-text">NewsFlow</span>
                    </Link>
                </div>

                <div className="auth-card">
                    <div className="auth-card-header">
                        <h1 className="auth-title">Welcome back</h1>
                        <p className="auth-subtitle">
                            Sign in to access your personalized news feed
                        </p>
                    </div>

                    {apiError && (
                        <div className="auth-error-banner">
                            <svg className="auth-error-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                            <span>{apiError}</span>
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className={errors.email ? 'error' : ''}
                                autoComplete="email"
                            />
                            {errors.email && (
                                <span className="form-error">{errors.email}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className={errors.password ? 'error' : ''}
                                autoComplete="current-password"
                            />
                            {errors.password && (
                                <span className="form-error">{errors.password}</span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="auth-submit-spinner"></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>New to NewsFlow?</span>
                    </div>

                    <Link to="/register" className="auth-secondary-action">
                        Create an account
                    </Link>
                </div>

                <p className="auth-footer-text">
                    By signing in, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    )
}

export default Login
