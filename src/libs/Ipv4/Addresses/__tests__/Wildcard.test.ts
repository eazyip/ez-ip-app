import { describe, expect, it } from 'vitest'

import Ip from '@/libs/Ipv4/Addresses/Ip'
import Mask from '@/libs/Ipv4/Addresses/Mask'
import Prefix from '@/libs/Ipv4/Addresses/Prefix'
import Wildcard from '@/libs/Ipv4/Addresses/Wildcard'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import NetworkAddress from '@/libs/Ipv4/Addresses/NetworkAddress'

describe('Wildcard', () => {
    describe('constructor', () => {
        it('thorws exception when invalid mask value', () => {
            const ip = new DecimalFormat('255.255.13.0')
            expect(() => new Wildcard(ip)).toThrow()
        })

        describe('Wildcard construction+getters', () => {
            it.each([
                {
                    mask: '255.255.255.0',
                    wildCard: '0.0.0.255',
                    prefix: 24,
                    hostAddress: '192.168.1.3',
                    BroadcastAddress: '192.168.1.255'
                }
            ])(
                'should correctly calculate prefix, wildcard, and broadcast address %s',
                ({ mask, wildCard, prefix, hostAddress, BroadcastAddress }) => {
                    const wildCardFromDecimal = new Wildcard(new DecimalFormat(wildCard))
                    const wildCardFromBinary = new Wildcard(new DecimalFormat(wildCard).toBinary())
                    const expectedMask = new Mask(new DecimalFormat(mask))
                    const expectedPrefix = new Prefix(prefix)
                    const expectedBroadcastAddress = new NetworkAddress(
                        new DecimalFormat(BroadcastAddress)
                    )

                    expect(wildCardFromDecimal).toEqual(wildCardFromBinary)
                    expect(wildCardFromDecimal.makeMask()).toEqual(expectedMask)
                    expect(wildCardFromDecimal.makePrefix()).toEqual(expectedPrefix)
                    expect(
                        wildCardFromDecimal.makeBroadcastAddress(
                            new Ip(new DecimalFormat(hostAddress))
                        )
                    ).toEqual(expectedBroadcastAddress)
                }
            )
        })
    })
})
