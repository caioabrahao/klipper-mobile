import { defineStore } from 'pinia'

const moonrakerUrl = 'http://100.78.52.7'

export const useJobHistoryStore = defineStore('jobHistory', {

  state: () => ({
    jobs: [],
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