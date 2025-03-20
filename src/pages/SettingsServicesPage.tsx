import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Box } from "@mui/system";
import { Grid, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';

import { AppDispatch, RootState } from "../store/store";
import { ButtonComponent } from "../components/common/ButtonComponent";
import { createService, deleteService, updateService } from "../store/slices/service";
import { useDebounce } from "../hooks/useDebounce.hook";
import DialogComponent from "../components/common/DialogComponent";
import FormServiceComponent from "../components/settings/FormServiceComponent";
import ModalComponent from "../components/common/ModalComponent";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import useService from "../hooks/useService.hook";
import useSession from "../hooks/useSession.hook";


const SettingsServicesPage = () => {

    const { services, count, page } = useSelector(
        (state: RootState) => state.service);

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

    const dispatch = useDispatch<AppDispatch>();
    const { serviceEmpty, handleGetServices } = useService();
    const { isAuthenticated, handleValidateAuthorization } = useSession();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [serviceSelected, setServiceSelected] = useState<Service>(serviceEmpty);
    const [searchCodeValue, setSearchCodeValue] = useState<string>('');
    const [searchNameValue, setSearchNameValue] = useState<string>('');

    const debounceSearchCodeValue = useDebounce(searchCodeValue, 500);
    const debounceSearchNameValue = useDebounce(searchNameValue, 500);

    const handleEdit = (id: string) => {
        setOpenModal(true);
        const service = services.find(e => e.id === id);
        service && setServiceSelected(service);
    }

    const handleOpenDialog = (id: string) => {
        const service = services.find(e => e.id === id);
        service && setServiceSelected(service);
        setOpenDialog(true);
    }

    const handleDelete = () => {
        dispatch(deleteService(serviceSelected.id));
        setOpenDialog(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
        setServiceSelected(serviceEmpty);
    }

    useEffect(() => {
        handleGetServices(page, debounceSearchCodeValue, debounceSearchNameValue);
    }, [debounceSearchCodeValue, debounceSearchNameValue]);

    return (<Fragment>
        <DialogComponent
            title={"Está seguro que desea eliminar este servicio?"}
            description={"Luego de eliminar el servicio no podrá reversar esta operación."}
            open={openDialog}
            handleClose={() => setOpenDialog(false)}
            action={handleDelete} />
        <ModalComponent
            width={50}
            open={openModal}
            onClose={() => setOpenModal(false)}>
            <FormServiceComponent
                setModalOpen={setOpenModal}
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
                <ButtonComponent
                    isAuthenticated={isAuthenticated}
                    isAuthorized={handleValidateAuthorization('0403')}
                    label={'Crear servicio'}
                    margin={'0px 0px 20px 0px'}
                    size={'large'}
                    onClick={handleOpenModal}
                />
            </Box>
            <Box sx={{ flexGrow: 1, margin: '12px' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="outlined-basic"
                            label="Código"
                            variant="outlined"
                            onChange={(e) => setSearchCodeValue(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="outlined-basic"
                            label="Nombre"
                            variant="outlined"
                            onChange={(e) => setSearchNameValue(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Box>
            <TableComponent
                editable={handleValidateAuthorization('0404')}
                deleteable={handleValidateAuthorization('0405')}
                data={services}
                totalRows={count}
                headers={headCells}
                title={"Servicios"}
                filters={[debounceSearchCodeValue, debounceSearchNameValue]}
                page={page}
                onEdit={handleEdit}
                onDelete={handleOpenDialog}
                changePage={handleGetServices} />
        </SettingsLayoutComponent>
    </Fragment>)
}

export default SettingsServicesPage;