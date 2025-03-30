import { Fragment } from "react";

import { Checkbox, Grid, Typography } from "@mui/material";


interface ContainListRowAssigmentServiceProps {
    element: DetailsCardElement,
    handleCheck?: (id: string, value: boolean) => void;
}

export const ContainListRowAssigmentService = ({ element, handleCheck }: ContainListRowAssigmentServiceProps) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return (
        <Fragment>
            <Grid item xs={12} style={{ cursor: 'pointer' }}>
                <Grid container alignItems="center">
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