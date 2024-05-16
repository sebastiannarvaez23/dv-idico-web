import { configureStore } from '@reduxjs/toolkit';
import { characterSlice } from './slices/character';
import { serieMovieSlice } from './slices/seriemovie';

export const store = configureStore({
    reducer: {
        character: characterSlice.reducer,
        serieMovie: serieMovieSlice.reducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;