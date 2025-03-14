import { createSlice } from '@reduxjs/toolkit';


export interface RoleState {
    isLoadingRoles: boolean;
    isLoadingRoleSelected: boolean;
    error: string | null;
    roleSelected: Role;
    page: number;
    filter: { name: string | undefined };
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
    page: 1,
    filter: { name: undefined },
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
        setPage: (state, action) => {
            state.page = action.payload.page;
        },
        setFilter: (state, action) => {
            state.filter = action.payload.filter;
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
    setPage,
    setFilter,
    setRoleSelected,
    setEmptyRoleSelected
} = roleSlice.actions;