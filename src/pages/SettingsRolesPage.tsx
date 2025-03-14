import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';

import { AppDispatch, RootState } from "../store/store";
import { createRole, deleteRole, updateRole } from "../store/slices/role";
import DialogComponent from "../components/common/DialogComponent";
import FormRoleComponent from "../components/settings/FormRoleComponent";
import ModalComponent from "../components/common/ModalComponent";
import SettingsLayoutComponent from "../components/settings/SettingsLayoutComponent";
import TableComponent from "../components/common/TableComponent";
import useRole from "../hooks/useRole.hook";
import { useDebounce } from "../hooks/useDebounce.hook";


const SettingsRolesPage = () => {

    const { roles, count, page } = useSelector(
        (state: RootState) => state.role);

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

    const dispatch = useDispatch<AppDispatch>();

    const { roleEmpty, handleGetRoles } = useRole();

    const [openModal, setOpenModel] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [roleSelected, setRoleSelected] = useState<Role>(roleEmpty);

    const [searchNameValue, setSearchNameValue] = useState<string>('');

    const debounceSearchNameValue = useDebounce(searchNameValue, 500);

    const handleEdit = (id: string) => {
        setOpenModel(true);
        const role = roles.find(e => e.id === id);
        role && setRoleSelected(role);
    }

    const handleOpenDialog = (id: string) => {
        const rol = roles.find(e => e.id === id);
        rol && setRoleSelected(rol);
        setOpenDialog(true);
    }

    const handleDelete = () => {
        dispatch(deleteRole(roleSelected.id));
        setOpenDialog(false);
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
                title={roleSelected.id ? "Editar rol" : "Crear rol"}
                action={roleSelected.id ? updateRole : createRole} />
        </ModalComponent>
        <SettingsLayoutComponent>
            <Typography variant="h4" sx={{ textAlign: 'left', margin: '20px 0' }}>Gestión de Roles</Typography>
            <hr />
            <Typography variant="h6" sx={{ textAlign: 'left', margin: '20px 0' }}>Listado de roles</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    onClick={() => alert('Funcionalidad en construcción')}
                    sx={{ backgroundColor: '#161732', marginBottom: '20px', marginRight: '12px' }}
                    size='large'
                    variant="contained"
                    color="primary">
                    Asiganar permisos
                </Button>
                <Button
                    onClick={handleOpenModal}
                    sx={{ backgroundColor: '#161732', marginBottom: '20px' }}
                    size='large'
                    variant="contained"
                    color="primary">
                    Crear rol
                </Button>
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
                editable={true}
                deleteable={true}
                data={roles}
                totalRows={count}
                headers={headCells}
                title={"Roles"}
                filters={[debounceSearchNameValue]}
                page={page}
                onEdit={handleEdit}
                onDelete={handleOpenDialog}
                changePage={handleGetRoles} />
        </SettingsLayoutComponent>
    </Fragment>)
}

export default SettingsRolesPage;