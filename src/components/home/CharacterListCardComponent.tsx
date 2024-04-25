import React from 'react';
import { Grid, Card, Typography } from '@mui/material';

interface Character {
    name: string;
    imageUrl: string;
}

interface CharacterListProps {
    characters: Character[];
}

const CharacterListCardComponent: React.FC<CharacterListProps> = ({ characters }) => {
    return (
        <div style={{ maxHeight: '380px', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <Grid container spacing={2}>
                {characters.map((character, index) => (
                    <Card style={{
                        width: '80%',
                        margin: '4px auto',
                        padding: '4px 8px'
                    }}>
                        <Grid item key={index} xs={12} style={{ cursor: 'pointer' }}>
                            <Grid container alignItems="center">
                                <Grid item xs={1}>
                                    <img src={character.imageUrl} alt={`Imagen de ${character.name}`} style={{ width: '100%', height: 'auto' }} />
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="body1">{character.name}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                ))}
            </Grid >
        </div >
    );
};

export default CharacterListCardComponent;
