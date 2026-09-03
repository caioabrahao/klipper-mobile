<script setup lang="ts">
import { ref } from 'vue'
import { usePrinterControlStore } from '../stores/printerControl.ts';
import CameraStream from '../components/CameraStream.vue';
import { usePrinterStore } from '../stores/printer.ts';
import TemperatureControl from '../components/printer/controls/TemperatureControl.vue';
import ExtruderControl from '../components/printer/controls/ExtruderControl.vue';
import ToolheadMovementControl from '../components/printer/controls/ToolheadMovementControl.vue';

const control = usePrinterControlStore();
const printer = usePrinterStore();

</script>

<template>
    <h1>Printer Controls</h1>
    <CameraStream/>

    <p>Stepper X Enabled: {{ printer.stepperEnable.stepper_x }}</p>
    <p>All steppers Disabled: {{ printer.allSteppersDisabled }}</p>

    <div class="flex flex-col items-center gap-4">
        <ToolheadMovementControl/>

        <div class="flex gap-4">
            <ExtruderControl/>
        </div>
        <div class="flex flex-col gap-2 w-full">
            <TemperatureControl source="extruder"/>
            <TemperatureControl source="bed"/>
        </div>
    </div>

    
</template>
