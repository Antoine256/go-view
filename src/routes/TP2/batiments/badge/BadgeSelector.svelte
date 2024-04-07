<script lang="ts">
    import {type Badge} from "../../../../interface/Badge";
    import BadgeComponent from "./BadgeComponent.svelte";

    export let badges: Badge[] = [];
    export let open: boolean = false;

    function stopPropagation(event: MouseEvent) {
        event.stopPropagation();
    }
</script>
{#if open}
    <div class="absolute w-56 min-h-16 ml-72 bottom-0 mb-16 bg-white bg-opacity-95 p-3 rounded-lg shadow-2xl" on:click="{stopPropagation}">
        <p class="font-semibold mb-2 text-center">Badges possédés</p>
        <div class="grid grid-cols-4 gap-2">
            {#each badges as badge}
                <BadgeComponent badge="{badge}"></BadgeComponent>
            {/each}
        </div>
    </div>
{/if}