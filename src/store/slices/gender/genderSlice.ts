import { createSlice } from '@reduxjs/toolkit';

export interface GenderState {
    isLoadingGenders: boolean;
    isLoadingGenderSelected: boolean;
    error: string | null;
    genderSelected: Gender;
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
    setGenderSelected,
    setEmptyGenderSelected
} = GenderSlice.actions;