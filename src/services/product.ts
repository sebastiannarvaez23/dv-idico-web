import api from "./api";

export const fetchGetSeriesMovies = async (): Promise<SerieMovie[]> => {
    const response = await api.get('/serie-movie')
        .catch((error: any) => {
            throw new Error(`Error al actualizar Serie/Película: ${error.message}`);
        })
    return response.data.seriesMovies;
};

export const fetchGetSerieMovie = async (endpoint: string): Promise<SerieMovie> => {
    const promise = await api.get(endpoint)
        .catch((error: any) => {
            throw new Error(`Error al actualizar Serie/Película: ${error.message}`);
        })
    return promise.data;
};

export const fetchUpdateSerieMovie = async (seriemovie: FormData): Promise<SerieMovie> => {
    const response = await api.put(`/serie-movie/${seriemovie.get('id')}`, seriemovie, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).catch((error: any) => {
        throw new Error(`Error al actualizar Serie/Película: ${error.message}`);
    });
    return response.data;
};

export const fetchDeleteSerieMovie = async (id: string): Promise<SerieMovie> => {
    const response = await api.delete(`/serie-movie/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al eliminar Serie/Película: ${error.message}`);
        });
    return response.data;
};