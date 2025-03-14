import { createSlice } from '@reduxjs/toolkit';


export interface ServiceState {
    isLoadingServices: boolean;
    isLoadingServiceSelected: boolean;
    error: string | null;
    serviceSelected: Service;
    page: number;
    filter: { code: string | undefined, name: string | undefined };
    count: number;
    services: Service[];
}

const initialState: ServiceState = {
    isLoadingServices: false,
    isLoadingServiceSelected: false,
    error: null,
    serviceSelected: {
        id: "",
        code: "",
        name: "",
    },
    page: 1,
    filter: { code: undefined, name: undefined },
    count: 0,
    services: [],
}

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        startLoadingServices: (state) => {
            state.isLoadingServices = true;
        },
        startLoadingServiceSelected: (state) => {
            state.isLoadingServiceSelected = true;
        },
        setServices: (state, action) => {
            state.isLoadingServices = false;
            state.services = action.payload.services;
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
        setServiceSelected: (state, action) => {
            state.isLoadingServiceSelected = false;
            state.serviceSelected = action.payload.service;
        },
        setEmptyServiceSelected: (state) => {
            state.serviceSelected = initialState.serviceSelected;
        }
    },
})

export const {
    startLoadingServices,
    startLoadingServiceSelected,
    setCount,
    setPage,
    setFilter,
    setServices,
    setServiceSelected,
    setEmptyServiceSelected
} = serviceSlice.actions;