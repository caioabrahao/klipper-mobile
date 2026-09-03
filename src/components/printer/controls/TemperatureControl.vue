<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePrinterControlStore } from '../../../stores/printerControl'
import { usePrinterStore } from '../../../stores/printer';
import { formatPercentage } from '../../../utils/unitFormatter';

type SourceOptions = 'bed' | 'extruder';
// type CardVariant = 'compact' | 'full';
const props = defineProps<{
  source: SourceOptions;
}>()

const control = usePrinterControlStore();
const printer = usePrinterStore();

const newTargetTemp = ref(0)


const modal = ref<HTMLDialogElement | null>(null)
function openModal(modal: HTMLDialogElement | null) {
    modal?.showModal()
}
function closeModal(modal: HTMLDialogElement | null) {
    modal?.close()
}
const submitNewTemp = (temp:number) =>{
    isExtruder.value 
        ? control.nozzleTemperatureSet(String(temp))
        : control.bedTemperatureSet(String(temp))
    
    closeModal(modal.value)
}

const isExtruder = computed(() => props.source === 'extruder')
const temperature = computed(() =>
    isExtruder.value
        ? printer.extruder.temperature
        : printer.bed.temperature
)
const maxTemp = computed(() =>
    isExtruder.value
        ? Number(printer.configfile.extruder.max_temp)
        : Number(printer.configfile.extruder.max_temp)
)
const targetTemperature = computed(() =>
    isExtruder.value
        ? printer.extruder.target
        : printer.bed.target
)
const label = computed(() =>
    isExtruder.value ? 'Nozzle' : 'Bed'
)
const icon = computed(() =>
    isExtruder.value ? 
    '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="#ffffff"><path fill="#ffffff" d="M7 2h10v6h2v5h-2.5L13 17h-2l-3.5-4H5V8h2V2m3 20H2v-2h8a1 1 0 0 0 1-1v-1h2v1a3 3 0 0 1-3 3Z"/></svg>'
    :
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M532-131q-6 5-12.5 8t-14.5 3q-8 0-16-3.5t-14-9.5q-41-44-60.5-90T395-320q0-37 11-78t38-106q23-57 32-87.5t9-56.5q0-34-15-63.5T423-771q-6-6-9.5-14t-3.5-16q0-8 3-14.5t8-12.5q6-6 13.5-9t15.5-3q8 0 15 3t13 8q44 41 65.5 86t21.5 95q0 35-10.5 73.5T518-474q-25 60-34 92t-9 61q0 35 14.5 67.5T534-188q5 6 8 13t3 15q0 8-3 15.5T532-131Zm195 0q-6 5-12.5 8t-14.5 3q-8 0-16-3.5t-14-9.5q-41-44-60.5-89.5T590-319q0-37 11-79t38-106q23-57 32-87t9-56q0-34-15-64.5T618-771q-6-6-9-13.5t-3-15.5q0-8 2.5-14.5T616-827q6-6 14-9.5t16-3.5q8 0 14.5 3t12.5 8q44 41 65.5 86t21.5 95q0 35-10.5 73.5T713-473q-25 60-34 92t-9 60q0 35 15 68.5t45 65.5q5 6 7.5 13t2.5 14q0 8-3 16t-10 13Zm-390 0q-6 5-12.5 8t-14.5 3q-8 0-16-3.5t-14-9.5q-41-44-60.5-89.5T200-319q0-37 11-79t38-106q23-57 32-87t9-56q0-34-15-64.5T228-771q-7-6-10-13.5t-3-15.5q0-8 3-15t8-13q6-6 13.5-9t15.5-3q8 0 15 3t13 8q44 41 65.5 85.5T370-648q0 35-10 73.5T324-474q-25 60-34 92t-9 61q0 35 14.5 68.5T340-187q5 6 7.5 13t2.5 14q0 8-3 16t-10 13Z"/></svg>'
)
const range = computed (() =>{
    const maxRangeTemp = Number(maxTemp.value)
    const rangeStepSize = maxRangeTemp / 5
    let rangeSteps:string[] = []

    for(let i=0; i<5; i++){
        rangeSteps.push((rangeStepSize * i).toFixed(0)); 
    } 
    return rangeSteps;
})
    

</script>

<template>
    <div class="flex gap-2 bg-base-200 items-center justify-between border border-base-300 rounded-xl p-2 w-full">
        <div class="flex gap-1 flex-2">
            <div v-html="icon"></div>
            <h4>{{ label }}</h4>
        </div>
        <p class="opacity-50 flex-4">
            {{ temperature.toFixed(1) }} °C 
            <i class="ri-arrow-right-long-line"></i> 
            {{ targetTemperature.toFixed(1) }} °C
        </p>
        <button @click="openModal(modal)" class="btn btn-outline btn-primary">Set Temp</button>
    </div>

    <dialog ref="modal" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Change Nozzle Temperature</h3>
            <div class="mb-4">
                <p>New Target Temperature:</p>
                <p class="font-bold text-2xl">{{ newTargetTemp }} °C</p>
            </div>
            <form @submit.prevent="submitNewTemp(newTargetTemp)">
                <div class="w-full max-w-xs">
                    <input type="range" min="0" :max="maxTemp" v-model="newTargetTemp" class="range" />
                        <div class="flex justify-between px-2.5 mt-2 text-xs">
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                        </div>
                        <div class="flex justify-between px-2.5 mt-2 text-xs">
                            <div v-for="numbers in range">
                                <span>{{ numbers }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="modal-action">
                        <button @click="closeModal(modal)" type="reset" class="btn btn-ghost">Cancel</button>
                        <button type="submit" class="btn btn-primary">Confirm</button>
                    </div>
            </form>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>