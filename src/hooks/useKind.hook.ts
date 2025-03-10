import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../store/store";
import { getKinds } from "../store/slices/kind";


function useKind() {

    const dispatch = useDispatch<AppDispatch>();

    const kindEmpty: Kind = {
        id: "",
        name: ""
    }

    const handleGetKinds = (page: number) => {
        dispatch(getKinds(page));
    }

    useEffect(() => {
        dispatch(getKinds());
    }, []);

    return {
        kindEmpty,
        handleGetKinds
    }
}

export default useKind;