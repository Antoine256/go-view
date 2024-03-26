import {GenericService} from "./GenericService";
import type {Badge} from "../interface/Badge";

class BadgeService extends GenericService<Badge>{
    constructor() {
        super("badge");
    }
}

export default new BadgeService();
