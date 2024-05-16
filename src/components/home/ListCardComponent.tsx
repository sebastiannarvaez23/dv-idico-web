import React from 'react';
import { Grid, Card, Typography } from '@mui/material';
import { mapDetailsCardElementToSerieMovie } from '../../utils/mappers/seriemovie.mapper';
import { mapDetailsCardElementToCharacter } from '../../utils/mappers/character.mapper';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getCharacter } from '../../store/slices/character';
import { getSerieMovie } from '../../store/slices/seriemovie';

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
                        <Card onClick={() => { handleClickRow(element) }}
                            style={{
                                width: '80%',
                                margin: '4px auto',
                                padding: '4px 8px'
                            }}
                            key={index}>
                            <Grid item xs={12} style={{ cursor: 'pointer' }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={1}>
                                        <img
                                            src={element.image1 as string}
                                            alt={`Imagen de ${element.field1}`}
                                            style={{
                                                width: '40px', height: '60px', objectFit: 'cover', borderRadius: '4px',
                                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)'
                                            }} />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography variant="body1">{element.field1}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    ))}

                    {isLoading && (
                        <Card style={{
                            width: '80%',
                            height: '50px',
                            margin: '4px auto',
                            padding: '4px 8px',
                        }}>
                            <Grid item xs={12} style={{ cursor: 'pointer', padding: '20px 0' }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={10}>
                                        <Typography variant="body1">{"Cargando..."}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    )}
                </Grid >
            </div >
        </Card>
    );
};

export default ListCardComponent;
