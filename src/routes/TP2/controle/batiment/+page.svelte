<script lang="ts">
    import {onMount} from "svelte";
    import BatimentService from "../../../../service/BatimentService";
    import type {Batiment} from "../../../../interface/Batiment";
    import {goto} from "$app/navigation";

    let batiments: Batiment[] = []

    onMount(()=>{
        getBatiments()
    });

    async function getBatiments(){
        batiments = await BatimentService.getAll();
    }

    async function ajoutBatiment(){
        let name = (document.getElementById("name") as HTMLInputElement).value;
        let nbDoor = (document.getElementById("nbDoor") as HTMLInputElement).value;
        if (nbDoor == "" || name == ""){
            console.log("Veuillez renseigner les champs !")
            return;
        }
        let res = BatimentService.create({name, nb_door:Number(nbDoor)})
        await getBatiments()
    }

    async function deleteBatiment(id:number){
        let res = await BatimentService.delete(id)
        await getBatiments()
    }

</script>
<div class="w-screen h-screen flex">
    <div class="h-full w-1/2 flex flex-col">
        <div class="h-16 flex w-full justify-start items-center cursor-pointer" on:click={()=>{goto("./")}}>
            <div class="h-10 w-10 mx-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l6 6m-6-6l6-6"/></svg>
            </div>
            Retour
        </div>
        <div class="h-full w-full flex flex-col justify-evenly items-center pb-10">
            <div class="w-44 text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21h18M9 8h1m-1 4h1m-1 4h1m4-8h1m-1 4h1m-1 4h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>        </div>
            <div class="h-1/2 flex flex-col w-full items-center justify-evenly ">
                <input type="text" placeholder="Nom" class="input input-bordered w-1/3" id="name"/>
                <input type="text" placeholder="Nombre de portes" class="input input-bordered w-1/3" id="nbDoor"/>
                <button class="btn bg-purple-300 w-1/3" on:click={ajoutBatiment}>Ajouter</button>
            </div>
        </div>
    </div>
    <div class="divider divider-horizontal"></div>
    <div class="h-2/3 w-1/2">
        <table class="table">
            <thead>
            <tr>
                <th> ID </th>
                <th> Nom </th>
                <th> Nombre de porte </th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {#each batiments as batiment}
                <tr>
                    <td> {batiment.id} </td>
                    <td> {batiment.name} </td>
                    <td> {batiment.nb_door} </td>
                    <td><button on:click={()=>{deleteBatiment(batiment.id)}} class="text-red-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg></button></td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>
