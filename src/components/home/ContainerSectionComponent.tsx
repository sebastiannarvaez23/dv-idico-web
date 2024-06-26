import { Grid, Paper } from '@mui/material';
import DetailsCard from './DetailsCardComponent';
import ListCardComponent from './ListCardComponent';
import { DeleteElementFunction } from '../../types/TypDeleteElementFunction';

interface ContainerSectionComponentProps {
    detailElement: DetailsCardElement;
    detailLabels: DetailsLabelCardElement;
    listElement: DetailsCardElement[];
    titleSection: string;
    titleListSection: string;
    sectionSelected: string;
    deleteElement: DeleteElementFunction;
    setProductSelected?: (e: Product) => void;
    setCharacterSelected?: (e: Character) => void;
    editElement: () => void;
}

const ContainerSectionComponent = ({
    detailElement,
    detailLabels,
    listElement,
    titleSection,
    titleListSection,
    sectionSelected,
    setCharacterSelected,
    editElement,
    deleteElement }: ContainerSectionComponentProps) => {

    return (
        <Grid style={{ width: '100%', margin: '0 auto' }} container spacing={2}>
            <Grid item xs={6}>
                <Paper className="leftSection" elevation={3}>
                    <h2>{titleSection}</h2>
                    <DetailsCard
                        element={detailElement}
                        label={detailLabels}
                        deleteElement={deleteElement}
                        editElement={editElement} />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className="rightSection" elevation={3}>
                    <h2>{titleListSection}</h2>
                    <ListCardComponent
                        elements={listElement}
                        sectionSelected={sectionSelected}
                        setCharacterSelected={setCharacterSelected} />
                </Paper>
            </Grid>
        </Grid >
    );
}

export default ContainerSectionComponent;
