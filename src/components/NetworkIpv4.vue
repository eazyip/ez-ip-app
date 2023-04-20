<template>
    <div class="p-2 border-green-700 border-2">
        <h1 class="text-xl">Network</h1>
        <p class="text-sm">Detect network and display its info</p>

        <label for="inputName">IP: </label>

        <input
            id="inputName"
            v-model="inputIp"
            :class="network.network == null && inputIp ? 'text-red-500' : 'text-green-500'"
            class="border"
        />

        <label for="inputName">Mask: </label>

        <input
            id="inputName"
            v-model="inputMask"
            :class="network.network == null && inputMask ? 'text-red-500' : 'text-green-500'"
            class="border"
        />

        <div v-if="network.network">
            <AddressIpv4Info :address="network.network.networkAddress" label="networkAddress" />
            <AddressIpv4Info :address="network.network.firstHostAddress" label="firstHostAddress" />
            <AddressIpv4Info :address="network.network.lastHostAddress" label="lastHostAddress" />
            <AddressIpv4Info :address="network.network.broadcastAddress" label="broadcastAddress" />
            <AddressIpv4Info :address="network.network.mask" label="mask" />
            <AddressIpv4Info :address="network.network.wildcardMask" label="wildcardMask" />
            <div>prefix: {{ network.network.prefix.value }}</div>
            <div>size: {{ network.network.prefix.size }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, onMounted } from 'vue'

import NetworkIpv4 from '@/libs/Ipv4/Networks/NetworkIpv4'
import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import DecimalFormatIpv4 from '@/libs/Ipv4/Formats/DecimalFormatIpv4'
import BinaryFormatIpv4 from '@/libs/Ipv4/Formats/BinaryFormatIpv4'
import MaskIpv4 from '@/libs/Ipv4/Addresses/MaskIpv4'

import AddressIpv4Info from '@/components/AddressIpv4Info.vue'

// TODO: make value copiable
// TODO: expand to AddressIpv4InfoModal with all values formats
// TODO: support more input instead of mask (prefix|wildcard|mask) -> use toggler ?

// ======================================================================

interface Network {
    network: NetworkIpv4 | null
}

const inputIp = ref('172.0.0.111')
const inputMask = ref('255.255.255.224')
const network: Network = reactive({ network: null })

const updateNetwork = (ip: string, mask: string): void => {
    if (
        (!DecimalFormatIpv4.isValid(ip) && !BinaryFormatIpv4.isValid(ip)) ||
        (!DecimalFormatIpv4.isValid(mask) && !BinaryFormatIpv4.isValid(mask))
    ) {
        network.network = null
        return
    }

    if (!new AddressIpv4(mask).binaryValue.isMask()) {
        network.network = null
        return
    }

    const address = new AddressIpv4(ip)
    const maskAddress = new MaskIpv4(mask)
    network.network = new NetworkIpv4(address, maskAddress)
}

onMounted(() => {
    updateNetwork(inputIp.value, inputMask.value)
})

watch([inputIp, inputMask], ([ip, mask]) => {
    updateNetwork(ip, mask)
})
</script>
