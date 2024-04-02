<script lang="ts">
    import {onMount} from "svelte";
    import EventService from "../../../service/EventService";
    import type {Event} from "../../../interface/Event";
    import {goto} from "$app/navigation";

    let events: Event[] = []

    onMount(()=>{
        getEvents()
    });

    function nav(){
        goto("/tp2");
    }

    async function getEvents(){
        events = await EventService.getAll();
    }

    async function searchByBatiment(){
        let id = (document.getElementById("idBat") as HTMLInputElement).value;
        events = await EventService.seachByBatiment(id);
    }

    async function searchByIntervenant(){
        let id = (document.getElementById("idInt") as HTMLInputElement).value;
        events = await EventService.seachByIntervenant(id);
    }
</script>
<div class="w-screen h-screen flex">
    <div class="h-full w-1/2 flex flex-col">
        <div class="h-16 flex w-full justify-start items-center cursor-pointer" on:click="{nav}">
            <div class="h-10 w-10 mx-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l6 6m-6-6l6-6"/></svg>
            </div>
            Retour
        </div>
        <div class="w-full flex flex-col justify-center items-center my-20">
            <p>
                Rechercher un Batiment.
            </p>
            <input type="text" placeholder="ID" class="input input-bordered w-1/3 my-3" id="idBat"/>
            <button class="btn bg-green-300 w-1/3" on:click={searchByBatiment}>Rechercher</button>
        </div>
        <div class="w-full flex flex-col justify-center items-center">
            <p>
                Rechercher un Intervenant.
            </p>
            <input type="text" placeholder="ID" class="input input-bordered w-1/3 my-3" id="idInt"/>
            <button class="btn bg-green-300 w-1/3" on:click={searchByIntervenant}>Rechercher</button>
        </div>
    </div>
    <div class="divider divider-horizontal"></div>
    <div class="h-2/3 w-1/2">
        <table class="table">
            <thead>
            <tr>
                <th> ID </th>
                <th> Batiment </th>
                <th> Intervenant </th>
                <th> Date </th>
            </tr>
            </thead>
            <tbody>
            {#each events as event}
                <tr>
                    <td> {event.id} </td>
                    <td> {event.batiment.name} </td>
                    <td> {event.intervenant.firstname + " "+event.intervenant.lastname} </td>
                    <td> {event.hour.getDate()} </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>

