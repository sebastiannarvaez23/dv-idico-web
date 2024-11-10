import { AlertType } from '../../../types/TypAlert';
import { createSlice } from '@reduxjs/toolkit';


interface AlertState {
    type: AlertType;
    message: string;
}

export interface CommonState {
    alert: AlertState | null;
}

const initialState: CommonState = {
    alert: null,
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.alert = action.payload;
        }
    },
})

export const { setAlert } = commonSlice.actions;