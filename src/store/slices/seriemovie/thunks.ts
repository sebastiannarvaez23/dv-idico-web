import { AppDispatch, RootState } from "../../store";
import { fetchDeleteSerieMovie, fetchGetSerieMovie, fetchGetSeriesMovies, fetchUpdateSerieMovie } from "../../../services/product";
import { setSerieMovieSelected, setSeriesMovies, startLoadingSerieMovieSelected, startLoadingSeriesMovies } from "./serieMovieSlice";

export const getSeriesMovies = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { serieMovieSelected } = getState().serieMovie;
        dispatch(startLoadingSeriesMovies());
        const seriesMovies = await fetchGetSeriesMovies();
        dispatch(setSeriesMovies({ seriesMovies }));
        if (!serieMovieSelected?.id) dispatch(getSerieMovie(seriesMovies[0].endpoint));
    };
}

export const getSerieMovie = (endpoint: string) => {
    console.log("response:", endpoint);
    return async (dispatch: AppDispatch) => {
        dispatch(startLoadingSerieMovieSelected());
        const serieMovie: SerieMovie = await fetchGetSerieMovie(endpoint);
        dispatch(setSerieMovieSelected({ serieMovie }));
    };
}

export const updateSerieMovie = (serieMovie: FormData) => {
    return async (dispatch: AppDispatch) => {
        const serieMovieUpdated = await fetchUpdateSerieMovie(serieMovie);
        dispatch(setSerieMovieSelected({ serieMovie: serieMovieUpdated }));
        dispatch(getSeriesMovies());
    };
}

export const deleteSerieMovie = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { seriesMovies, serieMovieSelected } = getState().serieMovie;
        await fetchDeleteSerieMovie(serieMovieSelected.id);
        dispatch(getSeriesMovies());
        dispatch(getSerieMovie(seriesMovies[1].endpoint));
    }
}