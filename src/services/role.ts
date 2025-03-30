import api from "./api";


export const fetchGetRoles = async (queryParams: string): Promise<{ count: number; rows: Role[] }> => {
    const response = await api.get(`/role${queryParams}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener listado de Roles: ${error.message}`);
        })
    return response.data;
};

export const fetchGetRole = async (id: string): Promise<Role> => {
    const response = await api.get(`/role/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener Rol: ${error.message}`);
        })
    return response.data;
};

export const fetchCreateRole = async (role: Role): Promise<Role> => {
    const { id, ...rest } = role;
    const response = await api.post('/role', { ...rest })
        .catch((error: any) => {
            throw new Error(`Error al crear Rol: ${error.message}`);
        })
    return response.data;
};

export const fetchUpdateRole = async (role: Role): Promise<Role> => {
    const { id, ...rest } = role;
    const response = await api.put(`/role/${id}`, { ...rest })
        .catch((error: any) => {
            throw new Error(`Error al actualizar el Rol: ${error.message}`);
        })
    return response.data;
};

export const fetchDeleteRole = async (id: string): Promise<Role> => {
    const response = await api.delete(`/role/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al eliminar el Rol: ${error.message}`);
        })
    return response.data;
};

export const fetchAddServiceAssignment = async (id: string, services: { services: string[] }): Promise<Role> => {
    const response = await api.post(`/role/add-service-assignment/${id}`, services)
        .catch((error: any) => {
            throw new Error(`Error al asignar personajes a pelicula: ${error.message}`);
        })
    return response.data;
}

export const fetchDeleteServiceAssignment = async (id: string, services: { services: string[] }): Promise<Role> => {
    const response = await api.post(`/role/delete-service-assignment/${id}`, services)
        .catch((error: any) => {
            throw new Error(`Error al asignar personajes a pelicula: ${error.message}`);
        })
    return response.data;
}
