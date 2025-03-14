import api from "./api";


export const fetchGetPersons = async (queryParams: string): Promise<{ count: number; rows: Person[] }> => {
    const response = await api.get(`/person${queryParams}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener listado de Personas: ${error.message}`);
        })
    return response.data;
};

export const fetchGetPerson = async (id: string): Promise<Person> => {
    const response = await api.get(`/person/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener Persona: ${error.message}`);
        })
    return response.data;
};

export const fetchCreatePerson = async (person: Person): Promise<Person> => {
    const { id, ...rest } = person;
    const response = await api.post('/person', { ...rest })
        .catch((error: any) => {
            throw new Error(`Error al crear Persona: ${error.message}`);
        })
    return response.data;
};

export const fetchUpdatePerson = async (person: Person): Promise<Person> => {
    const { id, ...rest } = person;
    const response = await api.put(`/person/${id}`, { ...rest })
        .catch((error: any) => {
            throw new Error(`Error al actualizar la Persona: ${error.message}`);
        })
    return response.data;
};

export const fetchDeletePerson = async (id: string): Promise<Person> => {
    const response = await api.delete(`/person/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al eliminar la Persona: ${error.message}`);
        })
    return response.data;
};