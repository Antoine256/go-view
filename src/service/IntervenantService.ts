import {GenericService} from "./GenericService";
import type {Intervenant} from "../interface/Intervenant";

class IntervenantService extends GenericService<Intervenant>{
    constructor() {
        super("intervenant");
    }
}

export default new IntervenantService()
