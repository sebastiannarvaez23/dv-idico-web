import { useState, useEffect } from "react";
import api from "../services/api";
import { fetchGetGenders } from "../services/gender";

function useApiGender() {

    const [genders, setGenders] = useState<Gender[]>([]);

    const getGenders = async () => {
        try {
            const genders: Gender[] = await fetchGetGenders();
            setGenders(genders);
        } catch (error) {
            throw new Error(`Error al obtener listado de generos: ${error}`);
        }
    }

    useEffect(() => {
        getGenders();
    }, []);

    return {
        genders,
        getGenders
    }
}

export default useApiGender;