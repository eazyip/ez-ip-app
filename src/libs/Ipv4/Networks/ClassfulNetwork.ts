import Mask from '@/libs/Ipv4/Addresses/Mask'
import type AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import Network from '@/libs/Ipv4/Networks/Network'
import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

export default class ClassfulNetwork extends Network {
    readonly class: string

    constructor(anyIp: AddressIpv4) {
        super(anyIp, ClassfulNetwork._resolveMaskFromClass(ClassfulNetwork._resolveClass(anyIp)))

        this.class = ClassfulNetwork._resolveClass(anyIp)
    }

    public static _resolveClass(anyIp: AddressIpv4): string {
        const firstOctet = anyIp.decimalValue.octets[0]

        if (firstOctet >= 0 && firstOctet <= 127) return 'A'
        if (firstOctet >= 128 && firstOctet <= 191) return 'B'
        if (firstOctet >= 192 && firstOctet <= 223) return 'C'
        if (firstOctet >= 224 && firstOctet <= 239) return 'D'
        if (firstOctet >= 240 && firstOctet <= 255) return 'E'
        throw new Error(`Invalid IP address: ${anyIp.decimalValue.value}`)
    }

    public static _resolveMaskFromClass(classType: string): Mask {
        const maskMap = new Map<string, string>([
            ['A', '255.0.0.0'],
            ['B', '255.255.0.0'],
            ['C', '255.255.255.0'],
            ['D', '240.0.0.0'], // ! N/A (these are multicast addresses)
            ['E', '248.0.0.0'] // ! N/A (these are reserved for future use)
        ])

        return new Mask(new DecimalFormat(maskMap.get(classType)!))
    }
}
