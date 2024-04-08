export interface FormatEventSocket{
    message: string;
    idBadge?: number;
    idPorte?: number;
    idBatiment: number;
    idIntervenant?: number;
}

export interface FormatReponseSocket{
    message: string;
    idBatiment: number;
    idPorte: number;
}

export enum MESSAGE{
    OPEN_DOOR = "Open door",
    CLOSE_DOOR = "Close Door",
    BLOCK_DOOR = "Block door",
    UNLOCK_DOOR = "Unlock door",
    LIGHT_OFF = "TurnOffLight"
}