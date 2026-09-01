import { defineStore } from 'pinia'

export const usePrinterStore = defineStore('printer', {

  state: () => ({
    motion: {
      "live_position": [0, 0, 0, 0],
      "live_velocity": 0,
      "live_extruder_velocity": 0,
    },
    configfile:{
      "extruder": {
            "min_temp": "0",
            "max_temp": "305"
        },
        "heater_bed": {
            "min_temp": "0",
            "max_temp": "125"
        },
    },
    extruder: {
        temperature: 0,
        target: 0,
        power: 0,
        can_extrude: false,
    },
    bed: {
      "temperature": 0.0,
      "target": 0.0,
      "power": 0.0,
    },
    fan: {
      "speed": 0.0,
      "rpm": 4000
    },
    printStatus: {
      "filename": "",
      "total_duration": 0.0,
      "print_duration": 0.0,
      "filament_used": 0.0,
      "state": "standby",
      "info": {
          "total_layer": null,
          "current_layer": null
      }
    },
    filamentSensor: {
      "filament_detected": false,
      "enabled": true
    }
  }),
  persist: {
        pick: ['configfile']
    },

  getters: {
    
  },

  actions: {
    updateReadings(readings:any){
      Object.assign(this.motion, readings.motion_report)
      Object.assign(this.extruder, readings.extruder)
      Object.assign(this.bed, readings.heater_bed)
      Object.assign(this.bed, readings.fan)
      Object.assign(this.bed, readings.print_stats)
      Object.assign(this.bed, readings.filament_switch_sensor)
    }

  }
})