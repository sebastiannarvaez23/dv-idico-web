import { Fragment, useState } from 'react';
import { Grid, Paper, styled, InputBase, Select, MenuItem } from '@mui/material';

const SearchContainer = styled(Paper)({
    width: '80vw',
    margin: '140px auto 0',
    padding: '10px',
});

const SearchInput = styled(InputBase)({
    width: '100%',
    padding: '10px',
    fontSize: '16px',
});

function SearchElementComponent() {

    const [value, setValue] = useState("Todos");

    const handleSelectChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <SearchContainer elevation={3}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <SearchInput
                            placeholder="Buscar..."
                            inputProps={{ 'aria-label': 'buscar' }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            value={value}
                            onChange={(e) => handleSelectChange(e.target.value as string)}
                            variant="outlined"
                            style={{ width: '80%' }}
                        >
                            <MenuItem value="all">Todos</MenuItem>
                            <MenuItem value="name">Nombre</MenuItem>
                            <MenuItem value="gender">Género</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </SearchContainer>
        </Fragment>
    );
}

export default SearchElementComponent;