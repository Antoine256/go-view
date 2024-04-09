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

enum MESSAGE{
    OPEN_DOOR = "Open door",
    CLOSE_DOOR = "Close Door",
    BLOCK_DOOR = "Block door",
    UNLOCK_DOOR = "Unlock door",
    LIGHT_OFF = "TurnOffLight",
    ALARM_ON = "Alarm on",
    ALARM_OFF = "Alarm off",
    ALARM_DOOR = "Alarme Door"
}

export default MESSAGE
