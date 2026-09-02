<script setup lang="ts">
import { ref } from 'vue'
import { useConnectionStore } from '../stores/connection';

const connection = useConnectionStore()
const userMoonrakerUrl = ref(connection.moonrakerUrl)
const isEditing = ref(false)

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
    <section class="section">
        <h1>Settings</h1>

        <div class="mb-6">
            <h3>Connection</h3>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Moonraker IP Address</legend>
                <div class="flex gap-2">
                    <input v-model.trim="userMoonrakerUrl" :disabled="!isEditing" type="text" class="input" placeholder="klipper.local" />
                    <button v-if="isEditing" @click="updateMoonrakerUrl(userMoonrakerUrl)" class="btn btn-success"><i class="ri-check-fill"></i></button>
                    <button v-else @click="enableEditing" class="btn"><i class="ri-edit-2-fill"></i></button>
                </div>
                <p class="label">{{ connection.wsState }}</p>
            </fieldset>

            <div class="divider"></div>

            <fieldset class="fieldset p-4">
                <legend class="fieldset-legend">Enable Secure Connections?</legend>
                <label class="label">
                    No (http / ws)
                    <input type="checkbox"  class="toggle toggle-primary" />
                    Yes (https / wss)
                </label>
            </fieldset>

            <div>
                <ul class="list">
                    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Connection States</li>
                    <li class="list-row items-center">
                        <p>Http</p>
                        <div>idk yet</div>
                        <button class="btn">
                            <i class="ri-refresh-line"></i>    
                        </button>
                    </li>

                    <li class="list-row items-center">
                        <p>WebSocket</p>
                        <div>{{ connection.wsState }}</div>
                        <button class="btn">
                            <i class="ri-refresh-line"></i>    
                        </button>
                    </li>

                    <li class="list-row items-center">
                        <p>Klippy</p>
                        <div>{{ connection.klippyState }}</div>
                        <button @click="connection.fetchKlippyStatus()" class="btn">
                            <i class="ri-refresh-line"></i>    
                        </button>
                    </li>
                    
                    
                </ul>
            </div>
        </div>
        <div>
            <h3>App Info</h3>
            <ul class="opacity-50">
                <li>App version: devBuild a-1.8</li>
                <li>App Repository: <a class="btn-link" href="https://github.com/caioabrahao/klipper-mobile">Here</a></li>
            </ul>
            <h4>Credits</h4>
            <ul class="opacity-50">
                <li>Created by: <a class="btn-link" href="https://github.com/caioabrahao">Caio Abrahão</a></li>
            </ul>
        </div>
        
    </section>
</template>
