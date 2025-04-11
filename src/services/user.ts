import { HandleMessageError } from "./errors/handle-message-error";
import api from "./api";
import user from "./errors/01-user.json";


const userErrorHandler = await HandleMessageError.create(user);

const customCatch = (error: any) => {
    userErrorHandler.handle(error);
    throw error;
}

export const fetchGetUsers = async (queryParams: string): Promise<{ count: number; rows: User[] }> => {
    const response = await api.get(`/user${queryParams}`)
        .catch(customCatch)
    return response.data;
};

export const fetchGetUser = async (id: string): Promise<User> => {
    const response = await api.get(`/user/${id}`)
        .catch(customCatch)
    return response.data;
};

export const fetchGetUserByNickname = async (nickname: string): Promise<User> => {
    const response = await api.get(`/user/nickname/${nickname}`)
        .catch(customCatch)
    return response.data;
};

export const fetchCreateUser = async (user: User): Promise<User> => {
    const { id, ...rest } = user;
    const response = await api.post('/user', { ...rest })
        .catch(customCatch);
    return response!.data;
};

export const fetchUpdateUser = async (user: User): Promise<User> => {
    const { id, ...rest } = user;
    const response = await api.put(`/user/${id}`, { ...rest })
        .catch(customCatch)
    return response.data;
};