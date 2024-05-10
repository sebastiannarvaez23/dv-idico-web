import api from './api';

export const getCharacters = async (): Promise<Character[]> => {
    try {
        const response = await api.get('/character');
        const characters = response.data.characters;
        return characters;
    } catch (error: any) {
        throw new Error(`Error obtener listado de Personajes: ${error.message}`);
    }
};

export const getCharacter = async (endpoint: string): Promise<Character> => {
    try {
        const response = await api.get(endpoint);
        const character = response.data;
        return character;
    } catch (error: any) {
        throw new Error(`Error al obtener Personaje: ${error.message}`);
    }
};

export const updateCharacter = async (character: FormData): Promise<Character> => {
    try {
        const response = await api.put('/character/' + character.get('id'),
            character,
            { headers: { 'Content-Type': 'multipart/form-data' } })
        const characterUpdated = response.data;
        if (response.status === 200) alert('Personaje editado exitosamente!');
        return characterUpdated;
    } catch (error: any) {
        throw new Error(`Error al obtener Personaje: ${error.message}`);
    }
}

export const deleteCharacter = async (id: string): Promise<Character> => {
    try {
        const response = await api.delete('/character/' + id)
        const characterDeleted = response.data;
        if (response.status === 200) alert('Personaje eliminado exitosamente!');
        return characterDeleted;
    } catch (error: any) {
        throw new Error(`Error al eliminar Personaje: ${error.message}`);
    }
}