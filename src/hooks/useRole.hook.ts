import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';
import { createRole, deleteRole, getRoles, serviceAddAssignment, serviceDeleteAssignment, updateRole } from '../store/slices/role/thunks';
import { uribuild } from '../utils/params/uribuild';
import { fetchGetServicesAssignedRole } from '../services/service';


function useRole() {

    const dispatch = useDispatch<AppDispatch>();

    const { roles, count, page, isLoadingRoles } = useSelector(
        (state: RootState) => state.role);

    const [modalEditRole, setModalEditRole] = useState(false);
    const [modalCreateRole, setModalCreateRole] = useState(false);

    const roleEmpty: Role = {
        id: "",
        name: "",
    }

    const handleGetRoles = (page: number, name?: string) => {
        dispatch(getRoles(page, name));
    }

    const handleCreateRole = (role: Role) => {
        dispatch(createRole(role));
    }

    const handleUpdateRole = (role: Role) => {
        dispatch(updateRole(role));
    }

    const handleDeleteRole = (id: string) => {
        dispatch(deleteRole(id));
    }

    const handleOpenModalEditRole = () => {
        setModalEditRole(true);
    };

    const handleCloseModalEditRole = () => {
        setModalEditRole(false);
    };

    const handleOpenModalCreateRole = () => {
        setModalCreateRole(true);
    };

    const handleCloseModalCreateRole = () => {
        setModalCreateRole(false);
    };

    const handleAssignServiceToRole = (roleId: string, services: { services: string[] }) => {
        dispatch(serviceAddAssignment(roleId, services));
    }

    const handleRevokeServiceToRole = (roleId: string, services: { services: string[] }) => {
        dispatch(serviceDeleteAssignment(roleId, services));
    }

    const handleGetServicesAssignedRole = async (roleId: string, page: number, filter?: string) => {
        return await fetchGetServicesAssignedRole(roleId, uribuild({ page, filter }));
    };

    useEffect(() => {
        dispatch(getRoles());
    }, [])

    return {
        count,
        modalCreateRole,
        modalEditRole,
        page,
        roleEmpty,
        roles,
        isLoadingRoles,
        handleCloseModalCreateRole,
        handleCloseModalEditRole,
        handleGetRoles,
        handleOpenModalCreateRole,
        handleOpenModalEditRole,
        handleAssignServiceToRole,
        handleRevokeServiceToRole,
        setModalCreateRole,
        setModalEditRole,
        handleCreateRole,
        handleUpdateRole,
        handleDeleteRole,
        handleGetServicesAssignedRole,
    }
}

export default useRole;