import React from 'react';

import { Grid, Card, Typography, CardMedia } from '@mui/material';


interface RowListComponentProps {
    element: DetailsCardElement,
    handleClickRow: (element: DetailsCardElement) => void;
}

const RowListComponent: React.FC<RowListComponentProps> = ({ element, handleClickRow }) => {
    return (
        <Card
            onClick={() => { handleClickRow(element) }}
            sx={{
                width: '80%',
                margin: '4px auto',
                padding: '4px 8px',
                transition: 'transform 0.3s',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)'
                },
            }}>
            <Grid item xs={12} style={{ cursor: 'pointer' }}>
                <Grid container alignItems="center">
                    <Grid item xs={1}>
                        <CardMedia
                            image={element.image1 as string}
                            alt={`Imagen de ${element.field1}`}
                            component="img"
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
    );
};

export default RowListComponent;
