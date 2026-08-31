import { defineStore } from 'pinia'

const moonrakerUrl = 'http://192.168.0.57'

// TYPESCRIPT TYPES so the compiler stops crying
export interface JobMetadata {
  size: number;
  modified: number;
  uuid: string;
  file_processors: string[];
  layer_count: number;
  nozzle_diameter: number;
  [key: string]: any; // Permite outras propriedades dinâmicas se houver
}

export interface PrintJob {
  job_id: string;
  user: string;
  filename: string;
  status: 'completed' | 'pending' | 'running' | 'failed' | 'cancelled' | string;
  start_time: number;
  end_time: number;
  print_duration: number;
  total_duration: number;
  filament_used: number;
  metadata: JobMetadata;
  auxiliary_data: any[];
  exists: boolean;
}

//STORE ITSELF

export const useJobHistoryStore = defineStore('jobHistory', {

  state: (): {
    jobs: PrintJob[];
    totalJobs: number;
    isLoading: boolean;
    error: string | null;
  } => ({
    jobs: [] as PrintJob[],
    totalJobs: 0,
    isLoading: false,
    error: null
  }),

  getters: {
    
  },

  actions: {
    async fetchHistory({ limit = 50, start = 0, order = 'desc' } = {}){
        this.isLoading = true
        this.error = null

        const params = new URLSearchParams({
            limit: limit.toString(),
            start: start.toString(),
            order: order
        })

        // if (options.since) params.append('since', options.since)

        try{
            const response = await fetch(`${moonrakerUrl}/server/history/list?${params}`)

            if (!response.ok) {
                throw new Error(`Moonraker Error: ${response.statusText}`)
            }
            const data = await response.json()

            if (data.result) {
                this.jobs = data.result.jobs || []
                this.totalJobs = data.result.count || 0
                console.log(`Successfully fetched ${this.totalJobs} jobs!`)
            }
        } catch (err:any) {
            this.error = err.message
            console.error('Failed fetching Moonraker history:', err)
        } finally {
            this.isLoading = false
        }
    }
    }
})