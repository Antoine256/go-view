<script lang="ts">
    import {onMount} from "svelte";
    import IntervenantService from "../../../../service/IntervenantService";
    import type {Intervenant} from "../../../../interface/Intervenant";
    import {goto} from "$app/navigation";

    let intervenants: Intervenant[] = []

    onMount(()=>{
        getIntervenants()
    });

    async function getIntervenants(){
        intervenants = await IntervenantService.getAll();
    }

    async function ajoutIntervenant(){
        let firstname = (document.getElementById("firstname") as HTMLInputElement).value;
        let lastname = (document.getElementById("lastname") as HTMLInputElement).value;
        if (firstname == "" || lastname == ""){
            console.log("Veuillez renseigner les champs !")
            return;
        }
        let res = await IntervenantService.create({firstname, lastname, badges: []})
        getIntervenants()
    }

    async function deleteIntervenant(id:number){
        let res = await IntervenantService.delete(id)
        getIntervenants()
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
            <div class="w-44 text-orange-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0m8 12h6m-3-3v6M6 21v-2a4 4 0 0 1 4-4h4"/></svg>
            </div>
            <div class="h-1/2 flex flex-col w-full items-center justify-evenly ">
                <input type="text" placeholder="Nom" class="input input-bordered w-1/3" id="lastname"/>
                <input type="text" placeholder="Prénom" class="input input-bordered w-1/3" id="firstname"/>
                <button class="btn bg-orange-300 w-1/3" on:click={ajoutIntervenant}>Ajouter</button>
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
                    <th> Prénom </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {#each intervenants as intervenant}
                <tr>
                    <td> {intervenant.id} </td>
                    <td> {intervenant.lastname} </td>
                    <td> {intervenant.firstname} </td>
                    <td><button on:click={()=>{deleteIntervenant(intervenant.id)}} class="text-red-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg></button></td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>
