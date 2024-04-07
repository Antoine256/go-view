<script lang="ts">
    import EventSocket from "../../../../service/EventSocket";
    import {type FormatEventSocket} from "../../../../interface/FormatEventSocket";
    import {acts} from "@tadashi/svelte-notification";
    import {getBadgeSelected} from "../../../../store/badge";

    export let idHuman: string;
    export let idBatiment: number;
    export let idDoor: number;
    export let canEnter: boolean;
    export let doorSeleded: number;

    function allowDrop(ev: any): void {
        ev.preventDefault();
    }

    async function dropHuman(id: string, ev: any): Promise<void> {
        ev.preventDefault();
        ev.target.appendChild(document.getElementById(id));
        //canEnter = true;
        doorSeleded = idDoor;
        let badge: number = getBadgeSelected()?.id ?? 13;
        if(badge) {
            let event: FormatEventSocket = {
                message: "Badge Lu",
                idBadge: badge,
                idBatiment: idBatiment,
                idPorte: idDoor
            }
            EventSocket.sendMessage(JSON.stringify(event));
            if(EventSocket.socket){
                EventSocket.socket.onmessage = (event) => {
                    console.log(event)
                    console.log('Received message:uyv', event.data);
                }
            }
        } else {
            acts.add({mode: 'error', message: 'Ne possède pas de badge', lifetime: 3})
        }
    }
</script>

<div on:drop={() => dropHuman(idHuman, event)} on:dragover={() => allowDrop( event)} class=" w-16 h-16 bg-red-300"></div>
