<template>
    <div class="p-2 border-green-700 border-4">
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
        <h2 class="text-xl">Input address details</h2>
        <AddressIpv4Info
            v-if="network.network"
            :address="new AddressIpv4(inputIp)"
            :label="network.network.resolveAddressLabel(new AddressIpv4(inputIp))"
        />
        <hr class="border" />

        <div v-if="network.network">
            <h2 class="text-xl">Network details</h2>
            <BaseNetworkIpv4Info :network="network.network" />
        </div>

        <hr class="border" />

        <h2 class="text-xl">Subnet calculator</h2>

        <div v-if="network.network">
            <p>Subnetting:</p>

            <div class="flex gap-4">
                <form @submit.prevent="addSubnet" class="flex gap-1 items-center">
                    <label for=""> name </label>
                    <input v-model="newSubnetName" type="text" class="rounded-sm border-2" />

                    <label for=""> size </label>
                    <input v-model="newSubnetSize" type="number" class="w-16 rounded-sm border-2" />

                    <button type="submit" class="p-1 rounder-sm bg-green-600 text-white">
                        add
                    </button>
                </form>

                <button
                    @click="network.network!.sortSubnets()"
                    class="p-1 rounder-sm bg-blue-600 text-white"
                    type="submit"
                >
                    Sort
                </button>
            </div>

            <div class="flex flex-col gap-1 p-1">
                <div
                    v-for="(subnet, index) in network.network.getSubnets()"
                    :key="index"
                    class="relative border"
                    :class="[subnet[1].inRange ? '' : 'bg-red-50']"
                >
                    <!-- edit subnet -->

                    <button
                        @click="removeSubnet(subnet[0])"
                        class="absolute right-0 top-0 w-6 p-1 bg-red-600 text-white"
                    >
                        X
                    </button>

                    <BaseNetworkIpv4Info :network="subnet[1].subnet" />
                </div>
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

import BaseNetworkIpv4Info from '@/components/BaseNetworkIpv4Info.vue'
import AddressIpv4Info from '@/components/AddressIpv4Info.vue'

// TODO: make value copiable
// TODO: expand to AddressIpv4InfoModal with all values formats
// TODO: support more input instead of mask (prefix|wildcard|mask) -> use toggler ?

// ======================================================================

interface Network {
    network: NetworkIpv4 | null
}

const inputIp = ref('')
const inputMask = ref('')

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
