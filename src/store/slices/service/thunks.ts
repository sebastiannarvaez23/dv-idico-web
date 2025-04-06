import { AppDispatch, RootState } from "../../store";
import { fetchCreateService, fetchDeleteService, fetchGetService, fetchGetServices, fetchUpdateService } from "../../../services/service";
import { setAlert } from '../common';
import { setCount, setEmptyServiceSelected, setFilter, setPage, setServiceSelected, setServices, startLoadingServiceSelected, startLoadingServices } from "./serviceSlice";
import { uribuild } from "../../../utils/params/uribuild";


export const getServices = (page: number = 1, code?: string, name?: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { isLoadingServices, serviceSelected } = getState().service;
            if (!isLoadingServices) {
                dispatch(startLoadingServices());
                const services = await fetchGetServices(uribuild({ page, code, name }));
                await dispatch(setServices({ services: services.rows }));
                await dispatch(setCount({ count: services.count }));
                await dispatch(setPage({ page }));
                await dispatch(setFilter({ filter: { code, name } }));
                if (!code && !name && services.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay servicios almacenados' }));
                else if ((code || name) && services.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No existen servicios para los filtros especificados' }));
                else if (serviceSelected?.id === '') dispatch(getService(services.rows[0].id));
            }
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo la lista de servicios.' }));
        }
    };
};

export const getService = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingServiceSelected());
            const service: Service = await fetchGetService(id);
            await dispatch(setServiceSelected({ service }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error obteniendo el servicio.' }));
        }
    };
};

export const createService = (service: Service) => {
    return async (dispatch: AppDispatch) => {
        try {
            const serviceCreated: Service = await fetchCreateService(service);
            await dispatch(getServices());
            await dispatch(setAlert({ type: 'success', message: `Servicio "${serviceCreated.name}" creado exitosamente!` }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error creando el servicio.' }));
        }
    };
};

export const updateService = (service: Service) => {
    return async (dispatch: AppDispatch) => {
        try {
            const serviceUpdated = await fetchUpdateService(service);
            await dispatch(setServiceSelected({ service: serviceUpdated }));
            await dispatch(getServices());
            await dispatch(setAlert({ type: 'success', message: 'Servicio actualizado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error actualizando el servicio.' }));
        }
    };
};

export const deleteService = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await fetchDeleteService(id);
            await dispatch(setEmptyServiceSelected());
            await dispatch(getServices());
            await dispatch(setAlert({ type: 'success', message: 'Servicio eliminado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando el servicio.' }));
        }
    };
};