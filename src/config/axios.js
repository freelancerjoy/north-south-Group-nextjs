import axios from 'axios';
import { API_BASE_URL } from './env';

const apiInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 0,
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    withCredentials: true,
});

// Attach Bearer token from persisted Zustand auth store
apiInstance.interceptors.request.use((config) => {
    if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
        if (typeof config.headers?.delete === 'function') {
            config.headers.delete('Content-Type');
        } else if (config.headers) {
            delete config.headers['Content-Type'];
        }
    }

    try {
        const raw = localStorage.getItem('auth-storage');
        if (raw) {
            const parsed = JSON.parse(raw);
            const token = parsed?.state?.token;
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
    } catch (_) {}
    return config;
});

export default apiInstance;
