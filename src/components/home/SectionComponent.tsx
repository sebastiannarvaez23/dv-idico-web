import { Grid, Paper } from '@mui/material';
import DetailsCard from './DetailsCardComponent';
import ListCardComponent from './ListCardComponent';

interface SectionComponentProps {
    detailElement: DetailsCardElement;
    detailLabels: DetailsLabelCardElement;
    listElement: DetailsCardElement[];
    titleSection: string;
    titleListSection: string;
    isLoading: boolean;
    setSerieMovieSelected?: (e: SerieMovie) => void;
    setCharacterSelected?: (e: Character) => void;
    editElement: () => void;
    deleteElement: () => void;
}

const SectionComponent = ({
    detailElement,
    detailLabels,
    listElement,
    titleSection,
    titleListSection,
    isLoading,
    setSerieMovieSelected,
    setCharacterSelected,
    editElement,
    deleteElement }: SectionComponentProps) => {

    return (
        <Grid style={{ width: '100%', margin: '0 auto' }} container spacing={2}>
            <Grid item xs={6}>
                <Paper className="leftSection" elevation={3}>
                    <h2>{titleSection}</h2>
                    <DetailsCard
                        element={detailElement}
                        label={detailLabels}
                        editElement={editElement}
                        deleteElement={deleteElement} />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className="rightSection" elevation={3}>
                    <h2>{titleListSection}</h2>
                    <ListCardComponent
                        elements={listElement}
                        setSerieMovieSelected={setSerieMovieSelected}
                        setCharacterSelected={setCharacterSelected}
                        isLoading={isLoading} />
                </Paper>
            </Grid>
        </Grid >
    );
}

export default SectionComponent;
