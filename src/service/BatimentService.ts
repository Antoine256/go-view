import {GenericService} from "./GenericService";
import type {Batiment} from "../interface/Batiment";

class BatimentService extends GenericService<Batiment>{
    constructor() {
        super("batiment");
    }
}

export default new BatimentService()
