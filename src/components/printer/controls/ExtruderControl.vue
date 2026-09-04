<script setup lang="ts">

</script>

<template>
    <div class="flex">
        <div class="flex flex-wrap gap-2">
            <div class="flex flex-col justify-center items-center">
                <input type="radio" name="radio-1" class="radio" />
                5mm
            </div>
            <div class="flex flex-col justify-center items-center">
                <input type="radio" name="radio-1" class="radio" />
                10mm
            </div>
            <div class="flex flex-col justify-center items-center">
                <input type="radio" name="radio-1" class="radio" />
                25mm
            </div>
            <div class="flex flex-col justify-center items-center">
                <input type="radio" name="radio-1" class="radio" />
                50mm
            </div>
            <div class="flex flex-col justify-center items-center">
                <input type="radio" name="radio-1" class="radio" />
                100mm
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <button class="btn btn-primary">Retract <i class="ri-arrow-up-line"></i></button>
            <button class="btn btn-primary">Extrude <i class="ri-arrow-down-line"></i></button>
        </div>
    </div>
</template>