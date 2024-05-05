import api from './api';

export const getSeriesMovies = async (): Promise<SerieMovie[]> => {
    try {
        const response = await api.get('/serie-movie');
        const seriesMovies = response.data.seriesMovies;
        return seriesMovies;
    } catch (error: any) {
        throw new Error(`Error al obtener listado de series y películas: ${error.message}`);
    }
};

export const updateSerieMovie = async (serieMovie: SerieMovie): Promise<SerieMovie> => {
    try {
        const response = await api.put(
            '/serie-movie/' + serieMovie.id,
            JSON.stringify(serieMovie)
        );
        const serieMovieUpdated = response.data;
        return serieMovieUpdated;
    } catch (error: any) {
        throw new Error(`Error al obtener serie o película: ${error.message}`);
    }
}
