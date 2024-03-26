<script lang="ts">
    import {onMount} from "svelte";
    import BadgeService from "../../../../service/BadgeService";
    import type {Badge} from "../../../../interface/Badge";
    import IntervenantService from "../../../../service/IntervenantService";
    import type {Intervenant} from "../../../../interface/Intervenant.js";
    import {goto} from "$app/navigation";
    import {categories} from "./badge";
    import type {Batiment} from "../../../../interface/Batiment";
    import BatimentService from "../../../../service/BatimentService";

    let intervenants: Intervenant[] = [];
    let badges: Badge[] = [];
    let batiments: Batiment[] = [];
    let activeTab = 1
    let color = "green-300"
    let cats = categories;

    onMount(()=>{
        getBadges()
        getIntervenants()
        getBatiments()
    });

    async function getBatiments(){
        batiments = await BatimentService.getAll();
        cats.forEach(cat=>{
            if (cat.name === "Batiment"){
                cat.data = batiments
            }
        })
    }

    async function getIntervenants(){
        intervenants = await IntervenantService.getAll();
        cats.forEach(cat=>{
            if (cat.name === "Intervenant"){
                cat.data = intervenants
            }
        })
    }

    async function getBadges(){
        badges = await BadgeService.getAll();
    }


    async function ajoutBadge(){
        let firstname = (document.getElementById("firstname") as HTMLInputElement).value;
        let lastname = (document.getElementById("lastname") as HTMLInputElement).value;
        if (firstname == "" || lastname == ""){
            console.log("Veuillez renseigner les champs !")
            return;
        }
        let res = await BadgeService.create({})
        getBadges()
    }

    async function deleteBadge(id:number){
        let res = await BadgeService.delete(id)
        getBadges()
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
            <div class="w-44 text-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-3-3v6M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            </div>
            <div class="h-1/2 flex flex-col w-full items-center justify-evenly ">
                <label class="form-control w-full flex  items-center justify-evenly">
                    <div class="label">
                        <span class="label-text">A qui voulez vous assigner le nouveau badge ?</span>
                    </div>
                    <input type="text" placeholder="ID Intervenant" class="input input-bordered w-1/3" id="lastname"/>
                </label>
                <label class="form-control w-full flex  items-center justify-evenly">
                    <div class="label">
                        <span class="label-text">A quels batiments aura t-il accès ?</span>
                    </div>
                    <input type="text" placeholder="Exemple: 1 - 3" class="input input-bordered w-1/3" id="lastname"/>
                </label>
                <button class="btn bg-green-300 w-1/3" on:click={ajoutBadge}>Ajouter</button>
            </div>
        </div>
    </div>
    <div class="divider divider-horizontal"></div>
    <div class="h-2/3 w-1/2">
        <div class="w-full h-16 flex border-b-2">
            {#each cats as cat}
                <div class="w-full h-16 flex items-center justify-center {activeTab==cat.id? 'bg-' : 'text-'}{cat.color} border-r-2 cursor-pointer" on:click={()=>{activeTab=cat.id}}>
                    <div class="h-10">
                        {@html cat.icon}
                    </div>
                    {cat.name}
                </div>
            {/each}
        </div>
        <table class="table">
            <thead class="bg-{cats[activeTab-1].color}">
            <tr>
                {#each cats[activeTab-1].attributes as at}
                    <th>{at.nom}</th>
                {/each}
                <th></th>
            </tr>
            </thead>
            <tbody>
            {#each cats[activeTab-1].data as catAtt}
                <tr>
                    {#each cats[activeTab-1].attributes as catAttName}
                        <td> {catAtt[catAttName.attName]} </td>
                    {/each}
                    <td><button on:click={()=>{deleteBadge(catAtt.id)}} class="text-red-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg></button></td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>
