import MaskIpv4 from '@/libs/Ipv4/Addresses/MaskIpv4'
import type AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import DecimalFormatIpv4 from '@/libs/Ipv4/Formats/DecimalFormatIpv4'
import BaseNetworkIpv4 from '@/libs/Ipv4/Networks/BaseNetworkIpv4'

// TODO: extend from BaseNetworkIpv4 (doesnt have subnetting capabilities)
export default class NetworkIpv4Classful extends BaseNetworkIpv4 {
    readonly class: string

    constructor(anyIp: AddressIpv4) {
        const networkClass = NetworkIpv4Classful._resolveClass(anyIp)

        super(anyIp, NetworkIpv4Classful.maskFromClass(networkClass))

        this.class = networkClass
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

    public static maskFromClass(classType: string): MaskIpv4 {
        const maskMap = new Map<string, string>([
            ['A', '255.0.0.0'],
            ['B', '255.255.0.0'],
            ['C', '255.255.255.0'],
            ['D', '240.0.0.0'], // ! N/A (these are multicast addresses)
            ['E', '248.0.0.0'] // ! N/A (these are reserved for future use)
        ])

        return new MaskIpv4(new DecimalFormatIpv4(maskMap.get(classType)!))
    }
}
