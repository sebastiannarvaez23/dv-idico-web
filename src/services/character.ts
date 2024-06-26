import api from "./api";

export const fetchGetCharacters = async (): Promise<Character[]> => {
    const response = await api.get('/character')
        .catch((error: any) => {
            throw new Error(`Error al obtener listado de Personajes: ${error.message}`);
        })
    return response.data.characters;
};

export const fetchGetCharacter = async (endpoint: string): Promise<Character> => {
    const response = await api.get(endpoint)
        .catch((error: any) => {
            throw new Error(`Error al obtener Personaje: ${error.message}`);
        })
    return response.data;
};

export const fetchCreateCharacter = async (character: FormData): Promise<Character> => {
    const response = await api.post('/character', character, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .catch((error: any) => {
            throw new Error(`Error al crear Personaje: ${error.message}`);
        })
    return response.data;
};

export const fetchUpdateCharacter = async (character: FormData): Promise<Character> => {
    const response = await api.put(`/character/${character.get('id')}`, character, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .catch((error: any) => {
            throw new Error(`Error al actualizar el Personaje: ${error.message}`);
        })
    return response.data;
};

export const fetchDeleteCharacter = async (id: string): Promise<Character> => {
    const response = await api.delete(`/character/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al eliminar el Personaje: ${error.message}`);
        })
    return response.data;
};