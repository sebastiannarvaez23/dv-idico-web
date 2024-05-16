import { createSlice } from '@reduxjs/toolkit';

export interface CharacterState {
    isLoadingCharacters: boolean;
    isLoadingCharacterSelected: boolean;
    error: string | null;
    characterSelected: Character,
    characters: Character[]
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
        seriesMovies: [],
    },
    characters: [],
}

export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        startLoadingCharacters: (state, /* action */) => {
            state.isLoadingCharacters = true;
        },
        startLoadingCharactersSelected: (state, /* action */) => {
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

// Action creators are generated for each case reducer function
export const {
    startLoadingCharacters,
    setCharacters,
    setCharacterSelected,
    startLoadingCharactersSelected
} = characterSlice.actions;