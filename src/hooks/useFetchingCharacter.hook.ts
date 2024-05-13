import { useState, useEffect } from 'react';
import api from '../services/api';
import useAlert from './useAlert.hook';

function useApiCharacter() {

    const { showAlert, alert, hideAlert } = useAlert();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [characterSelected, setCharacterSelected] = useState<Character>({
        id: "",
        name: "",
        age: "",
        weight: "",
        history: "",
        image: "",
        endpoint: "",
        seriesMovies: [],
    });
    const [characters, setCharacters] = useState<Character[]>();

    const fetchCharacters = async () => {
        try {
            const charactersData = await getCharacters();
            setCharacters(charactersData);
            setCharacterSelected(charactersData[0]);
        } catch (error) {
            console.error('Error al obtener las películas y series:', error);
        }
    }

    const fetchCharacter = async (endpoint: string) => {
        try {
            const charactersData: Character = await getCharacter(endpoint);
            setCharacterSelected(charactersData);
        } catch (error) {
            console.error('Error al obtener las películas y series:', error);
        }
    }

    const handleDeleteCharacter = async () => {
        await deleteCharacter(characterSelected.id);
        await fetchCharacters();
    }

    useEffect(() => {
        fetchCharacters();
        if (characterSelected.endpoint !== '' && characterSelected.endpoint !== undefined) {
            fetchCharacter(characterSelected.endpoint)
        }
        showAlert('success', '¡Has iniciado sesión con éxito!');
    }, [])

    useEffect(() => {
        if (characterSelected.endpoint !== '' && characterSelected.endpoint !== undefined) {
            fetchCharacter(characterSelected.endpoint)
        };
    }, [characterSelected])

    const getCharacters = async (): Promise<Character[]> => {
        setIsLoading(true);
        const response = await api.get('/character')
            .catch((error: any) => {
                setIsLoading(false);
                setError(`Error obtener listado de Personajes: ${error.message}`);
                throw new Error(`Error al obtener listado de Personajes: ${error.message}`);
            })
            .finally(() => setIsLoading(false));
        return response.data.characters;
    };

    const getCharacter = async (endpoint: string): Promise<Character> => {
        setIsLoading(true);
        const response = await api.get(endpoint)
            .catch((error: any) => {
                setIsLoading(false);
                setError(`Error al obtener Personaje: ${error.message}`);
                throw new Error(`Error al obtener Personaje: ${error.message}`);
            })
            .finally(() => setIsLoading(false));
        return response.data;
    };

    const updateCharacter = async (character: FormData): Promise<Character> => {
        setIsLoading(true);
        const response = await api.put(`/character/${character.get('id')}`, character, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .catch((error: any) => {
                setIsLoading(false);
                setError(`Error al editar Personaje: ${error.message}`);
                showAlert('error', 'Ocurrió un error editando el Personaje.');
                throw new Error(`Error al actualizar el Personaje: ${error.message}`);
            })
            .finally(() => {
                setIsLoading(false);
                showAlert('success', 'Personaje editado exitosamente!');
            });
        return response.data;
    };

    const deleteCharacter = async (id: string): Promise<Character> => {
        setIsLoading(true);
        const response = await api.delete(`/character/${id}`)
            .catch((error: any) => {
                setIsLoading(false);
                setError(`Error al eliminar Personaje: ${error.message}`);
                showAlert('error', 'Ocurrió un error eliminando el Personaje.');
                throw new Error(`Error al eliminar el Personaje: ${error.message}`);
            })
            .finally(() => {
                setIsLoading(false);
                showAlert('success', 'Personaje eliminado exitosamente!');
            });
        return response.data;
    };

    return {
        isLoadingCharacter: isLoading,
        error,
        alertApiC: alert,
        characterSelected,
        characters,
        getCharacters,
        getCharacter,
        updateCharacter,
        deleteCharacter,
        hideAlertApiC: hideAlert,
        setCharacterSelected,
        fetchCharacters,
        handleDeleteCharacter
    };
}

export default useApiCharacter;