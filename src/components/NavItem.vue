<template>
    <RouterLink :to="route" class="m-1 p-2 block bg-green-600 text-white"><slot></slot></RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps({
    route: {
        type: String,
        required: true
    }
})
</script>
