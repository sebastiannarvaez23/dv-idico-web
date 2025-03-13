import { AppDispatch, RootState } from "../../store";
import { fetchCreateRole, fetchDeleteRole, fetchGetRole, fetchGetRoles, fetchUpdateRole } from "../../../services/role";
import { setAlert } from '../common';
import { setCount, setEmptyRoleSelected, setRoleSelected, setRoles, startLoadingRoleSelected, startLoadingRoles } from "./roleSlice";


export const getRoles = (page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingRoles());
            const roles = await fetchGetRoles(page);
            await dispatch(setRoles({ roles: roles.rows }));
            await dispatch(setCount({ count: roles.count }));
            if (roles.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay Roles almacenados' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la lista de roles.' }));
        }
    };
};

export const getRole = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingRoleSelected());
            const role: Role = await fetchGetRole(id);
            await dispatch(setRoleSelected({ role }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la rol.' }));
        }
    };
};

export const createRole = (role: Role) => {
    return async (dispatch: AppDispatch) => {
        try {
            const roleCreated: Role = await fetchCreateRole(role);
            await dispatch(getRoles());
            await dispatch(setAlert({ type: 'success', message: `Rol "${roleCreated.name}" creado exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando el rol.' }));
        }
    };
};

export const updateRole = (role: Role) => {
    return async (dispatch: AppDispatch) => {
        try {
            const roleUpdated = await fetchUpdateRole(role);
            await dispatch(setRoleSelected({ role: roleUpdated }));
            await dispatch(getRoles());
            await dispatch(setAlert({ type: 'success', message: 'Rol actualizado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error actualizando el rol.' }));
        }
    };
};

export const deleteRole = (id: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            await fetchDeleteRole(id);
            await dispatch(setEmptyRoleSelected());
            await dispatch(getRoles());
            await dispatch(setAlert({ type: 'success', message: 'Rol eliminado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando el rol.' }));
        }
    };
};