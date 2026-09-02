import { defineStore } from 'pinia'
import { useConnectionStore } from './connection';

export const useGcodeStore = defineStore('gcode', {
    state: () => ({
        pause: 'PAUSE',
        resume: 'RESUME',
        cancel: 'CANCEL',
        homeAllAxis: 'G28',
    }),

    actions: {
        async sendGcode(gcode:string){
            const url = useConnectionStore().fullMoonrakerUrl + "/printer/gcode/script"
            const payload = {
                "script": gcode
            };

            try{
                console.log("Sending Gcode: ", payload.script, "to", url)
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json(); 
                console.log('Success:', data);

            } catch(error){
                console.error('Error sending POST request:', error);
            }
        }
    }

})