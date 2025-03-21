import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';
import { createCharacter, deleteCharacter, getCharacters, updateCharacter } from '../store/slices/character';


function useCharacter() {

    const dispatch = useDispatch<AppDispatch>();

    const {
        characters,
        characterSelected,
        count,
        filter,
        page,
        isLoadingCharacterSelected,
        isLoadingCharacters
    } = useSelector((state: RootState) => state.character);

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

    const handleCreateCharacter = (character: FormData, page: number) => {
        dispatch(createCharacter(character, page));
    }
    const handleUpdateCharacter = (character: FormData, page: number) => {
        dispatch(updateCharacter(character, page));
    }

    const handleDeleteCharacter = () => {
        dispatch(deleteCharacter());
    }

    useEffect(() => {
        if (characters.length === 0) dispatch(getCharacters());
    }, [])

    return {
        characterEmpty,
        characters,
        characterSelected,
        count,
        detailLabelsCharacter,
        filter,
        isLoadingCharacters,
        isLoadingCharacterSelected,
        modalCreateCharacter,
        modalEditCharacter,
        page,
        handleUpdateCharacter,
        handleCreateCharacter,
        handleDeleteCharacter,
        handleCloseModalCreateCharacter,
        handleCloseModalEditCharacter,
        handleGetCharacters,
        handleOpenModalCreateCharacter,
        handleOpenModalEditCharacter,
        setModalCreateCharacter,
        setModalEditCharacter,
    }
}

export default useCharacter;