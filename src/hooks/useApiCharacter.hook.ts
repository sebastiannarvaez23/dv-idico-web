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
        try {
            setLoading(true);
            const response = await api.get('/character');
            setLoading(false);
            return response.data.characters;
        } catch (error: any) {
            setError(`Error obtener listado de Personajes: ${error.message}`);
            setLoading(false);
            throw new Error(`Error al obtener listado de Personajes: ${error.message}`);
        }
    };

    const getCharacter = async (endpoint: string): Promise<Character> => {
        try {
            setLoading(true);
            const response = await api.get(endpoint);
            setLoading(false);
            return response.data;
        } catch (error: any) {
            setError(`Error al obtener Personaje: ${error.message}`);
            setLoading(false);
            throw new Error(`Error al obtener Personaje: ${error.message}`);
        }
    };

    const updateCharacter = async (character: FormData): Promise<Character> => {
        try {
            setLoading(true);
            const response = await api.put(`/character/${character.get('id')}`, character, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setLoading(false);
            showAlert('success', 'Personaje editado exitosamente!');
            return response.data;
        } catch (error: any) {
            setError(`Error al editar Personaje: ${error.message}`);
            showAlert('error', 'Ocurrió un error editando el personaje.');
            setLoading(false);
            throw new Error(`Error al actualizar el Personaje: ${error.message}`);
        }
    };

    const deleteCharacter = async (id: string): Promise<Character> => {
        try {
            setLoading(true);
            const response = await api.delete(`/character/${id}`);
            setLoading(false);
            showAlert('success', 'Personaje eliminado exitosamente!');
            return response.data;
        } catch (error: any) {
            setError(`Error al eliminar Personaje: ${error.message}`);
            setError(`Error al eliminar Personaje: ${error.message}`);
            setLoading(false);
            throw new Error(`Error al eliminar el Personaje: ${error.message}`);
        }
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
