import axios, { AxiosResponse, AxiosError } from 'axios';

const BASE_URL = 'http://localhost:8000/api';
const TIMEOUT = 10000;

const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response) {
            console.error('Error de respuesta:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor:', error.request);
        } else {
            console.error('Error de configuración de la solicitud:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
