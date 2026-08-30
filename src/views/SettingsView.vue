<script setup lang="ts">

</script>

<template>
    <section class="section">
        <h1>Settings</h1>

        <div class="mb-6">
            <h3>Connection</h3>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Klipper IP</legend>
                <input type="text" class="input" placeholder="klipper.local" />
            </fieldset>
        </div>

        <div class="mb-6">
           <h3>App</h3>
           <fieldset class="fieldset">
                <legend class="fieldset-legend">Printer Name</legend>
                <input type="text" class="input" placeholder="Cool Printer Model" />
                <p class="label">The name of the printer at the app</p>
                <button class="btn">Save</button>
            </fieldset>

            <fieldset class="fieldset">
            <label class="label">
                <input type="checkbox" class="toggle" />
                Enable Notifications
            </label>
            </fieldset>
        </div>
        
    </section>
</template>
