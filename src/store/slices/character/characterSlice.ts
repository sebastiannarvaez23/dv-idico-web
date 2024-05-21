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
        weight: "",
        history: "",
        image: "",
        endpoint: "",
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
            state.isLoadingCharacters = false;
            state.characters = action.payload.characters;
        },
        setCharacterSelected: (state, action) => {
            state.isLoadingCharacterSelected = false;
            state.characterSelected = action.payload.character;
        }
    },
})

export const {
    startLoadingCharacters,
    setCharacters,
    setCharacterSelected,
    startLoadingCharactersSelected
} = characterSlice.actions;