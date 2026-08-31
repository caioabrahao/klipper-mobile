import { defineStore } from 'pinia'

interface MoonrakerRequest {
  jsonrpc: "2.0";
  method: string;
  params: {};
  id: number;
}


export const useConnectionStore = defineStore('connection', {
    state: () => ({
        moonrakerUrl: '100.78.52.7', //sem http e barra no final!
        klippyState: "error",
        klippyStateMessage: "",
        wsIsConnected: false,
        wsState: "Not Connected",
        hostname: "",
        logFileDir: "",
        ws: null as WebSocket | null,
        error: null as string | null
    }),

    persist: {
        pick: ['moonrakerUrl']
    },

    getters: {
        isPrinting: (state) => state.klippyState === 'printing'
    },

    actions: {
        async fetchStatus(){
        try{
            const response = await fetch(`http://${this.moonrakerUrl}/printer/info`)

            if (!response.ok) {
                throw new Error(`Moonraker Error: ${response.statusText}`)
            }
            const data = await response.json()
            if (data.result) {
                this.klippyState = data.result.state || []
                this.klippyStateMessage = data.result.state_message || 0
                this.hostname = data.result.hostname || 0
                this.logFileDir = data.result.log_file || 0
                
            }
        } catch (err:any) {
            this.error = err.message
            console.error('Failed fetching Moonraker history:', err)
            } 
        },

        async wsAttemptConnection (){
            const ws = new WebSocket(`ws://${this.moonrakerUrl}/websocket`);
            console.log(`Trying to start WS at ws://${this.moonrakerUrl}/websocket`)
            this.wsState = "Trying to Connect..."

            ws.onopen = () =>{
                console.log("Connected to Moonraker WebSocket");
                this.wsState = "Connected"
                this.wsIsConnected = true;
                this.ws = ws;

                ws.onerror = (error) => {
                    console.error("Moonraker Socket Error:", error);
                    this.wsState = "Connection Error!"
                }
                ws.onclose = () => {
                    this.wsIsConnected = false;
                    this.wsState = "Connection Closed"
                    this.ws = null;
                    console.log("Connection to Moonraker closed.");
                };
            }

            ws.onerror = () => {
                this.wsState = "Failed to Connect"
            }
        },

        async subscribeWebSocket (method:string, params: {}){
            if (!this.ws) {
                console.error('WebSocket is not connected.');
                return;
            }
            const subscriptionPayload: MoonrakerRequest = {
                jsonrpc: '2.0',
                method: method,
                params: params,
                id: 1001
            };
            this.ws.send(JSON.stringify(subscriptionPayload));
        
        },
    }
})