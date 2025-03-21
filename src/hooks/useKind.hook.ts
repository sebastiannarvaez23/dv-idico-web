import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store/store";
import { getKinds } from "../store/slices/kind";


function useKind() {

    const dispatch = useDispatch<AppDispatch>();

    const { kinds, count, page } = useSelector(
        (state: RootState) => state.kind);

    const kindEmpty: Kind = {
        id: "",
        name: ""
    }

    const handleGetKinds = (page: number, name?: string) => {
        dispatch(getKinds(page, name));
    }

    useEffect(() => {
        dispatch(getKinds());
    }, []);

    return {
        count,
        kindEmpty,
        kinds,
        page,
        handleGetKinds
    }
}

export default useKind;