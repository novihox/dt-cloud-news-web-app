import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import NewsFeed from './pages/NewsFeed'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
    return (
        <div className="app">
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<NewsFeed />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
