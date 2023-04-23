<template>{{ address.decimalValue.value }} is {{ network.resolveAddressLabel(address) }}</template>

<script setup lang="ts">
import type AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import type BaseNetworkIpv4 from '@/libs/Ipv4/Networks/BaseNetworkIpv4'

defineProps({
    address: {
        type: Object as () => AddressIpv4,
        required: true
    },
    network: {
        type: Object as () => BaseNetworkIpv4,
        required: true
    }
})
</script>
