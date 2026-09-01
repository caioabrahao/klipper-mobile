<script setup lang="ts">
import { useServerStore } from '../stores/server';


const server = useServerStore();
const webcamStreamUrl = await server.webcamStream
</script>

<template>
    <img :src="webcamStreamUrl" alt="webcam stream">
</template>