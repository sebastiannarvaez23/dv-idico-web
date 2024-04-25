import React, { useState } from 'react';
import SidebarComponent from '../components/home/SidebarComponent';
import { Fragment } from 'react';
import { Grid, Paper, styled, InputBase, Select, MenuItem } from '@mui/material';
import CharacterSection from '../components/home/CharacterSectionComponent';

interface SelectFilterProps {
    value: string;
    onChange: (value: string) => void;
}

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

function App() {
    const [value, setValue] = useState("Todos");

    const handleSelectChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <div>
                <SidebarComponent />
            </div>
            <SearchContainer elevation={3}>
                <Grid container spacing={2}>
                    <Grid item xs={6}> {/* Divide el ancho en dos */}
                        <SearchInput
                            placeholder="Buscar..."
                            inputProps={{ 'aria-label': 'buscar' }}
                        />
                    </Grid>
                    <Grid item xs={6}> {/* Divide el ancho en dos */}
                        <Select
                            value={value}
                            onChange={(e) => handleSelectChange(e.target.value as string)}
                            variant="outlined"
                            style={{ width: '80%' }}
                        >
                            <MenuItem value="Todos">Todos</MenuItem>
                            <MenuItem value="Nombre">Nombre</MenuItem>
                            <MenuItem value="Edad">Edad</MenuItem>
                            <MenuItem value="SeriePelicula">Serie o Película</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </SearchContainer>
            <CharacterSection />
        </Fragment>
    );
}

export default App;