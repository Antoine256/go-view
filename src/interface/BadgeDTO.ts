import type {BadgeStates} from "./BadgeStates";
import type {Batiment} from "./Batiment";
import type {Intervenant} from "./Intervenant";

export interface BadgeDTO{
    id: number,
    state: BadgeStates,
    batiments: Batiment[],
    owner: Intervenant,
    ownerName: string
}
