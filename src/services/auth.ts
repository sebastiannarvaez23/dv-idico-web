import { DataFormRegister } from '../interfaces/data-form-register';
import api from './api';

export const signin = async (mail: string, password: string): Promise<string> => {
    try {
        const response = await api.post('/auth/login', { mail, password });
        const token = response.data.token;
        return token;
    } catch (error: any) {
        throw new Error(`Error al iniciar sesión: ${error.message}`);
    }
};

export const signup = async (dataFormRegister: DataFormRegister): Promise<void> => {
    try {
        await api.post('/auth/signup', dataFormRegister);
    } catch (error: any) {
        throw new Error(`Error al registrar nuevo usuario: ${error.message}`);
    }
};

