import { useEffect } from 'react';
import useAlert from './useAlert.hook';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters } from '../store/slices/character';
import { AppDispatch, RootState } from '../store/store';

function useApiCharacter() {

    const dispatch = useDispatch<AppDispatch>();
    const { showAlert, alert, hideAlert } = useAlert();

    useEffect(() => {
        dispatch(getCharacters());
        showAlert('success', '¡Has iniciado sesión con éxito!');
    }, [])

    return {
        alertApiC: alert,
        hideAlertApiC: hideAlert,
    };
}

export default useApiCharacter;