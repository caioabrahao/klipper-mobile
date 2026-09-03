import { defineStore } from 'pinia'
import { useConnectionStore } from './connection';

export const usePrinterControlStore = defineStore('printerControl', {
    state: () => ({
        
    }),

    actions: {
        async sendGcode(gcode:string[]){
            const url = useConnectionStore().fullMoonrakerUrl + "/printer/gcode/script"
            const formattedGcode: string = gcode.map(line => `${line}\n`).join('');
            const payload = {
                "script": formattedGcode
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
        },
        async sendJobCommand(endpoint:string){
            const url = useConnectionStore().fullMoonrakerUrl + endpoint
            try{
                const response = await fetch(url, {
                    method: 'POST',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

            }catch(error){
                console.error('Error sending POST request:', error);
            }
        },
        homeAxis(){
            this.sendGcode(['G28'])
        },
        pausePrint(){
            this.sendJobCommand('/printer/print/pause')
        },
        resumePrint(){
            this.sendJobCommand('/printer/print/resume')
        },
        cancelPrint(){
            this.sendJobCommand('/printer/print/cancel')
        },
        emergencyStop(){
            this.sendJobCommand('/printer/emergency_stop')
        },
        disableSteppers(){
            this.sendGcode(['M84'])
        },
        extrude(length:string, feedRate:string){
            this.sendGcode(['M83', `G1 E${length} F${feedRate}`])
        },
        retract(){
            
        },
        nozzleTemperatureSet(){
            
        },
        bedTemperatureSet(){
            
        },
    }

})