import { describe, expect, it } from 'vitest'

import Ip from '../Ipv4/Ip'
import SubNet from '../Ipv4/SubNet'

describe('SubNet', () => {
    const testData = [
        {
            inputIp: '192.168.1.100',
            mask: '255.255.255.0',
            networkIp: '192.168.1.0',
            firstHostIp: '192.168.1.1'
        },
        {
            inputIp: '10.0.0.1',
            mask: '255.255.0.0',
            networkIp: '10.0.0.0',
            firstHostIp: '10.0.0.1'
        },
        {
            inputIp: '172.16.0.100',
            mask: '255.255.255.128',
            networkIp: '172.16.0.0',
            firstHostIp: '172.16.0.1'
        },
        {
            inputIp: '192.168.0.1',
            mask: '255.255.255.252',
            networkIp: '192.168.0.0',
            firstHostIp: '192.168.0.1'
        }
    ]

    it.each(testData)(
        'should correctly calculate the network IP address for %s\n',
        ({ inputIp, mask, networkIp, firstHostIp }) => {
            const subnet = new SubNet(inputIp, mask)

            expect(subnet.getNetworkIp()).toEqual(new Ip(networkIp))
            expect(subnet.getFirstHostIp()).toEqual(new Ip(firstHostIp))
        }
    )
})
