import {createLocalStorage, persist} from "@macfja/svelte-persistent-store";
import {get, writable} from "svelte/store";

const lightsOff = persist(writable<any[] | undefined>(undefined), createLocalStorage(), "lightsOff");

export function isLightOff(idBatiment: number, idPorte: number): boolean {
    return get(lightsOff)?.id === intervenant?.id;
}