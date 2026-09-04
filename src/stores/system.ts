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
                "cpu_count": 4,
                "bits": "32bit",
                "processor": "armv7l",
                "cpu_desc": "ARMv7 Processor rev 4 (v7l)",
                "serial_number": "b898bdb4",
                "hardware_desc": "BCM2835",
                "model": "Raspberry Pi 3 Model B Rev 1.2",
                "total_memory": 945364,
                "memory_units": "kB"
            },
            sdInfo: {
                "manufacturer_id": "03",
                "manufacturer": "Sandisk",
                "oem_id": "5344",
                "product_name": "SU32G",
                "product_revision": "8.0",
                "serial_number": "46ba46",
                "manufacturer_date": "4/2018",
                "capacity": "29.7 GiB",
                "total_bytes": 31914983424
            },
            distribution: {
                "name": "Raspbian GNU/Linux 10 (buster)",
                "id": "raspbian",
                "version": "10",
                "version_parts": {
                    "major": "10",
                    "minor": "",
                    "build_number": ""
                },
                "like": "debian",
                "codename": "buster"
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
                }
            } catch (err:any) {
                console.error('Failed fetching Moonraker history:', err)
            } 
        }
    }

  }
)