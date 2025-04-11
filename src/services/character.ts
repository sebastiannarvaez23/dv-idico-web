import { HandleMessageError } from "./errors/handle-message-error";
import api from "./api";
import character from "./errors/05-character.json";


const characterErrorHandler = await HandleMessageError.create(character);

const customCatch = (error: any) => {
    characterErrorHandler.handle(error);
    throw error;
}

export const fetchGetCharacters = async (queryParams: string): Promise<{ count: number; rows: Character[] }> => {
    const response = await api.get(`/character${queryParams}`)
        .catch(customCatch)
    return response.data;
};

export const fetchGetCharacter = async (id: string): Promise<Character> => {
    const response = await api.get(`/character/${id}`)
        .catch(customCatch)
    return response.data;
};

export const fetchCreateCharacter = async (character: FormData): Promise<Character> => {
    character.delete('id');
    const response = await api.post('/character', character, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .catch(customCatch)
    return response.data;
};

export const fetchUpdateCharacter = async (character: FormData): Promise<Character> => {
    const id = character.get('id');
    character.delete('id');
    const response = await api.put(`/character/${id}`, character, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .catch(customCatch)
    return response.data;
};

export const fetchDeleteCharacter = async (id: string): Promise<Character> => {
    const response = await api.delete(`/character/${id}`)
        .catch(customCatch)
    return response.data;
};

export const fetchGetCharactersAssignedProduct = async (productId: string, queryParams: string): Promise<{ count: number; rows: CharacterAssigment[] }> => {
    const response = await api.get(`/character/assigned-product/${productId}${queryParams}`)
        .catch(customCatch)
    return response.data;
};