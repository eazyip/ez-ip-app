import Ip from '@/libs/Ipv4/Addresses/Ip'
import type BinaryFormat from './Formats/BinaryFormat'

export default class ClassfulIp {
    ip: Ip
    class: string

    constructor(ip: Ip | BinaryFormat) {
        this.ip = ip instanceof Ip ? ip : new Ip(ip)
        this.class = this._resolveClass()
    }

    private _resolveClass(): string {
        const firstOctet = this.ip.decimalValue.octets[0]

        if (firstOctet >= 0 && firstOctet <= 127) return 'A'
        if (firstOctet >= 128 && firstOctet <= 191) return 'B'
        if (firstOctet >= 192 && firstOctet <= 223) return 'C'
        if (firstOctet >= 224 && firstOctet <= 239) return 'D'
        if (firstOctet >= 240 && firstOctet <= 255) return 'E'
        throw new Error('Out of bound octet value')
    }

    getClass(): string {
        return this.class
    }
}
