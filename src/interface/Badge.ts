import type {BadgeStates} from "./BadgeStates";

export interface Badge{
    id: number,
    state: BadgeStates,
    batiments: number[],
    owner_id: number
}
