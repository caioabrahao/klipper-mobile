<script setup lang="ts">
import CameraStream from '../components/CameraStream.vue';
import TemperatureControl from '../components/printer/controls/TemperatureControl.vue';
import ExtruderControl from '../components/printer/controls/ExtruderControl.vue';
import ToolheadMovementControl from '../components/printer/controls/ToolheadMovementControl.vue';


</script>

<template>
    <h1>Printer Controls</h1>
    <CameraStream/>

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
