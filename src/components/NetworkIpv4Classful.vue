<template>
    <div class="p-2 border-green-700 border-2">
        <h1 class="text-xl">Classful network</h1>

        <label for="inputName">IP: </label>

        <input
            id="inputName"
            v-model="inputIp"
            :class="network.network == null && inputIp ? 'text-red-500' : 'text-green-500'"
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
import NetworkIpv4Classful from '@/libs/Ipv4/Networks/NetworkIpv4Classful'
import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import DecimalFormatIpv4 from '@/libs/Ipv4/Formats/DecimalFormatIpv4'
import BinaryFormatIpv4 from '@/libs/Ipv4/Formats/BinaryFormatIpv4'

interface Network {
    network: NetworkIpv4Classful | null
}

const inputIp = ref('10.0.0.1')
const network: Network = reactive({ network: null })

const updateClassfulNetwork = (newValue: string): any => {
    if (DecimalFormatIpv4.isValid(newValue) || BinaryFormatIpv4.isValid(newValue)) {
        const address = new AddressIpv4(newValue)
        network.network = new NetworkIpv4Classful(address)
    } else {
        network.network = null
    }
}

onMounted(() => {
    updateClassfulNetwork(inputIp.value)
})

watch(inputIp, updateClassfulNetwork)
</script>
