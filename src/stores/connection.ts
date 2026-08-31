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
        hostname: "",
        logFileDir: "",
        ws: null as WebSocket | null,
        error: null as string | null
    }),

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

        async startWebSocket (){
            const ws = new WebSocket(`ws://${this.moonrakerUrl}/websocket`);
            console.log(`Trying to start WS at ws://${this.moonrakerUrl}/websocket`)

            ws.onopen = () =>{
                console.log("Connected to Moonraker WebSocket");
                this.wsIsConnected = true;
                this.ws = ws;

                ws.onmessage = (event: MessageEvent) =>{
                    try{
                        const response = JSON.parse(event.data)

                        if (response.id === 1001) {
                            console.log("Subscription successful. Initial state:", response.result);
                            return;
                        }  

                    } catch(error) {
                        console.error("Failed to parse Moonraker message:", error);
                    }
                }
                ws.onerror = (error) => console.error("Moonraker Socket Error:", error);
                ws.onclose = () => {
                    this.wsIsConnected = false;
                    this.ws = null;
                    console.log("Connection to Moonraker closed.");
                };
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

        async addWebSocketListener(objects={}){
            if(!this.ws){
                console.log("Cant add Listener, Websocket not connected!")
                return
            }
            this.ws.onmessage  = (event: MessageEvent) => {
                try{
                    const response = JSON.parse(event.data);

                    if (response.method === "notify_status_update") {
                        const statusUpdates = response.params[0]; // Moonraker passes status objects in an array
                        
                        return statusUpdates
                    }
                }catch(error) {
                    console.error("Failed to parse Moonraker message:", error);
                }
            }
           
        }
    }
})