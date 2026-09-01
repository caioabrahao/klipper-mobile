import { defineStore } from 'pinia'
import { formatDuration, formatMillimeters, formatPercentage } from '../utils/unitFormatter';

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
      "state": "",
      "message": '',
      "info": {
          "total_layer": null,
          "current_layer": null
      }
    },
    progressStatus: {
      "message": "",
      "progress": 0.0
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
    formattedTotalDuration(state){
      return formatDuration(state.printStatus.total_duration)
    },
    formattedPrintDuration(state){
      return formatDuration(state.printStatus.print_duration)
    },
    formattedFilamentUsed(state){
      return formatMillimeters(state.printStatus.filament_used)
    },
    formattedProgress(state){
      return formatPercentage(state.progressStatus.progress)
    },
    formattedPrintState(state){
      return state.printStatus.state.charAt(0).toUpperCase() + state.printStatus.state.slice(1)
    }
      
    
  },

  actions: {
    updateReadings(readings:any){
      Object.assign(this.motion, readings.motion_report)
      Object.assign(this.extruder, readings.extruder)
      Object.assign(this.bed, readings.heater_bed)
      Object.assign(this.fan, readings.fan)
      Object.assign(this.printStatus, readings.print_stats)
      Object.assign(this.progressStatus, readings.display_status)
      Object.assign(this.filamentSensor, readings.filament_switch_sensor)
    }

  }
})