import { AppDispatch, RootState } from "../../store";
import { fetchDeleteSerieMovie, fetchGetSerieMovie, fetchGetSeriesMovies, fetchUpdateSerieMovie } from "../../../services/product";
import { setSerieMovieSelected, setSeriesMovies, startLoadingSerieMovieSelected, startLoadingSeriesMovies } from "./serieMovieSlice";
import { setAlert } from '../common';

export const getSeriesMovies = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { serieMovieSelected } = getState().serieMovie;
            dispatch(startLoadingSeriesMovies());
            const seriesMovies = await fetchGetSeriesMovies();
            dispatch(setSeriesMovies({ seriesMovies }));
            if (!serieMovieSelected?.id) dispatch(getSerieMovie(seriesMovies[0].endpoint));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la lista Series y Películas' }));
        }

    };
}

export const getSerieMovie = (endpoint: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingSerieMovieSelected());
            const serieMovie: SerieMovie = await fetchGetSerieMovie(endpoint);
            dispatch(setSerieMovieSelected({ serieMovie }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la Serie/Película' }));
        }

    };
}

export const updateSerieMovie = (serieMovie: FormData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const serieMovieUpdated = await fetchUpdateSerieMovie(serieMovie);
            dispatch(setSerieMovieSelected({ serieMovie: serieMovieUpdated }));
            dispatch(getSeriesMovies());
            dispatch(setAlert({ type: 'success', message: 'Serie/Película Actualizada exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error actualizando la Serie/Película' }));
        }
    };
}

export const deleteSerieMovie = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { seriesMovies, serieMovieSelected } = getState().serieMovie;
            await fetchDeleteSerieMovie(serieMovieSelected.id);
            dispatch(getSeriesMovies());
            dispatch(getSerieMovie(seriesMovies[1].endpoint));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando la Serie/Película' }));
        }
    }
}