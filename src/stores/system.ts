import { defineStore } from 'pinia'
import { useConnectionStore } from './connection'

export const useSystemStore = defineStore('system', {
    state: () => ({
        moonrakerStats: {
            "time": 0,
            "cpu_usage": 0,
            "memory": 0,
            "mem_units": "kB"
        },
        cpuTemp: 0,
        systemCpuUsage: {
            "cpu": 0,
            "cpu0": 0,
            "cpu1": 0,
            "cpu2": 0,
            "cpu3": 0
        },
        systemMemoryUsage: {
            "available": 0,
            "total": 0,
            "used": 0
        },
        websocketConnections: 0,
        systemInfo: {
            cpuInfo: {
                "cpu_count": 0,
                "bits": "",
                "processor": "",
                "cpu_desc": "",
                "serial_number": "",
                "hardware_desc": "",
                "model": "",
                "total_memory": 0,
                "memory_units": ""
            },
            sdInfo: {
                "manufacturer_id": "",
                "manufacturer": "",
                "oem_id": "",
                "product_name": "",
                "product_revision": "",
                "serial_number": "",
                "manufacturer_date": "",
                "capacity": "",
                "total_bytes": 0
            },
            distribution: {
                "name": "",
                "id": "",
                "version": "",
                "version_parts": {},
                "like": "",
                "codename": ""
            },
            availableServices: [
                "klipper",
                "klipper_mcu",
                "moonraker"
            ],
            serviceStates: {
                "klipper": {
                    "active_state": "active",
                    "sub_state": "running"
                },
                "klipper_mcu": {
                    "active_state": "active",
                    "sub_state": "running"
                },
                "moonraker": {
                    "active_state": "active",
                    "sub_state": "running"
                }
            },
            network: {
                "wlan0": {
                    "mac_address": "",
                    "ip_addresses": [

                    ]
                }
            },
        }
    }),

    getters: {
        formattedSystemTime(state){
            return new Date(state.moonrakerStats.time * 1000)
        },
        memoryUsagePercentage(state){
            const currentUsage = state.systemMemoryUsage.used
            const totalMemory = state.systemMemoryUsage.total
            return +((currentUsage / totalMemory) * 100).toFixed(1)
        }
    },

    actions: {
        updateReadings(readings:any){
            Object.assign(this.moonrakerStats, readings.moonraker_stats)
            this.cpuTemp = readings.cpu_temp
            Object.assign(this.systemCpuUsage, readings.system_cpu_usage)
            Object.assign(this.systemMemoryUsage, readings.system_memory)
            this.websocketConnections = readings.websocket_connections
        },

        async fetchSystemInfo(){
            try{
                const response = await fetch(`http://${useConnectionStore().moonrakerUrl}/machine/system_info`)
                if (!response.ok) {
                    throw new Error(`Moonraker Error: ${response.statusText}`)
                }
                const data = await response.json()
                if (data.result) {
                    Object.assign(this.systemInfo, data.result)
                    Object.assign(this.systemInfo.cpuInfo, data.result.system_info.cpu_info)
                    Object.assign(this.systemInfo.distribution, data.result.system_info.distribution)
                    Object.assign(this.systemInfo.sdInfo, data.result.system_info.sd_info)
                    Object.assign(this.systemInfo.availableServices, data.result.system_info.instance_ids)
                    Object.assign(this.systemInfo.serviceStates, data.result.system_info.service_state)
                    Object.assign(this.systemInfo.network, data.result.system_info.network)
                    console.log(data.result)
                }
            } catch (err:any) {
                console.error('Failed fetching Moonraker history:', err)
            } 
        }
    }

  }
)