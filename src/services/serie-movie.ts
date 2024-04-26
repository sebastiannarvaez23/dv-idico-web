import api from './api';

export const getSeriesMovies = async (): Promise<SerieMovie[]> => {
    try {
        const response = await api.get('/serie-movie');
        const seriesMovies = response.data.seriesMovies;
        return seriesMovies;
    } catch (error: any) {
        throw new Error(`Error al iniciar sesión: ${error.message}`);
    }
};