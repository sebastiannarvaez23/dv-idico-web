import { AppDispatch, RootState } from "../../store";
import { fetchCreateGender, fetchDeleteGender, fetchGetGender, fetchGetGenders, fetchUpdateGender } from "../../../services/gender";
import { setAlert } from '../common';
import { setCount, setEmptyGenderSelected, setFilter, setGenderSelected, setGenders, setPage, startLoadingGenderSelected, startLoadingGenders } from "./genderSlice";
import { uribuild } from "../../../utils/params/uribuild";


export const getGenders = (page: number = 1, name?: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingGenders, genderSelected } = getState().gender;
            if (!isLoadingGenders) {
                dispatch(startLoadingGenders());
                const genders = await fetchGetGenders(uribuild({ page, name }));
                await dispatch(setGenders({ genders: genders.rows }));
                await dispatch(setCount({ count: genders.count }));
                await dispatch(setPage({ page }));
                await dispatch(setFilter({ filter: { name } }));
                if (!name && genders.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay géneros almacenados' }));
                else if (name && genders.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No existen géneros para los filtros especificados' }));
                else if (genderSelected?.id === '') dispatch(getGender(genders.rows[0].id));
            }
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la lista de géneros de producto.' }));
        }
    };
};

export const getGender = (id: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingGenderSelected } = getState().gender;
            if (!isLoadingGenderSelected) {
                dispatch(startLoadingGenderSelected());
                const gender: Gender = await fetchGetGender(id);
                await dispatch(setGenderSelected({ gender }));
            }
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo el género de producto.' }));
        }
    };
};

export const createGender = (gender: Gender) => {
    return async (dispatch: AppDispatch) => {
        try {
            const genderCreated: Gender = await fetchCreateGender(gender);
            await dispatch(getGenders());
            await dispatch(setAlert({ type: 'success', message: `Género de producto "${genderCreated.name}" creado exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando el género de producto.' }));
        }
    };
};

export const updateGender = (gender: Gender) => {
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

export const deleteGender = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await fetchDeleteGender(id);
            await dispatch(setEmptyGenderSelected());
            await dispatch(getGenders());
            await dispatch(setAlert({ type: 'success', message: 'Género de producto eliminado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando el género de producto.' }));
        }
    };
};