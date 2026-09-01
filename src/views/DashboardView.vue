<script setup lang="ts">
import CameraStream from '../components/CameraStream.vue'
import TempCard from '../components/printer/TempCard.vue';
import { usePrinterStore } from '../stores/printer.ts';

const printer = usePrinterStore();

</script>

<template>
    <p>Printing State: {{ printer.printStatus.state }}</p>
    <div class="w-full h-64 mb-8">
        <CameraStream/>
    </div>
    <div class="flex flex-col gap-2">
        <TempCard source="extruder"/>
        <TempCard source="bed"/>
    </div>
    
</template>
