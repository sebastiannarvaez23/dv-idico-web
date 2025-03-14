import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/store';
import { getRoles } from '../store/slices/role/thunks';


function useRole() {

    const dispatch = useDispatch<AppDispatch>();

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
        roleEmpty,
        modalCreateRole,
        modalEditRole,
        setModalEditRole,
        setModalCreateRole,
        handleGetRoles,
        handleOpenModalEditRole,
        handleCloseModalEditRole,
        handleOpenModalCreateRole,
        handleCloseModalCreateRole,
    }
}

export default useRole;