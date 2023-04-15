import { describe, expect, it } from 'vitest'
import IpAddress from '@/libs/Ipv4/Addresses/IpAddress'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

describe('IpAddress', () => {
    describe('constructor', () => {
        it('intantiates', () => {
            const ip = new DecimalFormat('192.168.1.2')
            expect(new IpAddress(ip)).toEqual(new IpAddress(ip.toBinary()))
        })
    })
})
