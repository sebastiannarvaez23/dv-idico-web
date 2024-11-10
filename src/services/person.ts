import api from "./api";

export const fetchGetPersons = async (page: number): Promise<Person[]> => {
    const response = await api.get(`/person?page=${page}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener listado de Personas: ${error.message}`);
        })
    return response.data.rows;
};

export const fetchGetPerson = async (id: string): Promise<Person> => {
    const response = await api.get(`/person/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al obtener Persona: ${error.message}`);
        })
    return response.data;
};

export const fetchCreatePerson = async (person: FormData): Promise<Person> => {
    person.delete('id');
    const response = await api.post('/person', person, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .catch((error: any) => {
            throw new Error(`Error al crear Persona: ${error.message}`);
        })
    return response.data;
};

export const fetchUpdatePerson = async (person: FormData): Promise<Person> => {
    const id = person.get('id');
    person.delete('id');
    const response = await api.put(`/person/${id}`, person, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
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