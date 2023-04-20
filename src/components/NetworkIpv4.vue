<template>
    <div class="p-2 border-green-700 border-2">
        <h1 class="text-xl">Network</h1>

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
            <div>networkAddress: {{ network.network.networkAddress.decimalValue.value }}</div>
            <div>firstHostAddress: {{ network.network.firstHostAddress.decimalValue.value }}</div>
            <div>lastHostAddress: {{ network.network.lastHostAddress.decimalValue.value }}</div>
            <div>broadcastAddress: {{ network.network.broadcastAddress.decimalValue.value }}</div>
            <div>mask: {{ network.network.mask.decimalValue.value }}</div>
            <div>wildcardMask: {{ network.network.wildcardMask.decimalValue.value }}</div>
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
