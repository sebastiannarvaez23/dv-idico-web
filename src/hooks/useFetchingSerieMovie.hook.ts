import { useState, useEffect } from 'react';
import api from '../services/api';
import useAlert from './useAlert.hook';

function useApiSerieMovie() {

    const { showAlert, alert, hideAlert } = useAlert();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [serieMovieSelected, setSerieMovieSelected] = useState<SerieMovie>({
        id: "",
        title: "",
        image: "",
        created_date: "",
        qualification: "",
        gender: { id: "", name: "" },
        characters: []
    });
    const [seriesMovies, setSeriesMovies] = useState<SerieMovie[]>();

    const fetchSeriesMovies = async () => {
        try {
            const seriesMoviesData = await getSeriesMovies();
            setSeriesMovies(seriesMoviesData);
            setSerieMovieSelected(seriesMoviesData[0]);
        } catch (error) {
            console.error('Error al obtener las películas y series:', error);
        }
    };

    const handleDeleteSerieMovie = async () => {
        await deleteSerieMovie(serieMovieSelected.id);
        await fetchSeriesMovies();
    }

    useEffect(() => {
        fetchSeriesMovies();
    }, [])

    const getSeriesMovies = async (): Promise<SerieMovie[]> => {
        setIsLoading(true);
        const promise = await api.get('/serie-movie')
            .catch((error: any) => {
                setIsLoading(false);
                setError(`Error al obtener listado de Series/Peliculas: ${error.message}`);
                showAlert('error', 'Ocurrió un error obteniendo listado de Series/Peliculas.');
                throw new Error(`Error al actualizar Serie/Película: ${error.message}`);
            })
            .finally(() => setIsLoading(false));
        return promise.data.seriesMovies;
    };

    const updateSerieMovie = async (seriemovie: FormData): Promise<SerieMovie> => {
        setIsLoading(true);
        const response = await api.put(`/serie-movie/${seriemovie.get('id')}`, seriemovie, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .catch((error: any) => {
                setIsLoading(false);
                setError(`Error al editar Serie/Pelicula: ${error.message}`);
                showAlert('error', 'Ocurrió un error editando el personaje.');
                throw new Error(`Error al actualizar Serie/Película: ${error.message}`);
            })
            .finally(() => {
                setIsLoading(false);
                showAlert('success', 'Serie/Pelicula editado exitosamente!');
            });
        return response.data;
    };

    const deleteSerieMovie = async (id: string): Promise<SerieMovie> => {
        setIsLoading(true);
        const response = await api.delete(`/serie-movie/${id}`)
            .catch((error: any) => {
                setIsLoading(false);
                setError(`Error al eliminar Serie/Pelicula: ${error.message}`);
                showAlert('error', 'Ocurrió un error elimiando Serie/Pelicula.');
                throw new Error(`Error al eliminar Serie/Película: ${error.message}`);
            })
            .finally(() => {
                setIsLoading(false);
                showAlert('success', 'Serie/Pelicula eliminado exitosamente!');
            });
        return response.data;
    };

    return {
        isLoadingSerieMovie: isLoading,
        error,
        alertApiSM: alert,
        serieMovieSelected,
        seriesMovies,
        getSeriesMovies,
        updateSerieMovie,
        deleteSerieMovie,
        hideAlertApiSM: hideAlert,
        setSerieMovieSelected,
        fetchSeriesMovies,
        handleDeleteSerieMovie
    };
}

export default useApiSerieMovie;
