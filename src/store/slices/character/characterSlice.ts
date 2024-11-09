import { createSlice } from '@reduxjs/toolkit';

export interface CharacterState {
    isLoadingCharacters: boolean;
    isLoadingCharacterSelected: boolean;
    error: string | null;
    characterSelected: Character;
    characters: Character[];
}

const initialState: CharacterState = {
    isLoadingCharacters: false,
    isLoadingCharacterSelected: false,
    error: null,
    characterSelected: {
        id: "",
        name: "",
        age: "",
        history: "",
        image: "",
        products: [],
    },
    characters: [],
}

export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        startLoadingCharacters: (state) => {
            state.isLoadingCharacters = true;
        },
        startLoadingCharactersSelected: (state) => {
            state.isLoadingCharacterSelected = true;
        },
        setCharacters: (state, action) => {
            state.characters = action.payload.characters;
            state.isLoadingCharacters = false;
        },
        setCharacterSelected: (state, action) => {
            state.characterSelected = action.payload.character;
            state.isLoadingCharacterSelected = false;
        },
        setEmptyCharacterSelected: (state) => {
            state.characterSelected = initialState.characterSelected;
        }
    },
})

export const {
    startLoadingCharacters,
    setCharacters,
    setCharacterSelected,
    startLoadingCharactersSelected,
    setEmptyCharacterSelected
} = characterSlice.actions;