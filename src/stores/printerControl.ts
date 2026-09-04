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
        async sendFirmwareCommand(endpoint:string){
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
        hostRestart(){
            this.sendFirmwareCommand('/printer/restart')
            console.log('Sent Request: RESTART')
        },
        firmwareRestart(){
            this.sendFirmwareCommand('/printer/firmware_restart')
            console.log('Sent Request: FIRMWARE_RESTART')
        },
        homeAxis(){
            this.sendGcode(['G28'])
        },
        pausePrint(){
            this.sendFirmwareCommand('/printer/print/pause')
        },
        resumePrint(){
            this.sendFirmwareCommand('/printer/print/resume')
        },
        cancelPrint(){
            this.sendFirmwareCommand('/printer/print/cancel')
        },
        emergencyStop(){
            this.sendFirmwareCommand('/printer/emergency_stop')
        },
        disableSteppers(){
            this.sendGcode(['M84'])
        },
        extrude(length:string, feedRate:string){
            this.sendGcode(['M83', `G1 E${length} F${feedRate}`])
        },
        retract(){
            
        },
        nozzleTemperatureSet(temperature:string){
            this.sendGcode([`M104 S${temperature}`])
        },
        bedTemperatureSet(temperature:string){
            this.sendGcode([`M140 S${temperature}`])
        },
        moveToolheadRelative(x:number = 0, y:number = 0, z:number = 0){
            this.sendGcode([
                'G91',
                `G1 X${x} Y${y} Z${z}`,
                'G90'
            ])
        }
    }

})