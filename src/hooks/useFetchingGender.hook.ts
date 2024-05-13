import { useState } from "react";
import api from "../services/api";

function useApiGender() {

    // useState
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getGenders = async (): Promise<Gender[]> => {
        setLoading(true);
        const response = await api.get('/gender')
            .catch((error: any) => {
                setLoading(false);
                setError(`Error obtener listado de Personajes: ${error.message}`);
                throw new Error(`Error al obtener listado de generos: ${error.message}`);
            })
            .finally(() => setLoading(false));
        return response.data.genders;
    }

    return {
        loading,
        error,
        getGenders
    }
}

export default useApiGender;