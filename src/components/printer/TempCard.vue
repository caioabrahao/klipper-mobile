<script setup lang="ts">
import { ref } from 'vue'
import { usePrinterStore } from '../../stores/printer';
const printer = usePrinterStore();


</script>


<template>
   <div class="temp-card">
      <div class="label z-10">
          <svg class="h-[1em]" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="#ffffff"><path fill="#ffffff" d="M7 2h10v6h2v5h-2.5L13 17h-2l-3.5-4H5V8h2V2m3 20H2v-2h8a1 1 0 0 0 1-1v-1h2v1a3 3 0 0 1-3 3Z"/></svg>
          <h4>Nozzle</h4>
      </div>
      <p class="z-10"><span class="font-bold">{{ printer.extruder.temperature }}</span> °C</p>
      <input class="range range-xl [--range-bg:none] range-primary
      [&::-webkit-slider-thumb]:w-2  [&::-webkit-slider-runnable-track]:opacity-25
      pointer-events-none
      absolute w-full h-full left-0 bottom-0" 
      type="range" min="0" 
      :max="printer.configfile.extruder.max_temp" 
      :value="printer.extruder.temperature">
  </div>

</template>

<style>
@reference '../../style.css';
    .temp-card{
        @apply flex items-center justify-between px-4 h-12 bg-base-300 rounded-lg
        relative
    }

</style>