<script setup lang="ts">
import { ref } from 'vue'
const cameraStreamUrl = ref(`http://printer.camera.caioabrahao.com.br/stream`)
</script>

<template>
    <h1>Printer Controls</h1>
    <img :src="cameraStreamUrl" alt="camera">

    <div class="flex flex-col items-center gap-4">
        <div class="grid grid-cols-3 grid-rows-2 w-fit">
            <button class="btn col-start-2 row-start-1 aspect-square"><i class="ri-arrow-up-line"></i></button>
            <button class="btn col-start-1 row-start-2 aspect-square"><i class="ri-arrow-down-line"></i></button>
            <button class="btn col-start-2 row-start-2 aspect-square"><i class="ri-arrow-right-line"></i></button>
            <button class="btn col-start-3 aspect-square row-start-2"><i class="ri-arrow-left-line"></i></button>
        </div>

        <div class="flex gap-4">
            <button class="btn btn-primary">Home Axis <i class="ri-home-2-fill"></i></button>
            <button class="btn btn-warning">Motors Off <i class="ri-hand"></i></button>
        </div>

        <div>
            <button class="btn btn-primary">Retract <i class="ri-home-2-fill"></i></button>
            <button class="btn btn-primary">Extrude <i class="ri-home-2-fill"></i></button>
        </div>
    </div>

</template>
