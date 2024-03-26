import axios from "axios";

export class GenericService<T> {
    private API_URL = "http://localhost:8080/api"
    constructor(private url: string) {}

    async getAll(): Promise<T[]> {
        const response = await axios.get<T[]>(`${(this.API_URL)}/${this.url}`);
        return response.data;
    }

    async get(id: number): Promise<T> {
        const response = await axios.get<T>(`${(this.API_URL)}/${this.url}/${id}`);
        return response.data;
    }

    async create(entity: Omit<T,"id">): Promise<T> {
        const response = await axios.post<T>(`${(this.API_URL)}/${this.url}`, entity);
        return response.data;
    }

    async update(entity: T): Promise<T> {
        const response = await axios.put<T>(`${(this.API_URL)}/${this.url}`, entity);
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await axios.delete(`${(this.API_URL)}/${this.url}/${id}`);
    }
}
