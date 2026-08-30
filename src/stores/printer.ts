import { defineStore } from 'pinia'

export const usePrinterStore = defineStore('printer', {

  state: () => ({
    toolTemperature: 0,
    bedTemperature: 0,
    progress: 0,
    state: 'idle'
  }),

  getters: {
    isPrinting: (state) => state.state === 'printing'
  },

  actions: {
    setTemperature(temp: number) {
      this.toolTemperature = temp
    }
  }

})