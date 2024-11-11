import { Grid, Paper } from '@mui/material';

import { DeleteElementFunction } from '../../types/TypDeleteElementFunction';
import DetailsCard from './DetailsCardComponent';
import ListCardComponent from './ListCardComponent';


interface ContainerSectionComponentProps {
    detailElement: DetailsCardElement;
    detailLabels: DetailsLabelCardElement;
    listElement: DetailsCardElement[];
    titleSection: string;
    titleListSection: string;
    sectionSelected: string;
    totalRows: number;
    children?: React.ReactNode;
    deleteElement: DeleteElementFunction;
    handleGetElements: (np: number) => void;
    setProductSelected?: (e: Product) => void;
    setCharacterSelected?: (e: Character) => void;
    editElement: () => void;
}

const ContainerSectionComponent = ({
    detailElement,
    detailLabels,
    listElement,
    totalRows,
    titleSection,
    titleListSection,
    sectionSelected,
    handleGetElements,
    setCharacterSelected,
    editElement,
    deleteElement,
    children }: ContainerSectionComponentProps) => {

    return (
        <Grid style={{ width: '100%', margin: '0 auto' }} container spacing={2}>
            <Grid item xs={6}>
                <Paper className="leftSection" elevation={3}>
                    <h2 style={{ paddingTop: '15px' }}>{titleSection}</h2>
                    <DetailsCard
                        element={detailElement}
                        label={detailLabels}
                        deleteElement={deleteElement}
                        children={children}
                        editElement={editElement}>
                    </DetailsCard>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className="rightSection" elevation={3}>
                    <h2 style={{ paddingTop: '15px' }}>{titleListSection}</h2>
                    <ListCardComponent
                        elements={listElement}
                        totalRows={totalRows}
                        sectionSelected={sectionSelected}
                        handleGetElements={handleGetElements}
                        setCharacterSelected={setCharacterSelected} />
                </Paper>
            </Grid>
        </Grid >
    );
}

export default ContainerSectionComponent;
