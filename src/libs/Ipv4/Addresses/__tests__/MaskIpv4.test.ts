import { describe, expect, it } from 'vitest'

import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import MaskIpv4 from '@/libs/Ipv4/Addresses/MaskIpv4'
import Prefix from '@/libs/Ipv4/Addresses/PrefixIpv4'
import WildcardMaskIpv4 from '@/libs/Ipv4/Addresses/WildcardMaskIpv4'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import NetworkAddressIpv4 from '@/libs/Ipv4/Addresses/NetworkAddressIpv4'

describe('MaskIpv4', () => {
    describe('constructor', () => {
        it('thorws exception when invalid mask value', () => {
            const ip = new DecimalFormat('255.255.13.0')
            expect(() => new MaskIpv4(ip)).toThrow()
        })
    })

    describe('MaskIpv4 construction+getters', () => {
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
                const maskFromDecimal = new MaskIpv4(new DecimalFormat(mask))
                const maskFromBinary = new MaskIpv4(new DecimalFormat(mask).toBinary())
                const expectedWildcard = new WildcardMaskIpv4(new DecimalFormat(wildCardMask))
                const expectedPrefix = new Prefix(prefix)
                const expectedNetworkAddress = new NetworkAddressIpv4(
                    new DecimalFormat(networkAddress)
                )

                expect(maskFromDecimal).toEqual(maskFromBinary)
                expect(maskFromDecimal.makeWildcard()).toEqual(expectedWildcard)
                expect(maskFromDecimal.makePrefix()).toEqual(expectedPrefix)
                expect(
                    maskFromDecimal.makeNetworkAddress(
                        new AddressIpv4(new DecimalFormat(hostAddress))
                    )
                ).toEqual(expectedNetworkAddress)
            }
        )
    })
})
