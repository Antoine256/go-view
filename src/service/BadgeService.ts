import {GenericService} from "./GenericService";
import type {Badge} from "../interface/Badge";
import axios from "axios";
import type {BadgeDTO} from "../interface/BadgeDTO";

class BadgeService extends GenericService<Badge>{
    constructor() {
        super("badge");
    }

    async createBadge(badge: Omit<Badge, 'id'>){
        const response = await axios.post(`${this.API_URL}/badge/create`, badge);
        return response.data;
    }

    async modifBadge(badge: Badge){
        const response = await axios.put(`${this.API_URL}/badge/update`, badge);
        return response.data;
    }

    async getAllBadge(): Promise<BadgeDTO[]> {
        const response = await axios.get(`${this.API_URL}/badge`);
        response.data.forEach((e: BadgeDTO)=>{
            e.ownerName = e.owner?.firstname +" "+ e.owner?.lastname
        })
        return response.data;
    }
}

export default new BadgeService();
