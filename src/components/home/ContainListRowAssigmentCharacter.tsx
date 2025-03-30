import { Fragment } from "react";

import { Grid, Typography, Checkbox } from '@mui/material';

import { ImageRowComponent } from "../common/ImageRowComponent";


interface ContainListRowAssigmentCharacterProps {
    element: DetailsCardElement,
    handleCheck?: (id: string, value: boolean) => void;
}


export const ContainListRowAssigmentCharacter = ({ element, handleCheck }: ContainListRowAssigmentCharacterProps) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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
                    <Grid item xs={8}>
                        <Typography variant="body1">{element.field1}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        {element.check1 !== undefined &&
                            <Checkbox {...label} checked={!!element.check1} onChange={(e) => {
                                if (handleCheck) {
                                    handleCheck(element.id, e.target.checked);
                                }
                            }} />
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
}