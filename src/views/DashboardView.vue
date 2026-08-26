<script setup lang="ts">
import { ref } from 'vue'
import { printerUrl } from '../utils/moonraker.ts'

const temperature = ref(null);
const cameraStreamUrl = ref(`http://${printerUrl}/webcam/?action=stream`)




</script>

<template>
    <section>
        <div>
            <h2>Temperatures</h2>
            <div  class="flex justify-around">
                <div class="card bg-base-100 card-md shadow-sm">
                    <div class="card-body">
                        <h2 class="card-title">Nozzle</h2>
                        <span class="text-3xl font-bold">C°{{ temperature }}</span>
                        <div class="card-actions">
                            <button class="btn btn-primary">Set Temperature</button>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 card-md shadow-sm">
                    <div class="card-body">
                        <h2 class="card-title">Bed</h2>
                        <span class="text-3xl font-bold">C°60</span>
                        <div class="card-actions">
                            <button class="btn btn-primary">Set Temperature</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
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