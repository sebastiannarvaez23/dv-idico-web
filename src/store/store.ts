import { configureStore } from '@reduxjs/toolkit';
import { characterSlice } from './slices/character';
import { serieMovieSlice } from './slices/seriemovie';
import { commonSlice } from './slices/common';

export const store = configureStore({
    reducer: {
        character: characterSlice.reducer,
        serieMovie: serieMovieSlice.reducer,
        common: commonSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;