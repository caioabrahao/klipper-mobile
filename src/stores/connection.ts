import { defineStore } from 'pinia'
import { usePrinterStore } from './printer'

// subscribe to all the objects the app needs no matter what
const printerObjectsSubscribe = {
    "jsonrpc": "2.0",
    "method": "printer.objects.subscribe",
    "params": {
        "objects": {
            "motion_report": ['live_position', 'live_velocity', 'live_extruder_velocity'],
            "configfile": ['extruder', 'heater_bed'],
            "extruder": ['temperature', 'target', 'power', 'can_extrude'],
            "heater_bed": ['temperature', 'target', 'power'],
            "fan": ['speed', 'rpm'],
            "print_stats": ['filename', 'total_duration', 'print_duration', 'filament_used', 'state', 'message', 'info'],
            "filament_switch_sensor": ['filament_detected', 'enabled']
        }
    },
    "id": 5434
}


export const useConnectionStore = defineStore('connection', {
    state: () => ({
        moonrakerUrl: '100.78.52.7', //sem http e barra no final!
        latestReading: null, 
        klippyState: "",
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
        // isPrinting: (state) => state.klippyState === 'printing'
    },

    actions: {
        async fetchKlippyStatus(){
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

        wsAttemptConnection (){
            const ws = new WebSocket(`ws://${this.moonrakerUrl}/websocket`);
            console.log(`🤨 Trying to stablish connection at ws://${this.moonrakerUrl}/websocket`)
            this.wsState = "Trying to Connect..."
        
            ws.onopen = () =>{
                console.log("👌 Connected to Moonraker WebSocket");
                this.wsState = "Connected"
                this.wsIsConnected = true;
                this.ws = ws;
        
                ws.send(JSON.stringify(printerObjectsSubscribe));
            }
        
            ws.onmessage = (event: MessageEvent) => {
                const printer = usePrinterStore();
                const result = JSON.parse(event.data)
                if (result.method === undefined){
                    // console.log("First Reading:", result.result.status)
                    printer.updateReadings(result.result.status)
                }
                else if (result.method === 'notify_status_update'){
                    this.latestReading = result.params[0]
                    // console.log("Latest Reading:", result)
                    printer.updateReadings(this.latestReading)
                }
                
            };
            ws.onerror = () => {
                this.wsState = "Failed to Connect"
            }
            ws.onclose = () => {
                this.wsIsConnected = false;
                this.wsState = "Connection Closed"
                this.ws = null;
                console.log("Connection to Moonraker closed.");
            };
        }

    }
})