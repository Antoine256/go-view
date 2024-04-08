<script lang="ts">
    import {type Batiment} from "../../../../interface/Batiment";
    import {onMount} from "svelte";
    import LightComponent from "./LightComponent.svelte";
    import HumanComponent from "./HumanComponent.svelte";
    import BadgeReaderComponent from "./BadgeReaderComponent.svelte";
    import AlarmeComponent from "./AlarmeComponent.svelte";
    import EventSocket from "../../../../service/EventSocket";
    import {FormatEventSocket, type FormatReponseSocket, MESSAGE} from "../../../../interface/FormatEventSocket";
    import {getBadgeSelected} from "../../../../store/badge";
    import {getUserSelected} from "../../../../store/user";

    export let batiment: Batiment;
    let openDoorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13q.425 0 .713-.288T12 12q0-.425-.288-.712T11 11q-.425 0-.712.288T10 12q0 .425.288.713T11 13m-4 8v-2l6-1V6.875q0-.375-.225-.675t-.575-.35L7 5V3l5.5.9q1.1.2 1.8 1.025T15 6.85v12.8zm-4 0v-2h2V5q0-.85.588-1.425T7 3h10q.85 0 1.425.575T19 5v14h2v2zm4-2h10V5H7z"/></svg>`;
    let closeDoor = `<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-2h2V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v14h2v2zm14-2V5H7v14zm-3-6q.425 0 .713-.288T15 12q0-.425-.288-.712T14 11q-.425 0-.712.288T13 12q0 .425.288.713T14 13M7 5v14z"/></svg>`;

    let isInside = false;
    let fireAlarm: boolean = false;
    let doorSelected: number = -1;
    let canPass: boolean = false;

    let doorsOpen: {idDoor: number, idBatiment: number}[] = [];
    let blockedDoor: {idDoor: number, idBatiment: number}[] = [];
    let lightOff: {idDoor: number, idBatiment: number}[] = [];

    function allowDrop(ev: any): void {
        ev.preventDefault();
    }

    function passHuman(id: string, ev: any): void {
        ev.preventDefault();
        ev.target.appendChild(document.getElementById(id));
        let event: FormatEventSocket = {
            message: isInside ? "Sort du batiment" : "Entre dans le batiment",
            idBadge: getBadgeSelected()?.id,
            idBatiment: batiment.id,
            idPorte: doorSelected,
            idIntervenant: getUserSelected()?.id
        }
        EventSocket.sendMessage(JSON.stringify(event));
        isInside = !isInside;
        canPass = false;
        doorSelected = -1;
    }

    function laserClicked(){
        console.log("laser")
    }

    function doorIsIn(doors: any[], idDoor: number): boolean{
        return doors.find((door) => door.idDoor === idDoor && door.idBatiment === batiment?.id) !== undefined
    }

    function addDoor(doors: any[], idDoor: number, idBatiment: number): any[] {
        return [...doors, {idDoor, idBatiment}];
    }

    function removeDoor(doors: any[], idDoor: number, idBatiment: number): any[] {
        return doors.filter(door => door.idDoor !== idDoor || door.idBatiment !== idBatiment);
    }

    function connectOnMessage(){
        if(EventSocket.socket){
            EventSocket.socket.onmessage = (event) => {
                let socket: FormatReponseSocket = JSON.parse(event.data);
                console.log(socket)
                if(socket?.message === MESSAGE.OPEN_DOOR){
                    doorsOpen = addDoor(doorsOpen, socket.idPorte, socket.idBatiment);
                    lightOff = removeDoor(lightOff, socket.idPorte, socket.idBatiment);
                }
                if(socket?.message === MESSAGE.CLOSE_DOOR){
                    doorsOpen = removeDoor(doorsOpen, socket.idPorte, socket.idBatiment);
                }
                if(socket?.message === MESSAGE.BLOCK_DOOR){
                    blockedDoor = addDoor(blockedDoor, socket.idPorte, socket.idBatiment);
                    lightOff = removeDoor(lightOff, socket.idPorte, socket.idBatiment);
                }
                if(socket?.message === MESSAGE.UNLOCK_DOOR){
                    blockedDoor = removeDoor(blockedDoor, socket.idPorte, socket.idBatiment);
                }
                if(socket?.message === MESSAGE.LIGHT_OFF){
                    lightOff = addDoor(lightOff, socket.idPorte, socket.idBatiment);
                }
            }
        }
    }

    onMount(() => {
        EventSocket.handleConnect();
        connectOnMessage();
    })
