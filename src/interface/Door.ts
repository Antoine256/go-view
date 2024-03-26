import type {Sensor} from "./Sensor";
import type {BadgeReader} from "./BadgeReader";

export interface Door{
    id: number,
    batiment: number
    outsideReader: number,
    insideReader: number,
    sensor: number
}
