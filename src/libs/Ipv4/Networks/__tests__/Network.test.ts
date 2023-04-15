import { describe, expect, it } from 'vitest'

import Network from '@/libs/Ipv4/Networks/Network'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import Ip from '@/libs/Ipv4/Addresses/Ip'
import Mask from '@/libs/Ipv4/Addresses/Mask'

describe('Network', () => {
    describe('subnet construction+getters', () => {
        it.each([
            {
                inputIp: '192.168.1.100',
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
                mask: '255.255.0.0',
                prefix: 16,
                size: 65534,
                wildCardMask: '0.0.255.255',
                networkIp: '10.0.0.0',
                firstHostIp: '10.0.0.1',
                lastHostIp: '10.0.255.254',
                broadcastIp: '10.0.255.255'
            },
            {
                inputIp: '172.16.0.100',
                mask: '255.255.255.128',
                prefix: 25,
                size: 126,
                wildCardMask: '0.0.0.127',
                networkIp: '172.16.0.0',
                firstHostIp: '172.16.0.1',
                lastHostIp: '172.16.0.126',
                broadcastIp: '172.16.0.127'
            },
            {
                inputIp: '192.168.0.1',
                mask: '255.255.255.252',
                prefix: 30,
                size: 2,
                wildCardMask: '0.0.0.3',
                networkIp: '192.168.0.0',
                firstHostIp: '192.168.0.1',
                lastHostIp: '192.168.0.2',
                broadcastIp: '192.168.0.3'
            }
        ])(
            'should correctly calculate the network IP address for %s\n',
            ({
                inputIp,
                mask,
                prefix,
                size,
                wildCardMask,
                networkIp,
                firstHostIp,
                lastHostIp,
                broadcastIp
            }) => {
                const subnet = new Network(
                    new Ip(new DecimalFormat(inputIp)),
                    new Mask(new DecimalFormat(mask))
                )

                expect(subnet.getPrefix().value).toEqual(prefix)
                expect(subnet.getSize()).toEqual(size)
                expect(subnet.getWildcardMask().decimalValue.value).toEqual(wildCardMask)
                expect(subnet.getNetworkIp().decimalValue.value).toEqual(networkIp)
                expect(subnet.getFirstHostIp().decimalValue.value).toEqual(firstHostIp)
                expect(subnet.getLastHostIp().decimalValue.value).toEqual(lastHostIp)
                expect(subnet.getBroadcastIp().decimalValue.value).toEqual(broadcastIp)
            }
        )
    })

    describe('canContainVlsmSubnets', () => {
        it.todo('')
    })
})
