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

export const updateSerieMovie = async (serieMovie: FormData): Promise<SerieMovie> => {
    try {
        const response = await api.put(
            '/serie-movie/' + serieMovie.get('id'),
            serieMovie,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        const serieMovieUpdated = response.data;
        if (response.status === 200) alert('Serie o Película editada exitosamente!');
        return serieMovieUpdated;
    } catch (error: any) {
        throw new Error(`Error al editar serie o película: ${error.message}`);
    }
}
