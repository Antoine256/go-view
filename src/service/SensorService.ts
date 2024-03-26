import {GenericService} from "./GenericService";
import type {Sensor} from "../interface/Sensor";

class SensorService extends GenericService<Sensor>{
    constructor() {
        super("sensor");
    }
}

export default new SensorService()
