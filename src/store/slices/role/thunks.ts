import { AppDispatch, RootState } from "../../store";
import { fetchCreateRole, fetchDeleteRole, fetchGetRole, fetchGetRoles, fetchUpdateRole } from "../../../services/role";
import { setAlert } from '../common';
import { setEmptyRoleSelected, setRoleSelected, setRoles, startLoadingRoleSelected, startLoadingRoles } from "./roleSlice";


export const getRoles = (page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingRoles());
            const roles = await fetchGetRoles(page);
            await dispatch(setRoles({ roles }));
            if (roles.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay Roles almacenados' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la lista de roleas.' }));
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
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la rolea.' }));
        }
    };
};

export const createRole = (role: FormData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const roleCreated: Role = await fetchCreateRole(role);
            await dispatch(getRoles());
            await dispatch(setAlert({ type: 'success', message: `Rolea ${roleCreated.name} creado exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando la rolea.' }));
        }
    };
};

export const updateRole = (role: FormData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const roleUpdated = await fetchUpdateRole(role);
            await dispatch(setRoleSelected({ role: roleUpdated }));
            await dispatch(getRoles());
            await dispatch(setAlert({ type: 'success', message: 'Rolea actualizado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error actualizando la rolea.' }));
        }
    };
};

export const deleteRole = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { roleSelected } = getState().role;
            await fetchDeleteRole(roleSelected.id);
            await dispatch(setEmptyRoleSelected());
            await dispatch(getRoles());
            await dispatch(setAlert({ type: 'success', message: 'Rolea eliminado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando la rolea.' }));
        }
    };
};