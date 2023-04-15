import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import NetworkAddressingInfoResolver from '@/libs/Ipv4/Utils/NetworkAddressingInfoResolver'

import { describe, expect, it } from 'vitest'
import Mask from '@/libs/Ipv4/Addresses/Mask'
import Ip from '@/libs/Ipv4/Addresses/Ip'

describe('NetworkAddressingInfoResolver', () => {
    it('resolves', () => {
        const anyIp = new Ip(new BinaryFormat('11000000101010000000000100000001')) // 192.168.1.1
        const mask = new Mask(new BinaryFormat('11111111111111111111111100000000')) // 255.255.255.0

        const wildcardMask = NetworkAddressingInfoResolver.wildcardFromMask(mask)
        expect(wildcardMask.binaryValue.value).toEqual('00000000000000000000000011111111')

        const prefix = NetworkAddressingInfoResolver.prefixFromMask(mask)
        expect(prefix).toEqual(24)

        const size = NetworkAddressingInfoResolver.sizeFromPrefix(24)
        expect(size).toEqual(254)

        const networkIp = mask.makeNetworkAddress(anyIp)
        expect(networkIp.binaryValue.value).toEqual('11000000101010000000000100000000')

        const broadcastIp = wildcardMask.makeBroadcastAddress(networkIp)
        expect(broadcastIp.binaryValue.value).toEqual('11000000101010000000000111111111')

        const firstHostIp = NetworkAddressingInfoResolver.firstHostFromNetworkAddress(networkIp)
        expect(firstHostIp.binaryValue.value).toEqual('11000000101010000000000100000001')

        const lastHostIp = NetworkAddressingInfoResolver.lastHostFromBroadcastAddress(broadcastIp)
        expect(lastHostIp.binaryValue.value).toEqual('11000000101010000000000111111110')
    })
})
