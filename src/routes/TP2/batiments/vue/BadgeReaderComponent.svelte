<script lang="ts">
    import EventSocket from "../../../../service/EventSocket";
    import {type FormatEventSocket, type FormatReponseSocket, MESSAGE} from "../../../../interface/FormatEventSocket";
    import {acts} from "@tadashi/svelte-notification";
    import {badgeIsSelected, getBadgeSelected} from "../../../../store/badge";
    import {getUserSelected} from "../../../../store/user";

    export let idHuman: string;
    export let idBatiment: number;
    export let idDoor: number;
    export let canEnter: boolean;
    export let doorSeleded: number;

    function allowDrop(ev: any): void {
        ev.preventDefault();
    }

    async function dropHuman(id: string, ev: any): Promise<void> {
        doorSeleded = idDoor;

        if(badgeIsSelected()) {
            ev.preventDefault();
            ev.target.appendChild(document.getElementById(id));

            let badge: number = getBadgeSelected()!.id;
            let event: FormatEventSocket = {
                message: "Badge Lu",
                idBadge: badge,
                idBatiment: idBatiment,
                idPorte: idDoor
            }

            EventSocket.sendMessage(JSON.stringify(event));

            if(EventSocket.socket){
                EventSocket.socket.onmessage = (event) => {
                    let response: FormatReponseSocket = JSON.parse(event.data);
                    if(response.idBatiment === idBatiment && response.idPorte === idDoor && response.message === MESSAGE.OPEN_DOOR){
                        canEnter = true;
                    }
                    console.log(response)
                }
            }
        } else {
            if(getUserSelected()!.badges.length > 0){
                acts.add({mode: 'error', message: 'Vous devez sélectionner un badge', lifetime: 5})
                acts.add({mode: 'info', message: 'Cliquez sur le personnage', lifetime: 5})
            } else {
                acts.add({mode: 'error', message: 'Ne possède pas de badge', lifetime: 3})
            }
        }
    }
</script>

<div on:drop={() => dropHuman(idHuman, event)} on:dragover={() => allowDrop( event)} class="w-16 h-16 border border-2 border-dashed border-gray-500"></div>
