import { useState, useEffect } from 'react';
import api from '../services/api';
import useAlert from './useAlert.hook';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters } from '../store/slices/character';
import { AppDispatch, RootState } from '../store/store';

function useApiCharacter() {

    const dispatch = useDispatch<AppDispatch>();
    const { isLoadingCharacters, characters, characterSelected } = useSelector((state: RootState) => state.character);

    const { showAlert, alert, hideAlert } = useAlert();

    /* const [isLoading, setIsLoading] = useState<boolean>(false); */
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        dispatch(getCharacters());
        showAlert('success', '¡Has iniciado sesión con éxito!');
    }, [])

    return {
        isLoadingCharacter: isLoadingCharacters,
        error,
        alertApiC: alert,
        characterSelected,
        characters,
        hideAlertApiC: hideAlert,
    };
}

export default useApiCharacter;