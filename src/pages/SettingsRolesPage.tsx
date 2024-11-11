import { Fragment } from "react";
import { useSelector } from 'react-redux';

import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';

import { RootState } from "../store/store";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import useRole from "../hooks/useRole.hook";


const SettingsRolesPage = () => {

    interface HeadCell {
        disablePadding: boolean;
        id: keyof Data;
        label: string;
        numeric: boolean;
    }

    const headCells: HeadCell[] = [
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Nombre',
        },
    ];

    const { handleGetRoles } = useRole();

    const { roles, count } = useSelector(
        (state: RootState) => state.role);

    return (<Fragment>
        <SettingsLayoutComponent>
            <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Roles</Typography>
            <hr />
            <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de roles</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    sx={{ backgroundColor: '#161732', marginBottom: '20px' }}
                    size='large'
                    variant="contained"
                    color="primary">
                    Crear servicio
                </Button>
            </Box>
            <TableComponent
                data={roles}
                totalRows={count}
                headers={headCells}
                title={"Roles"}
                changePage={handleGetRoles} />
        </SettingsLayoutComponent>
    </Fragment>)
}

export default SettingsRolesPage;