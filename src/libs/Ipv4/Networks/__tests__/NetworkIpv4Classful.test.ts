import { describe, expect, it } from 'vitest'

import NetworkIpv4Classful from '@/libs/Ipv4/Networks/NetworkIpv4Classful'
import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'

describe('NetworkIpv4Classful', () => {
    describe('subnet construction+getters', () => {
        it.each([
            {
                inputIp: '192.168.1.100',
                expectedClass: 'C',
                mask: '255.255.255.0',
                prefix: 24,
                size: 254,
                wildCardMask: '0.0.0.255',
                networkIp: '192.168.1.0',
                firstHostIp: '192.168.1.1',
                lastHostIp: '192.168.1.254',
                broadcastIp: '192.168.1.255'
            },
            {
                inputIp: '10.0.0.1',
                expectedClass: 'A',
                mask: '255.0.0.0',
                prefix: 8,
                size: 16777214,
                wildCardMask: '0.255.255.255',
                networkIp: '10.0.0.0',
                firstHostIp: '10.0.0.1',
                lastHostIp: '10.255.255.254',
                broadcastIp: '10.255.255.255'
            },
            {
                inputIp: '172.16.0.100',
                expectedClass: 'B',
                mask: '255.255.0.0',
                prefix: 16,
                size: 65534,
                wildCardMask: '0.0.255.255',
                networkIp: '172.16.0.0',
                firstHostIp: '172.16.0.1',
                lastHostIp: '172.16.255.254',
                broadcastIp: '172.16.255.255'
            }
        ])(
            'should correctly calculate the network IP address for %s',
            ({
                inputIp,
                expectedClass,
                mask,
                prefix,
                size,
                wildCardMask,
                networkIp,
                firstHostIp,
                lastHostIp,
                broadcastIp
            }) => {
                const network = new NetworkIpv4Classful(new AddressIpv4(inputIp))

                expect(network.class).toEqual(expectedClass)
                expect(network.mask.decimalValue.value).toEqual(mask)
                expect(network.prefix.value).toEqual(prefix)
                expect(network.size).toEqual(size)
                expect(network.wildcardMask.decimalValue.value).toEqual(wildCardMask)
                expect(network.networkAddress.decimalValue.value).toEqual(networkIp)
                expect(network.firstHostAddress.decimalValue.value).toEqual(firstHostIp)
                expect(network.broadcastAddress.decimalValue.value).toEqual(broadcastIp)
                expect(network.lastHostAddress.decimalValue.value).toEqual(lastHostIp)
            }
        )
    })
})
