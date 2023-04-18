import { describe, expect, it } from 'vitest'

import MaskIpv4 from '@/libs/Ipv4/Addresses/MaskIpv4'
import Prefix from '@/libs/Ipv4/Addresses/Prefix'
import WildcardMask from '@/libs/Ipv4/Addresses/WildcardMask'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

describe('WildcardMask', () => {
    describe('constructor', () => {
        it('thorws exception when invalid prefix value', () => {
            expect(() => new Prefix(33)).toThrow()
            expect(() => new Prefix(-1)).toThrow()
            expect(() => new Prefix(0xff)).toThrow()
        })

        describe('Prefix construction+getters', () => {
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
                    const prefix = new Prefix(prefixValue)
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
