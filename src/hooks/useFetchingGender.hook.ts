import { useState, useEffect } from "react";
import api from "../services/api";

function useApiGender() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [genders, setGenders] = useState<Gender[]>([]);

    const fetchGenders = async () => {
        try {
            const genders: Gender[] = await getGenders();
            setGenders(genders);
        } catch (error) {
            throw new Error(`Error al obtener listado de generos: ${error}`);
        }
    }

    useEffect(() => {
        fetchGenders();
    }, []);

    const getGenders = async (): Promise<Gender[]> => {
        setIsLoading(true);
        const response = await api.get('/gender')
            .catch((error: any) => {
                setIsLoading(false);
                setError(`Error obtener listado de Personajes: ${error.message}`);
                throw new Error(`Error al obtener listado de generos: ${error.message}`);
            })
            .finally(() => setIsLoading(false));
        return response.data.genders;
    }

    return {
        isLoading,
        error,
        genders,
        getGenders
    }
}

export default useApiGender;