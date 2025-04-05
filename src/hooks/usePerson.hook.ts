import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';
import { createPerson, getPersons, updatePerson } from '../store/slices/person/thunks';

function usePerson() {

    const dispatch = useDispatch<AppDispatch>();

    const { persons, count, page } = useSelector(
        (state: RootState) => state.person);

    const [modalEditPerson, setModalEditPerson] = useState(false);
    const [modalCreatePerson, setModalCreatePerson] = useState(false);

    const personEmpty: Person = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthDate: "",
        userId: "",
        roleId: ""
    }

    const handleGetPersons = (page: number, firstName?: string, lastName?: string, email?: string) => {
        dispatch(getPersons(page, firstName, lastName, email));
    }

    const handleCreatePerson = (person: Person) => {
        dispatch(createPerson(person));
    }

    const handleUpdatePerson = (person: Person) => {
        dispatch(updatePerson(person));
    }

    const handleOpenModalEditPerson = () => {
        setModalEditPerson(true);
    };

    const handleCloseModalEditPerson = () => {
        setModalEditPerson(false);
    };

    const handleOpenModalCreatePerson = () => {
        setModalCreatePerson(true);
    };

    const handleCloseModalCreatePerson = () => {
        setModalCreatePerson(false);
    };

    useEffect(() => {
        dispatch(getPersons());
    }, [])

    return {
        count,
        modalCreatePerson,
        modalEditPerson,
        page,
        personEmpty,
        persons,
        handleCloseModalCreatePerson,
        handleCloseModalEditPerson,
        handleGetPersons,
        handleCreatePerson,
        handleUpdatePerson,
        handleOpenModalCreatePerson,
        handleOpenModalEditPerson,
        setModalCreatePerson,
        setModalEditPerson,
    }
}

export default usePerson;