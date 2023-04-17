import { describe, expect, it } from 'vitest'
import IpAddress from '@/libs/Ipv4/Addresses/IpAddress'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'

describe('IpAddress', () => {
    describe('constructor', () => {
        it('intantiates', () => {
            const ip = new DecimalFormat('192.168.1.2')
            expect(new IpAddress(ip)).toEqual(new IpAddress(ip.toBinary()))
        })
    })

    describe('IpAddress comparison methods', () => {
        const ipAddress1 = new IpAddress(new DecimalFormat('192.168.1.1'))
        const ipAddress2 = new IpAddress(new BinaryFormat('11000000101010000000000100000001'))
        const ipAddress3 = ipAddress1.nextAddress()
        const ipAddress4 = ipAddress1.previousAddress()

        it('less()', () => {
            expect(ipAddress1.less(ipAddress2)).toBeFalsy()
            expect(ipAddress1.less(ipAddress3)).toBeTruthy()
            expect(ipAddress1.less(ipAddress4)).toBeFalsy()
        })

        it('lessOrEqual()', () => {
            expect(ipAddress1.lessOrEqual(ipAddress2)).toBeTruthy()
            expect(ipAddress1.lessOrEqual(ipAddress3)).toBeTruthy()
            expect(ipAddress1.lessOrEqual(ipAddress4)).toBeFalsy()
        })

        it('equal()', () => {
            expect(ipAddress1.equal(ipAddress2)).toBeTruthy()
            expect(ipAddress1.equal(ipAddress3)).toBeFalsy()
            expect(ipAddress1.equal(ipAddress4)).toBeFalsy()
        })

        it('greaterOrEqual()', () => {
            expect(ipAddress1.greaterOrEqual(ipAddress2)).toBeTruthy()
            expect(ipAddress1.greaterOrEqual(ipAddress3)).toBeFalsy()
            expect(ipAddress1.greaterOrEqual(ipAddress4)).toBeTruthy()
        })

        it('greater()', () => {
            expect(ipAddress1.greater(ipAddress2)).toBeFalsy()
            expect(ipAddress1.greater(ipAddress3)).toBeFalsy()
            expect(ipAddress1.greater(ipAddress4)).toBeTruthy()
        })
    })
})
