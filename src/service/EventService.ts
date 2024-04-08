import {GenericService} from "./GenericService";
import type {Event} from "../interface/Event";
import axios from "axios";

class EventService extends GenericService<Event>{
    constructor() {
        super("intervenant");
    }

    public async seachByBatiment(id:string){
        const response = await axios.get<Event[]>(this.API_URL+"/event/searchBat/"+id)
        return response.data
    }

    public async seachByIntervenant(id:string){
        const response = await axios.get<Event[]>(this.API_URL+"/event/searchInt/"+id)
        return response.data
    }
}

export default new EventService()
