import { defineStore } from 'pinia'
import { useConnectionStore } from './connection'

export const useServerStore = defineStore('server', {
    state: () => ({
        webcam:{
            snapshot_url: '',
            stream_url: ''
        }
    }),
    getters:{
        webcamStream(): string{
            return `http://${useConnectionStore().moonrakerUrl}${this.webcam.stream_url}`
        }
    },
    persist: true,

    actions:{
        async fetchWebcams(){
            try{
                const response = await fetch(`http://${useConnectionStore().moonrakerUrl}/server/webcams/list`)

                if (!response.ok) {
                    throw new Error(`Moonraker Error: ${response.statusText}`)
                }
                const data = await response.json()
                Object.assign(this.webcam, data.result.webcams[0])
                console.log("🎥 Streaming Webcam at:", this.webcamStream)

            } catch (err:any) {
                console.error('Failed fetching Moonraker history:', err)
            } 
        }
    }

})