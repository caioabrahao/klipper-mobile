<script setup lang="ts">
import { ref } from 'vue'
const cameraStreamUrl = ref(`http://printer.camera.caioabrahao.com.br/stream`)
</script>

<template>
    <h1>Camera View</h1>
    
    <div class="collapse bg-base-100 border border-base-300">
        <input type="checkbox" />
        <div class="collapse-title font-semibold">Camera Stream</div>
        <div class="collapse-content text-sm">
            <img :src="cameraStreamUrl" alt="camera">    
        </div>
    </div>
</template>
