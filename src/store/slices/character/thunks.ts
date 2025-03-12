import { AppDispatch, RootState } from "../../store";
import { fetchCreateCharacter, fetchDeleteCharacter, fetchGetCharacter, fetchGetCharacters, fetchUpdateCharacter } from "../../../services/character";
import { setAlert } from '../common';
import { setPage, setFilter, setCharacters, startLoadingCharacters, setCharacterSelected, startLoadingCharactersSelected, setEmptyCharacterSelected, setCount } from "./characterSlice";
import { uribuild } from "../../../utils/params/uribuild";


export const getCharacters = (page: number = 1, name?: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { characterSelected } = getState().character;
            dispatch(startLoadingCharacters());
            const characters = await fetchGetCharacters(uribuild({ page, name }));
            await dispatch(setCharacters({ characters: characters.rows }));
            await dispatch(setCount({ count: characters.count }));
            await dispatch(setPage({ page }));
            await dispatch(setFilter({ filter: name }));
            if (!name && characters.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay personajes almacenados' }));
            else if (name && characters.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No existen personajes para los filtros especificados' }));
            else if (characterSelected?.id === '') dispatch(getCharacter(characters.rows[0].id));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error oteniendo la lista de Personajes' }));
        }
    };
};

export const getCharacter = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingCharactersSelected());
            const character: Character = await fetchGetCharacter(id);
            await dispatch(setCharacterSelected({ character }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error oteniendo el personaje.' }));
        }
    };
};

export const createCharacter = (character: FormData, page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            const characterCreated: Character = await fetchCreateCharacter(character);
            await dispatch(getCharacters(page));
            await dispatch(setAlert({ type: 'success', message: `Personaje "${characterCreated.name}" creado exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando el personaje.' }));
        }
    };
};

export const updateCharacter = (character: FormData, page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            const characterUpdated = await fetchUpdateCharacter(character);
            await dispatch(setCharacterSelected({ character: characterUpdated }));
            await dispatch(getCharacters(page));
            await dispatch(setAlert({ type: 'success', message: 'Personaje actualizado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error actualizando el personaje.' }));
        }
    };
};

export const deleteCharacter = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { characterSelected } = getState().character;
            await fetchDeleteCharacter(characterSelected.id);
            await dispatch(setEmptyCharacterSelected());
            await dispatch(getCharacters());
            await dispatch(setAlert({ type: 'success', message: 'Personaje eliminado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando el personaje.' }));
        }
    };
};