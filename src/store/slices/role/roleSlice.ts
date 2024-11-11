import { createSlice } from '@reduxjs/toolkit';


export interface RoleState {
    isLoadingRoles: boolean;
    isLoadingRoleSelected: boolean;
    error: string | null;
    roleSelected: Role;
    count: number;
    roles: Role[];
}

const initialState: RoleState = {
    isLoadingRoles: false,
    isLoadingRoleSelected: false,
    error: null,
    roleSelected: {
        id: "",
        name: "",
    },
    count: 0,
    roles: [],
}

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        startLoadingRoles: (state) => {
            state.isLoadingRoles = true;
        },
        startLoadingRoleSelected: (state) => {
            state.isLoadingRoleSelected = true;
        },
        setRoles: (state, action) => {
            state.isLoadingRoles = false;
            state.roles = action.payload.roles;
        },
        setCount: (state, action) => {
            state.count = action.payload.count;
        },
        setRoleSelected: (state, action) => {
            state.isLoadingRoleSelected = false;
            state.roleSelected = action.payload.role;
        },
        setEmptyRoleSelected: (state) => {
            state.roleSelected = initialState.roleSelected;
        }
    },
})

export const {
    startLoadingRoles,
    startLoadingRoleSelected,
    setRoles,
    setCount,
    setRoleSelected,
    setEmptyRoleSelected
} = roleSlice.actions;