import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const isAuthEndpoint = error.config.url.includes('/auth/')
            if (!isAuthEndpoint) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }
        }
        return Promise.reject(error)
    }
)

export const authApi = {
    login: (email, password) => {
        return api.post('/auth/login', { email, password })
    },
    register: (name, email, password) => {
        return api.post('/auth/register', { name, email, password })
    }
}

export const newsApi = {
    getNews: (category = 'general') => {
        return api.get('/news', { params: { category } })
    },
    getPersonalizedNews: () => {
        return api.get('/news/personalized')
    }
}

export default api
