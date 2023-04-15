import { describe, expect, it } from 'vitest'

import Mask from '@/libs/Ipv4/Addresses/Mask'
import Prefix from '@/libs/Ipv4/Addresses/Prefix'
import Wildcard from '@/libs/Ipv4/Addresses/Wildcard'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

describe('Wildcard', () => {
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
                    wildCard: '0.0.0.255',
                    prefixValue: 24,
                    size: 254
                }
            ])(
                'should correctly calculate mask, wildcard, and size address %s',
                ({ mask, wildCard, prefixValue, size }) => {
                    const prefix = new Prefix(prefixValue)
                    const expectedMask = new Mask(new DecimalFormat(mask))
                    const expectedWildcard = new Wildcard(new DecimalFormat(wildCard))

                    expect(prefix.makeMask()).toEqual(expectedMask)
                    expect(prefix.makeWildcard()).toEqual(expectedWildcard)
                    expect(prefix.size).toEqual(size)
                }
            )
        })
    })
})
