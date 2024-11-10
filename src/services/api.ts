import axios, { AxiosResponse, AxiosError } from 'axios';

interface CustomErrorResponse {
    errors?: { internalCode: string; message: string }[];
}

const BASE_URL = 'http://localhost:3000/api/v1';
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
            const data = error.response.data as CustomErrorResponse;
            const errors = data.errors;

            if (Array.isArray(errors)) {
                const hasSpecificError = errors.some(err => err.internalCode === "000017");
                if (hasSpecificError) {
                    localStorage.removeItem("token");
                    window.location.reload();
                }
            }
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor:', error.request);
        } else {
            console.error('Error de configuración de la solicitud:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
