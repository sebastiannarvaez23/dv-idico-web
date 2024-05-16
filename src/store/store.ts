import { configureStore } from '@reduxjs/toolkit';
import { characterSlice } from './slices/character';

export const store = configureStore({
    reducer: {
        character: characterSlice.reducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;