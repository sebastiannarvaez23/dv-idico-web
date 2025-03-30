import { Grid, Paper } from '@mui/material';

import DetailsCardComponent from './DetailsCardComponent';
import ListCardComponent from './ListCardComponent';
import { ContainListRow } from './ContainListRow';


interface ContainerSectionComponentProps {
    detailElement: DetailsCardElement;
    listElement: DetailsCardElement[];
    titleSection: string;
    titleListSection: string;
    sectionSelected: string;
    totalRows: number;
    children?: React.ReactNode;
    page: number;
    filter?: string;
    handleGetElements: (np: number) => void;
    setProductSelected?: (e: Product) => void;
    setCharacterSelected?: (e: Character) => void;
}

const ContainerSectionComponent = ({
    detailElement,
    listElement,
    totalRows,
    titleSection,
    titleListSection,
    sectionSelected,
    page,
    filter,
    handleGetElements,
    setCharacterSelected,
    children
}: ContainerSectionComponentProps) => {

    return (
        <Grid style={{ width: '100%', margin: '0 auto' }} container spacing={2}>
            <Grid item xs={6}>
                <Paper className="leftSection" elevation={3}>
                    <h2 style={{ paddingTop: '15px' }}>{titleSection}</h2>
                    <DetailsCardComponent
                        element={detailElement}
                        children={children}>
                    </DetailsCardComponent>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className="rightSection" elevation={3}>
                    <h2 style={{ paddingTop: '15px' }}>{titleListSection}</h2>
                    <ListCardComponent
                        page={page}
                        filter={filter}
                        elements={listElement}
                        totalRows={totalRows}
                        sectionSelected={sectionSelected}
                        handleGetElements={handleGetElements}
                        setCharacterSelected={setCharacterSelected}
                        rowComponent={ContainListRow} />
                </Paper>
            </Grid>
        </Grid >
    );
}

export default ContainerSectionComponent;
