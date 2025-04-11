import { HandleMessageError } from "./errors/handle-message-error";
import api from "./api";
import service from "./errors/04-service.json";


const serviceErrorHandler = await HandleMessageError.create(service);

const customCatch = (error: any) => {
    serviceErrorHandler.handle(error);
    throw error;
}

export const fetchGetServices = async (queryParams: string): Promise<{ count: number; rows: Service[] }> => {
    const response = await api.get(`/service${queryParams}`)
        .catch(customCatch)
    return response.data;
};

export const fetchGetService = async (id: string): Promise<Service> => {
    const response = await api.get(`/service/${id}`)
        .catch(customCatch)
    return response.data;
};

export const fetchCreateService = async (service: Service): Promise<Service> => {
    const { id, ...rest } = service;
    const response = await api.post('/service', { ...rest })
        .catch(customCatch)
    return response.data;
};

export const fetchUpdateService = async (service: Service): Promise<Service> => {
    const { id, ...rest } = service;
    const response = await api.put(`/service/${id}`, { ...rest })
        .catch(customCatch)
    return response.data;
};

export const fetchDeleteService = async (id: string): Promise<Service> => {
    const response = await api.delete(`/service/${id}`)
        .catch(customCatch)
    return response.data;
};

export const fetchGetServicesAssignedRole = async (roleId: string, queryParams: string): Promise<{ count: number; rows: CharacterAssigment[] }> => {
    const response = await api.get(`/service/assigned-role/${roleId}${queryParams}`)
        .catch(customCatch)
    return response.data;
};