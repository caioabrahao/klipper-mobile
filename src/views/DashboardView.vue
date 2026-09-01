<script setup lang="ts">
import CameraStream from '../components/CameraStream.vue'
import TempCard from '../components/printer/TempCard.vue';
import { usePrinterStore } from '../stores/printer.ts';

const printer = usePrinterStore();

</script>

<template>
    <div>
        <h5 class="text-lg font-medium">{{ printer.printStatus.filename }}</h5>
    </div>
    <div>
        Total Time:{{ printer.formattedTotalDuration }} <br>
        Print Duration: {{ printer.formattedPrintDuration  }} <br>
        Filament Used: {{ printer.formattedFilamentUsed}}
    </div>

    <p>Layer: {{ printer.printStatus.info.current_layer }} / {{ printer.printStatus.info.total_layer }}</p>
    
    
    <p>Printing State: {{ printer.formattedPrintState }}</p>

    <div class="relative flex">
        <span class="absolute z-10 h-full inset-0 flex items-center left-4">Print Progress {{ printer.formattedProgress }} %</span>
        <progress class="progress progress-primary h-8 rounded-xl" :value="printer.progressStatus.progress" max="1"></progress>
    </div>

    <div class="w-full h-64 my-4 mb-8">
        <CameraStream/>
    </div>
    <div class="flex flex-col gap-2">
        <TempCard source="extruder"/>
        <TempCard source="bed"/>
    </div>
    
</template>
