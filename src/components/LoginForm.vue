<script setup lang="ts">
import { ref } from 'vue'
import { login } from '../api/moonraker.ts'

const username = ref('')
const password = ref('')

const error = ref('')

async function handleLogin() {
    error.value = ''

    try {
        await login(
        username.value,
        password.value
        )

        console.log('Successfully logged in!')

    } catch (err) {
        error.value = 'Invalid username or password'
    }
}
</script>

<template>
    <form @submit.prevent="handleLogin" class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend">Login</legend>

        <label class="label">Email</label>
        <input v-model="username" type="username" class="input" placeholder="username" />

        <label class="label">Password</label>
        <input v-model="password" type="password" class="input" placeholder="Password" />

        <button type="submit" class="btn btn-neutral mt-4">Login</button>

        <p v-if="error">{{ error }}</p>
    </form>
</template>