<script setup lang="ts">
import { ref } from 'vue'
const cameraStreamUrl = ref(`http://printer.camera.caioabrahao.com.br/stream`)

</script>

<template>
    <h1>Camera View</h1>
    <img :src="cameraStreamUrl" alt="camera">

</template>
