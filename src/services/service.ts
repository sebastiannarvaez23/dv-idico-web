import api from "./api";

export const fetchGetServices = async (page: number): Promise<Service[]> => {
    const response = await api.get(`/service?page=${page}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener listado de servicios: ${error.message}`);
        })
    return response.data.rows;
};

export const fetchGetService = async (id: string): Promise<Service> => {
    const response = await api.get(`/service/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener servicio: ${error.message}`);
        })
    return response.data;
};

export const fetchCreateService = async (service: FormData): Promise<Service> => {
    service.delete('id');
    const response = await api.post('/service', service, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .catch((error: any) => {
            throw new Error(`Error al crear servicio: ${error.message}`);
        })
    return response.data;
};

export const fetchUpdateService = async (service: FormData): Promise<Service> => {
    const id = service.get('id');
    service.delete('id');
    const response = await api.put(`/service/${id}`, service, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
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