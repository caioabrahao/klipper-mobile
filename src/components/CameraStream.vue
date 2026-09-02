<script setup lang="ts">
import { useServerStore } from '../stores/server';

const server = useServerStore();
server.fetchWebcams();
const webcamStreamUrl = server.webcamStream
</script>

<template>
    <img :src="webcamStreamUrl" alt="webcam stream">
</template>