import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { getProducts } from '../store/slices/product';
import useAlert from './useAlert.hook';

function useProduct() {

    const dispatch = useDispatch<AppDispatch>();
    const { alert, hideAlert } = useAlert();

    useEffect(() => {
        dispatch(getProducts());
    }, [])

    return {
        alertApiSM: alert,
        hideAlertApiSM: hideAlert,
    };
}

export default useProduct;
