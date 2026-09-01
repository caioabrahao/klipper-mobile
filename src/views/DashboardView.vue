<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { usePrinterStore } from '../stores/printer';
import TempCard from '../components/printer/TempCard.vue';
const printer = usePrinterStore();

const CameraStream = defineAsyncComponent(() => import('../components/CameraStream.vue'))
</script>

<template>
    <div class="w-full h-64">
        <Suspense>
            <template #default>
                <CameraStream/>
            </template>
            <template #fallback>
                <div class="skeleton h-full w-full"></div>
            </template>
        </Suspense>
    </div>
    <div class="flex flex-col gap-2">
        <TempCard/>
        <TempCard/>
    </div>
    
</template>
