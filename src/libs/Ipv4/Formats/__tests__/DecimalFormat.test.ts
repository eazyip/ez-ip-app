import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import BinaryFormatIpv4 from '@/libs/Ipv4/Formats/BinaryFormatIpv4'

import { describe, expect, it } from 'vitest'

describe('DecimalFormat', () => {
    describe('constructor', () => {
        it('should throw an error if binary IP is not 4 octets', () => {
            expect(() => {
                new DecimalFormat('1.2.3.4.5')
            }).toThrowError()

            expect(() => {
                new DecimalFormat('1.2.3')
            }).toThrowError()
        })

        it('should throw an error if binary IP contains octet not in range [0 - 255]', () => {
            expect(() => {
                new DecimalFormat('1.2.3.f')
            }).toThrowError()

            expect(() => {
                new DecimalFormat('1.2.3.256')
            }).toThrowError()
        })

        it('should set the value, dotted, arr, and decimal properties correctly', () => {
            const df = new DecimalFormat('192.168.1.3')

            expect(df.value).toEqual('192.168.1.3')
            expect(df.octets).toEqual([192, 168, 1, 3])
            expect(df.toBinary()).toEqual(new BinaryFormatIpv4('11000000101010000000000100000011'))
        })
    })
})
