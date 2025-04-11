import { HandleMessageError } from "./errors/handle-message-error";
import api from "./api";
import person from "./errors/02-person.json";


const personErrorHandler = await HandleMessageError.create(person);

const customCatch = (error: any) => {
    personErrorHandler.handle(error);
    throw error;
}

export const fetchGetPersons = async (queryParams: string): Promise<{ count: number; rows: Person[] }> => {
    const response = await api.get(`/person${queryParams}`)
        .catch(customCatch)
    return response.data;
};

export const fetchGetPerson = async (id: string): Promise<Person> => {
    const response = await api.get(`/person/${id}`)
        .catch(customCatch)
    return response.data;
};

export const fetchCreatePerson = async (person: Person): Promise<Person> => {
    const { id, ...rest } = person;
    const response = await api.post('/person', { ...rest })
        .catch(customCatch)
    return response.data;
};

export const fetchUpdatePerson = async (person: Person): Promise<Person> => {
    const { id, ...rest } = person;
    const response = await api.put(`/person/${id}`, { ...rest })
        .catch(customCatch)
    return response.data;
};

export const fetchDeletePerson = async (id: string): Promise<Person> => {
    const response = await api.delete(`/person/${id}`)
        .catch(customCatch)
    return response.data;
};