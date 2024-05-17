import React from 'react';
import { Grid, Card, Typography } from '@mui/material';

interface RowListLoadingComponentProps { }

const RowListLoadingComponent: React.FC<RowListLoadingComponentProps> = () => {
    return (
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
    );
};

export default RowListLoadingComponent;
