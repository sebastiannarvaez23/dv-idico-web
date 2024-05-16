import api from "../../../services/api";
import { AppDispatch, RootState } from "../../store"
import { setSerieMovieSelected, setSeriesMovies, startLoadingSerieMovieSelected, startLoadingSeriesMovies } from "./serieMovieSlice";

const fetchGetSeriesMovies = async (): Promise<SerieMovie[]> => {
    const response = await api.get('/serie-movie')
        .catch((error: any) => {
            throw new Error(`Error al actualizar Serie/Película: ${error.message}`);
        })
    return response.data.seriesMovies;
};

const fetchGetSerieMovie = async (endpoint: string): Promise<SerieMovie> => {
    const promise = await api.get(endpoint)
        .catch((error: any) => {
            throw new Error(`Error al actualizar Serie/Película: ${error.message}`);
        })
    return promise.data;
};

const fetchUpdateSerieMovie = async (seriemovie: FormData): Promise<SerieMovie> => {
    const response = await api.put(`/serie-movie/${seriemovie.get('id')}`, seriemovie, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).catch((error: any) => {
        throw new Error(`Error al actualizar Serie/Película: ${error.message}`);
    });
    return response.data;
};

const fetchDeleteSerieMovie = async (id: string): Promise<SerieMovie> => {
    const response = await api.delete(`/serie-movie/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al eliminar Serie/Película: ${error.message}`);
        });
    return response.data;
};

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
        fetchDeleteSerieMovie(serieMovieSelected.id);
        dispatch(getSeriesMovies());
        dispatch(getSerieMovie(seriesMovies[1].endpoint));
    }
}