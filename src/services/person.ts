import api from "./api";

export const fetchGetPersons = async (): Promise<Person[]> => {
    const response = await api.get('/person')
        .catch((error: any) => {
            throw new Error(`Error al obtener listado de Personajes: ${error.message}`);
        })
    return response.data.rows;
};

export const fetchGetPerson = async (id: string): Promise<Person> => {
    const response = await api.get('/person/' + id)
        .catch((error: any) => {
            throw new Error(`Error al obtener Personaje: ${error.message}`);
        })
    return response.data;
};

export const fetchCreatePerson = async (person: FormData): Promise<Person> => {
    person.delete('id');
    const response = await api.post('/person', person, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
        .catch((error: any) => {
            throw new Error(`Error al crear Personaje: ${error.message}`);
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
            throw new Error(`Error al actualizar el Personaje: ${error.message}`);
        })
    return response.data;
};

export const fetchDeletePerson = async (id: string): Promise<Person> => {
    const response = await api.delete(`/person/${id}`)
        .catch((error: any) => {
            throw new Error(`Error al eliminar el Personaje: ${error.message}`);
        })
    return response.data;
};