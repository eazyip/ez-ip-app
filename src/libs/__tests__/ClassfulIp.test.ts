import { describe, expect, it } from 'vitest'

import ClassfulIp from '@/libs/Ipv4/ClassfulIp'

describe('ClassfulIp', () => {
    describe('getClass', () => {
        it('returns class', () => {
            expect(new ClassfulIp('10.0.0.1').getClass()).toBe('A')
            expect(new ClassfulIp('172.0.0.1').getClass()).toBe('B')
            expect(new ClassfulIp('192.168.1.2').getClass()).toBe('C')
            expect(new ClassfulIp('230.0.0.2').getClass()).toBe('D')
            expect(new ClassfulIp('250.0.0.2').getClass()).toBe('E')
        })
    })
})
