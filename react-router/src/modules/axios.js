import axios from 'axios';

// setting up axios for hitting API from backend
const baseURL = 'http://localhost:8000';
const instance = axios.create({baseURL});

// Add Bearer Token to req.headers.authorization
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('login-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default instance;
