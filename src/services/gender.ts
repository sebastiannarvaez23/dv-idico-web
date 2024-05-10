import api from "./api"

export const getGenders = async (): Promise<Gender[]> => {
    try {
        const response = await api.get('/gender');
        const genders = response.data.genders;
        return genders;
    } catch (error: any) {
        throw new Error(`Error al obtener listado de generos: ${error.message}`)
    }
}