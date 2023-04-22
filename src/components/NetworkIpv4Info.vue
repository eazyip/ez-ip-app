<template>
    <AddressIpv4Info :address="network.networkAddress" />
    <AddressIpv4Info v-if="network.firstHostAddress" :address="network.firstHostAddress" />
    <AddressIpv4Info v-if="network.lastHostAddress" :address="network.lastHostAddress" />
    <AddressIpv4Info :address="network.broadcastAddress" />
    <AddressIpv4Info :address="network.mask" />
    <AddressIpv4Info :address="network.wildcardMask" />
    <div>prefix: {{ network.prefix.value }}</div>
    <div>size: {{ network.prefix.size }}</div>
</template>

<script setup lang="ts">
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
