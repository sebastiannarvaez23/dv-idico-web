import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/store';
import { getCharacters } from '../store/slices/character';


function useCharacter() {

    const dispatch = useDispatch<AppDispatch>();

    const [modalEditCharacter, setModalEditCharacter] = useState(false);
    const [modalCreateCharacter, setModalCreateCharacter] = useState(false);

    const characterEmpty: Character = {
        id: "",
        name: "",
        age: "",
        history: "",
        image: "",
        products: []
    }

    const detailLabelsCharacter: DetailsLabelCardElement = {
        label1: "Edad: ",
        label2: "Historia del Personaje: ",
        label3: "",
        label4: "Películas y/ o Series: "
    }

    const handleGetCharacters = (page: number, name?: string) => {
        dispatch(getCharacters(page, name));
    }

    const handleOpenModalEditCharacter = () => {
        setModalEditCharacter(true);
    };

    const handleCloseModalEditCharacter = () => {
        setModalEditCharacter(false);
    };

    const handleOpenModalCreateCharacter = () => {
        setModalCreateCharacter(true);
    };

    const handleCloseModalCreateCharacter = () => {
        setModalCreateCharacter(false);
    };

    useEffect(() => {
        dispatch(getCharacters());
    }, [])

    return {
        characterEmpty,
        detailLabelsCharacter,
        modalCreateCharacter,
        modalEditCharacter,
        handleGetCharacters,
        setModalEditCharacter,
        setModalCreateCharacter,
        handleOpenModalEditCharacter,
        handleCloseModalEditCharacter,
        handleOpenModalCreateCharacter,
        handleCloseModalCreateCharacter,
    }
}

export default useCharacter;