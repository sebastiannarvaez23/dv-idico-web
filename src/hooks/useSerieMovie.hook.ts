import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { getSeriesMovies } from '../store/slices/seriemovie';
import useAlert from './useAlert.hook';

function useSerieMovie() {

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

export default useSerieMovie;
