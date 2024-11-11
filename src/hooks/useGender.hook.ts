import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../store/store";
import { getGenders } from "../store/slices/gender";


function useGender() {

    const dispatch = useDispatch<AppDispatch>();
    const [genders, setGenders] = useState<Gender[]>([]);

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
        genders,
        genderEmpty,
        getGenders,
        handleGetGenders
    }
}

export default useGender;