<template>
    <div class="p-2 border-green-700 border-2">
        <h1 class="text-xl">Subnet calculator</h1>
        <!-- <p class="text-sm">Detect network and display its info</p> -->

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
            <NetworkIpv4Info :network="network.network" />
        </div>

        <div v-if="network.network">
            <p>subnetting:</p>

            <form @submit.prevent="addSubnet">
                name
                <input v-model="newSubnetName" type="text" class="border-2 border-black" />
                size
                <input v-model="newSubnetSize" type="number" class="border-2 border-black" />
                <button type="submit" class="p-1 bg-green-600 text-white rounder-sm">add</button>
            </form>

            <form @submit.prevent="network.network.sortSubnets()">
                <button type="submit" class="p-1 bg-blue-600 text-white rounder-sm">Sort</button>
            </form>

            <div
                v-for="(subnet, index) in network.network.getSubnets()"
                :key="index"
                class="m-3 border bg-lime-100"
            >
                <!-- edit subnet -->

                <form @submit.prevent="removeSubnet(subnet[0])">
                    <input type="hidden" name="subnetName" :value="subnet[0]" />
                    <button class="bg-red-600 text-white">RM</button>
                </form>

                <h2>{{ subnet[0] }} in range {{ subnet[1].inRange }}</h2>
                <NetworkIpv4Info :network="subnet[1].subnet" />
            </div>
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

import NetworkIpv4Info from '@/components/NetworkIpv4Info.vue'

// TODO: make value copiable
// TODO: expand to AddressIpv4InfoModal with all values formats
// TODO: support more input instead of mask (prefix|wildcard|mask) -> use toggler ?

// ======================================================================

interface Network {
    network: NetworkIpv4 | null
}

const inputIp = ref('172.0.0.111')
const inputMask = ref('255.255.255.224')

const newSubnetName = ref('')
const newSubnetSize = ref(0)

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

const addSubnet = () => {
    if (!network.network) {
        return
    }

    if (!newSubnetName.value || newSubnetSize.value < 0) {
        return
    }

    if (network.network.getSubnet(newSubnetName.value)) {
        return
    }

    network.network.addSubnetBySize(newSubnetName.value, newSubnetSize.value)

    newSubnetName.value = ''
    newSubnetSize.value = 0
}

const removeSubnet = (subnetName: string) => {
    network.network!.removeSubnet(subnetName)
}

onMounted(() => {
    updateNetwork(inputIp.value, inputMask.value)
})

watch([inputIp, inputMask], ([ip, mask]) => {
    updateNetwork(ip, mask)
})
</script>
