import BinaryFormatIpv4 from '@/libs/Ipv4/Formats/BinaryFormatIpv4'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

import { describe, expect, it } from 'vitest'

describe('BinaryFormatIpv4', () => {
    describe('constructor', () => {
        it('should throw an error if binary IP is not 32 bits', () => {
            expect(() => {
                new BinaryFormatIpv4('11001100')
            }).toThrowError()
        })

        it('should throw an error if binary IP contains characters other than 0 and 1', () => {
            expect(() => {
                new BinaryFormatIpv4('11001100g01010101100110010101010')
            }).toThrowError()
        })

        it('should set the value, dotted, arr, and decimal properties correctly', () => {
            const bf = new BinaryFormatIpv4('11001100010101010101010101010101')
            expect(bf.value).toEqual('11001100010101010101010101010101')
            expect(bf.dotted).toEqual('11001100.01010101.01010101.01010101')
            expect(bf.octets).toEqual(['11001100', '01010101', '01010101', '01010101'])
            expect(bf.toDecimal()).toEqual(new DecimalFormat('204.85.85.85'))
        })
    })

    describe('isMask', () => {
        it('should return true for valid subnet masks', () => {
            expect(new BinaryFormatIpv4('00000000000000000000000000000000').isMask()).toBeTruthy()
            expect(new BinaryFormatIpv4('11111111111111111111111111000000').isMask()).toBeTruthy()
            expect(new BinaryFormatIpv4('11111111111111111111111111110000').isMask()).toBeTruthy()
            expect(new BinaryFormatIpv4('11111111111111111111111111111111').isMask()).toBeTruthy()
        })

        it('should return false for invalid subnet masks', () => {
            expect(new BinaryFormatIpv4('11001100010101010101010101010101').isMask()).toBeFalsy()
            expect(new BinaryFormatIpv4('00000000000000000000000000000001').isMask()).toBeFalsy()
        })
    })

    describe('isWildCardMask', () => {
        it('should return true for valid wildcard masks', () => {
            expect(
                new BinaryFormatIpv4('11111111111111111111111111111111').isWildCardMask()
            ).toBeTruthy()
            expect(
                new BinaryFormatIpv4('00000000000000000000000000111111').isWildCardMask()
            ).toBeTruthy()
            expect(
                new BinaryFormatIpv4('00000000000000000000000000001111').isWildCardMask()
            ).toBeTruthy()
            expect(
                new BinaryFormatIpv4('00000000000000000000000000000000').isWildCardMask()
            ).toBeTruthy()
        })

        it('should return false for invalid wildcard masks', () => {
            expect(
                new BinaryFormatIpv4('11001100010101010101010101010101').isWildCardMask()
            ).toBeFalsy()
            expect(
                new BinaryFormatIpv4('11111111111111111111111000000000').isWildCardMask()
            ).toBeFalsy()
        })
    })
})
