import api from "./api";

export const fetchGetProducts = async (): Promise<Product[]> => {
    const response = await api.get('/product')
        .catch((error: any) => {
            throw new Error(`Error al actualizar Serie/Película: ${error.message}`);
        })
    return response.data.products;
};

export const fetchGetProduct = async (endpoint: string): Promise<Product> => {
    const promise = await api.get(endpoint)
        .catch((error: any) => {
            throw new Error(`Error al actualizar Serie/Película: ${error.message}`);
        })
    return promise.data;
};

export const fetchUpdateProduct = async (product: FormData): Promise<Product> => {
    const response = await api.put(`/product/${product.get('id')}`, product, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).catch((error: any) => {
        throw new Error(`Error al actualizar Serie/Película: ${error.message}`);
    });
    return response.data;
};

export const fetchDeleteProduct = async (id: string): Promise<Product> => {
    const response = await api.delete(`/product/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al eliminar Serie/Película: ${error.message}`);
        });
    return response.data;
};