import { defineStore } from 'pinia'

export const useConnectionStore = defineStore('connection', {
    state: () => ({
        moonrakerUrl: '100.78.52.7',
        latestReading: null, //sem http e barra no final!
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


    }
})