import { useEffect } from 'react';
import useAlert from './useAlert.hook';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { getSeriesMovies } from '../store/slices/seriemovie';

function useApiSerieMovie() {

    const dispatch = useDispatch<AppDispatch>();
    const { alert, hideAlert } = useAlert();
    const { isLoadingSeriesMovies, seriesMovies, serieMovieSelected } = useSelector(
        (state: RootState) => state.serieMovie);

    useEffect(() => {
        dispatch(getSeriesMovies());
    }, [])

    return {
        isLoadingSerieMovie: isLoadingSeriesMovies,
        alertApiSM: alert,
        serieMovieSelected,
        seriesMovies,
        hideAlertApiSM: hideAlert,
    };
}

export default useApiSerieMovie;
