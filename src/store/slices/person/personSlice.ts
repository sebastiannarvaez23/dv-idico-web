import { createSlice } from '@reduxjs/toolkit';

export interface PersonState {
    isLoadingPersons: boolean;
    isLoadingPersonSelected: boolean;
    error: string | null;
    personSelected: Person;
    persons: Person[];
}

const initialState: PersonState = {
    isLoadingPersons: false,
    isLoadingPersonSelected: false,
    error: null,
    personSelected: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthDate: "",
    },
    persons: [],
}

export const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        startLoadingPersons: (state) => {
            state.isLoadingPersons = true;
        },
        startLoadingPersonSelected: (state) => {
            state.isLoadingPersonSelected = true;
        },
        setPersons: (state, action) => {
            state.isLoadingPersons = false;
            state.persons = action.payload.persons;
        },
        setPersonSelected: (state, action) => {
            state.isLoadingPersonSelected = false;
            state.personSelected = action.payload.person;
        },
        setEmptyPersonSelected: (state) => {
            state.personSelected = initialState.personSelected;
        }
    },
})

export const {
    startLoadingPersons,
    startLoadingPersonSelected,
    setPersons,
    setPersonSelected,
    setEmptyPersonSelected
} = personSlice.actions;