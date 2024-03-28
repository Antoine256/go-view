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
<div class="h-screen w-screen">
    {#each users as user}
        <UserCardComponent user="{user}"/>
    {/each}
</div>
