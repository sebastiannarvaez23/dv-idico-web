import { Grid, Paper } from '@mui/material';
import DetailsCard from './DetailsCardComponent';
import ListCardComponent from './ListCardComponent';

interface SectionProps {
    detailElement: DetailsCardElement;
    detailLabels: DetailsLabelCardElement;
    listElement: DetailsCardElement[];
}

function SectionComponent({ detailElement, detailLabels, listElement }: SectionProps) {

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Paper className="leftSection" elevation={3}>
                    <h2>Serie o Película</h2>
                    <DetailsCard
                        element={detailElement}
                        label={detailLabels} />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className="rightSection" elevation={3}>
                    <h2>Listado de Series y Peliculas</h2>
                    <ListCardComponent elements={listElement} />
                </Paper>
            </Grid>
        </Grid >
    );
}

export default SectionComponent;
