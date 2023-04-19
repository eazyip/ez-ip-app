import { describe, expect, it } from 'vitest'

import BroadcastAddressIpv4 from '@/libs/Ipv4/Addresses/BroadcastAddressIpv4'
import DecimalFormatIpv4 from '@/libs/Ipv4/Formats/DecimalFormatIpv4'

describe('BroadcastAddressIpv4', () => {
    describe('constructor', () => {
        const valDec = '192.168.1.255'

        it('intantiates', () => {
            const ip = new DecimalFormatIpv4(valDec)

            expect(new BroadcastAddressIpv4(valDec)).toEqual(
                new BroadcastAddressIpv4(ip.toBinary())
            )
        })

        it('makeLastHostAddress', () => {
            const ip = new DecimalFormatIpv4(valDec)

            expect(new BroadcastAddressIpv4(ip).makeLastHostAddress().decimalValue.value).toEqual(
                '192.168.1.254'
            )
        })
    })
})
