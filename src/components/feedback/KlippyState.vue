<script setup lang="ts">
import { computed } from 'vue';
import { useConnectionStore } from '../../stores/connection';

const connection = useConnectionStore();
const btnStyle = computed (() =>
    connection.klippyState === 'error' ? 
        'btn-error'
    :connection.klippyState === 'disconnected' ? 
        'btn-soft'
    :connection.klippyState === 'startup' ? 
        'btn-info'
    :connection.klippyState === 'ready' ? 
        'btn-success'
    :connection.klippyState === 'shutdown' ? 
        'btn-warning':
    ''
)
const stateStyle = computed(() =>
    connection.klippyState === 'error' ? 
        'bg-error/90 text-error-content border-error-content border'
    :connection.klippyState === 'disconnected' ? 
        'bg-base-300/50'
    :connection.klippyState === 'startup' ? 
        'bg-info/90 text-info-content'
    :connection.klippyState === 'ready' ? 
        'bg-success/90 text-success-content'
    :connection.klippyState === 'shutdown' ? 
        'bg-warning/90 text-warning-content':
    ''
)
</script>

<template>
    <div class="card card-sm mb-4 p-2"
    :class="stateStyle">
        <div class="card-title">
            <h4>Klippy State: {{ connection.klippyState }}</h4>
        </div>
        <div class="card-body">
            <p>{{ connection.klippyStateMessage }}.</p>
        </div>
        <div class="card-actions">
            <button :class="btnStyle" class="btn btn-soft">RESTART</button>
            <button :class="btnStyle" class="btn btn-soft">FIRMWARE_RESTART</button>
        </div>
    </div>
</template>