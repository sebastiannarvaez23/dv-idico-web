import React from 'react';
import { Grid, Card } from '@mui/material';
import { mapDetailsCardElementToSerieMovie } from '../../utils/mappers/seriemovie.mapper';
import { mapDetailsCardElementToCharacter } from '../../utils/mappers/character.mapper';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getCharacter } from '../../store/slices/character';
import { getSerieMovie } from '../../store/slices/seriemovie';
import RowListComponent from '../common/RowListComponent';
import RowListLoadingComponent from '../common/RowListLoadingComponent';

interface ListCardComponentProps {
    elements: DetailsCardElement[];
    isLoading: boolean;
    sectionSelected: string;
    setSerieMovieSelected?: (e: SerieMovie) => void;
    setCharacterSelected?: (e: Character) => void;
}

const ListCardComponent: React.FC<ListCardComponentProps> = ({ elements, isLoading, sectionSelected }) => {

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
        <Card style={{ marginBottom: '20px', height: '47vh' }}>
            <div style={{ maxHeight: '380px', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <Grid container spacing={2}>
                    {elements && elements.map((element, index) => (
                        <RowListComponent handleClickRow={handleClickRow} element={element} key={index} />
                    ))}

                    {isLoading && (
                        <RowListLoadingComponent />
                    )}
                </Grid >
            </div >
        </Card>
    );
};

export default ListCardComponent;
