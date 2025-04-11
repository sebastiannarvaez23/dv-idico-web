import { HandleMessageError } from "./errors/handle-message-error";
import api from "./api";
import kind from "./errors/07-kind.json";


const kindErrorHandler = await HandleMessageError.create(kind);

const customCatch = (error: any) => {
    kindErrorHandler.handle(error);
    throw error;
}

export const fetchGetKinds = async (queryParams: string): Promise<{ count: number; rows: Kind[] }> => {
    const response = await api.get(`/product-kind${queryParams}`)
        .catch(customCatch)
    return response.data;
}

export const fetchGetKind = async (id: string): Promise<Kind> => {
    const response = await api.get(`/product-kind/${id}`)
        .catch(customCatch)
    return response.data;
};

export const fetchCreateKind = async (kind: Kind): Promise<Kind> => {
    const { id, ...rest } = kind;
    const response = await api.post('/product-kind', { ...rest })
        .catch(customCatch)
    return response.data;
};

export const fetchUpdateKind = async (kind: Kind): Promise<Kind> => {
    const { id, ...rest } = kind;
    const response = await api.put(`/product-kind/${id}`, { ...rest })
        .catch(customCatch)
    return response.data;
};

export const fetchDeleteKind = async (id: string): Promise<Kind> => {
    const response = await api.delete(`/product-kind/${id}`)
        .catch(customCatch)
    return response.data;
};