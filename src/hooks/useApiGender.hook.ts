import { useState } from "react";
import api from "../services/api";

function useApiGender() {

    // useState
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getGenders = async (): Promise<Gender[]> => {
        try {
            setLoading(true);
            const response = await api.get('/gender');
            setLoading(false);
            return response.data.genders;
        } catch (error: any) {
            setError(`Error obtener listado de Personajes: ${error.message}`);
            setLoading(false);
            throw new Error(`Error al obtener listado de generos: ${error.message}`);
        }
    }

    return {
        loading,
        error,
        getGenders
    }
}

export default useApiGender;