import api from "./api";


export const fetchGetServices = async (page: number): Promise<{ count: number; rows: Service[] }> => {
    const response = await api.get(`/service?page=${page}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener listado de servicios: ${error.message}`);
        })
    return response.data;
};

export const fetchGetService = async (id: string): Promise<Service> => {
    const response = await api.get(`/service/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener servicio: ${error.message}`);
        })
    return response.data;
};

export const fetchCreateService = async (service: Service): Promise<Service> => {
    const { id, ...rest } = service;
    const response = await api.post('/service', { ...rest })
        .catch((error: any) => {
            throw new Error(`Error al crear servicio: ${error.message}`);
        })
    return response.data;
};

export const fetchUpdateService = async (service: Service): Promise<Service> => {
    const { id, ...rest } = service;
    const response = await api.put(`/service/${id}`, { ...rest })
        .catch((error: any) => {
            throw new Error(`Error al actualizar el servicio: ${error.message}`);
        })
    return response.data;
};

export const fetchDeleteService = async (id: string): Promise<Service> => {
    const response = await api.delete(`/service/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al eliminar el servicio: ${error.message}`);
        })
    return response.data;
};