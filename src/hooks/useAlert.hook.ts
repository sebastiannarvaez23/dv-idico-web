import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setAlert } from '../store/slices/common';
import { AlertType } from '../types/TypAlert';

const useAlert = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { alert } = useSelector(
        (state: RootState) => state.common);

    const showAlert = (type: AlertType, message: string) => {
        dispatch(setAlert({ type, message }));
    };

    const hideAlert = () => {
        dispatch(setAlert(null));
    };

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        if (alert) {
            timeoutId = setTimeout(() => {
                hideAlert();
            }, 3000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [alert]);

    useEffect(() => showAlert('success', '¡Has iniciado sesión con éxito!'), []);

    return { showAlert, hideAlert };
};

export default useAlert;
