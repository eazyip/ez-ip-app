<template>
    <div class="flex flex-col gap-1 p-1">
        <div>
            prefix:
            <span class="p-1 rounded-sm bg-slate-300 text-sm font-mono">{{
                network.prefix.value
            }}</span>
        </div>
        <div>
            size:
            <span class="p-1 rounded-sm bg-slate-300 text-sm font-mono">{{
                network.prefix.size
            }}</span>
        </div>
        <AddressIpv4Info :address="network.networkAddress" />
        <AddressIpv4Info v-if="network.firstHostAddress" :address="network.firstHostAddress" />
        <AddressIpv4Info v-if="network.lastHostAddress" :address="network.lastHostAddress" />
        <AddressIpv4Info :address="network.broadcastAddress" />
        <AddressIpv4Info :address="network.mask" />
        <AddressIpv4Info :address="network.wildcardMask" />
    </div>
</template>

<script setup lang="ts">
import type BaseNetworkIpv4 from '@/libs/Ipv4/Networks/BaseNetworkIpv4'

import AddressIpv4Info from '@/components/AddressIpv4Info.vue'

// ======================================================================

defineProps({
    network: {
        type: Object as () => BaseNetworkIpv4,
        required: true
    },
    label: {
        type: String,
        required: false
    }
})
</script>
