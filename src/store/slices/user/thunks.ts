import { AppDispatch, RootState } from "../../store";
import { fetchCreateUser, fetchGetUser, fetchGetUsers, fetchUpdateUser } from '../../../services/user';;
import { setAlert } from '../common';
import { setCount, setFilter, setPage, setUserSelected, setUsers, startLoadingUserSelected, startLoadingUsers } from "./userSlice";
import { uribuild } from "../../../utils/params/uribuild";


export const getUsers = (page: number = 1, nickname?: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingUsers, userSelected } = getState().user;
            if (!isLoadingUsers) {
                dispatch(startLoadingUsers());
                const users = await fetchGetUsers(uribuild({ page, nickname }));
                await dispatch(setUsers({ users: users.rows }));
                await dispatch(setCount({ count: users.count }));
                await dispatch(setPage({ page }));
                await dispatch(setFilter({ filter: { nickname } }));
                if (!nickname && users.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay usuarios almacenados' }));
                else if (nickname && users.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No existen usuarios para los filtros especificados' }));
                else if (userSelected?.id === '') dispatch(getUser(users.rows[0].id));
            }
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la lista de usuarios.' }));
        }
    };
}

export const getUser = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingUserSelected());
            const user: User = await fetchGetUser(id);
            await dispatch(setUserSelected({ user }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo el usuario.' }));
        }
    };
};

export const createUser = (user: User) => {
    return async (dispatch: AppDispatch) => {
        try {
            const userCreated: User = await fetchCreateUser(user);
            await dispatch(getUsers());
            await dispatch(setUserSelected({ user: userCreated }));
            await dispatch(setAlert({ type: 'success', message: `Usuario "${userCreated.nickname}" creado exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando el usuario.' }));
        }
    };
};

export const updateUser = (user: User) => {
    return async (dispatch: AppDispatch) => {
        try {
            const userUpdated = await fetchUpdateUser(user);
            await dispatch(setUserSelected({ user: userUpdated }));
            await dispatch(getUsers());
            await dispatch(setAlert({ type: 'success', message: 'Usuario actualizado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error actualizando el usuario.' }));
        }
    };
};