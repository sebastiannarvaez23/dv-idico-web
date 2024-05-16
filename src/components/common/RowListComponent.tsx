import { Grid, Card, Typography } from '@mui/material';
import React from 'react';

interface RowListComponentProps {
    element: DetailsCardElement,
    handleClickRow: (element: DetailsCardElement) => void;
}

const RowListComponent: React.FC<RowListComponentProps> = ({ element, handleClickRow }) => {
    return (
        <Card
            onClick={() => { handleClickRow(element) }}
            style={{
                width: '80%',
                margin: '4px auto',
                padding: '4px 8px'
            }}>
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
    );
};

export default RowListComponent;
