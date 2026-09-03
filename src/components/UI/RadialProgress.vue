<script setup lang="ts">
import { computed } from 'vue';

// type Size = 'sm' | 'md' | 'lg'
const value = computed(() => props.value)
// const size = computed (()=>
//     props.size === 'sm' ? 'text-sm'
        
// )   


const props = defineProps<{
  value: number;
//   size: Size;
}>()
</script>

<template>
    <div class="radial-progress text-sm":style="`--value:${value}`" style="--size:4rem" :aria-valuenow="value" role="progressbar">{{ value }}%</div>
</template>