import { Fragment, useEffect, useState } from "react";

import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import Typography from '@mui/material/Typography';

import { ButtonComponent } from "../components/common/ButtonComponent";
import { mapUserToRowTableUser } from "../utils/mappers/user-row-table.mapper";
import { useDebounce } from "../hooks/useDebounce.hook";
import ModalComponent from "../components/common/ModalComponent";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import useSession from "../hooks/useSession.hook";
import useUser from "../hooks/useUser.hook";
import StepsCreateUser from "../components/settings/StepsCreateUser";
import FormUserComponent from "../components/settings/FormUserComponent";


const AdminUsersPage = () => {

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
        {
            id: 'lastAuth',
            numeric: false,
            disablePadding: false,
            label: 'Ultima conexión',
        },
        {
            id: 'origin',
            numeric: false,
            disablePadding: false,
            label: 'Origen',
        },
    ];

    const { isAuthenticated, handleValidateAuthorization } = useSession();
    const { users, userEmpty, page, count, handleUpdateUser, handleGetUsers } = useUser();

    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [userSelected, setUserSelected] = useState<User>(userEmpty);
    const [searchNicknameValue, setSearchNicknameValue] = useState<string>('');

    const debounceSearchNicknameValue = useDebounce(searchNicknameValue, 500);

    const handleEdit = (id: string) => {
        setOpenModalEdit(true);
        const user = users.find(e => e.id === id);
        user && setUserSelected(user);
    }

    const handleUpdate = (user: User) => {
        handleUpdateUser(user);
    }

    const handleOpenModal = () => {
        setOpenModalCreate(true);
        setUserSelected(userEmpty);
    }

    useEffect(() => {
        handleGetUsers(page, debounceSearchNicknameValue);
    }, [debounceSearchNicknameValue]);

    return (
        <Fragment>
            <ModalComponent
                width={50}
                open={openModalCreate}
                onClose={() => setOpenModalCreate(false)}>
                <StepsCreateUser
                    setOpenModal={setOpenModalCreate}
                />
            </ModalComponent>
            <ModalComponent
                width={50}
                open={openModalEdit}
                onClose={() => setOpenModalEdit(false)}>
                <FormUserComponent
                    userSelected={userSelected}
                    title={"Edición de usuario"}
                    page={page}
                    action={(user) => handleUpdate(user)}
                />
            </ModalComponent>
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
                        label="Nombre de usuario"
                        variant="outlined"
                        onChange={(e) => setSearchNicknameValue(e.target.value)} />
                </Box>
                <TableComponent
                    editable={handleValidateAuthorization('0404')}
                    deleteable={false}
                    data={users.map(e => mapUserToRowTableUser(e))}
                    totalRows={count}
                    headers={headCells}
                    title={"Servicios"}
                    filters={[debounceSearchNicknameValue]}
                    page={page}
                    onEdit={handleEdit}
                    onDelete={() => { }}
                    changePage={handleGetUsers} />
            </SettingsLayoutComponent>
        </Fragment>
    );
}

export default AdminUsersPage;