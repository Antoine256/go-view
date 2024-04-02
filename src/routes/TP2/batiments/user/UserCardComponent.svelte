<script lang="ts">
    import {type Intervenant} from "../../../../interface/Intervenant";
    import user, {isUserSelected, setUserSelect, userIsSelected} from "../../../../store/user.js";

    export let intervenant: Intervenant;

    function selectThisIntervenant(){
        setUserSelect(intervenant)
    }
</script>
{#key $user}
    <div class="p-5 shadow-lg border rounded-xl {isUserSelected(intervenant) ? 'border-lime-600' : 'border-gray-200'}" on:click={selectThisIntervenant}>
        {intervenant.lastname}
        {intervenant.firstname}
        {intervenant.id}
    </div>
{/key}