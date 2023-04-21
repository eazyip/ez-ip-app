import { describe, expect, it } from 'vitest'

import NetworkIpv4 from '@/libs/Ipv4/Networks/NetworkIpv4'
import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import MaskIpv4 from '@/libs/Ipv4/Addresses/MaskIpv4'
import NetworkAddressIpv4 from '@/libs/Ipv4/Addresses/NetworkAddressIpv4'

describe('NetworkIpv4', () => {
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
                const network = new NetworkIpv4(new AddressIpv4(inputIp), new MaskIpv4(mask))

                expect(network.prefix.value).toEqual(prefix)
                expect(network.size).toEqual(size)
                expect(network.wildcardMask.decimalValue.value).toEqual(wildCardMask)
                expect(network.networkAddress.decimalValue.value).toEqual(networkIp)
                expect(network.broadcastAddress.decimalValue.value).toEqual(broadcastIp)
                if (network.firstHostAddress && network.lastHostAddress) {
                    expect(network.firstHostAddress.decimalValue.value).toEqual(firstHostIp)
                    expect(network.lastHostAddress.decimalValue.value).toEqual(lastHostIp)
                }
            }
        )
    })

    describe('addSubnetBySize', () => {
        it('add subnets to the network', () => {
            const network = new NetworkIpv4(
                new NetworkAddressIpv4('10.0.0.0'),
                new MaskIpv4('255.255.255.192')
            ) // 10.0.0.0 -> 10.0.0.63
            network.addSubnetBySize('test1', 2) // 10.0.0.0 -> 10.0.0.3
            network.addSubnetBySize('test2', 19) // 10.0.0.32 -> 10.0.0.63
            network.addSubnetBySize('test3', 4) // 10.0.0.64 -> 10.0.0.67

            expect(() => network.addSubnetBySize('test2', 8)).toThrow()

            const expectedSubnet1 = new NetworkIpv4(
                new NetworkAddressIpv4('10.0.0.0'),
                new MaskIpv4('255.255.255.252')
            )

            const expectedSubnet2 = new NetworkIpv4(
                new NetworkAddressIpv4('10.0.0.32'),
                new MaskIpv4('255.255.255.224')
            )

            const expectedSubnet3 = new NetworkIpv4(
                new NetworkAddressIpv4('10.0.0.64'),
                new MaskIpv4('255.255.255.248')
            )

            expect(network.getSubnet('test1')).toEqual({ subnet: expectedSubnet1, inRange: true })
            expect(network.getSubnet('test2')).toEqual({ subnet: expectedSubnet2, inRange: true })
            expect(network.getSubnet('test3')).toEqual({ subnet: expectedSubnet3, inRange: false })
        })
    })

    describe('containsSubnet', () => {
        const network = new NetworkIpv4(
            new AddressIpv4('192.168.1.160'), // -> .191
            new MaskIpv4('255.255.255.224')
        )

        it('contains its self', () => {
            expect(network.containsSubnet(network)).toBeTruthy()
        })

        it('returns true for smaller fully contained subnets', () => {
            expect(
                network.containsSubnet(
                    new NetworkIpv4(
                        new AddressIpv4('192.168.1.168'), // -> .175
                        new MaskIpv4('255.255.255.248')
                    )
                )
            ).toBeTruthy()

            expect(
                network.containsSubnet(
                    new NetworkIpv4(
                        new AddressIpv4('192.168.1.160'), // -> 167
                        new MaskIpv4('255.255.255.248')
                    )
                )
            ).toBeTruthy()

            expect(
                network.containsSubnet(
                    new NetworkIpv4(
                        new AddressIpv4('192.168.1.184'), // -> 191
                        new MaskIpv4('255.255.255.248')
                    )
                )
            ).toBeTruthy()
        })

        it('returns false for uncontained networks/subnets', () => {
            expect(
                network.containsSubnet(
                    new NetworkIpv4(
                        new AddressIpv4('192.168.1.128'), // -> .255
                        new MaskIpv4('255.255.255.128')
                    )
                )
            ).toBeFalsy()

            expect(
                network.containsSubnet(
                    new NetworkIpv4(
                        new AddressIpv4('192.168.1.160'), // -> 191
                        new MaskIpv4('255.255.255.192')
                    )
                )
            ).toBeFalsy()
        })
    })

    describe('containsAddress', () => {
        const network = new NetworkIpv4(
            new AddressIpv4('192.168.1.160'), // -> .191
            new MaskIpv4('255.255.255.224')
        )

        it.each([
            { address: '192.168.1.159', contained: false },
            { address: '192.168.1.160', contained: true },
            { address: '192.168.1.188', contained: true },
            { address: '192.168.1.191', contained: true },
            { address: '192.168.1.192', contained: false }
        ])('contains its self', ({ address, contained }) => {
            expect(network.containsAddress(new AddressIpv4(address))).toBe(contained)
        })
    })
})
