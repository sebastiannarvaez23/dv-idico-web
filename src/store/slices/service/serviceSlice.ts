import { createSlice } from '@reduxjs/toolkit';

export interface ServiceState {
    isLoadingServices: boolean;
    isLoadingServiceSelected: boolean;
    error: string | null;
    serviceSelected: Service;
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
    setServices,
    setServiceSelected,
    setEmptyServiceSelected
} = serviceSlice.actions;