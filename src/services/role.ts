import api from "./api";

export const fetchGetRoles = async (page: number): Promise<Role[]> => {
    const response = await api.get(`/role?page=${page}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener listado de Roles: ${error.message}`);
        })
    return response.data.rows;
};

export const fetchGetRole = async (id: string): Promise<Role> => {
    const response = await api.get(`/role/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener Rol: ${error.message}`);
        })
    return response.data;
};

export const fetchCreateRole = async (role: FormData): Promise<Role> => {
    role.delete('id');
    const response = await api.post('/role', role, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .catch((error: any) => {
            throw new Error(`Error al crear Rol: ${error.message}`);
        })
    return response.data;
};

export const fetchUpdateRole = async (role: FormData): Promise<Role> => {
    const id = role.get('id');
    role.delete('id');
    const response = await api.put(`/role/${id}`, role, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
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