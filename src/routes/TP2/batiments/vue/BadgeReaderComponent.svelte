<script lang="ts">
    export let idHuman: string;
    export let idDoor: number;
    export let canEnter: boolean;
    export let doorSeleded: number;

    function allowDrop(ev: any): void {
        ev.preventDefault();
    }

    function dropHuman(id: string, ev: any): void {
        ev.preventDefault();
        ev.target.appendChild(document.getElementById(id));
        canEnter = true;
        doorSeleded = idDoor;
    }
</script>

<div on:drop={() => dropHuman(idHuman, event)} on:dragover={() => allowDrop( event)} class=" w-16 h-16 bg-red-300"></div>
