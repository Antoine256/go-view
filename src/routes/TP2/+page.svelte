<script lang="ts">
    import type {Link} from "../../interface/Link";
    import {goto} from '$app/navigation';
    import {Notifications} from '@tadashi/svelte-notification'

    let baseLink = "/tp2"

    function nav(link: string) {
        goto(baseLink + link)
    }

    let links: Link[] = [
        {
            link: "/controle",
            name: "Salle de commande",
            color: "text-orange-300",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="=auto" height="auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0-4 0m2-6v4m0 4v8m4-4a2 2 0 1 0 4 0a2 2 0 0 0-4 0m2-12v10m0 4v2m4-13a2 2 0 1 0 4 0a2 2 0 0 0-4 0m2-3v1m0 4v11"/></svg>`
        },
        {
            link: "/batiments",
            name: "Vue des bâtiments",
            color: "text-purple-300",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 9l5 5v7H8v-4m0 4H3v-7l5-5m1 1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17h-8m0-14v.01M17 7v.01M17 11v.01M17 15v.01"/></svg>`
        },
        {
            link: "/journal",
            name: "Journal de bord",
            color: "text-yellow-300",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2m-8-4h6m-6-4h6"/></g></svg>`
        },
    ]
</script>

<div class="h-screen w-screen flex flex-col items-center justify-center">
    <div class="flex flex-col items-center p-10">
        <h1 class="text-4xl">TP2 INFO801</h1>
    </div>
    <div class="grid grid-cols-3 gap-10 h-full pb-10">
    {#each links as link}
        <div class="border-2 shadow-lg rounded-3xl card flex justify-center items-center cursor-pointer p-5"
             on:click={()=>{nav(link.link)}}>
            <div class="w-1/3 {link.color}">{@html link.icon}</div>
            <p class="text-4xl text-center">{link.name}</p>
        </div>
    {/each}
<!--    <div class="border-2 rounded-3xl card flex justify-center items-center cursor-pointer"-->
<!--         on:click={handleConnect}>-->
<!--        <div class="w-1/3 text-green-300">-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24">-->
<!--                <path fill="currentColor"-->
<!--                      d="M20.5 15.1a1 1 0 0 0-1.34.45A8 8 0 1 1 12 4a7.93 7.93 0 0 1 7.16 4.45a1 1 0 0 0 1.8-.9a10 10 0 1 0 0 8.9a1 1 0 0 0-.46-1.35M21 11h-9.59l2.3-2.29a1 1 0 1 0-1.42-1.42l-4 4a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33l4 4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L11.41 13H21a1 1 0 0 0 0-2"/>-->
<!--            </svg>-->
<!--        </div>-->
<!--        <p class="text-4xl">Connect</p>-->
<!--    </div>-->
<!--    <div class="border-2 shadow-lg rounded-3xl card flex justify-center items-center cursor-pointer"-->
<!--         on:click={handleDisconnect}>-->
<!--        <div class="w-1/3 text-red-300">-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24">-->
<!--                <path fill="currentColor"-->
<!--                      d="m12.59 13l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H3a1 1 0 0 0 0 2ZM12 2a10 10 0 0 0-9 5.55a1 1 0 0 0 1.8.9A8 8 0 1 1 12 20a7.93 7.93 0 0 1-7.16-4.45a1 1 0 0 0-1.8.9A10 10 0 1 0 12 2"/>-->
<!--            </svg>-->
<!--        </div>-->
<!--        <p class="text-4xl">Disconnect</p>-->
<!--    </div>-->
</div>
</div>
<Notifications/>
