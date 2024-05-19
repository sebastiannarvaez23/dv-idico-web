import { createSlice } from '@reduxjs/toolkit';

export interface SerieMovieState {
    isLoadingSeriesMovies: boolean;
    isLoadingSerieMovieSelected: boolean;
    error: string | null;
    serieMovieSelected: SerieMovie;
    seriesMovies: SerieMovie[];
}

const initialState: SerieMovieState = {
    isLoadingSeriesMovies: false,
    isLoadingSerieMovieSelected: false,
    error: null,
    serieMovieSelected: {
        id: "",
        title: "",
        image: "",
        created_date: "",
        qualification: "",
        gender: { id: "", name: "" },
        endpoint: "",
        characters: []
    },
    seriesMovies: [],
}

export const serieMovieSlice = createSlice({
    name: 'serieMovie',
    initialState,
    reducers: {
        startLoadingSeriesMovies: (state) => {
            state.isLoadingSeriesMovies = true;
        },
        startLoadingSerieMovieSelected: (state) => {
            state.isLoadingSerieMovieSelected = true;
        },
        setSeriesMovies: (state, action) => {
            state.isLoadingSeriesMovies = false;
            state.seriesMovies = action.payload.seriesMovies;
        },
        setSerieMovieSelected: (state, action) => {
            state.isLoadingSerieMovieSelected = false;
            state.serieMovieSelected = action.payload.serieMovie;
        }
    },
})

export const {
    startLoadingSeriesMovies,
    startLoadingSerieMovieSelected,
    setSeriesMovies,
    setSerieMovieSelected
} = serieMovieSlice.actions;