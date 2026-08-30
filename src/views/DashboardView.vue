<script setup lang="ts">
import { usePrinterStore } from '../stores/printer';
const printer = usePrinterStore();
</script>

<template>
    <div class="card">
        <div class="card-title">
            <h3>Nozzle </h3>
        </div>
        <div class="card-body">
            <span>{{ printer.toolTemperature }}</span>
        </div>
        <div class="card-actions">
            
        </div>
    </div>
    
</template>