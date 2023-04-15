import BinaryFormat from '@/libs/Ipv4/Fomats/BinaryFormat'
import NetworkAddressingInfoResolver from '@/libs/Ipv4/Utils/NetworkAddressingInfoResolver'

import { describe, expect, it } from 'vitest'

describe('NetworkAddressingInfoResolver', () => {
    it('resolves', () => {
        const anyIp = new BinaryFormat('11000000101010000000000100000001') // 192.168.1.1
        const mask = new BinaryFormat('11111111111111111111111100000000') // 255.255.255.0

        const wildcardMask = NetworkAddressingInfoResolver.wildcardFromMask(mask)
        expect(wildcardMask.value).toEqual('00000000000000000000000011111111')

        const prefix = NetworkAddressingInfoResolver.prefixFromMask(mask)
        expect(prefix).toEqual(24)

        const size = NetworkAddressingInfoResolver.sizeFromPrefix(24)
        expect(size).toEqual(254)

        const networkIp = NetworkAddressingInfoResolver.networkAddress(anyIp, mask)
        expect(networkIp.value).toEqual('11000000101010000000000100000000')

        const broadcastIp = NetworkAddressingInfoResolver.broadcastAddress(networkIp, wildcardMask)
        expect(broadcastIp.value).toEqual('11000000101010000000000111111111')

        const firstHostIp = NetworkAddressingInfoResolver.firstHostFromNetworkAddress(networkIp)
        expect(firstHostIp.value).toEqual('11000000101010000000000100000001')

        const lastHostIp = NetworkAddressingInfoResolver.lastHostFromBroadcastAddress(broadcastIp)
        expect(lastHostIp.value).toEqual('11000000101010000000000111111110')
    })
})
