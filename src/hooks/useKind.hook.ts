import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store/store";
import { createKind, deleteKind, getKinds, updateKind } from "../store/slices/kind";


function useKind() {

    const dispatch = useDispatch<AppDispatch>();

    const { isLoadingKinds, kinds, count, page } = useSelector(
        (state: RootState) => state.kind);

    const kindEmpty: Kind = {
        id: "",
        name: ""
    }

    const handleGetKinds = (page: number, name?: string) => {
        dispatch(getKinds(page, name));
    }

    const handleCreateKind = (kind: Kind) => {
        dispatch(createKind(kind));
    }

    const handleUpdateKind = (kind: Kind) => {
        dispatch(updateKind(kind));
    }

    const handleDeleteKind = (id: string) => {
        dispatch(deleteKind(id));
    }


    useEffect(() => {
        if (kinds.length === 0, !isLoadingKinds) dispatch(getKinds());
    }, []);

    return {
        count,
        kindEmpty,
        kinds,
        page,
        isLoadingKinds,
        handleGetKinds,
        handleCreateKind,
        handleUpdateKind,
        handleDeleteKind,
    }
}

export default useKind;