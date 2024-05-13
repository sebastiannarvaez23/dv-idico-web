import { useState } from 'react';
import api from '../services/api';
import useAlert from './useAlert.hook';

function useApiSerieMovie() {

    // Custom Hook
    const { showAlert, alert, hideAlert } = useAlert();

    // useState
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getSeriesMovies = async (): Promise<SerieMovie[]> => {
        setLoading(true);
        const promise = await api.get('/serie-movie')
            .catch((error: any) => {
                setLoading(false);
                setError(`Error al obtener listado de Series/Peliculas: ${error.message}`);
                showAlert('error', 'Ocurrió un error obteniendo listado de Series/Peliculas.');
                throw new Error(`Error al actualizar Serie/Película: ${error.message}`);
            })
            .finally(() => setLoading(false));
        return promise.data.seriesMovies;
    };

    const updateSerieMovie = async (seriemovie: FormData): Promise<SerieMovie> => {
        setLoading(true);
        const response = await api.put(`/serie-movie/${seriemovie.get('id')}`, seriemovie, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .catch((error: any) => {
                setLoading(false);
                setError(`Error al editar Serie/Pelicula: ${error.message}`);
                showAlert('error', 'Ocurrió un error editando el personaje.');
                throw new Error(`Error al actualizar Serie/Película: ${error.message}`);
            })
            .finally(() => {
                setLoading(false);
                showAlert('success', 'Serie/Pelicula editado exitosamente!');
            });
        return response.data;
    };

    const deleteSerieMovie = async (id: string): Promise<SerieMovie> => {
        setLoading(true);
        const response = await api.delete(`/serie-movie/${id}`)
            .catch((error: any) => {
                setLoading(false);
                setError(`Error al eliminar Serie/Pelicula: ${error.message}`);
                showAlert('error', 'Ocurrió un error elimiando Serie/Pelicula.');
                throw new Error(`Error al eliminar Serie/Película: ${error.message}`);
            })
            .finally(() => {
                setLoading(false);
                showAlert('success', 'Serie/Pelicula eliminado exitosamente!');
            });
        return response.data;
    };

    return {
        loading,
        error,
        getSeriesMovies,
        updateSerieMovie,
        deleteSerieMovie,
        alertApiSM: alert,
        hideAlertApiSM: hideAlert
    };
}

export default useApiSerieMovie;
