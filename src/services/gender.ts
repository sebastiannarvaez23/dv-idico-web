import { HandleMessageError } from "./errors/handle-message-error";
import api from "./api";
import gender from "./errors/08-gender.json";


const genderErrorHandler = await HandleMessageError.create(gender);

const customCatch = (error: any) => {
    genderErrorHandler.handle(error);
    throw error;
}

export const fetchGetGenders = async (queryParams: string): Promise<{ count: number; rows: Gender[] }> => {
    const response = await api.get(`/product-gender${queryParams}`)
        .catch(customCatch)
    return response.data;
}

export const fetchGetGender = async (id: string): Promise<Gender> => {
    const response = await api.get(`/product-gender/${id}`)
        .catch(customCatch)
    return response.data;
};

export const fetchCreateGender = async (gender: Gender): Promise<Gender> => {
    const { id, ...rest } = gender;
    const response = await api.post('/product-gender', { ...rest })
        .catch(customCatch)
    return response.data;
};

export const fetchUpdateGender = async (gender: Gender): Promise<Gender> => {
    const { id, ...rest } = gender;
    const response = await api.put(`/product-gender/${id}`, { ...rest })
        .catch(customCatch)
    return response.data;
};

export const fetchDeleteGender = async (id: string): Promise<Gender> => {
    const response = await api.delete(`/product-gender/${id}`)
        .catch(customCatch)
    return response.data;
};