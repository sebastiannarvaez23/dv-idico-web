import { AppDispatch, RootState } from "../../store";
import { fetchCreateKind, fetchGetKind, fetchGetKinds, fetchUpdateKind } from "../../../services/kind";
import { setEmptyKindSelected, setKindSelected, setKinds, startLoadingKindSelected, startLoadingKinds } from "./kindSlice";
import { setAlert } from '../common';

export const getKinds = (page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingKinds());
            const kinds = await fetchGetKinds(page);
            await dispatch(setKinds({ kinds }));
            if (kinds.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay Tipos de Producto almacenados' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la lista de productos.' }));
        }
    };
};

export const getKind = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingKindSelected());
            const kind: Kind = await fetchGetKind(id);
            await dispatch(setKindSelected({ kind }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo el tipo de producto.' }));
        }
    };
};

export const createKind = (kind: FormData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const kindCreated: Kind = await fetchCreateKind(kind);
            await dispatch(getKinds());
            await dispatch(setAlert({ type: 'success', message: `Tipo de producto ${kindCreated.name} creado exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando el tipo de producto.' }));
        }
    };
};

export const updateKind = (kind: FormData) => {
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

export const deleteKind = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            //const { kindSelected } = getState().kind;
            //await fetchDeleteKind(kindSelected.id);
            await dispatch(setEmptyKindSelected());
            await dispatch(getKinds());
            await dispatch(setAlert({ type: 'success', message: 'Tipo de producto eliminado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando el tipo de producto.' }));
        }
    };
};