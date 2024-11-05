import api from "./api";

export const fetchGetProducts = async (): Promise<Product[]> => {
    const response = await api.get('/product')
        .catch((error: any) => {
            throw new Error(`Error al actualizar Serie/Película: ${error.message}`);
        })
    return response.data.rows;
};

export const fetchGetProduct = async (id: string): Promise<Product> => {
    const promise = await api.get('/product/' + id)
        .catch((error: any) => {
            throw new Error(`Error al actualizar Serie/Película: ${error.message}`);
        })
    return promise.data;
};

export const fetchCreateProduct = async (product: FormData) => {
    const response = await api.post('/product', product, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .catch((error: any) => {
            throw new Error(`Error al crear Producto: ${error.message}`);
        })
    return response.data;
};

export const fetchUpdateProduct = async (product: FormData): Promise<Product> => {
    const id = product.get('id');
    product.delete('id');
    const response = await api.put(`/product/${id}`, product, {
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