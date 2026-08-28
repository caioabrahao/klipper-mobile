<script setup lang="ts">
import { ref } from 'vue'
const toolTemp = ref('N/A');
const bedTemp = ref('N/A')
const cameraStreamUrl = ref(`http://printer.camera.caioabrahao.com.br/stream`)
    
</script>

<template>
    <section class="section">
        <div>
            <h2>Temperatures</h2>
            <div  class="flex justify-around">
                <div class="card bg-base-100 card-md shadow-sm">
                    <div class="card-body">
                        <h2 class="card-title">Nozzle</h2>
                        <span class="text-3xl font-bold">{{ toolTemp }} C°</span>
                        <div class="card-actions">
                            <button class="btn btn-primary">Set Temperature</button>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 card-md shadow-sm">
                    <div class="card-body">
                        <h2 class="card-title">Bed</h2>
                        <span class="text-3xl font-bold">{{ bedTemp }} C°</span>
                        <div class="card-actions">
                            <button class="btn btn-primary">Set Temperature</button>
                        </div>
                    </div>
                </div>
            </div>
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