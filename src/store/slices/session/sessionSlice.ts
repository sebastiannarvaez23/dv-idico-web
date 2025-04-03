import { createSlice } from '@reduxjs/toolkit';


export interface SessionState {
    isAuthenticated: boolean;
    nickname: string | undefined;
    role: string | undefined;
    permissions: string[];
}

const initialState: SessionState = {
    isAuthenticated: false,
    nickname: undefined,
    role: undefined,
    permissions: [],
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSession: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.nickname = action.payload.nickname;
            state.role = action.payload.role;
            state.permissions = action.payload.permissions;
        }
    },
})

export const {
    setSession
} = sessionSlice.actions;