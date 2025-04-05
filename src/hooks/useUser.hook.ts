import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';
import { createUser, getUsers, updateUser } from '../store/slices/user';


function useUser() {
    const dispatch = useDispatch<AppDispatch>();

    const { users, count, page } = useSelector(
        (state: RootState) => state.user);

    const [modalEditUser, setModalEditUser] = useState(false);
    const [modalCreateUser, setModalCreateUser] = useState(false);

    const userEmpty: User = {
        id: "",
        nickname: "",
        password: "",
        lastAuth: "",
        origin: "",
        active: false,
    }

    const handleGetUsers = (page: number, nickname?: string) => {
        dispatch(getUsers(page, nickname));
    }

    const handleCreateUser = (user: User) => {
        dispatch(createUser(user));
    }

    const handleUpdateUser = (user: User) => {
        dispatch(updateUser(user));
    }

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return {
        users,
        count,
        page,
        modalEditUser,
        modalCreateUser,
        userEmpty,
        setModalEditUser,
        setModalCreateUser,
        handleGetUsers,
        handleCreateUser,
        handleUpdateUser
    }
}

export default useUser;