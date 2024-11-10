import { AppDispatch, RootState } from "../../store";
import { fetchCreateGender, fetchGetGender, fetchGetGenders, fetchUpdateGender } from "../../../services/gender";
import { setAlert } from '../common';
import { setEmptyGenderSelected, setGenderSelected, setGenders, startLoadingGenderSelected, startLoadingGenders } from "./genderSlice";


export const getGenders = (page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingGenders());
            const genders = await fetchGetGenders(page);
            await dispatch(setGenders({ genders }));
            if (genders.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay Tipos de Producto almacenados' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la lista de géneros de producto.' }));
        }
    };
};

export const getGender = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingGenderSelected());
            const gender: Gender = await fetchGetGender(id);
            await dispatch(setGenderSelected({ gender }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo el género de producto.' }));
        }
    };
};

export const createGender = (gender: FormData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const genderCreated: Gender = await fetchCreateGender(gender);
            await dispatch(getGenders());
            await dispatch(setAlert({ type: 'success', message: `Género de producto ${genderCreated.name} creado exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando el género de producto.' }));
        }
    };
};

export const updateGender = (gender: FormData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const genderUpdated = await fetchUpdateGender(gender);
            await dispatch(setGenderSelected({ gender: genderUpdated }));
            await dispatch(getGenders());
            await dispatch(setAlert({ type: 'success', message: 'Género de producto actualizado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error actualizando el género de producto.' }));
        }
    };
};

export const deleteGender = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            //const { genderSelected } = getState().gender;
            //await fetchDeleteGender(genderSelected.id);
            await dispatch(setEmptyGenderSelected());
            await dispatch(getGenders());
            await dispatch(setAlert({ type: 'success', message: 'Género de producto eliminado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando el género de producto.' }));
        }
    };
};