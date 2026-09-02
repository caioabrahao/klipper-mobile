<script setup lang="ts">
import { useServerStore } from '../stores/server';

const server = useServerStore();
server.fetchWebcams();
const webcamStreamUrl = server.webcamStream
</script>

<template>
    <img v-if="server.isCrowsnestConnected === true" :src="webcamStreamUrl" alt="webcam stream">
</template>