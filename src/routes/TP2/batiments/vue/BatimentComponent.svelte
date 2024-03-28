<script lang="ts">
    import {type Batiment} from "../../../../interface/Batiment";
    import {onMount} from "svelte";
    import LightComponent from "./LightComponent.svelte";
    import HumanComponent from "./HumanComponent.svelte";
    import BadgeReaderComponent from "./BadgeReaderComponent.svelte";

    export let batiment: Batiment;
    let openDoor = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13q.425 0 .713-.288T12 12q0-.425-.288-.712T11 11q-.425 0-.712.288T10 12q0 .425.288.713T11 13m-4 8v-2l6-1V6.875q0-.375-.225-.675t-.575-.35L7 5V3l5.5.9q1.1.2 1.8 1.025T15 6.85v12.8zm-4 0v-2h2V5q0-.85.588-1.425T7 3h10q.85 0 1.425.575T19 5v14h2v2zm4-2h10V5H7z"/></svg>`;
    let closeDoor = `<svg class="h-24 w-24" xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-2h2V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v14h2v2zm14-2V5H7v14zm-3-6q.425 0 .713-.288T15 12q0-.425-.288-.712T14 11q-.425 0-.712.288T13 12q0 .425.288.713T14 13M7 5v14z"/></svg>`;

    let badgeScanned = false
    let isInside = true;

    //let doors: Door[] = [];

    onMount(async () => {
        //doors = await DoorService.getAll();
    })

</script>
<div class="w-screen h-screen flex flex-col justify-center items-center">
    <p class="w-full py-3 text-xl text-center font-semibold bg-gray-300">{batiment?.name} ({batiment?.id})</p>
    <div class="w-full h-1/4 flex justify-center items-center bg-gray-300" id="in">
        <HumanComponent hidden="{isInside}" id="humanInBatiment"/>
    </div>
    <div class="w-11/12 flex justify-around grow">
        {#each {length: batiment?.nb_door} as _, i}
            <div class="flex flex-col justify-center items-center text-center">
                {#if isInside}
                    <BadgeReaderComponent idHuman="humanInBatiment"/>
                {/if}
                <LightComponent badgeScanned="{badgeScanned}"/>
                {@html closeDoor}
                <p>{i + 1}</p>
                <LightComponent badgeScanned="{badgeScanned}"/>
                {#if !isInside}
                    <BadgeReaderComponent idHuman="humanOutBatiment"/>
                {/if}
            </div>
        {/each}
    </div>
    <div class="w-full h-1/4 flex justify-center items-center bg-lime-300" id="out">
        <HumanComponent hidden="{!isInside}" id="humanOutBatiment"/>
    </div>
</div>
