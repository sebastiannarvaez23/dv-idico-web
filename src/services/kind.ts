import api from "./api";

export const fetchGetKinds = async (): Promise<Kind[]> => {
    const response = await api.get('/product-kind')
        .catch((error: any) => {
            throw new Error(`Error al obtener listado de tipos de producto: ${error.message}`);
        })
    return response.data.rows;
}