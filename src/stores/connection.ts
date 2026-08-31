import { defineStore } from 'pinia'

export const useConnectionStore = defineStore('connection', {
    state: () => ({
        moonrakerUrl: 'http://100.78.52.7' //sem barra no final!
    }),
})