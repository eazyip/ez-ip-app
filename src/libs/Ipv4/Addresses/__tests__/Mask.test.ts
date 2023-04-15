import { describe, expect, it } from 'vitest'

import IpAddress from '@/libs/Ipv4/Addresses/IpAddress'
import Mask from '@/libs/Ipv4/Addresses/Mask'
import Prefix from '@/libs/Ipv4/Addresses/Prefix'
import WildcardMask from '@/libs/Ipv4/Addresses/WildcardMask'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import NetworkAddress from '@/libs/Ipv4/Addresses/NetworkAddress'

describe('Mask', () => {
    describe('constructor', () => {
        it('thorws exception when invalid mask value', () => {
            const ip = new DecimalFormat('255.255.13.0')
            expect(() => new Mask(ip)).toThrow()
        })
    })

    describe('Mask construction+getters', () => {
        it.each([
            {
                mask: '255.255.255.0',
                wildCardMask: '0.0.0.255',
                prefix: 24,
                hostAddress: '192.168.1.3',
                networkAddress: '192.168.1.0'
            }
        ])(
            'should correctly calculate prefix, wildcard mask, and network address %s',
            ({ mask, wildCardMask, prefix, hostAddress, networkAddress }) => {
                const maskFromDecimal = new Mask(new DecimalFormat(mask))
                const maskFromBinary = new Mask(new DecimalFormat(mask).toBinary())
                const expectedWildcard = new WildcardMask(new DecimalFormat(wildCardMask))
                const expectedPrefix = new Prefix(prefix)
                const expectedNetworkAddress = new NetworkAddress(new DecimalFormat(networkAddress))

                expect(maskFromDecimal).toEqual(maskFromBinary)
                expect(maskFromDecimal.makeWildcard()).toEqual(expectedWildcard)
                expect(maskFromDecimal.makePrefix()).toEqual(expectedPrefix)
                expect(
                    maskFromDecimal.makeNetworkAddress(
                        new IpAddress(new DecimalFormat(hostAddress))
                    )
                ).toEqual(expectedNetworkAddress)
            }
        )
    })
})
