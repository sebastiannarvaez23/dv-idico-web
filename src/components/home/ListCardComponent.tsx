import React from 'react';
import { Grid, Card } from '@mui/material';
import { mapDetailsCardElementToSerieMovie } from '../../utils/mappers/seriemovie.mapper';
import { mapDetailsCardElementToCharacter } from '../../utils/mappers/character.mapper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getCharacter } from '../../store/slices/character';
import { getSerieMovie } from '../../store/slices/seriemovie';
import RowListComponent from '../common/RowListComponent';
import RowListLoadingComponent from '../common/RowListLoadingComponent';

interface ListCardComponentProps {
    elements: DetailsCardElement[];
    sectionSelected: string;
    setSerieMovieSelected?: (e: SerieMovie) => void;
    setCharacterSelected?: (e: Character) => void;
}

const ListCardComponent: React.FC<ListCardComponentProps> = ({ elements, sectionSelected }) => {

    const { isLoadingCharacters } = useSelector(
        (state: RootState) => state.character);

    const { isLoadingSeriesMovies } = useSelector(
        (state: RootState) => state.serieMovie);


    const dispatch = useDispatch<AppDispatch>();

    const handleClickRow = (element: DetailsCardElement): void => {
        if (sectionSelected === "products") {
            dispatch(
                getSerieMovie(
                    mapDetailsCardElementToSerieMovie(element).endpoint));
        }
        if (sectionSelected === "characters") {
            dispatch(
                getCharacter(
                    mapDetailsCardElementToCharacter(element).endpoint));
        }
    }

    return (
        <Card style={{ margin: '10px 0', height: '47vh' }}>
            <div style={{ padding: '20px 0', maxHeight: '380px', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <Grid container spacing={2}>
                    {elements && elements.map((element, index) => (
                        <RowListComponent handleClickRow={handleClickRow} element={element} key={index} />
                    ))}

                    {isLoadingCharacters || isLoadingSeriesMovies && (
                        <RowListLoadingComponent />
                    )}
                </Grid >
            </div >
        </Card >
    );
};

export default ListCardComponent;
