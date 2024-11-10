import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Fragment } from "react";
import { RootState } from "../store/store";
import { useSelector } from 'react-redux';
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import Typography from '@mui/material/Typography';
import useService from "../hooks/useService.hook";

const SettingsServicesPage = () => {

    interface HeadCell {
        disablePadding: boolean;
        id: keyof Data;
        label: string;
        numeric: boolean;
    }

    const headCells: HeadCell[] = [
        {
            id: 'code',
            numeric: false,
            disablePadding: true,
            label: 'Código'
        },
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Nombre',
        },
    ];

    const { handleGetServices } = useService();

    const { services } = useSelector(
        (state: RootState) => state.service);

    return (<Fragment>
        <SettingsLayoutComponent>
            <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Servicios</Typography>
            <hr />
            <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de servicios</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    sx={{ backgroundColor: '#161732', marginBottom: '20px' }}
                    size='large'
                    variant="contained"
                    color="primary">
                    Crear servicio
                </Button>
            </Box>
            {services.length > 0 && (
                <TableComponent
                    data={services}
                    totalRows={12}
                    headers={headCells}
                    title={"Servicios"}
                    changePage={handleGetServices} />
            )}
        </SettingsLayoutComponent>
    </Fragment>)
}

export default SettingsServicesPage;