import { defineStore } from 'pinia'
import { useConnectionStore } from './connection'

export const useServerStore = defineStore('server', {
    state: () => ({
        webcam:{
            snapshot_url: '',
            stream_url: ''
        },
        isWebcamFound: false,
        webcamFetchState: ''
    }),
    getters:{
        webcamStream(state): string{
            return `http://${useConnectionStore().moonrakerUrl}${state.webcam.stream_url}`
        }
    },
    persist: true,

    actions:{
        async fetchWebcams(){
            this.webcamFetchState = 'Loading'
            try{
                const response = await fetch(`http://${useConnectionStore().moonrakerUrl}/server/webcams/list`)

                if (!response.ok) {
                    this.webcamFetchState = 'Failed'
                    throw new Error(`Moonraker Error: ${response.statusText}`)
                }
                const data = await response.json()
                this.webcamFetchState = 'Success'
                this.isWebcamFound = true
                Object.assign(this.webcam, data.result.webcams[0])
                console.log("🎥 Streaming Webcam at:", this.webcamStream)

            } catch (err:any) {
                this.webcamFetchState = 'Failed'
                console.error('Failed fetching Moonraker history:', err)
            } 
        }
    }

})