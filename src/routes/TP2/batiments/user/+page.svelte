<script lang="ts">
    import {type Intervenant} from "../../../../interface/Intervenant";
    import {onMount} from "svelte";
    import IntervenantService from "../../../../service/IntervenantService";
    import UserCardComponent from "./UserCardComponent.svelte";

    let users: Intervenant[] = [];

    onMount(async () => {
        users = await IntervenantService.getAll();
    })
</script>
<div class="h-screen w-screen flex gap-4 flex-wrap p-5">
    {#each users as user}
        <UserCardComponent intervenant="{user}"/>
    {/each}
</div>
