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

    describe('IpAddress nextAddress() and previousAddress()', () => {
        const ipAddress1 = new IpAddress(new DecimalFormat('192.168.1.1'))
        const ipAddress2 = new IpAddress(new DecimalFormat('255.255.255.255'))
        const ipAddress3 = new IpAddress(new DecimalFormat('0.0.0.0'))

        it('Next address of non-boundary IP', () => {
            const nextAddress = ipAddress1.nextAddress()
            expect(nextAddress.decimalValue.value).toBe('192.168.1.2')
        })

        it('Previous address of non-boundary IP', () => {
            const previousAddress = ipAddress1.previousAddress()
            expect(previousAddress.decimalValue.value).toBe('192.168.1.0')
        })

        it('Next address of boundary IP', () => {
            expect(() => ipAddress2.nextAddress()).toThrow()
        })

        it('Previous address of boundary IP', () => {
            expect(() => ipAddress3.previousAddress()).toThrow()
        })
    })

    describe('IpAddress comparison methods', () => {
        const ipAddress1 = new IpAddress(new DecimalFormat('192.168.1.1'))
        const ipAddress2 = new IpAddress(new BinaryFormat('11000000101010000000000100000001'))
        const ipAddress3 = ipAddress1.nextAddress()
        const ipAddress4 = ipAddress1.previousAddress()

        it('lesserThan()', () => {
            expect(ipAddress1.lesserThan(ipAddress2)).toBeFalsy()
            expect(ipAddress1.lesserThan(ipAddress3)).toBeTruthy()
            expect(ipAddress1.lesserThan(ipAddress4)).toBeFalsy()
        })

        it('lesserThanOrEqualTo()', () => {
            expect(ipAddress1.lesserThanOrEqualTo(ipAddress2)).toBeTruthy()
            expect(ipAddress1.lesserThanOrEqualTo(ipAddress3)).toBeTruthy()
            expect(ipAddress1.lesserThanOrEqualTo(ipAddress4)).toBeFalsy()
        })

        it('equalTo()', () => {
            expect(ipAddress1.equalTo(ipAddress2)).toBeTruthy()
            expect(ipAddress1.equalTo(ipAddress3)).toBeFalsy()
            expect(ipAddress1.equalTo(ipAddress4)).toBeFalsy()
        })

        it('greaterThanOrEqualTo()', () => {
            expect(ipAddress1.greaterThanOrEqualTo(ipAddress2)).toBeTruthy()
            expect(ipAddress1.greaterThanOrEqualTo(ipAddress3)).toBeFalsy()
            expect(ipAddress1.greaterThanOrEqualTo(ipAddress4)).toBeTruthy()
        })

        it('greaterThan()', () => {
            expect(ipAddress1.greaterThan(ipAddress2)).toBeFalsy()
            expect(ipAddress1.greaterThan(ipAddress3)).toBeFalsy()
            expect(ipAddress1.greaterThan(ipAddress4)).toBeTruthy()
        })
    })
})
