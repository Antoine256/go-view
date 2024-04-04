<script lang="ts">
    import {onMount} from "svelte";
    import BadgeService from "../../../../service/BadgeService";
    import IntervenantService from "../../../../service/IntervenantService";
    import type {Intervenant} from "../../../../interface/Intervenant.js";
    import {goto} from "$app/navigation";
    import {categories} from "../badge/badge";
    import type {Batiment} from "../../../../interface/Batiment";
    import BatimentService from "../../../../service/BatimentService";
    import {BadgeStates} from "../../../../interface/BadgeStates";
    import type {BadgeDTO} from "../../../../interface/BadgeDTO";
    import type {Badge} from "../../../../interface/Badge";

    let intervenants: Intervenant[] = [];
    let badges: BadgeDTO[] = [];
    let batiments: Batiment[] = [];
    let activeTab = 1
    let color = "green-300"
    let cats = categories;
    let badgeToUpdate: BadgeDTO | null = null;
    let modtable = 0;
    let translation = {"enabled": "activé", "disabled": "désactivé", "lose": "perdu"}

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
        modtable++
    }

    async function getIntervenants(){
        intervenants = await IntervenantService.getAll();
        cats.forEach(cat=>{
            if (cat.name === "Intervenant"){
                cat.data = intervenants
            }
        })
        modtable++
    }

    async function getBadges(){
        badges = await BadgeService.getAllBadge() as BadgeDTO[];
        cats.forEach(cat=>{
            if (cat.name === "Badge"){
                cat.data = badges
            }
        })
        modtable++
    }


    async function modificationBadge(){
        let idBat: string = (document.getElementById("idBat") as HTMLInputElement).value;
        let states: NodeListOf<HTMLInputElement> = document.getElementsByName("badgeState") as NodeListOf<HTMLInputElement>
        if (idBat == ""){
            console.log("Veuillez renseigner les champs !")
            return;
        }
        let batLongId = idBat.split(",").map((bat) => {
            return Number(bat.trim())
        })
        let state = BadgeStates.enabled;
        states.forEach((st)=>{
            if(st.checked){
                state = st.value as BadgeStates
            }
        })
        //console.log(batLongId)
        let res = await BadgeService.modifBadge({ id: badgeToUpdate!.id,batiments: batLongId, owner_id:badgeToUpdate!.owner.id, state:state})
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
            {#if badgeToUpdate !== null}
            <div class="w-44 text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 20h4L18.5 9.5a2.828 2.828 0 1 0-4-4L4 16zm9.5-13.5l4 4"/></svg>            </div>
            <div class="h-1/2 flex flex-col w-full items-center justify-evenly ">
                <label class="form-control w-full flex  items-center justify-evenly">
                    <div class="label">
                        <span class="label-text">A quels batiments aura t-il accès ?</span>
                    </div>
                    <input type="text" placeholder="Exemple: 1 - 3" value="{badgeToUpdate.batiments.map((bat)=>{return bat.id}).toString()}" class="input input-bordered w-1/3" id="idBat"/>
                </label>
                <label class="form-control w-full flex  mb-5  items-center justify-evenly">
                    <div class="label">
                        <span class="label-text">État du badge ?</span>
                    </div>
                    <div class="flex ">
                        {#each Object.values(BadgeStates) as val}
                            {#if badgeToUpdate.state === val}
                                <input type="radio" name="badgeState" class="radio" value="{val}" checked />
                                <div class="ml-2 mr-5">{translation[val]}</div>
                            {:else}
                                <input type="radio" name="badgeState" value="{val}" class="radio" />
                                <div class="ml-2 mr-5">{translation[val]}</div>
                            {/if}
                        {/each}
                    </div>
                </label>
                <button class="btn bg-blue-300 w-1/3" on:click={modificationBadge}>Modifier</button>
            </div>
            {:else}
                <p>Veuillez choisir le badge à modifier ( en cliquant sur votre liste )</p>
            {/if}
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
                {#if cats[activeTab-1].name === "Badge"}
                    <th></th>
                {/if}
            </tr>
            </thead>
            <tbody>
            {#key modtable}
                {#each cats[activeTab-1].data as catAtt}
                    {#if cats[activeTab-1].name === "Badge"}
                    <tr class="cursor-pointer" on:click={()=>{badgeToUpdate = catAtt}}>
                        {#each cats[activeTab-1].attributes as catAttName}
                            <td> {catAtt[catAttName.attName]} </td>
                        {/each}
                        <td><button on:click={()=>{deleteBadge(catAtt.id)}} class="text-red-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg></button></td>
                    </tr>
                    {:else}
                    <tr>
                        {#each cats[activeTab-1].attributes as catAttName}
                            <td> {catAtt[catAttName.attName]} </td>
                        {/each}
                    </tr>
                    {/if}
                {/each}
            {/key}
            </tbody>
        </table>
    </div>
</div>
