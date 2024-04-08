import {GenericService} from "./GenericService";
import type {Batiment} from "../interface/Batiment";
import type {Badge} from "../interface/Badge";
import axios from "axios";

class BatimentService extends GenericService<Batiment>{
    constructor() {
        super("batiment");
    }

    async deleteBatiment(id: number){
        const response = await axios.delete(`${this.API_URL}/batiment/delete/`+id);
        return response.data;
    }
}

export default new BatimentService()
