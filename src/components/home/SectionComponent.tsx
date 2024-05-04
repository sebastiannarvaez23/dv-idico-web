import { Grid, Paper } from '@mui/material';
import DetailsCard from './DetailsCardComponent';
import ListCardComponent from './ListCardComponent';

interface SectionProps {
    detailElement: DetailsCardElement;
    detailLabels: DetailsLabelCardElement;
    listElement: DetailsCardElement[];
    titleSection: string;
    titleListSection: string;
    setSerieMovieSelected?: (e: SerieMovie) => void;
    setCharacterSelected?: (e: Character) => void;
    editElement: () => void;
}

const SectionComponent = ({ detailElement, detailLabels, listElement, setSerieMovieSelected, setCharacterSelected, titleSection, titleListSection, editElement }: SectionProps) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Paper className="leftSection" elevation={3}>
                    <h2>{titleSection}</h2>
                    <DetailsCard
                        element={detailElement}
                        label={detailLabels}
                        editElement={editElement} />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className="rightSection" elevation={3}>
                    <h2>{titleListSection}</h2>
                    <ListCardComponent
                        elements={listElement}
                        setSerieMovieSelected={setSerieMovieSelected}
                        setCharacterSelected={setCharacterSelected} />
                </Paper>
            </Grid>
        </Grid >
    );
}

export default SectionComponent;
