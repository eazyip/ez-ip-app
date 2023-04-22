<template>
    <div class="flex flex-wrap gap-1 items-center">
        <p class="w-36">{{ label ?? address.label }}</p>

        <p class="p-1 bg-slate-300 rounded-sm text-sm font-mono">
            {{ address.decimalValue.value || '' }}
        </p>

        <p class="p-1 bg-slate-300 rounded-sm text-sm font-mono">
            {{ address.binaryValue.dotted || '' }}
        </p>
    </div>
</template>

<script setup lang="ts">
import type AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'

// ======================================================================

defineProps({
    address: {
        type: Object as () => AddressIpv4,
        required: true
    },
    label: {
        type: String,
        required: false
    }
})
</script>
