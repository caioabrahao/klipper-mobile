<script setup lang="ts">
import Temperature from '../components/printer/Temperature.vue'
import { ref } from 'vue'
const cameraStreamUrl = ref(`http://printer.camera.caioabrahao.com.br/stream`)
    
</script>

<template>
    <section class="section">
        <progress id="print" class="progress progress-primary w-full h-8 rounded-2xl" value="70" max="100">70%</progress>
        
        <p class="text-lg">Printing: <span class="text-gray-400">boomerang_PLA_2h40m.gcode</span></p>
        <div class="flex gap-2">
            <img class="max-h-32" src="https://media.printables.com/media/prints/3161/images/20206_70fde6a0-6da1-4522-ba46-25f1bece7199/thumbs/cover/800x800/jpg/benchy.jpg" alt="thumbnail">
            <div>
                <p>Spent: <span class="text-gray-400">1h56min</span></p>
                <p>Left: <span class="text-gray-400">57min</span></p>
                <p>ETA: <span class="text-gray-400">18h21min</span></p>
                <p>Layer: <span class="text-gray-400">62/194</span></p>
            </div>
        </div>
        <div>
            <h2>Temperatures</h2>
            
        </div>

        <div>
            <h2>Camera Stream</h2>
            <div class="collapse bg-base-100 border border-base-300" selec>
                <input type="checkbox" checked />
                <div class="collapse-title font-semibold">Camera Stream</div>
                <div class="collapse-content text-sm">
                    <img :src="cameraStreamUrl" alt="camera">
                </div>
            </div>
        </div>

        <div>
            <h2>Quick Actions</h2>
            <div>
                <button class="btn">Cancel Print</button>
                <button class="btn">Pause Print</button>
                <button class="btn">Emergency Stop</button>
            </div>
        </div>
    </section>
</template>

<style>

</style>