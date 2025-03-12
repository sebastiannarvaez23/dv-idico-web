import { Fragment, useState } from "react";
import { useSelector } from 'react-redux';

import { Box } from "@mui/system";
import { Button, Grid, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';

import { createService, updateService } from "../store/slices/service";
import { RootState } from "../store/store";
import FormServiceComponent from "../components/settings/FormServiceComponent";
import ModalComponent from "../components/common/ModalComponent";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
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

    const { serviceEmpty, handleGetServices } = useService();

    const [openModal, setOpenModel] = useState<boolean>(false);
    const [serviceSelected, setServiceSelected] = useState<Service>(serviceEmpty);

    const { services, count } = useSelector(
        (state: RootState) => state.service);

    const handleEdit = (id: string) => {
        setOpenModel(true);
        const service = services.find(e => e.id === id);
        service && setServiceSelected(service);
    }

    const handleOpenModal = () => {
        setOpenModel(true);
        setServiceSelected(serviceEmpty);
    }

    return (<Fragment>
        <ModalComponent
            width={50}
            open={openModal}
            onClose={() => setOpenModel(false)}>
            <FormServiceComponent
                setModalOpen={setOpenModel}
                serviceSelected={serviceSelected}
                title={serviceSelected.id ? "Editar servicio" : "Crear servicio"}
                action={serviceSelected.id ? updateService : createService}
            />
        </ModalComponent>
        <SettingsLayoutComponent>
            <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Servicios</Typography>
            <hr />
            <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de servicios</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    onClick={handleOpenModal}
                    sx={{ backgroundColor: '#161732', marginBottom: '20px' }}
                    size='large'
                    variant="contained"
                    color="primary">
                    Crear servicio
                </Button>
            </Box>
            <Box sx={{ flexGrow: 1, margin: '12px' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <TextField sx={{ width: '100%' }} id="outlined-basic" label="Código" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField sx={{ width: '100%' }} id="outlined-basic" label="Nombre" variant="outlined" />
                    </Grid>
                </Grid>
            </Box>
            <TableComponent
                editable={true}
                deleteable={false}
                onEdit={handleEdit}
                data={services}
                totalRows={count}
                headers={headCells}
                title={"Servicios"}
                changePage={handleGetServices} />
        </SettingsLayoutComponent>
    </Fragment>)
}

export default SettingsServicesPage;