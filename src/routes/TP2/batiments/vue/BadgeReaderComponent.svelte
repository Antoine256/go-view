<script lang="ts">
    export let idHuman: string;

    function allowDrop(ev): void {
        ev.preventDefault();
    }

    function dropHuman(id: string, ev): void {
        ev.preventDefault();
        ev.target.appendChild(document.getElementById(id));
    }
</script>

<div on:drop={() => dropHuman(idHuman, event)} on:dragover={() => allowDrop( event)} class=" w-16 h-16 bg-red-300"></div>