<script setup lang="ts">
import 'remixicon/fonts/remixicon.css'
import Dock from './components/Dock.vue'
import Header from './components/Header.vue';
import { useConnectionStore } from './stores/connection.ts';
import { onMounted } from 'vue';
import { wsAttemptConnection } from './services/websocket.ts';

const connection = useConnectionStore();
onMounted(() => {
  wsAttemptConnection();
})
</script>

<template>
  <Header/>
  <main class="relative min-h-screen gp-x py-4">
    <RouterView />
  </main>
  <Dock/>
</template>
