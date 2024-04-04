import type {Intervenant} from "./Intervenant";
import type {Batiment} from "./Batiment";

export interface Event{
    id: number,
    batiment: Batiment,
    intervenant: Intervenant,
    hour: Date,
    goIn: boolean
}
