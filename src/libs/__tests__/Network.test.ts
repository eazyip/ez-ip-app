import { describe, expect, it } from 'vitest'

import Ip from '../Ipv4/Ip'
import SubNet from '../Ipv4/SubNet'

describe('SubNet', () => {
    const testData = [
        {
            hostIp: '192.168.1.100',
            mask: '255.255.255.0',
            expected: '192.168.1.0'
        },
        {
            hostIp: '10.0.0.1',
            mask: '255.255.0.0',
            expected: '10.0.0.0'
        },
        {
            hostIp: '172.16.0.100',
            mask: '255.255.255.128',
            expected: '172.16.0.0'
        },
        {
            hostIp: '192.168.0.1',
            mask: '255.255.255.252',
            expected: '192.168.0.0'
        }
    ]

    it.each(testData)(
        'should correctly calculate the network IP address for %s\n',
        ({ hostIp, mask, expected }) => {
            expect(new SubNet(hostIp, mask).getNetworkIp()).toEqual(new Ip(expected))
        }
    )
})
