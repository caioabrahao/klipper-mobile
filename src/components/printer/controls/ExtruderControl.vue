<script setup lang="ts">
import { usePrinterControlStore } from '../../../stores/printerControl';


const control = usePrinterControlStore();
</script>

<template>
    <div class="flex">
        <div class="flex  gap-2">
            <button @click="control.moveExtruderRelative(-5)" class="btn btn-primary">Retract <i class="ri-arrow-up-line"></i></button>
            <button @click="control.moveExtruderRelative(5)" class="btn btn-primary">Extrude <i class="ri-arrow-down-line"></i></button>
        </div>
    </div>
</template>