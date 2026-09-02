<script setup lang="ts">
import 'remixicon/fonts/remixicon.css'
import Dock from './components/Dock.vue'
import Header from './components/Header.vue';
import { useConnectionStore } from './stores/connection.ts';
import { onMounted } from 'vue';
import KlippyState from './components/feedback/KlippyState.vue';

const connection = useConnectionStore();
onMounted(() => {
  connection.wsAttemptConnection();
  connection.fetchKlippyStatus();
})
</script>

<template>
  <Header/>
  <main class="relative min-h-screen gp-x py-4">
    <KlippyState v-if="connection.klippyState != 'ready' || !connection.wsIsConnected"/>
    <RouterView />
  </main>
  <Dock/>
</template>
