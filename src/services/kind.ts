import api from "./api";


export const fetchGetKinds = async (page: number): Promise<{ count: number; rows: Kind[] }> => {
    const response = await api.get(`/product-kind?page=${page}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener listado de tipos de producto: ${error.message}`);
        })
    return response.data;
}

export const fetchGetKind = async (id: string): Promise<Kind> => {
    const response = await api.get(`/product-kind/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener Kinda: ${error.message}`);
        })
    return response.data;
};

export const fetchCreateKind = async (kind: Kind): Promise<Kind> => {
    const { id, ...rest } = kind;
    const response = await api.post('/product-kind', { ...rest })
        .catch((error: any) => {
            throw new Error(`Error al crear Kinda: ${error.message}`);
        })
    return response.data;
};

export const fetchUpdateKind = async (kind: Kind): Promise<Kind> => {
    const { id, ...rest } = kind;
    const response = await api.put(`/product-kind/${id}`, { ...rest })
        .catch((error: any) => {
            throw new Error(`Error al actualizar la Kinda: ${error.message}`);
        })
    return response.data;
};

export const fetchDeleteKind = async (id: string): Promise<Kind> => {
    const response = await api.delete(`/product-kind/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al eliminar la Kinda: ${error.message}`);
        })
    return response.data;
};