<script setup lang="ts">
import { computed, ref } from 'vue'
import { useConnectionStore } from '../stores/connection';

const connection = useConnectionStore()
const userMoonrakerUrl = ref(connection.moonrakerUrl)
const isEditing = ref(false)
const connectionStatus = computed(() => ([
    { label: 'Moonraker Address', value: connection.moonrakerUrl || 'Not configured' },
    { label: 'WebSocket', value: connection.wsState },
    { label: 'Klippy', value: connection.klippyState || 'Unknown' },
    { label: 'Hostname', value: connection.hostname || 'Unknown' },
    { label: 'Log file', value: connection.logFileDir || 'Unknown' },
    { label: 'Error', value: connection.error || 'None' }
]))

function updateMoonrakerUrl(url:string){
    const normalizedMoonrakerUrl = url.replace(/^https?:\/\//i, '');
    userMoonrakerUrl.value = normalizedMoonrakerUrl;
    connection.moonrakerUrl = normalizedMoonrakerUrl;
    console.log(`Updated moonrakerUrl to '${connection.moonrakerUrl}'`)
    // connection.wsAttemptConnection()
    isEditing.value = false
}
function enableEditing(){
    isEditing.value = true;
}
</script>

<template>
    <section class="section space-y-6">
        <h1>Settings</h1>

        <div class="space-y-4">
            <div class="card bg-base-100 border border-base-300">
                <div class="card-body gap-4">
                    <h3 class="card-title text-base">Connection</h3>
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Moonraker IP Address</legend>
                        <div class="flex gap-2">
                            <input v-model.trim="userMoonrakerUrl" :disabled="!isEditing" type="text" class="input w-full" placeholder="klipper.local" />
                            <button v-if="isEditing" @click="updateMoonrakerUrl(userMoonrakerUrl)" class="btn btn-success"><i class="ri-check-fill"></i></button>
                            <button v-else @click="enableEditing" class="btn"><i class="ri-edit-2-fill"></i></button>
                        </div>
                    </fieldset>

                    <div class="flex flex-wrap gap-2">
                        <button @click="connection.wsAttemptConnection()" class="btn btn-sm">
                            Reconnect WebSocket
                        </button>
                        <button @click="connection.fetchKlippyStatus()" class="btn btn-sm">
                            Refresh Klippy Status
                        </button>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 border border-base-300">
                <div class="card-body">
                    <h3 class="card-title text-base">Connection Status</h3>
                    <ul class="list">
                        <li v-for="status in connectionStatus" :key="status.label" class="list-row">
                            <span class="font-medium">{{ status.label }}</span>
                            <span class="opacity-70 break-all text-right">{{ status.value }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="card bg-base-100 border border-base-300">
            <div class="card-body">
                <h3 class="card-title text-base">App Info</h3>
                <ul class="space-y-1 opacity-70">
                    <li>App version: devBuild a-1.8</li>
                    <li>App Repository: <a class="btn-link" href="https://github.com/caioabrahao/klipper-mobile">Here</a></li>
                    <li>Created by: <a class="btn-link" href="https://github.com/caioabrahao">Caio Abrahão</a></li>
                </ul>
            </div>
        </div>

    </section>
</template>
