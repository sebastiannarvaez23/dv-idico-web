import { createSlice } from '@reduxjs/toolkit';


export interface UserState {
    isLoadingUsers: boolean;
    isLoadingUserSelected: boolean;
    error: string | null;
    userSelected: User;
    page: number;
    filter: { code: string | undefined, name: string | undefined };
    count: number;
    users: User[];
}

const initialState: UserState = {
    isLoadingUsers: false,
    isLoadingUserSelected: false,
    error: null,
    userSelected: {
        id: "",
        nickname: "",
        password: "",
        lastAuth: "",
        origin: "",
        active: false,
    },
    page: 1,
    filter: { code: undefined, name: undefined },
    count: 0,
    users: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startLoadingUsers: (state) => {
            state.isLoadingUsers = true;
        },
        startLoadingUserSelected: (state) => {
            state.isLoadingUserSelected = true;
        },
        setUsers: (state, action) => {
            state.isLoadingUsers = false;
            state.users = action.payload.users;
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
        setUserSelected: (state, action) => {
            state.isLoadingUserSelected = false;
            state.userSelected = action.payload.user;
        },
        setEmptyUserSelected: (state) => {
            state.userSelected = initialState.userSelected;
        }
    },
})

export const {
    startLoadingUsers,
    startLoadingUserSelected,
    setCount,
    setPage,
    setFilter,
    setUsers,
    setUserSelected,
    setEmptyUserSelected
} = userSlice.actions;