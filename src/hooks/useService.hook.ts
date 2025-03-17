import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/store';
import { getServices } from '../store/slices/service/thunks';


function useService() {

    const dispatch = useDispatch<AppDispatch>();

    const [modalEditService, setModalEditService] = useState(false);
    const [modalCreateService, setModalCreateService] = useState(false);

    const serviceEmpty: Service = {
        id: "",
        code: "",
        name: "",
    }

    const handleGetServices = (page: number, code?: string, name?: string) => {
        dispatch(getServices(page, code, name));
    }

    const handleOpenModalEditService = () => {
        setModalEditService(true);
    };

    const handleCloseModalEditService = () => {
        setModalEditService(false);
    };

    const handleOpenModalCreateService = () => {
        setModalCreateService(true);
    };

    const handleCloseModalCreateService = () => {
        setModalCreateService(false);
    };

    useEffect(() => {
        dispatch(getServices());
    }, []);

    return {
        serviceEmpty,
        modalCreateService,
        modalEditService,
        setModalEditService,
        setModalCreateService,
        handleGetServices,
        handleOpenModalEditService,
        handleCloseModalEditService,
        handleOpenModalCreateService,
        handleCloseModalCreateService,
    }
}

export default useService;