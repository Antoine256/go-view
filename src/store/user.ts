import {createLocalStorage, persist} from "@macfja/svelte-persistent-store";
import {get, writable} from "svelte/store";
import {type Intervenant} from "../interface/Intervenant";

const user = persist(writable<Intervenant | undefined>(undefined), createLocalStorage(), "user");

export function userIsSelected(): boolean {
    return get(user) !== undefined;
}

export function isUserSelected(intervenant: Intervenant): boolean {
    return get(user) === intervenant;
}

export function setUserSelect(intervenant: Intervenant): void {
    user.set(intervenant);
}

export function getUserSelected(): Intervenant | undefined {
    return get(user);
}

export default user;