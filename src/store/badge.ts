import {createLocalStorage, persist} from "@macfja/svelte-persistent-store";
import {get, writable} from "svelte/store";
import {type Badge} from "../interface/Badge";

const badge = persist(writable<Badge | undefined>(undefined), createLocalStorage(), "badge");
export function badgeIsSelected(): boolean {
    return get(badge) !== undefined;
}

export function isBadgeSelected(b: Badge): boolean {
    return get(badge)?.id === b?.id;
}

export function setBadgeSelect(b: Badge): void {
    badge.set(b);
}

export function getBadgeSelected(): Badge | undefined {
    return get(badge);
}

export default badge;