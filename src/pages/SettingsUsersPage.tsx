import { Fragment } from "react";
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';

import { RootState } from "../store/store";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import usePerson from "../hooks/usePerson.hook";
import { Box } from "@mui/system";
import { Grid, TextField } from "@mui/material";


const SettingsUserPage = () => {

    interface HeadCell {
        disablePadding: boolean;
        id: keyof Data;
        label: string;
        numeric: boolean;
    }

    const headCells: HeadCell[] = [
        {
            id: 'firstName',
            numeric: false,
            disablePadding: true,
            label: 'Nombres'
        },
        {
            id: 'lastName',
            numeric: false,
            disablePadding: false,
            label: 'Apellidos',
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: false,
            label: 'Email',
        },
        {
            id: 'phone',
            numeric: false,
            disablePadding: false,
            label: 'Teléfono',
        },
        {
            id: 'birthDate',
            numeric: false,
            disablePadding: false,
            label: 'Fec Nacimiento',
        },
    ];

    const { handleGetPersons } = usePerson();

    const { persons, count } = useSelector(
        (state: RootState) => state.person);

    return (<Fragment>
        <SettingsLayoutComponent>
            <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Personas</Typography>
            <hr />
            <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de personas</Typography>
            <Box sx={{ flexGrow: 1, margin: '12px' }}>
                <Grid container sx={{ alignContent: 'center' }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField sx={{ width: '95%' }} id="outlined-basic" label="Nombres" variant="outlined" />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField sx={{ width: '95%' }} id="outlined-basic" label="Apellidos" variant="outlined" />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <TextField sx={{ width: '95%' }} id="outlined-basic" label="Email" variant="outlined" />
                    </Grid>
                </Grid>
            </Box>
            <TableComponent
                data={persons}
                totalRows={count}
                headers={headCells}
                title={"Personas"}
                changePage={handleGetPersons} />
        </SettingsLayoutComponent>
    </Fragment>)
}

export default SettingsUserPage;