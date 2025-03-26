import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';
import { createService, deleteService, getServices, updateService } from '../store/slices/service/thunks';


function useService() {

    const dispatch = useDispatch<AppDispatch>();

    const { services, count, page } = useSelector(
        (state: RootState) => state.service);

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

    const handleCreateService = (service: Service) => {
        dispatch(createService(service));
    }

    const handleUpdateService = (service: Service) => {
        dispatch(updateService(service));
    }

    const handleDeleteService = (id: string) => {
        dispatch(deleteService(id));
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
        count,
        modalCreateService,
        modalEditService,
        page,
        serviceEmpty,
        services,
        handleCloseModalCreateService,
        handleCloseModalEditService,
        handleGetServices,
        handleOpenModalCreateService,
        handleOpenModalEditService,
        setModalCreateService,
        setModalEditService,
        handleCreateService,
        handleUpdateService,
        handleDeleteService,
    }
}

export default useService;