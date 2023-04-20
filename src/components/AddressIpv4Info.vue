<template>
    <div>
        <p>{{ label }}</p>
        <ul>
            <li class="bg-slate-300 p-1 m-1 rounded-sm text-sm font-mono">
                {{ address.decimalValue.value || '' }}
            </li>
            <li class="bg-slate-300 p-1 m-1 rounded-sm text-sm font-mono">
                {{ address.binaryValue.dotted || '' }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import type AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'

// ======================================================================

defineProps({
    address: {
        type: Object as () => AddressIpv4,
        required: true
    },
    label: {
        type: String,
        required: true
    }
})
</script>
