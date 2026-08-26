<script setup lang="ts">
import 'remixicon/fonts/remixicon.css'
import { printerUrl } from './utils/moonraker.ts'
import Dock from './components/Dock.vue'
import Header from './components/Header.vue';
import {onMounted, onUnmounted} from 'vue';

let socket:WebSocket;

onMounted(async () => {
  socket = new WebSocket(`ws://${printerUrl}/websocket`)

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

  <main class="relative min-h-screen gp-x py-4">
    <RouterView />
  </main>

  <Dock/>
</template>
