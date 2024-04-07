<script lang="ts">
    import { onMount } from 'svelte';
    import "../../app.css";

    let socket: WebSocket | null = null;
    let message = '';
    let pompe = false;
    let ventilateur = false;
    let niveau_eau: number = 0;
    let niveau_ch4: number = 0;
    let niveau_co: number = 0;
    let eau_height : number = 0;
    let ch4_height : number = 0;
    let co_height: number = 0;

    const handleConnect = () => {
        console.log('Connecting to WebSocket server...');
        socket = new WebSocket('ws://localhost:8081'); // Replace with your WebSocket server URL

        if (!socket) {
            console.error('Failed to create WebSocket connection');
            return;
        }

        socket.onopen = (event) => {
            console.log('WebSocket connection opened:', event);
            if (socket == null) return;
            socket.send('Hello, server!');
        };

        socket.onmessage = (event) => {
            console.log('Received message:', event.data);
            if (!event.data.includes(':'))
                message = event.data;
            else if (event.data.includes(':')){
                let tab_mess = event.data.split(':');
                message = tab_mess[0] + ': ' + Math.trunc(Number(tab_mess[1].trim()));
            }
            console.log(message.includes(':'));
            switch (event.data) {
                case 'Pompe activée':
                    pompe = true;
                    break;
                case 'Pompe desactivée':
                    pompe = false;
                    break;
                case 'Ventilateur activé':
                    ventilateur = true;
                    break;
                case 'Ventilateur désactivé':
                    ventilateur = false;
                    break;
                default:
                    if (!event.data.includes(':')) break;
                    let tab_mess = event.data.split(':');
                    if (tab_mess[0].includes('ch4')) niveau_ch4 = Math.trunc(Number(tab_mess[1].trim()));
                    if (tab_mess[0].includes('co')) niveau_co = Math.trunc(Number(tab_mess[1].trim()));
                    if (tab_mess[0].includes('h2o')) niveau_eau = Math.trunc(Number(tab_mess[1].trim()));
                    calculeNiveau();
                    break;
            }
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };
    };

    const handleDisconnect = () => {
        if (socket) {
            socket.close();
            socket = null;
            console.log('WebSocket disconnected');
        }
    };

    onMount(() => {
        // Cleanup WebSocket connection on component destruction
        return () => {
            handleDisconnect();
        };
    });

    function calculeNiveau(){
        let niveaux = [niveau_co, niveau_ch4, niveau_eau];
        let heights : number[] = [];
        niveaux.forEach((niveau: number) => {
            if (niveau > 100) niveau = 100;
            if (niveau < 0) niveau = 0;
            let height = niveau*4 ;
            heights.push(height);
        });
        if (heights.length < 3) return;
        co_height = heights[0];
        ch4_height = heights[1];
        eau_height = heights[2];
    }
</script>
<div class="h-screen w-screen bg-base-100 flex">
    <div class="h-screen w-1/4 flex flex-col bg-primary z-20 shadow-lg">
        <div class="p-5 flex justify-evenly items-center w-full h-1/6">
            <button class="btn" on:click={handleConnect}>Connexion</button>
            <button class="btn" on:click={handleDisconnect}>Déconnexion</button>
        </div>
        <div class="p-5 flex flex-col h-5/6">
            <h1 class="text-2xl text-center mb-5">Panneau de contrôle</h1>

            <div class="text-xl flex flex-col justify-center items-center"> Dernier message
                <div class="bg-base-100 w-4/5 h-20 rounded-3xl flex justify-center m-2 items-center">
                    {message}
                </div>
            </div>

            <div class=" flex flex-col justify-evenly h-2/3">
                <div class="w-full flex flex-col justify-center items-center">
                    <h2>Ventilateur</h2>
                    <div class="h-12 w-12 border flex justify-center items-center">
                        <div class="{ventilateur? 'bg-green-500' : 'bg-red-500'} w-8 h-8 rounded-full"></div>
                    </div>
                </div>
                <div  class="w-full flex flex-col justify-center items-center">
                    <h2>Pompe</h2>
                    <div class="h-12 w-12 border flex justify-center items-center">
                        <div class="{pompe? 'bg-green-500' : 'bg-red-500'} w-8 h-8 rounded-full"></div>
                    </div>
                </div>
            </div>
            <div class="flex items-center">Niveau d'eau : {niveau_eau} <div class="rounded-full mx-3.5 w-5 h-5 bg-blue-300"></div> (Seuil : 10 - 60)</div>
            <div class="flex items-center">Niveau de CH4 : {niveau_ch4} <div class="rounded-full mx-3.5 w-5 h-5 bg-green-200"></div> (Seuil : 50)</div>
            <div class="flex items-center">Niveau de CO : {niveau_co} <div class="rounded-full mx-3.5 w-5 h-5 bg-slate-200"></div> (Seuil : 50)</div>
        </div>
    </div>
    {#if message !== ""}
        <div class="h-screen w-3/4 flex flex-col items-end justify-between">
            <div class="w-full h-full">
                <div class="w-full max-h-1/3 bg-green-200 text-center text-green-600 text-2xl flex items-center justify-center" style="height: {ch4_height}px;">CH4</div>
                <div class="w-full max-h-1/3 bg-slate-200 text-center text-slate-700 text-2xl flex items-center justify-center" style="height: {co_height}px;">CO</div>
            </div>
            <div class="w-full max-h-1/3 bg-blue-300 text-center text-blue-700 text-2xl flex items-center justify-center" style="height: {eau_height}px;">H2O</div>
        </div>
    {/if}
</div>
