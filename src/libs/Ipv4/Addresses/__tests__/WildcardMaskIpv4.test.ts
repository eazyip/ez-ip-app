import { describe, expect, it } from 'vitest'

import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import MaskIpv4 from '@/libs/Ipv4/Addresses/MaskIpv4'
import PrefixIpv4 from '@/libs/Ipv4/Addresses/PrefixIpv4'
import WildcardMaskIpv4 from '@/libs/Ipv4/Addresses/WildcardMaskIpv4'
import NetworkAddressIpv4 from '@/libs/Ipv4/Addresses/NetworkAddressIpv4'

describe('WildcardMaskIpv4', () => {
    describe('constructor', () => {
        it('thorws exception when invalid mask value', () => {
            expect(() => new WildcardMaskIpv4('255.255.13.0')).toThrow()
        })

        describe('WildcardMaskIpv4 construction+getters', () => {
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
                    const wildCard = new WildcardMaskIpv4(wildCardMask)
                    const expectedMask = new MaskIpv4(mask)
                    const expectedPrefix = new PrefixIpv4(prefix)
                    const expectedBroadcastAddress = new NetworkAddressIpv4(BroadcastAddress)

                    expect(wildCard.makeMask()).toEqual(expectedMask)
                    expect(wildCard.makePrefix()).toEqual(expectedPrefix)
                    expect(wildCard.makeBroadcastAddress(new AddressIpv4(hostAddress))).toEqual(
                        expectedBroadcastAddress
                    )
                }
            )
        })
    })
})
