import {createLocalStorage, persist} from "@macfja/svelte-persistent-store";
import {get, writable} from "svelte/store";
import {type Badge} from "../interface/Badge";

const BADGE = persist(writable<Badge | undefined>(undefined), createLocalStorage(), "BADGE");
export function badgeIsSelected(): boolean {
    return get(BADGE) !== undefined;
}

export function isBadgeSelected(b: Badge): boolean {
    return get(BADGE)?.id === b?.id;
}

export function setBadgeSelect(b: Badge): void {
    BADGE.set(b);
}

export function getBadgeSelected(): Badge | undefined {
    return get(BADGE);
}

export function resetBadgeSelected(): void {
    BADGE.set(undefined);
}

export default BADGE;