import { defineStore } from 'pinia'
import { useConnectionStore } from './connection'

export const usePrinterStore = defineStore('printer', {

  state: () => ({
    state: "error",
    stateMessage: "",
    hostname: "",
    logFileDir: "",
    error: null
  }),

  getters: {
    isPrinting: (state) => state.state === 'printing'
  },

  actions: {
    async fetchStatus(){
      try{
        const response = await fetch(`${useConnectionStore().moonrakerUrl}/printer/info`)

        if (!response.ok) {
            throw new Error(`Moonraker Error: ${response.statusText}`)
        }
        const data = await response.json()
        if (data.result) {
            this.state = data.result.state || []
            this.stateMessage = data.result.state_message || 0
            this.hostname = data.result.hostname || 0
            this.logFileDir = data.result.log_file || 0
            
        }
      } catch (err:any) {
          this.error = err.message
          console.error('Failed fetching Moonraker history:', err)
        } 
    }
  }

})