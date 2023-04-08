import { describe, expect, it } from 'vitest'

import IpFormatConverter from '../Ipv4/IpFormatConverter'

describe('Ip', () => {
    describe('decimalTobin', () => {
        it('returns binary format', () => {
            expect(IpFormatConverter.decimalTobin('127.0.0.1')).toBe(
                '01111111000000000000000000000001'
            )
        })

        it('should convert decimal IP to binary string', () => {
            expect(IpFormatConverter.decimalTobin('192.168.0.1')).toEqual(
                '11000000101010000000000000000001'
            )
        })
    })

    describe('binToDecimal', () => {
        it('returns decimal format', () => {
            expect(IpFormatConverter.binToDecimal('01111111000000000000000000000001')).toBe(
                '127.0.0.1'
            )
        })

        it('should convert binary IP to decimal string', () => {
            expect(IpFormatConverter.binToDecimal('11000000101010000000000000000001')).toEqual(
                '192.168.0.1'
            )
        })
    })

    describe('strToArr', () => {
        it('should convert valid IP string to an array', () => {
            expect(IpFormatConverter.strToArr('192.168.0.1')).toEqual([192, 168, 0, 1])
        })

        it('should throw error for invalid IP string', () => {
            expect(() => IpFormatConverter.strToArr('192.168.0.256.0')).toThrow('Invalid IP string')
            expect(() => IpFormatConverter.strToArr('192.168.0')).toThrow('Invalid IP string')
            // expect(() => IpFormatConverter.strToArr('192.168.0.')).toThrow('Invalid IP string')
        })
    })
})
