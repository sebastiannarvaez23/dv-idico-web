import { AppDispatch, RootState } from "../../store";
import { fetchCreatePerson, fetchDeletePerson, fetchGetPerson, fetchGetPersons, fetchUpdatePerson } from "../../../services/person";
import { setEmptyPersonSelected, setPersonSelected, setPersons, startLoadingPersonSelected, startLoadingPersons } from "./personSlice";
import { setAlert } from '../common';

export const getPersons = (page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingPersons());
            const persons = await fetchGetPersons(page);
            await dispatch(setPersons({ persons }));
            if (persons.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay Persons almacenados' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la lista de personas.' }));
        }
    };
};

export const getPerson = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingPersonSelected());
            const person: Person = await fetchGetPerson(id);
            await dispatch(setPersonSelected({ person }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la persona.' }));
        }
    };
};

export const createPerson = (person: FormData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const personCreated: Person = await fetchCreatePerson(person);
            await dispatch(getPersons());
            await dispatch(setAlert({ type: 'success', message: `Persona ${personCreated.firstName} creado exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando la persona.' }));
        }
    };
};

export const updatePerson = (person: FormData) => {
    return async (dispatch: AppDispatch) => {
        try {
            const personUpdated = await fetchUpdatePerson(person);
            await dispatch(setPersonSelected({ person: personUpdated }));
            await dispatch(getPersons());
            await dispatch(setAlert({ type: 'success', message: 'Persona actualizado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error actualizando la persona.' }));
        }
    };
};

export const deletePerson = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { personSelected } = getState().person;
            await fetchDeletePerson(personSelected.id);
            await dispatch(setEmptyPersonSelected());
            await dispatch(getPersons());
            await dispatch(setAlert({ type: 'success', message: 'Persona eliminado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando la persona.' }));
        }
    };
};