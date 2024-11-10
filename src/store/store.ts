import { characterSlice } from './slices/character';
import { commonSlice } from './slices/common';
import { configureStore } from '@reduxjs/toolkit';
import { personSlice } from './slices/person/personSlice';
import { productSlice } from './slices/product';
import { roleSlice } from './slices/role';
import { serviceSlice } from './slices/service/serviceSlice';

export const store = configureStore({
    reducer: {
        role: roleSlice.reducer,
        service: serviceSlice.reducer,
        person: personSlice.reducer,
        character: characterSlice.reducer,
        product: productSlice.reducer,
        common: commonSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;