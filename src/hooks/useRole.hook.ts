import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';
import { getRoles } from '../store/slices/role/thunks';


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
    }
}

export default useRole;