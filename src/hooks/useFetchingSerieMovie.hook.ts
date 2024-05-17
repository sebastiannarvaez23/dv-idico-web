import { useEffect } from 'react';
import useAlert from './useAlert.hook';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { getSeriesMovies } from '../store/slices/seriemovie';

function useApiSerieMovie() {

    const dispatch = useDispatch<AppDispatch>();
    const { alert, hideAlert } = useAlert();

    useEffect(() => {
        dispatch(getSeriesMovies());
    }, [])

    return {
        alertApiSM: alert,
        hideAlertApiSM: hideAlert,
    };
}

export default useApiSerieMovie;
