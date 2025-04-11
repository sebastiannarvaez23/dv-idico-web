import { HandleMessageError } from "./errors/handle-message-error";
import api from "./api";
import role from "./errors/03-role.json";


const roleErrorHandler = await HandleMessageError.create(role);

const customCatch = (error: any) => {
    roleErrorHandler.handle(error);
    throw error;
}

export const fetchGetRoles = async (queryParams: string): Promise<{ count: number; rows: Role[] }> => {
    const response = await api.get(`/role${queryParams}`)
        .catch(customCatch)
    return response.data;
};

export const fetchGetRole = async (id: string): Promise<Role> => {
    const response = await api.get(`/role/${id}`)
        .catch(customCatch)
    return response.data;
};

export const fetchCreateRole = async (role: Role): Promise<Role> => {
    const { id, ...rest } = role;
    const response = await api.post('/role', { ...rest })
        .catch(customCatch)
    return response.data;
};

export const fetchUpdateRole = async (role: Role): Promise<Role> => {
    const { id, ...rest } = role;
    const response = await api.put(`/role/${id}`, { ...rest })
        .catch(customCatch)
    return response.data;
};

export const fetchDeleteRole = async (id: string): Promise<Role> => {
    const response = await api.delete(`/role/${id}`)
        .catch(customCatch)
    return response.data;
};

export const fetchAddServiceAssignment = async (id: string, roles: { roles: string[] }): Promise<Role> => {
    const response = await api.post(`/role/add-service-assignment/${id}`, roles)
        .catch(customCatch)
    return response.data;
}

export const fetchDeleteServiceAssignment = async (id: string, roles: { roles: string[] }): Promise<Role> => {
    const response = await api.post(`/role/delete-service-assignment/${id}`, roles)
        .catch(customCatch)
    return response.data;
}
