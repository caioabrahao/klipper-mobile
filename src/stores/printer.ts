import { defineStore } from 'pinia'

export const usePrinterStore = defineStore('printer', {

  state: () => ({
    latestReading: null,
    toolTemperature: 0,
    bedTemperature: 0,
  }),

  getters: {
    
  },

  actions: {
    

  }
})