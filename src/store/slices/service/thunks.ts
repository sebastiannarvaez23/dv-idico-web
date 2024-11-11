import { AppDispatch, RootState } from "../../store";
import { fetchCreateService, fetchDeleteService, fetchGetService, fetchGetServices, fetchUpdateService } from "../../../services/service";
import { setAlert } from '../common';
import { setCount, setEmptyServiceSelected, setServiceSelected, setServices, startLoadingServiceSelected, startLoadingServices } from "./serviceSlice";


export const getServices = (page: number = 1) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(startLoadingServices());
            const services = await fetchGetServices(page);
            await dispatch(setServices({ services: services.rows }));
            await dispatch(setCount({ count: services.count }));
            if (services.rows.length === 0) dispatch(setAlert({ type: 'warning', message: 'No hay Services almacenados' }));
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

export const deleteService = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const { serviceSelected } = getState().service;
            await fetchDeleteService(serviceSelected.id);
            await dispatch(setEmptyServiceSelected());
            await dispatch(getServices());
            await dispatch(setAlert({ type: 'success', message: 'Servicio eliminado exitosamente!' }));
        } catch (error: any) {
            dispatch(setAlert({ type: 'error', message: 'Ocurrió un error eliminando el servicio.' }));
        }
    };
};