import { createSlice } from '@reduxjs/toolkit';


export interface ServiceState {
    isAuthenticate: boolean;
    nickname: string | undefined;
    role: string | undefined;
    permissions: string[];
}

const initialState: ServiceState = {
    isAuthenticate: false,
    nickname: undefined,
    role: undefined,
    permissions: [],
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSession: (state, action) => {
            state.isAuthenticate = action.payload.isAuthenticate;
            state.nickname = action.payload.nickname;
            state.role = action.payload.role;
            state.permissions = action.payload.permissions;
        }
    },
})

export const {
    setSession
} = sessionSlice.actions;