import {GenericService} from "./GenericService";
import type {Intervenant} from "../interface/Intervenant";
import axios from "axios";

class IntervenantService extends GenericService<Intervenant>{
    constructor() {
        super("intervenant");
    }

    async deleteIntervenant(id: number){
        const response = await axios.delete(`${this.API_URL}/intervenant/delete/`+id);
        return response.data;
    }
}

export default new IntervenantService()
