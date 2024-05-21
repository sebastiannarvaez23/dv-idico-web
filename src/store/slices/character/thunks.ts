import { AppDispatch, RootState } from "../../store";
import { fetchCreateCharacter, fetchDeleteCharacter, fetchGetCharacter, fetchGetCharacters, fetchUpdateCharacter } from "../../../services/character";
import { setCharacters, startLoadingCharacters, setCharacterSelected, startLoadingCharactersSelected } from "./characterSlice";
import { setAlert } from '../common';

export const getCharacters = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { characterSelected } = getState().character;
            dispatch(startLoadingCharacters());
            const characters = await fetchGetCharacters();
            dispatch(setCharacters({ characters }));
            if (!characterSelected?.id) dispatch(getCharacter(characters[0].endpoint));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error oteniendo la lista de Personajes' }));
        }
    };
}

export const getCharacter = (endpoint: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingCharactersSelected());
            const character: Character = await fetchGetCharacter(endpoint);
            dispatch(setCharacterSelected({ character }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error oteniendo el personaje.' }));
        }
    };
}

export const createCharacter = (character: FormData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const characterCreated: Character = await fetchCreateCharacter(character);
            dispatch(getCharacters());
            dispatch(setAlert({ type: 'success', message: `Personaje ${characterCreated.name} creado exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando el personaje.' }));
        }
    }
}

export const updateCharacter = (character: FormData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const characterUpdated = await fetchUpdateCharacter(character);
            dispatch(setCharacterSelected({ character: characterUpdated }));
            dispatch(getCharacters());
            dispatch(setAlert({ type: 'success', message: 'Personaje actualizado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error actualizando el personaje.' }));
        }
    };
}

export const deleteCharacter = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { characters, characterSelected } = getState().character;
            await fetchDeleteCharacter(characterSelected.id);
            dispatch(getCharacters());
            dispatch(getCharacter(characters[1].endpoint));
            dispatch(setAlert({ type: 'success', message: 'Personaje eliminado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando el personaje.' }));
        }
    }
}