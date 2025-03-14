import { createSlice } from '@reduxjs/toolkit';


export interface KindState {
    isLoadingKinds: boolean;
    isLoadingKindSelected: boolean;
    error: string | null;
    kindSelected: Kind;
    page: number;
    filter: { name: string | undefined };
    count: number;
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
    page: 1,
    filter: { name: undefined },
    count: 0,
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
        setPage: (state, action) => {
            state.page = action.payload.page;
        },
        setFilter: (state, action) => {
            state.filter = action.payload.filter;
        },
        setCount: (state, action) => {
            state.count = action.payload.count;
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
    setCount,
    setPage,
    setFilter,
    setKindSelected,
    setEmptyKindSelected
} = kindSlice.actions;