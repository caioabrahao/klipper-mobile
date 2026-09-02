<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useJobHistoryStore } from '../stores/jobHistory.ts'

const jobHistory = useJobHistoryStore();
const { jobs, totalJobs, isLoading, error } = storeToRefs(jobHistory)

onMounted(() => {
  jobHistory.fetchHistory({ limit: 20 })
})


</script>

<template>
    <h1>Job History</h1>
    <p>Total Jobs: {{ totalJobs }}</p>

    <div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Filename</th>
              <th>Status</th>
              <th>Started At</th>
              <th>Ended At</th>
              <th>Duration</th>
              <th>Filament</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="job in jobs" :key="job.job_id">
              <td>{{  parseInt(job.job_id, 16) }}</td>
              <td>{{ job.filename }}</td>
              <td>{{ job.status }}</td>
              <td>{{ job.start_time }}</td>
              <td>{{ job.end_time }}</td>
              <td>{{ job.print_duration }}</td>
              <td>{{ job.filament_used }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>