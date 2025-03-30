import { Fragment, useEffect, useState } from "react";

import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import Typography from '@mui/material/Typography';

import { ButtonComponent } from "../components/common/ButtonComponent";
import { useDebounce } from "../hooks/useDebounce.hook";
import DialogComponent from "../components/common/DialogComponent";
import FormRoleComponent from "../components/settings/FormRoleComponent";
import ModalComponent from "../components/common/ModalComponent";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import useRole from "../hooks/useRole.hook";
import useSession from "../hooks/useSession.hook";
import { FormRoleAssigmentService } from "../components/settings/FormRoleAssigmentService";


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

    const {
        roles,
        count,
        page,
        roleEmpty,
        handleGetRoles,
        handleCreateRole,
        handleUpdateRole,
        handleDeleteRole,
    } = useRole();
    const { isAuthenticated, handleValidateAuthorization } = useSession();

    const [openModalAssigmentService, setOpenModalAssigmentService] = useState<boolean>(false);
    const [openModal, setOpenModel] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [roleSelected, setRoleSelected] = useState<Role>(roleEmpty);
    const [searchNameValue, setSearchNameValue] = useState<string>('');
    const [rowsSelected, setRowsSelected] = useState<string[]>([]);

    const debounceSearchNameValue = useDebounce(searchNameValue, 500);

    const handleEdit = (id: string) => {
        setOpenModel(true);
        const role = roles.find(e => e.id === id);
        role && setRoleSelected(role);
    }

    const handleAssignmentService = () => {
        setOpenModalAssigmentService(true);
        const role = roles.find(e => e.id === rowsSelected[0]);
        role && setRoleSelected(role);
    }

    const handleCreate = (role: Role) => {
        handleCreateRole(role);
    }

    const handleUpdate = (role: Role) => {
        handleUpdateRole(role);
    }

    const handleDelete = () => {
        handleDeleteRole(roleSelected.id);
        setOpenDialog(false);
    }

    const handleOpenDialog = (id: string) => {
        const rol = roles.find(e => e.id === id);
        rol && setRoleSelected(rol);
        setOpenDialog(true);
    }

    const handleOpenModal = () => {
        setOpenModel(true);
        setRoleSelected(roleEmpty);
    }

    useEffect(() => {
        handleGetRoles(page, debounceSearchNameValue);
    }, [debounceSearchNameValue]);

    return (<Fragment>
        <DialogComponent
            title={"Está seguro que desea eliminar este rol?"}
            description={"Luego de eliminar el rol no podrá reversar esta operación."}
            open={openDialog}
            handleClose={() => setOpenDialog(false)}
            action={handleDelete} />
        <ModalComponent
            width={50}
            open={openModal}
            onClose={() => setOpenModel(false)}>
            <FormRoleComponent
                setModalOpen={setOpenModel}
                roleSelected={roleSelected}
                page={page}
                title={roleSelected.id ? "Editar rol" : "Crear rol"}
                action={roleSelected.id ? handleUpdate : handleCreate} />
        </ModalComponent>
        <ModalComponent
            width={50}
            open={openModalAssigmentService}
            onClose={() => setOpenModalAssigmentService(false)}>
            <FormRoleAssigmentService
                roleSelected={roleSelected}
                setModalOpen={handleAssignmentService}
            />
        </ModalComponent>
        <SettingsLayoutComponent>
            <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Roles</Typography>
            <hr />
            <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de roles</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ButtonComponent
                    isAuthenticated={isAuthenticated}
                    isAuthorized={handleValidateAuthorization('0306') && rowsSelected.length == 1}
                    label={'Asignar permisos'}
                    margin={'0px 12px 20px 0px'}
                    size={'large'}
                    onClick={handleAssignmentService}
                />
                <ButtonComponent
                    isAuthenticated={isAuthenticated}
                    isAuthorized={handleValidateAuthorization('0303')}
                    label={'Crear rol'}
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
                    onChange={(e) => setSearchNameValue(e.target.value)} />
            </Box>
            <TableComponent
                editable={handleValidateAuthorization('0304')}
                deleteable={handleValidateAuthorization('0305')}
                data={roles}
                totalRows={count}
                headers={headCells}
                title={"Roles"}
                filters={[debounceSearchNameValue]}
                page={page}
                setRowsSelected={setRowsSelected}
                onEdit={handleEdit}
                onDelete={handleOpenDialog}
                changePage={handleGetRoles} />
        </SettingsLayoutComponent>
    </Fragment>)
}

export default SettingsRolesPage;