import { Fragment, useState } from "react";
import { useSelector } from 'react-redux';

import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';

import { RootState } from "../store/store";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import useService from "../hooks/useService.hook";
import ModalComponent from "../components/common/ModalComponent";
import FormServiceComponent from "../components/settings/FormServiceComponent";
import { createService } from "../store/slices/service";


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

    const [openModal, setOpenModel] = useState<boolean>(false);

    const { serviceEmpty, handleGetServices } = useService();

    const { services, count } = useSelector(
        (state: RootState) => state.service);

    return (<Fragment>
        <ModalComponent
            width={50}
            open={openModal}
            onClose={() => setOpenModel(false)}>
            <FormServiceComponent
                setModalOpen={setOpenModel}
                serviceSelected={serviceEmpty}
                title={"Añadir servicio"}
                action={createService}
            />
        </ModalComponent>
        <SettingsLayoutComponent>
            <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Servicios</Typography>
            <hr />
            <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de servicios</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    onClick={() => setOpenModel(true)}
                    sx={{ backgroundColor: '#161732', marginBottom: '20px' }}
                    size='large'
                    variant="contained"
                    color="primary">
                    Crear servicio
                </Button>
            </Box>
            <TableComponent
                data={services}
                totalRows={count}
                headers={headCells}
                title={"Servicios"}
                changePage={handleGetServices} />
        </SettingsLayoutComponent>
    </Fragment>)
}

export default SettingsServicesPage;