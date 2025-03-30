import { Fragment } from "react";

import { Grid, Typography } from '@mui/material';

import { ImageRowComponent } from "../common/ImageRowComponent";


interface ContainListRowProps {
    element: DetailsCardElement,
}

export const ContainListRow = ({ element }: ContainListRowProps) => {
    return (
        <Fragment>
            <Grid item xs={12} style={{ cursor: 'pointer' }}>
                <Grid container alignItems="center">
                    <Grid item xs={1}>
                        <ImageRowComponent
                            image={element.image1 as string}
                            alt={`Imagen de ${element.field1}`}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="body1">{element.field1}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
}