export let categories: {id:number,name:string,color:string, icon:string, attributes:{nom:string, attName:string}[], data:any[]}[] = [
    {
        id:1,
        name:"Badge",
        color: "green-300",
        icon:`<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-3-3v6M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
        attributes: [
            {
                nom: "ID",
                attName: "id"
            },
            {
                nom: "Etat",
                attName: "state"
            },
            {
                nom: "Propriétaire",
                attName: "ownerName"
            }
        ],
        data:[]
    },
    {
        id:2,
        name:"Intervenant",
        color: "orange-300",
        icon:`<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0m8 12h6m-3-3v6M6 21v-2a4 4 0 0 1 4-4h4"/></svg>`,
        attributes: [
            {
                nom: "ID",
                attName: "id"
            },
            {
                nom: "Prenom",
                attName: "firstname"
            },
            {
                nom: "Nom",
                attName: "lastname"
            }
        ],
        data:[]
    },
    {
        id:3,
        name:"Batiment",
        color: "purple-300",
        icon:`<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21h18M9 8h1m-1 4h1m-1 4h1m4-8h1m-1 4h1m-1 4h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>`,
        attributes: [
            {
                nom: "ID",
                attName: "id"
            },
            {
                nom: "Nom",
                attName: "name"
            }
        ],
        data:[]
    },
]
