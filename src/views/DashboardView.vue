<script setup lang="ts">
import { usePrinterStore } from '../stores/printer';
const printer = usePrinterStore();
</script>

<template>
    <div>
        <h4>Nozzle</h4>
        <p>{{ printer.extruder.temperature }}</p>
    </div>
    <div>
        <h4>Bed</h4>
        <p>{{ printer.bed.temperature }}</p>
    </div>
    
</template>