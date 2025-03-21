import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store/store";
import { getGenders } from "../store/slices/gender";


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

    useEffect(() => {
        dispatch(getGenders());
    }, []);

    return {
        count,
        genderEmpty,
        genders,
        page,
        handleGetGenders
    }
}

export default useGender;