import { defineStore } from 'pinia'
import { useConnectionStore } from './connection'

export const usePrinterStore = defineStore('printer', {

  state: () => ({
    toolTemperature: 0,
    bedTemperature: 0,
  }),

  getters: {

  },

  actions: {
    async getTemperatureUpdates(){
      
    }
  }

})