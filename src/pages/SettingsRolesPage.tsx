import { Fragment, useState } from "react";
import { useSelector } from 'react-redux';

import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';

import { createRole, updateRole } from "../store/slices/role";
import { RootState } from "../store/store";
import FormRoleComponent from "../components/settings/FormRoleComponent";
import ModalComponent from "../components/common/ModalComponent";
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

    const { handleGetRoles, roleEmpty } = useRole();

    const [openModal, setOpenModel] = useState<boolean>(false);
    const [roleSelected, setRoleSelected] = useState<Role>(roleEmpty);

    const { roles, count } = useSelector(
        (state: RootState) => state.role);

    const handleEdit = (id: string) => {
        setOpenModel(true);
        const role = roles.find(e => e.id === id);
        role && setRoleSelected(role);
    }

    const handleOpenModal = () => {
        setOpenModel(true);
        setRoleSelected(roleEmpty);
    }

    return (<Fragment>
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
                    onClick={handleOpenModal}
                    sx={{ backgroundColor: '#161732', marginBottom: '20px' }}
                    size='large'
                    variant="contained"
                    color="primary">
                    Crear rol
                </Button>
            </Box>
            <TableComponent
                editable={true}
                deleteable={true}
                onEdit={handleEdit}
                data={roles}
                totalRows={count}
                headers={headCells}
                title={"Roles"}
                changePage={handleGetRoles} />
        </SettingsLayoutComponent>
    </Fragment>)
}

export default SettingsRolesPage;