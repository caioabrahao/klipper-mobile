<script setup lang="ts">
import { ref } from 'vue'
import { usePrinterStore } from '../../stores/printer';
const printer = usePrinterStore();

const props = defineProps({
  source: {
    type: String,
    required: true
  },
})


</script>


<template>
   <div class="card">
        <div class="card-title">
            Tool/Nozzle
        </div>
        <div class="card-body">
            <span>{{ printer.toolTemperature }} °C</span>
        </div>
        <div class="card-actions">

        </div>
   </div> 
</template>