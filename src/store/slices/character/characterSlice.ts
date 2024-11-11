import { createSlice } from '@reduxjs/toolkit';


export interface CharacterState {
    isLoadingCharacters: boolean;
    isLoadingCharacterSelected: boolean;
    error: string | null;
    characterSelected: Character;
    count: number;
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
    count: 0,
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
        setCount: (state, action) => {
            state.count = action.payload.count;
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
    setCount,
    setCharacterSelected,
    startLoadingCharactersSelected,
    setEmptyCharacterSelected
} = characterSlice.actions;