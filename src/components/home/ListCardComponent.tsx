import React from 'react';
import { Grid, Card, Typography } from '@mui/material';

interface ComponentListProps {
    elements: DetailsCardElement[];
}

const ListCardComponent: React.FC<ComponentListProps> = ({ elements }) => {
    return (
        <Card style={{ marginBottom: '20px', height: '47vh' }}>
            <div style={{ maxHeight: '380px', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <Grid container spacing={2}>
                    {elements.map((element, index) => (
                        <Card style={{
                            width: '80%',
                            margin: '4px auto',
                            padding: '4px 8px'
                        }}>
                            <Grid item key={index} xs={12} style={{ cursor: 'pointer' }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={1}>
                                        <img src={element.image1} alt={`Imagen de ${element.field1}`} style={{ width: '100%', height: 'auto' }} />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography variant="body1">{element.field1}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    ))}
                </Grid >
            </div >
        </Card>
    );
};

export default ListCardComponent;
