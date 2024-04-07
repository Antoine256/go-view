import {acts} from "@tadashi/svelte-notification";

class EventSocket {
    public socket: WebSocket | null = null;
    private URL: string = "ws://192.168.1.17:8081";

    handleConnect = () => {
        console.log('Connecting to WebSocket server...');
        this.socket = new WebSocket(this.URL); // Replace with your WebSocket server URL

        if (!this.socket) {
            console.error('Failed to create WebSocket connection');
            acts.add({mode: 'error', message: 'Connexion loupée !', lifetime: 3})
            return;
        }

        this.socket.onopen = (event) => {
            console.log('WebSocket connection opened:', event);
            acts.add({mode: 'success', message: 'Connection Réussie!', lifetime: 3},)
            if (this.socket == null) return;
        };

        this.socket.onmessage = (event) => {
            console.log('Received message:', event.data);
        }

        this.socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
            acts.add({mode: 'info', message: 'Connexion Socket Fermée !', lifetime: 3})
        };
    };

    sendMessage(message: string) {
        if (this.socket==null){
            acts.add({mode: 'error', message: "Impossible d'envoyer le message !"})
            return;
        }
        this.socket.send(message);
    }
    handleDisconnect = () => {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
            console.log('WebSocket disconnected');
            acts.add({mode: 'success', message: 'Déconnexion réussie !', lifetime: 3})
        }
    };
}

export default new EventSocket();