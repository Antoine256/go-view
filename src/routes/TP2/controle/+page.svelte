<script lang="ts">

    import type {Link} from "../../../interface/Link";
    import {links} from "./ControlePanel";
    import {goto} from "$app/navigation";

    function nav(link: string){
        goto(link)
    }

    let link:Link[] = links

</script>

<div class="h-screen w-screen flex flex-col items-center justify-center">
    <div class="flex flex-col items-center p-10">
        <h1 class="text-4xl">Bienvenue sur le panneau de contrôle</h1>
    </div>
    <div class="grid grid-cols-3 gap-10 h-full pb-10">
        {#each links as link}
            <div class="border-2 shadow-lg rounded-3xl card flex justify-center items-center cursor-pointer" on:click={()=>{nav(link.link)}}>
                <div class="w-1/3 {link.color}">{@html link.icon}</div>
                <p class="text-2xl">{link.name}</p>
            </div>
        {/each}
    </div>
</div>
