import React from 'react';
import { Grid, Card, Typography } from '@mui/material';
import { mapDetailsCardElementToSerieMovie } from '../../utils/mappers/seriemovie.mapper';
import { mapDetailsCardElementToCharacter } from '../../utils/mappers/character.mapper';

interface ListCardComponentProps {
    elements: DetailsCardElement[];
    isLoading: boolean;
    setSerieMovieSelected?: (e: SerieMovie) => void;
    setCharacterSelected?: (e: Character) => void;
}

const ListCardComponent: React.FC<ListCardComponentProps> = ({ elements, isLoading, setSerieMovieSelected, setCharacterSelected }) => {
    return (
        <Card style={{ marginBottom: '20px', height: '47vh' }}>
            <div style={{ maxHeight: '380px', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <Grid container spacing={2}>
                    {elements && elements.map((element, index) => (
                        <Card onClick={() => {
                            if (setSerieMovieSelected && typeof setSerieMovieSelected === 'function') {
                                setSerieMovieSelected(mapDetailsCardElementToSerieMovie(element));
                            } else if (setCharacterSelected && typeof setCharacterSelected === 'function') {
                                setCharacterSelected(mapDetailsCardElementToCharacter(element));
                            }
                        }}
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
                                            style={{ width: '40px', height: '60px', objectFit: 'cover' }} />
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
