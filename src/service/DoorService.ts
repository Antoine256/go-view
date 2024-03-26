import {GenericService} from "./GenericService";
import type {Door} from "../interface/Door";

class DoorService extends GenericService<Door>{
    constructor() {
        super('door');
    }
}

export default new DoorService()
