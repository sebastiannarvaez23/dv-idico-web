import { DataFormRegister } from "../interfaces/data-form-register.interface";
import api from "./api";

export const fetchSignin = async (nickname: string, password: string): Promise<string> => {
    const response = await api.post('/auth/token', { nickname, password })
        .catch((error: any) => {
            throw new Error(`Error al iniciar sesión: ${error.message}`);
        })
    const token = response.data.token;
    return token;
};

export const fetchSignup = async (dataFormRegister: DataFormRegister): Promise<void> => {
    await api.post('/auth/signup', dataFormRegister)
        .catch((error: any) => {
            throw new Error(`Error al registrar nuevo usuario: ${error.message}`)
        });
};