import {GenericService} from "./GenericService";
import type {BadgeReader} from "../interface/BadgeReader";

class BadgeReaderService extends GenericService<BadgeReader>{
    constructor() {
        super("badge-reader");
    }
}

export default new BadgeReaderService()
