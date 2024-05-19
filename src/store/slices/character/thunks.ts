import { AppDispatch, RootState } from "../../store";
import { fetchDeleteCharacter, fetchGetCharacter, fetchGetCharacters, fetchUpdateCharacter } from "../../../services/character";
import { setCharacters, startLoadingCharacters, setCharacterSelected, startLoadingCharactersSelected } from "./characterSlice";

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