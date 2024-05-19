import api from "./api";

export const fetchGetGenders = async (): Promise<Gender[]> => {
    const response = await api.get('/gender')
        .catch((error: any) => {
            throw new Error(`Error al obtener listado de generos: ${error.message}`);
        })
    return response.data.genders;
}