import { Fragment, useEffect, useState } from "react";

import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import Typography from '@mui/material/Typography';

import { ButtonComponent } from "../components/common/ButtonComponent";
import { mapUserToRowTableUser } from "../utils/mappers/user-row-table.mapper";
import { useDebounce } from "../hooks/useDebounce.hook";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import useSession from "../hooks/useSession.hook";
import useUser from "../hooks/useUser.hook";


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
            id: 'nickname',
            numeric: false,
            disablePadding: false,
            label: 'Nombre de usuario',
        },
        {
            id: 'active',
            numeric: false,
            disablePadding: false,
            label: 'Activo',
        },
    ];

    const { isAuthenticated, handleValidateAuthorization } = useSession();
    const {
        users,
        userEmpty,
        page,
        count,
        handleCreateUser,
        handleUpdateUser,
        handleGetUsers
    } = useUser();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [userSelected, setUserSelected] = useState<User>(userEmpty);
    const [searchNicknameValue, setSearchNicknameValue] = useState<string>('');

    const debounceSearchNicknameValue = useDebounce(searchNicknameValue, 500);

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
        handleGetUsers(page, debounceSearchNicknameValue);
    }, [debounceSearchNicknameValue]);

    return (
        <Fragment>
            <SettingsLayoutComponent>
                <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Usuarios</Typography>
                <hr />
                <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de usuarios</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ButtonComponent
                        isAuthenticated={isAuthenticated}
                        isAuthorized={handleValidateAuthorization('0403')}
                        label={'Crear usuario'}
                        margin={'0px 0px 20px 0px'}
                        size={'large'}
                        onClick={handleOpenModal}
                    />
                </Box>
                <Box sx={{ flexGrow: 1, margin: '12px' }}>
                    <TextField
                        sx={{ width: '100%' }}
                        id="outlined-basic"
                        label="Nombre"
                        variant="outlined"
                        onChange={(e) => setSearchNicknameValue(e.target.value)} />
                </Box>
                <TableComponent
                    editable={handleValidateAuthorization('0404')}
                    deleteable={handleValidateAuthorization('0405')}
                    data={users.map(e => mapUserToRowTableUser(e))}
                    totalRows={count}
                    headers={headCells}
                    title={"Servicios"}
                    filters={[debounceSearchNicknameValue]}
                    page={page}
                    onEdit={handleEdit}
                    onDelete={handleOpenDialog}
                    changePage={handleGetUsers} />
            </SettingsLayoutComponent>
        </Fragment>
    );
}

export default AdminUsersPage;