</script>
<div class="w-screen h-screen flex flex-col justify-center items-center">
    <p class="w-full py-3 text-xl text-center font-semibold bg-gray-300">{batiment?.name} ({batiment?.id})</p>
    <div class="w-full h-1/4 flex justify-center items-center bg-gray-300" id="in">
        <HumanComponent hidden="{isInside}" id="humanInBatiment"/>
        {#key batiment}
            {#if doorIsIn(doorsOpen, doorSelected) && !isInside}
                <div on:drop={() => passHuman("humanOutBatiment", event)} on:dragover={() => allowDrop( event)} class="w-16 h-16 border border-2 border-dashed border-gray-500"></div>
            {/if}
        {/key}
    </div>
    <div class="w-11/12 flex justify-around grow">
        {#each {length: batiment?.nb_door} as _, i}
            <div class="flex flex-col justify-center items-center text-center">
                {#if isInside}
                    <BadgeReaderComponent idHuman="humanInBatiment" idBatiment="{batiment?.id}" idDoor="{i}" bind:doorSeleded={doorSelected}/>
                {/if}
                {#key batiment}
                    <LightComponent lightOn="{(doorIsIn(doorsOpen, i) || doorIsIn(blockedDoor, i)) && !doorIsIn(lightOff, i)}" blocked="{doorIsIn(blockedDoor, i)}"/>
                {/key}
                <div class="flex justify-center items-center">
                    <span class="h-24 w-24">
                        {#key doorsOpen && batiment}
                            {#if doorIsIn(doorsOpen, i)}
                                {@html openDoorIcon}
                            {:else}
                                {@html closeDoor}
                            {/if}
                        {/key}
                    </span>
                    <svg class="cursor-pointer hover:text-red-700 transition-all" on:click={laserClicked} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9 22q-1.25 0-2.125-.875T6 19q0-1.25.875-2.125T9 16q1.25 0 2.125.875T12 19q0 1.25-.875 2.125T9 22m4.475-3.475q-.15-1.375-1.025-2.425t-2.175-1.425L12.925 12H5.9q-.8 0-1.35-.55T4 10.1q0-.5.263-.937t.687-.713L17.1 1.175q.45-.275.95-.138t.775.588q.275.45.138.938t-.563.762L9 9h9.1q.8 0 1.35.55T20 10.9q0 .45-.112.888t-.438.762z"/></svg>
                </div>
                <p>{i + 1}</p>
                {#key batiment}
                    <LightComponent lightOn="{(doorIsIn(doorsOpen, i) || doorIsIn(blockedDoor, i)) && !doorIsIn(lightOff, i)}" blocked="{doorIsIn(blockedDoor, i)}"/>
                {/key}
                {#if !isInside}
                    <BadgeReaderComponent idHuman="humanOutBatiment" idBatiment="{batiment?.id}" idDoor="{i}" bind:doorSeleded={doorSelected}/>
                {/if}
            </div>
        {/each}
    </div>
    <div class="w-full h-1/4 flex justify-center items-center bg-lime-300" id="out">
        <HumanComponent hidden="{!isInside}" id="humanOutBatiment"/>
        {#key batiment}
            {#if doorIsIn(doorsOpen, doorSelected) && isInside}
                <div on:drop={() => passHuman("humanInBatiment", event)} on:dragover={() => allowDrop( event)} class="w-16 h-16 border border-2 border-dashed border-gray-500"></div>
            {/if}
        {/key}
    </div>
    <div class="h-10 w-10 m-5 absolute top-0 right-0">
        <AlarmeComponent idBatiment="{batiment?.id}" bind:on="{fireAlarm}"/>
    </div>
</div>
