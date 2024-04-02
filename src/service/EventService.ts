import {GenericService} from "./GenericService";
import type {Event} from "../interface/Event";
import axios from "axios";

class EventService extends GenericService<Event>{
    constructor() {
        super("intervenant");
    }

    public async seachByBatiment(id:string){
        let API_URL = "http://localhost:8080/api"
        const response = await axios.get<Event[]>(API_URL+"/event/searchBat/"+id)
        return response.data
    }

    public async seachByIntervenant(id:string){
        let API_URL = "http://localhost:8080/api"
        const response = await axios.get<Event[]>(API_URL+"/event/searchInt/"+id)
        return response.data
    }
}

export default new EventService()
