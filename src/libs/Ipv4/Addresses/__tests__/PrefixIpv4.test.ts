import { describe, expect, it } from 'vitest'

import MaskIpv4 from '@/libs/Ipv4/Addresses/MaskIpv4'
import PrefixIpv4 from '@/libs/Ipv4/Addresses/PrefixIpv4'
import WildcardMask from '@/libs/Ipv4/Addresses/WildcardMask'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

describe('WildcardMask', () => {
    describe('constructor', () => {
        it('thorws exception when invalid prefix value', () => {
            expect(() => new PrefixIpv4(33)).toThrow()
            expect(() => new PrefixIpv4(-1)).toThrow()
            expect(() => new PrefixIpv4(0xff)).toThrow()
        })

        describe('PrefixIpv4 construction+getters', () => {
            it.each([
                {
                    mask: '255.255.255.0',
                    wildCardMask: '0.0.0.255',
                    prefixValue: 24,
                    size: 254
                }
            ])(
                'should correctly calculate mask, wildcard mask, and size address %s',
                ({ mask, wildCardMask, prefixValue, size }) => {
                    const prefix = new PrefixIpv4(prefixValue)
                    const expectedMask = new MaskIpv4(new DecimalFormat(mask))
                    const expectedWildcard = new WildcardMask(new DecimalFormat(wildCardMask))

                    expect(prefix.makeMask()).toEqual(expectedMask)
                    expect(prefix.makeWildcard()).toEqual(expectedWildcard)
                    expect(prefix.size).toEqual(size)
                }
            )
        })
    })
})
