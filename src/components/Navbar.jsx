import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth()

    const handleLogout = () => {
        logout()
    }

    const getInitials = (name) => {
        if (!name) return 'U'
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="navbar-brand-icon">◆</span>
                    <span className="navbar-brand-text">DT Jazeera</span>
                </Link>

                <div className="navbar-right">
                    {isAuthenticated ? (
                        <>
                            <div className="navbar-user">
                                <span className="navbar-avatar">
                                    {getInitials(user?.name)}
                                </span>
                                <span className="navbar-username">
                                    {user?.name || 'User'}
                                </span>
                            </div>
                            <button className="navbar-logout" onClick={handleLogout}>
                                Sign out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="navbar-link">
                                Sign in
                            </Link>
                            <Link to="/register" className="navbar-btn-primary">
                                Get started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
