import { useState, useEffect } from "react";
import { fetchGetKinds } from "../services/kind";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setAlert } from "../store/slices/common";

function useKind() {

    const dispatch = useDispatch<AppDispatch>();
    const [kinds, setKinds] = useState<Kind[]>([]);

    const getKinds = async () => {
        try {
            const kinds: Kind[] = await fetchGetKinds();
            setKinds(kinds);
        } catch (error) {
            dispatch(setAlert({ type: 'error', message: 'Error al obtener lista de Tipos de Producto' }));
            throw new Error(`Error al obtener listado de tipos de producto: ${error}`);
        }
    }

    useEffect(() => {
        getKinds();
    }, []);

    return {
        kinds,
        getKinds
    }
}

export default useKind;