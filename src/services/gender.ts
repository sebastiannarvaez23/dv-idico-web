import api from "./api";


export const fetchGetGenders = async (page: number): Promise<{ count: number; rows: Gender[] }> => {
    const response = await api.get(`/product-gender?page=${page}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener listado de géneros de producto: ${error.message}`);
        })
    return response.data;
}

export const fetchGetGender = async (id: string): Promise<Gender> => {
    const response = await api.get(`/product-gender/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener género: ${error.message}`);
        })
    return response.data;
};

export const fetchCreateGender = async (gender: Gender): Promise<Gender> => {
    const { id, ...rest } = gender;
    const response = await api.post('/product-gender', { ...rest })
        .catch((error: any) => {
            throw new Error(`Error al crear género: ${error.message}`);
        })
    return response.data;
};

export const fetchUpdateGender = async (gender: Gender): Promise<Gender> => {
    const { id, ...rest } = gender;
    const response = await api.put(`/product-gender/${id}`, { ...rest })
        .catch((error: any) => {
            throw new Error(`Error al actualizar el género: ${error.message}`);
        })
    return response.data;
};

export const fetchDeleteGender = async (id: string): Promise<Gender> => {
    const response = await api.delete(`/product-gender/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al eliminar el género: ${error.message}`);
        })
    return response.data;
};