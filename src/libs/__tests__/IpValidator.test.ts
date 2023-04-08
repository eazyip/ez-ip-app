import { describe, expect, it } from 'vitest'

import IpValidator from '@/libs/Ipv4/IpValidator'

describe('IpValidator', () => {
    describe('passes', () => {
        it('returns true for valid IPv4 address', () => {
            expect(IpValidator.passes('192.0.2.1')).toBeTruthy()
        })

        it('returns false for IPv4 addresses with more than 4 octets', () => {
            expect(IpValidator.passes('192.0.2.1.1')).toBeFalsy()
        })

        it('returns false for IPv4 addresses with less than 4 octets', () => {
            expect(IpValidator.passes('192.0.2')).toBeFalsy()
        })

        it('returns false for IPv4 addresses with invalid octets', () => {
            expect(IpValidator.passes('192.0.2.300')).toBeFalsy()
        })
    })
})
