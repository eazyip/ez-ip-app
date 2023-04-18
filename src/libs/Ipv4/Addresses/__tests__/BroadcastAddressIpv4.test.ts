import { describe, expect, it } from 'vitest'
import BroadcastAddressIpv4 from '@/libs/Ipv4/Addresses/BroadcastAddressIpv4'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

describe('BroadcastAddressIpv4', () => {
    describe('constructor', () => {
        it('intantiates', () => {
            const ip = new DecimalFormat('192.168.1.255')
            expect(new BroadcastAddressIpv4(ip)).toEqual(new BroadcastAddressIpv4(ip.toBinary()))
        })

        it('makeLastHostAddress', () => {
            const ip = new DecimalFormat('192.168.1.255')
            expect(new BroadcastAddressIpv4(ip).makeLastHostAddress().decimalValue.value).toEqual(
                '192.168.1.254'
            )
        })
    })
})
