<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useJobHistoryStore } from '../stores/jobHistory.ts'

const jobHistory = useJobHistoryStore();
const { jobs, totalJobs, isLoading, error } = storeToRefs(jobHistory)

onMounted(() => {
  jobHistory.fetchHistory({ limit: 20 })
})

const formatTime = (secs:number) => {
  if (!secs) return '0s'
  const mins = Math.floor(secs / 60)
  return mins > 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`
}
</script>

<template>
    <h1>Job History</h1>
    <p>Total Jobs: {{ jobHistory.totalJobs }}</p>
</template>