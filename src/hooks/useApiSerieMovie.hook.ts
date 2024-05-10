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
        try {
            setLoading(true);
            const response = await api.get('/serie-movie');
            setLoading(false);
            return response.data.seriesMovies;
        } catch (error: any) {
            setError(`Error obtener listado de Series y Peliculas: ${error.message}`);
            setLoading(false);
            throw new Error(`Error al obtener listado de Series y Peliculas: ${error.message}`)
        }
    };

    const updateSerieMovie = async (seriemovie: FormData): Promise<SerieMovie> => {
        try {
            setLoading(true);
            const response = await api.put(`/serie-movie/${seriemovie.get('id')}`, seriemovie, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setLoading(false);
            showAlert('success', 'Serie/Pelicula editado exitosamente!');
            return response.data;
        } catch (error: any) {
            setError(`Error al editar Serie y/o Pelicula: ${error.message}`);
            showAlert('error', 'Ocurrió un error editando el personaje.');
            setLoading(false);
            throw new Error(`Error al actualizar Serie/Película: ${error.message}`)
        }
    };

    const deleteSerieMovie = async (id: string): Promise<SerieMovie> => {
        try {
            setLoading(true);
            const response = await api.delete(`/serie-movie/${id}`);
            setLoading(false);
            showAlert('success', 'Serie y/o Pelicula eliminado exitosamente!');
            return response.data;
        } catch (error: any) {
            setError(`Error al eliminar Serie y/o Pelicula: ${error.message}`);
            setError(`Error al eliminar Serie y/o Pelicula: ${error.message}`);
            setLoading(false);
            throw new Error(`Error al eliminar Serie/Película: ${error.message}`)
        }
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
