export interface FormatEventSocket{
    message: string;
    idBadge: number;
    idPorte: number;
    idBatiment: number;
}

export interface FormatReponseSocket{
    message: string;
    idBatiment: number;
    idPorte: number;
}

export enum MESSAGE{
    OPEN_DOOR = "Open door",
    CLOSE_DOOR = "Block door"
}