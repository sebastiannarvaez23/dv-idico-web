import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../store/store";
import { getGenders } from "../store/slices/gender";


function useGender() {

    const dispatch = useDispatch<AppDispatch>();

    const genderEmpty: Gender = {
        id: "",
        code: "",
        name: ""
    }

    const handleGetGenders = (page: number) => {
        dispatch(getGenders(page));
    }

    useEffect(() => {
        dispatch(getGenders());
    }, []);

    return {
        genderEmpty,
        handleGetGenders
    }
}

export default useGender;