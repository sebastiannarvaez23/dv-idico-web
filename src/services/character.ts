import api from './api';

export const getCharacters = async (): Promise<Character[]> => {
    try {
        const response = await api.get('/character');
        const characters = response.data.characters;
        return characters;
    } catch (error: any) {
        throw new Error(`Error obtener listado de personajes: ${error.message}`);
    }
};

export const getCharacter = async (endpoint: string): Promise<Character> => {
    try {
        const response = await api.get(endpoint);
        const character = response.data;
        return character;
    } catch (error: any) {
        throw new Error(`Error al obtener personaje: ${error.message}`);
    }
};