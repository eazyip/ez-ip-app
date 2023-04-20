import DecimalFormatIpv4 from '@/libs/Ipv4/Formats/DecimalFormatIpv4'
import BinaryFormatIpv4 from '@/libs/Ipv4/Formats/BinaryFormatIpv4'

import { describe, expect, it } from 'vitest'

describe('DecimalFormatIpv4', () => {
    describe('isValid', () => {
        it('validates', () => {
            expect(DecimalFormatIpv4.isValid('127.0.0.')).toBeFalsy()
            expect(DecimalFormatIpv4.isValid('127.0.0')).toBeFalsy()
            expect(DecimalFormatIpv4.isValid('127.0.0.256')).toBeFalsy()
            expect(DecimalFormatIpv4.isValid('127.0.0.-')).toBeFalsy()
            expect(DecimalFormatIpv4.isValid('127.0.0.0')).toBeTruthy()
        })
    })

    describe('constructor', () => {
        it('should throw an error if binary IP is not 4 octets', () => {
            expect(() => {
                new DecimalFormatIpv4('1.2.3.4.5')
            }).toThrowError()

            expect(() => {
                new DecimalFormatIpv4('1.2.3')
            }).toThrowError()
        })

        it('should throw an error if binary IP contains octet not in range [0 - 255]', () => {
            expect(() => {
                new DecimalFormatIpv4('1.2.3.f')
            }).toThrowError()

            expect(() => {
                new DecimalFormatIpv4('1.2.3.256')
            }).toThrowError()
        })

        it('should set the value, dotted, arr, and decimal properties correctly', () => {
            const df = new DecimalFormatIpv4('192.168.1.3')

            expect(df.value).toEqual('192.168.1.3')
            expect(df.octets).toEqual([192, 168, 1, 3])
            expect(df.toBinary()).toEqual(new BinaryFormatIpv4('11000000101010000000000100000011'))
        })
    })
})
