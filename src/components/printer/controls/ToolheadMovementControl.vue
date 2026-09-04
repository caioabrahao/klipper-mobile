<script setup lang="ts">
import { usePrinterControlStore } from '../../../stores/printerControl';

const control = usePrinterControlStore();
</script>

<template>
    <div class="flex flex-col gap-4 card card-dash w-full p-2 items-center justify-center">
        <div class="grid grid-cols-3 grid-rows-2 w-fit">
            <button class="btn col-start-2 row-start-1 aspect-square"><i class="ri-arrow-up-line"></i></button>
            <button class="btn col-start-1 row-start-2 aspect-square"><i class="ri-arrow-left-line"></i></button>
            <button class="btn col-start-2 row-start-2 aspect-square"><i class="ri-arrow-down-line"></i></button>
            <button class="btn col-start-3 aspect-square row-start-2"><i class="ri-arrow-right-line"></i></button>
        </div>

        <div class="flex gap-4">
            <button @click="control.homeAxis" class="btn btn-primary">Home Axis <i class="ri-home-2-fill"></i></button>
            <button @click="control.disableSteppers" class="btn btn-warning">Motors Off <i class="ri-hand"></i></button>
        </div>
    </div>
</template>