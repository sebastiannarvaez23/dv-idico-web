import { createSlice } from '@reduxjs/toolkit';

export interface KindState {
    isLoadingKinds: boolean;
    isLoadingKindSelected: boolean;
    error: string | null;
    kindSelected: Kind;
    kinds: Kind[];
}

const initialState: KindState = {
    isLoadingKinds: false,
    isLoadingKindSelected: false,
    error: null,
    kindSelected: {
        id: "",
        name: ""
    },
    kinds: [],
}

export const kindSlice = createSlice({
    name: 'kind',
    initialState,
    reducers: {
        startLoadingKinds: (state) => {
            state.isLoadingKinds = true;
        },
        startLoadingKindSelected: (state) => {
            state.isLoadingKindSelected = true;
        },
        setKinds: (state, action) => {
            state.isLoadingKinds = false;
            state.kinds = action.payload.kinds;
        },
        setKindSelected: (state, action) => {
            state.isLoadingKindSelected = false;
            state.kindSelected = action.payload.kind;
        },
        setEmptyKindSelected: (state) => {
            state.kindSelected = initialState.kindSelected;
        }
    },
})

export const {
    startLoadingKinds,
    startLoadingKindSelected,
    setKinds,
    setKindSelected,
    setEmptyKindSelected
} = kindSlice.actions;