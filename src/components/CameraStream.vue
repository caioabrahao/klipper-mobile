<script setup lang="ts">
import { useServerStore } from '../stores/server';

const server = useServerStore();
const webcamStreamUrl = server.webcamStream

function handleImgError(event:any) {
  // Prevent infinite loops if the fallback image itself fails to load
  event.target.onerror = null 
  
}
</script>

<template>
    <div class="relative w-full h-64 my-4 mb-8 border border-base-300 rounded-xl">
        <img v-if="server.webcamFetchState === 'Success'" 
        :src="webcamStreamUrl"
        @error="handleImgError" 
        alt="webcam stream">
        <div v-else class="absolute w-full h-full z-10 flex items-center justify-center">
            <span v-if="server.webcamFetchState === 'Loading'" class="loading loading-spinner loading-md"></span>
            <span v-else class="flex flex-col justify-center items-center">
                <p>Error fetching webcam data</p>
                <button @click="server.fetchWebcams" class="btn">Retry</button>
            </span>
        </div>
    </div>
    
</template>