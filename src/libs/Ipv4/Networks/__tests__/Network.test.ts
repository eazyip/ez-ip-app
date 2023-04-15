import { describe, expect, it } from 'vitest'

import Network from '@/libs/Ipv4/Networks/Network'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

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
                const subnet = new Network(new DecimalFormat(inputIp), new DecimalFormat(mask))

                expect(subnet.getPrefix()).toEqual(prefix)
                expect(subnet.getSize()).toEqual(size)
                expect(subnet.getWildcardMask().decimalValue.value).toEqual(wildCardMask)
                expect(subnet.getNetworkIp().toDecimal().value).toEqual(networkIp)
                expect(subnet.getFirstHostIp().toDecimal().value).toEqual(firstHostIp)
                expect(subnet.getLastHostIp().toDecimal().value).toEqual(lastHostIp)
                expect(subnet.getBroadcastIp().toDecimal().value).toEqual(broadcastIp)
            }
        )
    })

    describe('canContainVlsmSubnets', () => {
        it.todo('')
    })
})
