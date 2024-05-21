import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCharacters } from '../store/slices/character';
import { AppDispatch } from '../store/store';
import useAlert from './useAlert.hook';

function useCharacter() {

    const dispatch = useDispatch<AppDispatch>();
    const { showAlert } = useAlert();

    const [modalEditCharacter, setModalEditCharacter] = useState(false);
    const [modalCreateCharacter, setModalCreateCharacter] = useState(false);

    const characterEmpty: Character = {
        id: "",
        name: "",
        age: "",
        weight: "",
        history: "",
        image: "",
        endpoint: "",
        products: []
    }

    const detailLabelsCharacter: DetailsLabelCardElement = {
        label1: "Edad: ",
        label2: "Peso (kg): ",
        label3: "Historia del Personaje: ",
        label4: "Películas y/ o Series: "
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
        showAlert('success', '¡Has iniciado sesión con éxito!');
    }, [])

    return {
        characterEmpty,
        detailLabelsCharacter,
        modalCreateCharacter,
        modalEditCharacter,
        setModalEditCharacter,
        setModalCreateCharacter,
        handleOpenModalEditCharacter,
        handleCloseModalEditCharacter,
        handleOpenModalCreateCharacter,
        handleCloseModalCreateCharacter,
    }
}

export default useCharacter;