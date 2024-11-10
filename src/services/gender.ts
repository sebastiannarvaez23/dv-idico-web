import api from "./api";

export const fetchGetGenders = async (page: number): Promise<Gender[]> => {
    const response = await api.get(`/product-gender?page=${page}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener listado de géneros de producto: ${error.message}`);
        })
    return response.data.rows;
}

export const fetchGetGender = async (id: string): Promise<Gender> => {
    const response = await api.get(`/product-gender/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener género: ${error.message}`);
        })
    return response.data;
};

export const fetchCreateGender = async (gender: FormData): Promise<Gender> => {
    gender.delete('id');
    const response = await api.post('/product-gender', gender, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .catch((error: any) => {
            throw new Error(`Error al crear género: ${error.message}`);
        })
    return response.data;
};

export const fetchUpdateGender = async (gender: FormData): Promise<Gender> => {
    const id = gender.get('id');
    gender.delete('id');
    const response = await api.put(`/product-gender/${id}`, gender, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
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