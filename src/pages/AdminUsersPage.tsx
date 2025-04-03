import { Fragment, useState } from "react";

import { Box } from "@mui/system";
import { Grid, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';

import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import { ButtonComponent } from "../components/common/ButtonComponent";
import TableComponent from "../components/common/TableComponent";
import useSession from "../hooks/useSession.hook";


const AdminUsersPage = () => {

    const steps = ['Creación de usuario', 'creación de persona'];

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

    const { isAuthenticated, handleValidateAuthorization } = useSession();
    const { userEmpty } = useUser();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [userSelected, setServiceSelected] = useState<Service>(userEmpty);
    const [searchCodeValue, setSearchCodeValue] = useState<string>('');
    const [searchNameValue, setSearchNameValue] = useState<string>('');

    const handleEdit = (id: string) => {
        setOpenModal(true);
        const user = users.find(e => e.id === id);
        user && setUserSelected(user);
    }

    const handleCreate = (user: User) => {
        handleCreateUser(user);
    }

    const handleUpdate = (user: User) => {
        handleUpdateUser(user);
    }

    const handleDelete = () => {
        handleDeleteUser(userSelected.id);
        setOpenDialog(false);
    }

    const handleOpenDialog = (id: string) => {
        const user = users.find(e => e.id === id);
        user && setUserSelected(user);
        setOpenDialog(true);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
        setUserSelected(userEmpty);
    }

    useEffect(() => {
        handleGetUsers(page, debounceSearchCodeValue, debounceSearchNameValue);
    }, [debounceSearchCodeValue, debounceSearchNameValue]);

    return (
        <Fragment>
            <SettingsLayoutComponent>
                <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Usuarios</Typography>
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
                    data={users}
                    totalRows={count}
                    headers={headCells}
                    title={"Servicios"}
                    filters={[debounceSearchCodeValue, debounceSearchNameValue]}
                    page={page}
                    onEdit={handleEdit}
                    onDelete={handleOpenDialog}
                    changePage={handleGetUsers} />
            </SettingsLayoutComponent>
        </Fragment>
    );
}

export default AdminUsersPage;