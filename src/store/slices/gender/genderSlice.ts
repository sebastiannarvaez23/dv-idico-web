import { createSlice } from '@reduxjs/toolkit';


export interface GenderState {
    isLoadingGenders: boolean;
    isLoadingGenderSelected: boolean;
    error: string | null;
    genderSelected: Gender;
    page: number;
    filter: { name: string | undefined };
    count: number;
    genders: Gender[];
}

const initialState: GenderState = {
    isLoadingGenders: false,
    isLoadingGenderSelected: false,
    error: null,
    genderSelected: {
        id: "",
        name: ""
    },
    page: 1,
    filter: { name: undefined },
    count: 0,
    genders: [],
}

export const GenderSlice = createSlice({
    name: 'Gender',
    initialState,
    reducers: {
        startLoadingGenders: (state) => {
            state.isLoadingGenders = true;
        },
        startLoadingGenderSelected: (state) => {
            state.isLoadingGenderSelected = true;
        },
        setGenders: (state, action) => {
            state.isLoadingGenders = false;
            state.genders = action.payload.genders;
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
        setGenderSelected: (state, action) => {
            state.isLoadingGenderSelected = false;
            state.genderSelected = action.payload.gender;
        },
        setEmptyGenderSelected: (state) => {
            state.genderSelected = initialState.genderSelected;
        }
    },
})

export const {
    startLoadingGenders,
    startLoadingGenderSelected,
    setGenders,
    setCount,
    setPage,
    setFilter,
    setGenderSelected,
    setEmptyGenderSelected
} = GenderSlice.actions;