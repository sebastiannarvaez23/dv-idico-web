import { useState } from 'react';
import api from '../services/api';
import useAlert from './useAlert.hook';

function useApiCharacter() {

    // Custom Hook
    const { showAlert, alert, hideAlert } = useAlert();

    // useState
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getCharacters = async (): Promise<Character[]> => {
        setLoading(true);
        const response = await api.get('/character')
            .catch((error: any) => {
                setLoading(false);
                setError(`Error obtener listado de Personajes: ${error.message}`);
                throw new Error(`Error al obtener listado de Personajes: ${error.message}`);
            })
            .finally(() => setLoading(false));
        return response.data.characters;
    };

    const getCharacter = async (endpoint: string): Promise<Character> => {
        setLoading(true);
        const response = await api.get(endpoint)
            .catch((error: any) => {
                setLoading(false);
                setError(`Error al obtener Personaje: ${error.message}`);
                throw new Error(`Error al obtener Personaje: ${error.message}`);
            })
            .finally(() => setLoading(false));
        return response.data;
    };

    const updateCharacter = async (character: FormData): Promise<Character> => {
        setLoading(true);
        const response = await api.put(`/character/${character.get('id')}`, character, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .catch((error: any) => {
                setLoading(false);
                setError(`Error al editar Personaje: ${error.message}`);
                showAlert('error', 'Ocurrió un error editando el Personaje.');
                throw new Error(`Error al actualizar el Personaje: ${error.message}`);
            })
            .finally(() => {
                setLoading(false);
                showAlert('success', 'Personaje editado exitosamente!');
            });
        return response.data;
    };

    const deleteCharacter = async (id: string): Promise<Character> => {
        setLoading(true);
        const response = await api.delete(`/character/${id}`)
            .catch((error: any) => {
                setLoading(false);
                setError(`Error al eliminar Personaje: ${error.message}`);
                showAlert('error', 'Ocurrió un error eliminando el Personaje.');
                throw new Error(`Error al eliminar el Personaje: ${error.message}`);
            })
            .finally(() => {
                setLoading(false);
                showAlert('success', 'Personaje eliminado exitosamente!');
            });
        return response.data;
    };

    return {
        loading,
        error,
        getCharacters,
        getCharacter,
        updateCharacter,
        deleteCharacter,
        alertApiC: alert,
        hideAlertApiC: hideAlert
    };
}

export default useApiCharacter;
