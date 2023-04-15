import { describe, expect, it } from 'vitest'
import Wildcard from '@/libs/Ipv4/Addresses/Wildcard'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

describe('Wildcard', () => {
    describe('constructor', () => {
        it('intantiates', () => {
            const ip = new DecimalFormat('0.0.0.255')
            expect(new Wildcard(ip)).toEqual(new Wildcard(ip.toBinary()))
        })

        it('thorws exception when invalid mask value', () => {
            const ip = new DecimalFormat('255.255.13.0')
            expect(() => new Wildcard(ip)).toThrow()
        })
    })
})
