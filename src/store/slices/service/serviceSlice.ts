import { createSlice } from '@reduxjs/toolkit';


export interface ServiceState {
    isLoadingServices: boolean;
    isLoadingServiceSelected: boolean;
    error: string | null;
    serviceSelected: Service;
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
    setServices,
    setServiceSelected,
    setEmptyServiceSelected
} = serviceSlice.actions;