<template>
    <AddressIpv4Info :address="network.networkAddress" label="networkAddress" />
    <AddressIpv4Info :address="network.firstHostAddress" label="firstHostAddress" />
    <AddressIpv4Info :address="network.lastHostAddress" label="lastHostAddress" />
    <AddressIpv4Info :address="network.broadcastAddress" label="broadcastAddress" />
    <AddressIpv4Info :address="network.mask" label="mask" />
    <AddressIpv4Info :address="network.wildcardMask" label="wildcardMask" />
    <div>prefix: {{ network.prefix.value }}</div>
    <div>size: {{ network.prefix.size }}</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import type NetworkIpv4 from '@/libs/Ipv4/Networks/NetworkIpv4'

import AddressIpv4Info from '@/components/AddressIpv4Info.vue'

// ======================================================================

defineProps({
    network: {
        type: Object as () => NetworkIpv4,
        required: true
    },
    label: {
        type: String,
        required: false
    }
})
</script>
