import { describe, expect, it } from 'vitest'
import Mask from '@/libs/Ipv4/Addresses/Mask'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

describe('Mask', () => {
    describe('constructor', () => {
        it('intantiates', () => {
            const ip = new DecimalFormat('255.255.255.0')
            expect(new Mask(ip)).toEqual(new Mask(ip.toBinary()))
        })

        it('thorws exception when invalid mask value', () => {
            const ip = new DecimalFormat('255.255.13.0')
            expect(() => new Mask(ip)).toThrow()
        })
    })
})
