import { createSlice } from '@reduxjs/toolkit';


export interface PersonState {
    isLoadingPersons: boolean;
    isLoadingPersonSelected: boolean;
    error: string | null;
    personSelected: Person;
    page: number;
    filter: { firstName: string | undefined, lastName: string | undefined, email: string | undefined };
    count: number;
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
    page: 1,
    filter: { firstName: undefined, lastName: undefined, email: undefined },
    count: 0,
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
        setPage: (state, action) => {
            state.page = action.payload.page;
        },
        setFilter: (state, action) => {
            state.filter = action.payload.filter;
        },
        setCount: (state, action) => {
            state.count = action.payload.count;
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
    setCount,
    setPage,
    setFilter,
    setPersons,
    setPersonSelected,
    setEmptyPersonSelected
} = personSlice.actions;