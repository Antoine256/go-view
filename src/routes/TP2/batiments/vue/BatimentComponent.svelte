<script lang="ts">
    import {type Batiment} from "../../../../interface/Batiment";
    import {onMount} from "svelte";
    import LightComponent from "./LightComponent.svelte";
    import HumanComponent from "./HumanComponent.svelte";
    import BadgeReaderComponent from "./BadgeReaderComponent.svelte";
    import AlarmeComponent from "./AlarmeComponent.svelte";
    import EventSocket from "../../../../service/EventSocket";
    import MESSAGE, {type FormatEventSocket, type FormatReponseSocket} from "../../../../interface/FormatEventSocket";

    import {getBadgeSelected} from "../../../../store/badge";
    import {getUserSelected} from "../../../../store/user";
    import BatimentService from "../../../../service/BatimentService";

    export let batiment: Batiment;
    let openDoorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13q.425 0 .713-.288T12 12q0-.425-.288-.712T11 11q-.425 0-.712.288T10 12q0 .425.288.713T11 13m-4 8v-2l6-1V6.875q0-.375-.225-.675t-.575-.35L7 5V3l5.5.9q1.1.2 1.8 1.025T15 6.85v12.8zm-4 0v-2h2V5q0-.85.588-1.425T7 3h10q.85 0 1.425.575T19 5v14h2v2zm4-2h10V5H7z"/></svg>`;
    let closeDoor = `<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-2h2V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v14h2v2zm14-2V5H7v14zm-3-6q.425 0 .713-.288T15 12q0-.425-.288-.712T14 11q-.425 0-.712.288T13 12q0 .425.288.713T14 13M7 5v14z"/></svg>`;

    let isInside = false;
    let doorSelected: number = -1;

    let doorsOpen: {idDoor: number, idBatiment: number}[] = [];
    let blockedDoor: {idDoor: number, idBatiment: number}[] = [];
    let lightOff: {idDoor: number, idBatiment: number}[] = [];
    let alarmDoor: {idDoor: number, idBatiment: number}[] = [];
    let fireAlarmOn: number[] = [];

    function allowDrop(ev: any): void {
        ev.preventDefault();
    }

    function passHuman(id: string, ev: any): void {
        ev.preventDefault();
        ev.target.appendChild(document.getElementById(id));
        laserClicked(doorSelected);
        let event: FormatEventSocket = {
            message: isInside ? "Sort du batiment" : "Entre dans le batiment",
            idBadge: getBadgeSelected()?.id,
            idBatiment: batiment.id,
            idPorte: doorSelected,
            idIntervenant: getUserSelected()?.id
        }
        EventSocket.sendMessage(JSON.stringify(event));
        isInside = !isInside;
        doorSelected = -1;
    }

    function laserClicked(idDoor){
        let event: FormatEventSocket = {
            message: "Laser detected",
            idBatiment: batiment.id,
            idPorte: idDoor,
        }
        EventSocket.sendMessage(JSON.stringify(event));
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
            EventSocket.socket.onmessage = async (event) => {
                let socket: FormatReponseSocket = JSON.parse(event.data);
                console.log(socket)
                if (socket?.message === MESSAGE.OPEN_DOOR) {
                    doorsOpen = addDoor(doorsOpen, socket.idPorte, socket.idBatiment);
                    lightOff = removeDoor(lightOff, socket.idPorte, socket.idBatiment);
                }
                if (socket?.message === MESSAGE.CLOSE_DOOR) {
                    doorsOpen = removeDoor(doorsOpen, socket.idPorte, socket.idBatiment);
                    alarmDoor = removeDoor(alarmDoor, socket.idPorte, socket.idBatiment);
                }
                if (socket?.message === MESSAGE.BLOCK_DOOR) {
                    blockedDoor = addDoor(blockedDoor, socket.idPorte, socket.idBatiment);
                    lightOff = removeDoor(lightOff, socket.idPorte, socket.idBatiment);
                }
                if (socket?.message === MESSAGE.UNLOCK_DOOR) {
                    blockedDoor = removeDoor(blockedDoor, socket.idPorte, socket.idBatiment);
                }
                if (socket?.message === MESSAGE.LIGHT_OFF) {
                    lightOff = addDoor(lightOff, socket.idPorte, socket.idBatiment);
                }
                if (socket?.message === MESSAGE.ALARM_ON) {
                    fireAlarmOn = [...fireAlarmOn, socket.idBatiment];
                    let nbDoor = (await BatimentService.get(socket.idBatiment)).nb_door ?? 0
                    for (let i = 0; i < nbDoor; i++) {
                        doorsOpen = addDoor(doorsOpen, i, socket.idBatiment);
                    }
                }
                if (socket?.message === MESSAGE.ALARM_OFF) {
                    fireAlarmOn = fireAlarmOn.filter(idBatiment => socket.idBatiment !== idBatiment);
                    let nbDoor = (await BatimentService.get(socket.idBatiment)).nb_door ?? 0
                    for (let i = 0; i < nbDoor; i++) {
                        doorsOpen = removeDoor(doorsOpen, i, socket.idBatiment);
                    }
                }
                if (socket?.message === MESSAGE.ALARM_DOOR) {
                    alarmDoor = addDoor(alarmDoor, socket.idPorte, socket.idBatiment);
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
            {#if (doorIsIn(doorsOpen, doorSelected) || fireAlarmOn.includes(batiment?.id ?? -1)) && !isInside}
                <div on:drop={() => passHuman("humanOutBatiment", event)} on:dragover={() => allowDrop( event)} class="w-16 h-16 border border-2 border-dashed border-gray-500"></div>
            {/if}
        {/key}
    </div>
    <div class="w-11/12 flex justify-around grow">
        {#each {length: batiment?.nb_door} as _, i}
            <div class="flex flex-col justify-center items-center text-center">
                {#if isInside}
                    <BadgeReaderComponent isInside="{true}" idHuman="humanInBatiment" idBatiment="{batiment?.id}" idDoor="{i}" bind:doorSeleded={doorSelected}/>
                {/if}
                {#key batiment}
                    <LightComponent lightOn="{(doorIsIn(doorsOpen, i) || doorIsIn(blockedDoor, i)) && !doorIsIn(lightOff, i)}" blocked="{doorIsIn(blockedDoor, i)}"/>
                {/key}
                <div class="flex justify-center items-center">
                    {#key batiment}
                        {#if doorIsIn(alarmDoor, i)}
                            <svg class="text-red-500" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M6.192 19q-.212 0-.356-.144t-.144-.357t.144-.356t.356-.143h.966l1.879-6.344q.142-.535.577-.845t.963-.311h2.846q.527 0 .963.31t.577.846L16.843 18h.965q.212 0 .356.144t.144.357t-.144.356t-.356.143zM11.5 7.385v-3q0-.213.144-.357q.144-.143.357-.143t.356.143t.143.357v3q0 .212-.144.356T12 7.885t-.356-.144t-.143-.356m5.096 1.696l2.144-2.125q.14-.14.342-.134q.2.007.35.156q.137.137.137.332t-.14.334l-2.125 2.15q-.146.146-.344.156t-.364-.156t-.165-.357t.165-.356M19 13.885h3q.213 0 .356.144t.144.356t-.144.356t-.356.144h-3q-.213 0-.356-.144t-.144-.357t.144-.356t.356-.143M6.696 9.788L4.571 7.644q-.14-.14-.134-.341t.157-.35q.137-.138.331-.138t.335.14l2.15 2.126q.146.146.155.344t-.155.363t-.357.166t-.357-.166M2 14.885q-.213 0-.356-.144t-.144-.357t.144-.356t.356-.143h3q.213 0 .356.144t.144.356t-.144.356t-.356.144z"/></svg>
                        {/if}
                    {/key}
                    <span class="h-24 w-24">
                        {#key doorsOpen && batiment}
                            {#if doorIsIn(doorsOpen, i)}
                                {@html openDoorIcon}
                            {:else}
                                {@html closeDoor}
                            {/if}
                        {/key}
                    </span>
                    <svg class="cursor-pointer hover:text-red-700 transition-all" on:click={() => laserClicked(i)} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9 22q-1.25 0-2.125-.875T6 19q0-1.25.875-2.125T9 16q1.25 0 2.125.875T12 19q0 1.25-.875 2.125T9 22m4.475-3.475q-.15-1.375-1.025-2.425t-2.175-1.425L12.925 12H5.9q-.8 0-1.35-.55T4 10.1q0-.5.263-.937t.687-.713L17.1 1.175q.45-.275.95-.138t.775.588q.275.45.138.938t-.563.762L9 9h9.1q.8 0 1.35.55T20 10.9q0 .45-.112.888t-.438.762z"/></svg>
                </div>
                <p>{i + 1}</p>
                {#key batiment}
                    <LightComponent lightOn="{(doorIsIn(doorsOpen, i) || doorIsIn(blockedDoor, i)) && !doorIsIn(lightOff, i)}" blocked="{doorIsIn(blockedDoor, i)}"/>
                {/key}
                {#if !isInside}
                    <BadgeReaderComponent isInside="{false}" idHuman="humanOutBatiment" idBatiment="{batiment?.id}" idDoor="{i}" bind:doorSeleded={doorSelected}/>
                {/if}
            </div>
        {/each}
    </div>
    <div class="w-full h-1/4 flex justify-center items-center bg-lime-300" id="out">
        <HumanComponent hidden="{!isInside}" id="humanOutBatiment"/>
        {#key batiment}
            {#if (doorIsIn(doorsOpen, doorSelected) || fireAlarmOn.includes(batiment?.id ?? -1)) && isInside}
                <div on:drop={() => passHuman("humanInBatiment", event)} on:dragover={() => allowDrop( event)} class="w-16 h-16 border border-2 border-dashed border-gray-500"></div>
            {/if}
        {/key}
    </div>
    <div class="h-10 w-10 m-5 absolute top-0 right-0">
        {#key batiment}
            <AlarmeComponent idBatiment="{batiment?.id}" on="{fireAlarmOn.includes(batiment?.id ?? -1)}"/>
        {/key}
    </div>
</div>
