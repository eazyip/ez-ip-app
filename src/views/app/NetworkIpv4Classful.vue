<template>
    <div class="p-2 border-green-700 border-2">
        <label for="inputName">IP: </label>

        <input
            id="inputName"
            v-model="inputIp"
            :class="network.network == null && inputIp ? 'text-red-500' : 'text-green-500'"
            class="border"
        />

        <hr class="border" />
        <h2 class="text-xl">Input address details</h2>
        <AddressIpv4Info
            v-if="network.network"
            :address="new AddressIpv4(inputIp)"
            :label="network.network.resolveAddressLabel(new AddressIpv4(inputIp))"
        />
        <hr class="border" />

        <h2 class="text-xl">Classful network details</h2>

        <div v-if="network.network">
            <div>
                class:
                <span class="p-1 rounded-sm bg-slate-300 text-sm font-mono">{{
                    network.network.class
                }}</span>
            </div>
            <BaseNetworkIpv4Info :network="network.network" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, onMounted } from 'vue'

import NetworkIpv4Classful from '@/libs/Ipv4/Networks/NetworkIpv4Classful'
import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import DecimalFormatIpv4 from '@/libs/Ipv4/Formats/DecimalFormatIpv4'
import BinaryFormatIpv4 from '@/libs/Ipv4/Formats/BinaryFormatIpv4'

import BaseNetworkIpv4Info from '@/components/BaseNetworkIpv4Info.vue'
import AddressIpv4Info from '@/components/AddressIpv4Info.vue'

// ======================================================================

interface Network {
    network: NetworkIpv4Classful | null
}

const inputIp = ref('')
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
