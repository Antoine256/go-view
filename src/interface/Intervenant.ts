import type {Badge} from "./Badge";

export interface Intervenant{
    id: number,
    lastname: string,
    firstname: string,
    badges: Badge[]
}
