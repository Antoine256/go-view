import type {BadgeStates} from "./BadgeStates";

export interface Badge{
    id: number,
    state: BadgeStates,
    batiments: string[],
    owner_id: number
}
