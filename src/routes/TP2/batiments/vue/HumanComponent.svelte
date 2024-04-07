<script lang="ts">
    import {getUserSelected, userIsSelected} from "../../../../store/user.js";
    import BadgeSelector from "../badge/BadgeSelector.svelte";
    import {badgeIsSelected} from "../../../../store/badge";
    import {acts} from "@tadashi/svelte-notification";

    export let hidden: boolean = false;
    export let id: string;

    let openBadgeSelector: boolean = false;

    function dragHuman(id: string, ev:any): void {
        ev.dataTransfer.setData("text", ev.target.id);
    }
</script>

{#if hidden}
    {#if userIsSelected()}
        <div on:click={() => openBadgeSelector = !openBadgeSelector} class="relative w-16 h-16 text-indigo-500 cursor-pointer drag:cursor-pointer flex flex-col items-center" on:dragstart={() => dragHuman(id, event)} draggable="true" id="{id}">
            <svg  xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1a2 2 0 0 0-2 2c0 1.11.89 2 2 2c1.11 0 2-.89 2-2a2 2 0 0 0-2-2m-2 5c-.27 0-.5.11-.69.28H9.3L4 11.59L5.42 13L9 9.41V22h2v-7h2v7h2V9.41L18.58 13L20 11.59l-5.3-5.31c-.2-.17-.43-.28-.7-.28"/></svg>
            <p>{getUserSelected().firstname}</p>
            <BadgeSelector bind:open={openBadgeSelector} badges="{getUserSelected().badges}"></BadgeSelector>
        </div>
    {:else}
        <div>
            <p>Vous devez choisir un utilisateur <a href="/tp2/batiments/user">(cliquez ici)</a>.</p>
        </div>
    {/if}
{/if}
