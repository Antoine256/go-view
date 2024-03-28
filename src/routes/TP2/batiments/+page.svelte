<script lang="ts">
    import {goto} from "$app/navigation";
    import {type Link} from "../../../interface/Link";


    function nav(link: string){
        goto(link)
    }

    let links: Link[] = [{
        link: "/tp2/batiments/user",
        color: "text-orange-300",
        icon:`<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20zm2-2h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2zm6-8q.825 0 1.413-.587T14 8q0-.825-.587-1.412T12 6q-.825 0-1.412.588T10 8q0 .825.588 1.413T12 10m0 8"/></svg>`,
        name: "Choisir l'utilisateur"
    }, {
        link: "/tp2/batiments/vue",
        color: "text-purple-300",
        icon:`<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21h18M9 8h1m-1 4h1m-1 4h1m4-8h1m-1 4h1m-1 4h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>`,
        name: "Simulation"
    }, {
        link:"/tp2",
        name:"Retour",
        color: "text-yellow-300",
        icon:`<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 11l-4 4l4 4m-4-4h11a4 4 0 0 0 0-8h-1"/></svg>`
    }
    ]
</script>

<div class="h-screen w-screen flex flex-col items-center justify-center">
    <div class="flex flex-col items-center p-10">
        <h1 class="text-4xl">Bienvenue sur la vue de simulation</h1>
    </div>
    <div class="grid grid-cols-3 gap-10 h-full w-2/3 pb-10">
        {#each links as link}
            <div class="border-2 shadow-lg rounded-3xl card flex justify-center items-center cursor-pointer" on:click={()=>{nav(link.link)}}>
                <div class="w-1/3 {link.color}">{@html link.icon}</div>
                <p class="text-2xl">{link.name}</p>
            </div>
        {/each}
    </div>
</div>