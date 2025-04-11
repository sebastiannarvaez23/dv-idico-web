import { HandleMessageError } from "./errors/handle-message-error";
import api from "./api";
import product from "./errors/06-product.json";


const productErrorHandler = await HandleMessageError.create(product);

const customCatch = (error: any) => {
    productErrorHandler.handle(error);
    throw error;
}

export const fetchGetProducts = async (queryParams: string): Promise<{ count: number; rows: Product[] }> => {
    const response = await api.get(`/product${queryParams}`)
        .catch(customCatch)
    return response.data;
};

export const fetchGetProduct = async (id: string): Promise<Product> => {
    const promise = await api.get(`/product/${id}`)
        .catch(customCatch)
    return promise.data;
};

export const fetchCreateProduct = async (product: FormData) => {
    product.delete('id');
    const response = await api.post('/product', product, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .catch(customCatch)
    return response.data;
};

export const fetchUpdateProduct = async (product: FormData): Promise<Product> => {
    const id = product.get('id');
    product.delete('id');
    const response = await api.put(`/product/${id}`, product, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).catch((error: any) => {
        productErrorHandler.handle(error);
        throw error;
    });
    return response.data;
};

export const fetchDeleteProduct = async (id: string): Promise<Product> => {
    const response = await api.delete(`/product/${id}`)
        .catch(customCatch);
    return response.data;
};

export const fetchAddCharacterAssignment = async (id: string, characters: { characters: string[] }): Promise<Product> => {
    const response = await api.post(`/product/add-character-assignment/${id}`, characters)
        .catch(customCatch);
    return response.data;
};

export const fetchDeleteCharacterAssignment = async (id: string, characters: { characters: string[] }): Promise<Product> => {
    const response = await api.post(`/product/delete-character-assignment/${id}`, characters)
        .catch(customCatch);
    return response.data;
};