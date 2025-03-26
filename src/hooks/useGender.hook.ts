import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store/store";
import { createGender, deleteGender, getGenders, updateGender } from "../store/slices/gender";


function useGender() {

    const dispatch = useDispatch<AppDispatch>();
    const { count, page, genders } = useSelector(
        (state: RootState) => state.gender);

    const genderEmpty: Gender = {
        id: "",
        code: "",
        name: ""
    }

    const handleGetGenders = (page: number, name?: string) => {
        dispatch(getGenders(page, name));
    }

    const handleCreateGender = (gender: Gender) => {
        dispatch(createGender(gender));
    }

    const handleUpdateGender = (gender: Gender) => {
        dispatch(updateGender(gender));
    }

    const handleDeleteGender = (id: string) => {
        dispatch(deleteGender(id));
    }

    useEffect(() => {
        dispatch(getGenders());
    }, []);

    return {
        count,
        genderEmpty,
        genders,
        page,
        handleCreateGender,
        handleDeleteGender,
        handleGetGenders,
        handleUpdateGender,
    }
}

export default useGender;