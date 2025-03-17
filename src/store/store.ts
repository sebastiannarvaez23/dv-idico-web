import { configureStore } from '@reduxjs/toolkit';

import { characterSlice } from './slices/character';
import { commonSlice } from './slices/common';
import { GenderSlice } from './slices/gender';
import { kindSlice } from './slices/kind';
import { personSlice } from './slices/person/personSlice';
import { productSlice } from './slices/product';
import { roleSlice } from './slices/role';
import { serviceSlice } from './slices/service/serviceSlice';
import { sessionSlice } from './slices/session';


export const store = configureStore({
    reducer: {
        character: characterSlice.reducer,
        common: commonSlice.reducer,
        gender: GenderSlice.reducer,
        kind: kindSlice.reducer,
        person: personSlice.reducer,
        product: productSlice.reducer,
        role: roleSlice.reducer,
        service: serviceSlice.reducer,
        session: sessionSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;