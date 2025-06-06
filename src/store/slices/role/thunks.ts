import { AppDispatch, RootState } from "../../store";
import { fetchAddServiceAssignment, fetchCreateRole, fetchDeleteRole, fetchDeleteServiceAssignment, fetchGetRole, fetchGetRoles, fetchUpdateRole } from "../../../services/role";
import { setAlert } from '../common';
import { setCount, setEmptyRoleSelected, setFilter, setPage, setRoleSelected, setRoles, startLoadingRoleSelected, startLoadingRoles } from "./roleSlice";
import { uribuild } from "../../../utils/params/uribuild";


export const getRoles = (page: number = 1, name?: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingRoles, roleSelected } = getState().role;
            if (!isLoadingRoles) {
                dispatch(startLoadingRoles());
                const roles = await fetchGetRoles(uribuild({ page, name }));
                await dispatch(setRoles({ roles: roles.rows }));
                await dispatch(setCount({ count: roles.count }));
                await dispatch(setPage({ page }));
                await dispatch(setFilter({ filter: { name } }));
                if (!name && roles.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay roles almacenados' }));
                else if (name && roles.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No existen roles para los filtros especificados' }));
                else if (roleSelected?.id === '') dispatch(getRole(roles.rows[0].id));
            }
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la lista de roles.' }));
        }
    };
};

export const getRole = (id: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingRoleSelected } = getState().role;
            if (!isLoadingRoleSelected) {
                dispatch(startLoadingRoleSelected());
                const role: Role = await fetchGetRole(id);
                await dispatch(setRoleSelected({ role }));
            }
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
    return async (dispatch: AppDispatch) => {
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

export const serviceAddAssignment = (roleId: string, services: { services: string[] }) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        try {
            await fetchAddServiceAssignment(roleId, services);
            await dispatch(getRoles());
            await dispatch(setAlert({ type: 'success', message: 'Servicios asignados exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error asignando los servicios al rol.' }));
        }
    }
}

export const serviceDeleteAssignment = (roleId: string, services: { services: string[] }) => {
    return async (dispatch: AppDispatch): Promise<void> => {
        try {
            await fetchDeleteServiceAssignment(roleId, services);
            await dispatch(getRoles());
            await dispatch(setAlert({ type: 'success', message: 'Servicios asignados exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error revocando los servicios al rol.' }));
        }
    }
}