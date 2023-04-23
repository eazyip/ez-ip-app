<template>
    <div class="p-2 border-green-700 border-2">
        <h2 class="text-xl">Address</h2>

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

        <hr class="border" />

        <AddressIs
            v-if="network.network"
            :address="new AddressIpv4(inputIp)"
            :network="network.network"
        />

        <hr class="border" />

        <h2 class="text-xl">Network</h2>
        <p class="text-sm">Detect network and display its info</p>

        <div v-if="network.network">
            <BaseNetworkIpv4Info :network="network.network" />
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

import BaseNetworkIpv4Info from '@/components/BaseNetworkIpv4Info.vue'
import AddressIs from '@/components/AddressIs.vue'

// TODO: make value copiable
// TODO: expand to AddressIpv4InfoModal with all values formats
// TODO: support more input instead of mask (prefix|wildcard|mask) -> use toggler ?

// ======================================================================

interface Network {
    network: NetworkIpv4 | null
}

const inputIp = ref('')
const inputMask = ref('')
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
