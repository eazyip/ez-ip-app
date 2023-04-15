import { describe, expect, it } from 'vitest'
import Broadcast from '@/libs/Ipv4/Addresses/Broadcast'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

describe('Broadcast', () => {
    describe('constructor', () => {
        it('intantiates', () => {
            const ip = new DecimalFormat('192.168.1.255')
            expect(new Broadcast(ip)).toEqual(new Broadcast(ip.toBinary()))
        })

        it('makeLastHostAddress', () => {
            const ip = new DecimalFormat('192.168.1.255')
            expect(new Broadcast(ip).makeLastHostAddress().decimalValue.value).toEqual(
                '192.168.1.254'
            )
        })
    })
})
