<script lang="ts">
    import {type Intervenant} from "../../../../interface/Intervenant";

    export let user: Intervenant;
</script>
<div>
    {user.lastname}
    {user.firstname}
    {user.id}
</div>