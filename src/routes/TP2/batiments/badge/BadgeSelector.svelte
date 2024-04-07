<script lang="ts">
    import {type Badge} from "../../../../interface/Badge";
    import BadgeComponent from "./BadgeComponent.svelte";

    export let badges: Badge[] = [];
</script>
{#each badges as badge}
    <BadgeComponent badge="{badge}"></BadgeComponent>
{/each}