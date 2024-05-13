import { useState } from 'react';
import { DataFormRegister } from '../interfaces/data-form-register.interface';
import api from '../services/api';

function useApiAuth() {

    // useState
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const signin = async (mail: string, password: string): Promise<string> => {
        try {
            setIsLoading(true);
            const response = await api.post('/auth/login', { mail, password })
                .finally(() => setIsLoading(false));
            const token = response.data.token;
            return token;
        } catch (error: any) {
            setError(`Error al iniciar sesión: ${error.message}`);
            setIsLoading(false);
            throw new Error(`Error al iniciar sesión: ${error.message}`);
        }
    };

    const signup = async (dataFormRegister: DataFormRegister): Promise<void> => {
        try {
            setIsLoading(true);
            await api.post('/auth/signup', dataFormRegister)
                .finally(() => setIsLoading(false));
        } catch (error: any) {
            setError(`Error al registrar nuevo usuario: ${error.message}`);
            setIsLoading(false);
            throw new Error(`Error al registrar nuevo usuario: ${error.message}`);
        }
    };

    return {
        isLoading,
        error,
        signin,
        signup
    }
}

export default useApiAuth;