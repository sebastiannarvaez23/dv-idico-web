import { useEffect } from 'react';
import useAlert from './useAlert.hook';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters } from '../store/slices/character';
import { AppDispatch, RootState } from '../store/store';

function useApiCharacter() {

    const dispatch = useDispatch<AppDispatch>();
    const { showAlert, alert, hideAlert } = useAlert();
    const { isLoadingCharacters, characters, characterSelected } = useSelector(
        (state: RootState) => state.character);


    useEffect(() => {
        dispatch(getCharacters());
        showAlert('success', '¡Has iniciado sesión con éxito!');
    }, [])

    return {
        isLoadingCharacter: isLoadingCharacters,
        alertApiC: alert,
        characterSelected,
        characters,
        hideAlertApiC: hideAlert,
    };
}

export default useApiCharacter;