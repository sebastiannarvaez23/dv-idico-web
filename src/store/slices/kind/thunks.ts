import { AppDispatch, RootState } from "../../store";
import { fetchCreateKind, fetchDeleteKind, fetchGetKind, fetchGetKinds, fetchUpdateKind } from "../../../services/kind";
import { setAlert } from '../common';
import { setCount, setEmptyKindSelected, setFilter, setKindSelected, setKinds, setPage, startLoadingKindSelected, startLoadingKinds } from "./kindSlice";
import { uribuild } from "../../../utils/params/uribuild";


export const getKinds = (page: number = 1, name?: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingKinds, kindSelected } = getState().kind;
            if (!isLoadingKinds) {
                dispatch(startLoadingKinds());
                const kinds = await fetchGetKinds(uribuild({ page, name }));
                await dispatch(setKinds({ kinds: kinds.rows }));
                await dispatch(setCount({ count: kinds.count }));
                await dispatch(setPage({ page }));
                await dispatch(setFilter({ filter: { name } }));
                if (!name && kinds.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay tipos de producto almacenados' }));
                else if (name && kinds.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No existen tipos de producto para los filtros especificados' }));
                else if (kindSelected?.id === '') dispatch(getKind(kinds.rows[0].id));
            }
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la lista de tipos de productos.' }));
        }
    };
};

export const getKind = (id: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingKindSelected } = getState().kind;
            if (!isLoadingKindSelected) {
                dispatch(startLoadingKindSelected());
                const kind: Kind = await fetchGetKind(id);
                await dispatch(setKindSelected({ kind }));
            }
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo el tipo de producto.' }));
        }
    };
};

export const createKind = (kind: Kind) => {
    return async (dispatch: AppDispatch) => {
        try {
            const kindCreated: Kind = await fetchCreateKind(kind);
            await dispatch(getKinds());
            await dispatch(setAlert({ type: 'success', message: `Tipo de producto "${kindCreated.name}" creado exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando el tipo de producto.' }));
        }
    };
};

export const updateKind = (kind: Kind) => {
    return async (dispatch: AppDispatch) => {
        try {
            const kindUpdated = await fetchUpdateKind(kind);
            await dispatch(setKindSelected({ kind: kindUpdated }));
            await dispatch(getKinds());
            await dispatch(setAlert({ type: 'success', message: 'Tipo de producto actualizado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error actualizando el tipo de producto.' }));
        }
    };
};

export const deleteKind = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await fetchDeleteKind(id);
            await dispatch(setEmptyKindSelected());
            await dispatch(getKinds());
            await dispatch(setAlert({ type: 'success', message: 'Tipo de producto eliminado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando el tipo de producto.' }));
        }
    };
};