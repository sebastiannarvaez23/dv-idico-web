import { ErrorNamespace } from "./errors/error-namespace.enum";
import { HandleMessageError } from "./errors/handle-message-error";
import api from "./api";

const userErrorHandler = await HandleMessageError.create(ErrorNamespace.USER);

export const fetchGetUsers = async (queryParams: string): Promise<{ count: number; rows: User[] }> => {
    const response = await api.get(`/user${queryParams}`)
        .catch((error: any) => {
            userErrorHandler.handle(error);
            throw error;
        })
    return response.data;
};

export const fetchGetUser = async (id: string): Promise<User> => {
    const response = await api.get(`/user/${id}`)
        .catch((error: any) => {
            userErrorHandler.handle(error);
            throw error;
        })
    return response.data;
};

export const fetchGetUserByNickname = async (nickname: string): Promise<User> => {
    const response = await api.get(`/user/nickname/${nickname}`)
        .catch((error: any) => {
            userErrorHandler.handle(error);
            throw error;
        })
    return response.data;
};

export const fetchCreateUser = async (user: User): Promise<User> => {
    const { id, ...rest } = user;
    const response = await api.post('/user', { ...rest })
        .catch((error: any) => {
            userErrorHandler.handle(error);
        });
    return response!.data;
};

export const fetchUpdateUser = async (user: User): Promise<User> => {
    const { id, ...rest } = user;
    const response = await api.put(`/user/${id}`, { ...rest })
        .catch((error: any) => {
            userErrorHandler.handle(error);
            throw error;
        })
    return response.data;
};