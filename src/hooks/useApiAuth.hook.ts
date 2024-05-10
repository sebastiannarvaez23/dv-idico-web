import { useState } from 'react';
import { DataFormRegister } from '../interfaces/data-form-register.interface';
import api from '../services/api';

function useApiAuth() {

    // useState
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const signin = async (mail: string, password: string): Promise<string> => {
        try {
            setLoading(true);
            const response = await api.post('/auth/login', { mail, password });
            const token = response.data.token;
            setLoading(false);
            return token;
        } catch (error: any) {
            setError(`Error al iniciar sesión: ${error.message}`);
            setLoading(false);
            throw new Error(`Error al iniciar sesión: ${error.message}`);
        }
    };

    const signup = async (dataFormRegister: DataFormRegister): Promise<void> => {
        try {
            setLoading(true);
            await api.post('/auth/signup', dataFormRegister);
            setLoading(false);
        } catch (error: any) {
            setError(`Error al registrar nuevo usuario: ${error.message}`);
            setLoading(false);
            throw new Error(`Error al registrar nuevo usuario: ${error.message}`);
        }
    };

    return {
        loading,
        error,
        signin,
        signup
    }
}

export default useApiAuth;