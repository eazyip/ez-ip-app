import { describe, expect, it } from 'vitest'

import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import DecimalFormatIpv4 from '@/libs/Ipv4/Formats/DecimalFormatIpv4'

describe('AddressIpv4', () => {
    describe('constructor', () => {
        it('intantiates', () => {
            const valBin = '11000000101010000000000100000010'
            const valDec = '192.168.1.2'

            const ip = new DecimalFormatIpv4(valDec)

            expect(new AddressIpv4(valBin)).toEqual(new AddressIpv4(ip.toBinary()))
            expect(new AddressIpv4(valDec)).toEqual(new AddressIpv4(ip.toBinary()))
            expect(new AddressIpv4(valBin)).toEqual(new AddressIpv4(valDec))
        })
    })

    describe('nextAddress() and previousAddress()', () => {
        const address1 = new AddressIpv4('192.168.1.1')
        const address2 = new AddressIpv4('255.255.255.255')
        const address3 = new AddressIpv4('0.0.0.0')

        it('Next address of non-boundary IP', () => {
            const nextAddress = address1.nextAddress()
            expect(nextAddress.decimalValue.value).toBe('192.168.1.2')
        })

        it('Previous address of non-boundary IP', () => {
            const previousAddress = address1.previousAddress()
            expect(previousAddress.decimalValue.value).toBe('192.168.1.0')
        })

        it('Next address of boundary IP', () => {
            expect(() => address2.nextAddress()).toThrow()
        })

        it('Previous address of boundary IP', () => {
            expect(() => address3.previousAddress()).toThrow()
        })
    })

    describe('AddressIpv4 comparison methods', () => {
        const address1 = new AddressIpv4('192.168.1.1')
        const address2 = new AddressIpv4('11000000101010000000000100000001')
        const address3 = address1.nextAddress()
        const address4 = address1.previousAddress()

        it('lesserThan()', () => {
            expect(address1.lesserThan(address2)).toBeFalsy()
            expect(address1.lesserThan(address3)).toBeTruthy()
            expect(address1.lesserThan(address4)).toBeFalsy()
        })

        it('lesserThanOrEqualTo()', () => {
            expect(address1.lesserThanOrEqualTo(address2)).toBeTruthy()
            expect(address1.lesserThanOrEqualTo(address3)).toBeTruthy()
            expect(address1.lesserThanOrEqualTo(address4)).toBeFalsy()
        })

        it('equalTo()', () => {
            expect(address1.equalTo(address2)).toBeTruthy()
            expect(address1.equalTo(address3)).toBeFalsy()
            expect(address1.equalTo(address4)).toBeFalsy()
        })

        it('greaterThanOrEqualTo()', () => {
            expect(address1.greaterThanOrEqualTo(address2)).toBeTruthy()
            expect(address1.greaterThanOrEqualTo(address3)).toBeFalsy()
            expect(address1.greaterThanOrEqualTo(address4)).toBeTruthy()
        })

        it('greaterThan()', () => {
            expect(address1.greaterThan(address2)).toBeFalsy()
            expect(address1.greaterThan(address3)).toBeFalsy()
            expect(address1.greaterThan(address4)).toBeTruthy()
        })
    })
})
