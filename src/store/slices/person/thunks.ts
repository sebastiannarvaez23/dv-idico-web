import { AppDispatch, RootState } from "../../store";
import { fetchCreatePerson, fetchDeletePerson, fetchGetPerson, fetchGetPersons, fetchUpdatePerson } from "../../../services/person";
import { setAlert } from '../common';
import { setCount, setEmptyPersonSelected, setFilter, setPage, setPersonSelected, setPersons, startLoadingPersonSelected, startLoadingPersons } from "./personSlice";
import { uribuild } from "../../../utils/params/uribuild";


export const getPersons = (page: number = 1, firstName?: string, lastName?: string, email?: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { personSelected } = getState().person;
            dispatch(startLoadingPersons());
            const persons = await fetchGetPersons(uribuild({ page, firstName, lastName, email }));
            await dispatch(setPersons({ persons: persons.rows }));
            await dispatch(setCount({ count: persons.count }));
            await dispatch(setPage({ page }));
            await dispatch(setFilter({ filter: { firstName, lastName, email } }));
            if (!firstName && !lastName && !email && persons.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay personas almacenadas' }));
            else if ((firstName || lastName || email) && persons.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No existen personas para los filtros especificados' }));
            else if (personSelected?.id === '') dispatch(getPerson(persons.rows[0].id));
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

export const createPerson = (person: Person) => {
    return async (dispatch: AppDispatch) => {
        try {
            const personCreated: Person = await fetchCreatePerson(person);
            await dispatch(getPersons());
            await dispatch(setPersonSelected({ person: personCreated }));
            await dispatch(setAlert({ type: 'success', message: `Persona "${personCreated.firstName}" creado exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando la persona.' }));
        }
    };
};

export const updatePerson = (person: Person) => {
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