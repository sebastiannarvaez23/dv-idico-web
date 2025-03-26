import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';
import { createRole, deleteRole, getRoles, updateRole } from '../store/slices/role/thunks';


function useRole() {

    const dispatch = useDispatch<AppDispatch>();

    const { roles, count, page } = useSelector(
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
        handleCloseModalCreateRole,
        handleCloseModalEditRole,
        handleGetRoles,
        handleOpenModalCreateRole,
        handleOpenModalEditRole,
        setModalCreateRole,
        setModalEditRole,
        handleCreateRole,
        handleUpdateRole,
        handleDeleteRole,
    }
}

export default useRole;