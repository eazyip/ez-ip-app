<template>
    <div class="flex flex-wrap gap-1 items-center">
        <p class="w-36">{{ label ?? address.label }}</p>
        <ul class="flex flex-wrap gap-1 items-center">
            <li class="w-32 p-1 bg-slate-300 rounded-sm text-sm font-mono">
                {{ address.decimalValue.value || '' }}
            </li>
            <li class="w-72 p-1 m-1 bg-slate-300 rounded-sm text-sm font-mono">
                {{ address.binaryValue.dotted || '' }}
            </li>
        </ul>
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
