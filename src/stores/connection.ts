import { defineStore } from 'pinia'

export const useConnectionStore = defineStore('connection', {
    state: () => ({
        printerUrl: 'http://192.168.0.57' //sem barra no final!
    }),
})