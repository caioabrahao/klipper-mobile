<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Header from './Header.vue';
import Dock from './Dock.vue'

const temperature = ref(null);

let socket:WebSocket;

onMounted(async () => {
  socket = new WebSocket('ws://klipper.local/websocket')

  socket.onopen = () => {
    console.log('Connected to Moonraker!')
  }

  socket.onmessage = (event) => {
    console.log('Moonraker:', JSON.parse(event.data))
  }
})

onUnmounted(() => {
  socket?.close()
})



</script>

<template>
    <Header/>
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
                    <img src="http://klipper.local/webcam/?action=stream" alt="camera">
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

    <Dock/>
</template>

<style>

</style>