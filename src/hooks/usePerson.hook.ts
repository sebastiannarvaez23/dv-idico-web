import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/store';
import { getPersons } from '../store/slices/person/thunks';

function usePerson() {

    const dispatch = useDispatch<AppDispatch>();

    const [modalEditPerson, setModalEditPerson] = useState(false);
    const [modalCreatePerson, setModalCreatePerson] = useState(false);

    const personEmpty: Person = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthDate: "",
    }

    const handleGetPersons = (page: number, firstName?: string, lastName?: string, email?: string) => {
        dispatch(getPersons(page, firstName, lastName, email));
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
        personEmpty,
        modalCreatePerson,
        modalEditPerson,
        setModalEditPerson,
        setModalCreatePerson,
        handleGetPersons,
        handleOpenModalEditPerson,
        handleCloseModalEditPerson,
        handleOpenModalCreatePerson,
        handleCloseModalCreatePerson,
    }
}

export default usePerson;