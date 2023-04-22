<template>
    <RouterLink :to="{ name: to }" class="m-1 p-2 block bg-green-600 text-white"
        ><slot></slot
    ></RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps({
    to: {
        type: String,
        required: true
    }
})
</script>
