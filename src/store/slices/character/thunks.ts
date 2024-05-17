import api from "../../../services/api";
import { AppDispatch, RootState } from "../../store";
import { setCharacters, startLoadingCharacters, setCharacterSelected, startLoadingCharactersSelected } from "./characterSlice";

const fetchGetCharacters = async (): Promise<Character[]> => {
    const response = await api.get('/character')
        .catch((error: any) => {
            throw new Error(`Error al obtener listado de Personajes: ${error.message}`);
        })
    return response.data.characters;
};

const fetchGetCharacter = async (endpoint: string): Promise<Character> => {
    const response = await api.get(endpoint)
        .catch((error: any) => {
            throw new Error(`Error al obtener Personaje: ${error.message}`);
        })
    return response.data;
};

const fetchUpdateCharacter = async (character: FormData): Promise<Character> => {
    const response = await api.put(`/character/${character.get('id')}`, character, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .catch((error: any) => {
            throw new Error(`Error al actualizar el Personaje: ${error.message}`);
        })
    return response.data;
};

const fetchDeleteCharacter = async (id: string): Promise<Character> => {
    const response = await api.delete(`/character/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al eliminar el Personaje: ${error.message}`);
        })
    return response.data;
};

export const getCharacters = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { characterSelected } = getState().character;
        dispatch(startLoadingCharacters());
        const characters = await fetchGetCharacters();
        dispatch(setCharacters({ characters }));
        if (!characterSelected?.id) dispatch(getCharacter(characters[0].endpoint));
    };
}

export const getCharacter = (endpoint: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startLoadingCharactersSelected());
        const character: Character = await fetchGetCharacter(endpoint);
        dispatch(setCharacterSelected({ character }));
    };
}

export const updateCharacter = (character: FormData) => {
    return async (dispatch: AppDispatch) => {
        const characterUpdated = await fetchUpdateCharacter(character);
        dispatch(setCharacterSelected({ character: characterUpdated }));
        dispatch(getCharacters());
    };
}

export const deleteCharacter = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { characters, characterSelected } = getState().character;
        await fetchDeleteCharacter(characterSelected.id);
        dispatch(getCharacters());
        dispatch(getCharacter(characters[1].endpoint));
    }
}