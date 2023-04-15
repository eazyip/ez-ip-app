import { describe, expect, it } from 'vitest'

import ClassfulIp from '@/libs/Ipv4/ClassfulIp'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

describe('ClassfulIp', () => {
    describe('getClass', () => {
        it.each([
            {
                ip: new DecimalFormat('10.0.0.1').toBinary(),
                classType: 'A'
            },
            {
                ip: new DecimalFormat('172.0.0.1').toBinary(),
                classType: 'B'
            },
            {
                ip: new DecimalFormat('192.168.1.2').toBinary(),
                classType: 'C'
            },
            {
                ip: new DecimalFormat('230.0.0.2').toBinary(),
                classType: 'D'
            },
            {
                ip: new DecimalFormat('250.0.0.2').toBinary(),
                classType: 'E'
            }
        ])('should correctly calculate the network IP address', ({ ip, classType }) => {
            expect(new ClassfulIp(ip).getClass()).toBe(classType)
        })
    })
})
