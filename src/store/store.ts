import { characterSlice } from './slices/character';
import { commonSlice } from './slices/common';
import { configureStore } from '@reduxjs/toolkit';
import { personSlice } from './slices/person/personSlice';
import { productSlice } from './slices/product';

export const store = configureStore({
    reducer: {
        person: personSlice.reducer,
        character: characterSlice.reducer,
        product: productSlice.reducer,
        common: commonSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;