<script lang="ts">
    import {type Intervenant} from "../../../../interface/Intervenant";
    import {onMount} from "svelte";
    import IntervenantService from "../../../../service/IntervenantService";
    import UserCardComponent from "./UserCardComponent.svelte";
    import {goto} from "$app/navigation";

    let users: Intervenant[] = [];

    onMount(async () => {
        users = await IntervenantService.getAll();
        console.log(users)
    })
</script>
<div class="h-16 flex w-fit justify-start items-center cursor-pointer" on:click={()=>{goto("./")}}>
    <div class="h-10 w-10 mx-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l6 6m-6-6l6-6"/></svg>
    </div>
    Retour
</div>
<div class="flex place-content-center gap-4 flex-wrap p-5">
    {#each users as user}
        <UserCardComponent intervenant="{user}"/>
    {/each}
</div>
