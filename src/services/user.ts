import api from "./api";


export const fetchGetUsers = async (queryParams: string): Promise<{ count: number; rows: User[] }> => {
    const response = await api.get(`/user${queryParams}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener listado de usuarios: ${error.message}`);
        })
    return response.data;
};

export const fetchGetUser = async (id: string): Promise<User> => {
    const response = await api.get(`/user/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        })
    return response.data;
};

export const fetchCreateUser = async (user: User): Promise<User> => {
    const { id, ...rest } = user;
    const response = await api.post('/user', { ...rest })
        .catch((error: any) => {
            throw new Error(`Error al crear usuario: ${error.message}`);
        })
    return response.data;
};

export const fetchUpdateUser = async (user: User): Promise<User> => {
    const { id, ...rest } = user;
    const response = await api.put(`/user/${id}`, { ...rest })
        .catch((error: any) => {
            throw new Error(`Error al actualizar el usuario: ${error.message}`);
        })
    return response.data;
};