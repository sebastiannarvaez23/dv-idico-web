import { useState, useEffect } from "react";
import { fetchGetGenders } from "../services/gender";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setAlert } from "../store/slices/common";

function useGender() {

    const dispatch = useDispatch<AppDispatch>();
    const [genders, setGenders] = useState<Gender[]>([]);

    const getGenders = async () => {
        try {
            const genders: Gender[] = await fetchGetGenders();
            setGenders(genders);
        } catch (error) {
            dispatch(setAlert({ type: 'error', message: 'Error al obtener lista de Generos' }));
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

export default useGender;