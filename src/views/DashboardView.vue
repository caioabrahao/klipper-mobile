<script setup lang="ts">
import { computed } from 'vue';
import CameraStream from '../components/CameraStream.vue'
import TempCard from '../components/printer/TempCard.vue';
import { usePrinterStore } from '../stores/printer.ts';

const printer = usePrinterStore();
const stateColor = computed(() =>
    printer.printStatus.state === "standby" ? "text-primary-content" : 
    printer.printStatus.state === "printing" ? "text-info" :
    printer.printStatus.state === "paused" ? "text-warning" :
    printer.printStatus.state === "complete" ? "text-success" :
    printer.printStatus.state === "error" ? "text-error" :
    printer.printStatus.state === "cancelled" ? "text-error" :
    "text-primary-content"
)

</script>

<template>
    <div :class="stateColor" class="bg-base-200 flex items-center justify-center w-full rounded-xl">
        {{ printer.formattedPrintState }}
    </div>
    <div>
        <h5 class="text-lg font-medium">{{ printer.printStatus.filename }}</h5>
    </div>
    <ul class="flex justify-around items-center gap-2 my-2">
        <li class="flex flex-col w-full rounded-xl p-2 bg-base-200 border border-base-300 items-center justify-center"><i class="ri-file-history-fill"></i> {{ printer.formattedTotalDuration }} <br></li>
        <li class="flex flex-col w-full rounded-xl p-2 bg-base-200 border border-base-300 items-center justify-center"><i class="ri-hourglass-fill"></i> {{ printer.formattedPrintDuration  }} <br></li>
        <li class="flex flex-col w-full rounded-xl p-2 bg-base-200 border border-base-300 items-center justify-center"><i class="ri-hourglass-fill"></i> {{ printer.formattedPrintDuration  }} <br></li>
    </ul>
    
    <span class="flex w-full rounded-xl p-2 bg-base-200 border border-base-300 items-center justify-center">
        <p><i class="ri-stack-fill"></i> Layer: {{ printer.printStatus.info.current_layer }} / {{ printer.printStatus.info.total_layer }}</p>    
    </span>
    
    <div class="relative flex my-4">
        <span class="absolute z-10 h-full inset-0 flex items-center left-4">Print Progress {{ printer.formattedProgress }} %</span>
        <progress class="progress progress-primary h-8 rounded-xl" :value="printer.progressStatus.progress" max="1"></progress>
    </div>

    <CameraStream/>

    <div class="flex flex-col gap-2">
        <TempCard source="extruder"/>
        <TempCard source="bed"/>
    </div>
    
</template>
