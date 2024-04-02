<script lang="ts">
    import {type Intervenant} from "../../../../interface/Intervenant";
    import user, {getUserSelected, isUserSelected, setUserSelect, userIsSelected} from "../../../../store/user.js";

    export let intervenant: Intervenant;

    function selectThisIntervenant(){
        setUserSelect(intervenant);
    }
</script>
{#key $user}
    <div class="h-fit w-1/5 p-5 flex flex-col gap-6 items-center cursor-pointer transition-all shadow-lg hover:shadow-2xl rounded-xl {isUserSelected(intervenant) ? 'border-indigo-600 border-2 bg-indigo-600 bg-opacity-5' : 'border-gray-200  border'}" on:click={selectThisIntervenant}>
        <svg class="w-1/4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="M1.573 1.573A.25.25 0 0 1 1.75 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5A1.75 1.75 0 0 0 0 1.75v1.5a.75.75 0 0 0 1.5 0v-1.5a.25.25 0 0 1 .073-.177M14 10.75a.75.75 0 0 0-1.5 0v1.5a.25.25 0 0 1-.25.25h-1.5a.75.75 0 0 0 0 1.5h1.5A1.75 1.75 0 0 0 14 12.25zM.75 10a.75.75 0 0 1 .75.75v1.5a.25.25 0 0 0 .25.25h1.5a.75.75 0 0 1 0 1.5h-1.5A1.75 1.75 0 0 1 0 12.25v-1.5A.75.75 0 0 1 .75 10m10-10a.75.75 0 0 0 0 1.5h1.5a.25.25 0 0 1 .25.25v1.5a.75.75 0 0 0 1.5 0v-1.5A1.75 1.75 0 0 0 12.25 0zM7 7.776a4.423 4.423 0 0 0-4.145 2.879c-.112.299.127.595.446.595h7.396c.32 0 .558-.296.447-.595a4.423 4.423 0 0 0-4.145-2.879Zm2.208-3.315a2.21 2.21 0 1 1-4.421 0a2.21 2.21 0 0 1 4.421 0" clip-rule="evenodd"/></svg>
        <p>{intervenant.firstname} {intervenant.lastname}</p>
    </div>
{/key}