import { describe, expect, it } from 'vitest'
import Ip from '@/libs/Ipv4/Addresses/Ip'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

describe('Ip', () => {
    describe('constructor', () => {
        it('intantiates', () => {
            const ip = new DecimalFormat('192.168.1.2')
            expect(new Ip(ip)).toEqual(new Ip(ip.toBinary()))
        })
    })
})
