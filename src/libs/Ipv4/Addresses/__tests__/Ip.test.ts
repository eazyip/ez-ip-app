import { describe, expect, it } from 'vitest'

import Ip from '@/libs/Ipv4/Addresses/Ip'

describe('Ip', () => {
    describe('getValue', () => {
        it('returns value for valid IP address', () => {
            expect(new Ip('127.0.0.1').getValue()).toBe('127.0.0.1')
        })
    })

    describe('getArrValue', () => {
        it('returns value for valid IP address', () => {
            expect(new Ip('127.0.0.1').getArrValue()).toEqual([127, 0, 0, 1])
        })
    })

    describe('getBinValue', () => {
        it('returns value for valid IP address', () => {
            expect(new Ip('127.0.0.1').getBinValue()).toBe('01111111000000000000000000000001')
        })
    })

    describe('getBinDottedValue', () => {
        it('returns value for valid IP address', () => {
            expect(new Ip('127.0.0.1').getBinDottedValue()).toBe(
                '01111111.00000000.00000000.00000001'
            )
        })
    })
})
