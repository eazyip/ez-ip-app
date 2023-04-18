import { describe, expect, it } from 'vitest'

import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import MaskIpv4 from '@/libs/Ipv4/Addresses/MaskIpv4'
import Prefix from '@/libs/Ipv4/Addresses/Prefix'
import WildcardMask from '@/libs/Ipv4/Addresses/WildcardMask'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import NetworkAddress from '@/libs/Ipv4/Addresses/NetworkAddress'

describe('WildcardMask', () => {
    describe('constructor', () => {
        it('thorws exception when invalid mask value', () => {
            const ip = new DecimalFormat('255.255.13.0')
            expect(() => new WildcardMask(ip)).toThrow()
        })

        describe('WildcardMask construction+getters', () => {
            it.each([
                {
                    mask: '255.255.255.0',
                    wildCardMask: '0.0.0.255',
                    prefix: 24,
                    hostAddress: '192.168.1.3',
                    BroadcastAddress: '192.168.1.255'
                }
            ])(
                'should correctly calculate prefix, wildcard mask, and broadcast address %s',
                ({ mask, wildCardMask, prefix, hostAddress, BroadcastAddress }) => {
                    const wildCardFromDecimal = new WildcardMask(new DecimalFormat(wildCardMask))
                    const wildCardFromBinary = new WildcardMask(
                        new DecimalFormat(wildCardMask).toBinary()
                    )
                    const expectedMask = new MaskIpv4(new DecimalFormat(mask))
                    const expectedPrefix = new Prefix(prefix)
                    const expectedBroadcastAddress = new NetworkAddress(
                        new DecimalFormat(BroadcastAddress)
                    )

                    expect(wildCardFromDecimal).toEqual(wildCardFromBinary)
                    expect(wildCardFromDecimal.makeMask()).toEqual(expectedMask)
                    expect(wildCardFromDecimal.makePrefix()).toEqual(expectedPrefix)
                    expect(
                        wildCardFromDecimal.makeBroadcastAddress(
                            new AddressIpv4(new DecimalFormat(hostAddress))
                        )
                    ).toEqual(expectedBroadcastAddress)
                }
            )
        })
    })
})
