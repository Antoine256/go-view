<script lang="ts">
    import batimentService from "../../../../service/BatimentService";
    import {onMount} from "svelte";
    import {type Batiment} from "../../../../interface/Batiment";
    import BatimentComponent from "./BatimentComponent.svelte";
    import {goto} from "$app/navigation";

    let batiments: Batiment[] = [];
    let currentBatiment: number = 0;

    function resetHumanPosition(): void{
        if(document.getElementById("humanInBatiment")){
            document.getElementById("in").appendChild(document.getElementById("humanInBatiment"));
        }
        if(document.getElementById("humanOutBatiment")){
            document.getElementById("out").appendChild(document.getElementById("humanOutBatiment"));
        }

    }

    function nextBatiment(): void {
        if(currentBatiment + 1 > batiments.length - 1){
            currentBatiment = 0;
        } else {
            currentBatiment++;
        }
        resetHumanPosition();
    }

    function previousBatiment(): void {
        if(currentBatiment - 1 < 0){
            currentBatiment = batiments.length - 1;
        } else {
            currentBatiment--;
        }
        resetHumanPosition();
    }

    onMount(async () => {
        batiments = await batimentService.getAll();
    })
</script>
<div class="h-screen w-screen flex items-center">
    <div class="h-16 flex w-fit absolute top-0 justify-start items-center cursor-pointer" on:click={()=>{goto("./")}}>
        <div class="h-10 w-10 mx-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l6 6m-6-6l6-6"/></svg>
        </div>
        Retour
    </div>
    <svg on:click={previousBatiment} class="m-3 left-0 absolute cursor-pointer hover:text-indigo-300 transition-all ease-in-out" xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 640 512" transform="scale(1,1) scale(-1,1)"><path fill="currentColor" d="M0 48C0 21.5 21.5 0 48 0h288c26.5 0 48 21.5 48 48v184.2c-39.1 32.3-64 81.1-64 135.8c0 49.5 20.4 94.2 53.3 126.2c-8.8 10.9-22.2 17.8-37.3 17.8h-96v-80c0-26.5-21.5-48-48-48s-48 21.5-48 48v80H48c-26.5 0-48-21.5-48-48zm80 176c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm80 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16m112-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM64 112v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16m112-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm80 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16m96 256a144 144 0 1 1 288 0a144 144 0 1 1-288 0m140.7-67.3c-6.2 6.2-6.2 16.4 0 22.6l28.7 28.7H432c-8.8 0-16 7.2-16 16s7.2 16 16 16h89.4l-28.7 28.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l56-56c6.2-6.2 6.2-16.4 0-22.6l-56-56c-6.2-6.2-16.4-6.2-22.6 0"/></svg>
    <BatimentComponent batiment="{batiments[currentBatiment]}"/>
    <svg on:click={nextBatiment} class="m-3 right-0 absolute cursor-pointer hover:text-indigo-300 transition-all ease-in-out" xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 640 512"><path fill="currentColor" d="M0 48C0 21.5 21.5 0 48 0h288c26.5 0 48 21.5 48 48v184.2c-39.1 32.3-64 81.1-64 135.8c0 49.5 20.4 94.2 53.3 126.2c-8.8 10.9-22.2 17.8-37.3 17.8h-96v-80c0-26.5-21.5-48-48-48s-48 21.5-48 48v80H48c-26.5 0-48-21.5-48-48zm80 176c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm80 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16m112-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM64 112v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16m112-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm80 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16m96 256a144 144 0 1 1 288 0a144 144 0 1 1-288 0m140.7-67.3c-6.2 6.2-6.2 16.4 0 22.6l28.7 28.7H432c-8.8 0-16 7.2-16 16s7.2 16 16 16h89.4l-28.7 28.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l56-56c6.2-6.2 6.2-16.4 0-22.6l-56-56c-6.2-6.2-16.4-6.2-22.6 0"/></svg>
</div>