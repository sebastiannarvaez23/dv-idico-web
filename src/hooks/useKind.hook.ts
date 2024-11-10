import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../store/store";
import { getKinds } from "../store/slices/kind";


function useKind() {

    const dispatch = useDispatch<AppDispatch>();
    const [kinds, setKinds] = useState<Kind[]>([]);

    const handleGetKinds = (page: number) => {
        dispatch(getKinds(page));
    }

    useEffect(() => {
        dispatch(getKinds());
    }, []);

    return {
        kinds,
        getKinds,
        handleGetKinds
    }
}

export default useKind;