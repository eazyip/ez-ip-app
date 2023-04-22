<template>
    <div class="p-2 border-green-700 border-2">
        <h1 class="text-xl">Classful network</h1>
        <p class="text-sm">Detect network class and display its info</p>

        <label for="inputName">IP: </label>

        <input
            id="inputName"
            v-model="inputIp"
            :class="network.network == null && inputIp ? 'text-red-500' : 'text-green-500'"
            class="border"
        />

        <div v-if="network.network">
            <div>
                class:
                <span class="p-1 rounded-sm bg-slate-300 text-sm font-mono">{{
                    network.network.class
                }}</span>
            </div>
            <NetworkIpv4Info :network="network.network" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, onMounted } from 'vue'

import NetworkIpv4Classful from '@/libs/Ipv4/Networks/NetworkIpv4Classful'
import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import DecimalFormatIpv4 from '@/libs/Ipv4/Formats/DecimalFormatIpv4'
import BinaryFormatIpv4 from '@/libs/Ipv4/Formats/BinaryFormatIpv4'

import NetworkIpv4Info from '@/components/NetworkIpv4Info.vue'

// ======================================================================

interface Network {
    network: NetworkIpv4Classful | null
}

const inputIp = ref('10.0.0.1')
const network: Network = reactive({ network: null })

const updateClassfulNetwork = (newValue: string): any => {
    if (!DecimalFormatIpv4.isValid(newValue) && !BinaryFormatIpv4.isValid(newValue)) {
        network.network = null
        return
    }

    const address = new AddressIpv4(newValue)
    network.network = new NetworkIpv4Classful(address)
}

onMounted(() => {
    updateClassfulNetwork(inputIp.value)
})

watch(inputIp, updateClassfulNetwork)
</script>
