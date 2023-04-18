import { describe, expect, it } from 'vitest'
import BroadcastAddress from '@/libs/Ipv4/Addresses/BroadcastAddress'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

describe('BroadcastAddress', () => {
    describe('constructor', () => {
        it('intantiates', () => {
            const ip = new DecimalFormat('192.168.1.255')
            expect(new BroadcastAddress(ip)).toEqual(new BroadcastAddress(ip.toBinary()))
        })

        it('makeLastHostAddress', () => {
            const ip = new DecimalFormat('192.168.1.255')
            expect(new BroadcastAddress(ip).makeLastHostAddress().decimalValue.value).toEqual(
                '192.168.1.254'
            )
        })
    })
})
