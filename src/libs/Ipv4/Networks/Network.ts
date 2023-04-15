import NetworkAddressingInfoResolver from '@/libs/Ipv4/Utils/NetworkAddressingInfoResolver'
import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import Mask from '@/libs/Ipv4/Addresses/Mask'
import type Wildcard from '@/libs/Ipv4/Addresses/Wildcard'

export default class Network {
    private mask: Mask
    private prefix: number
    private size: number
    private wildcardMask: Wildcard
    private networkIp: BinaryFormat
    private firstHostIp: BinaryFormat
    private lastHostIp: BinaryFormat
    private broadcastIp: BinaryFormat

    private subnets: Map<string, { subnet: Network; inRange: boolean }>

    // TODO: support more signatures (anyIp can be binary or array, can give prefix instead of mask ...)
    constructor(anyIp: BinaryFormat | DecimalFormat, mask: BinaryFormat | DecimalFormat) {
        anyIp = anyIp instanceof BinaryFormat ? anyIp : anyIp.toBinary()

        this.mask = new Mask(mask)
        this.prefix = NetworkAddressingInfoResolver.prefixFromMask(this.mask)
        this.size = NetworkAddressingInfoResolver.sizeFromPrefix(this.prefix)
        this.wildcardMask = NetworkAddressingInfoResolver.wildcardFromMask(this.mask)
        this.networkIp = NetworkAddressingInfoResolver.networkAddress(anyIp, this.mask)
        this.firstHostIp = NetworkAddressingInfoResolver.firstHostFromNetworkAddress(this.networkIp)
        this.broadcastIp = NetworkAddressingInfoResolver.broadcastAddress(
            this.networkIp,
            this.wildcardMask
        )
        this.lastHostIp = NetworkAddressingInfoResolver.lastHostFromBroadcastAddress(
            this.broadcastIp
        )

        this.subnets = new Map<string, { subnet: Network; inRange: boolean }>()
    }

    // canContainVlsmSubnets(subnetsSizes: number[]): boolean {
    //     return (
    //         // ! Fix
    //         subnetsSizes.reduce((sum, size) => sum + size, 0) + subnetsSizes.length * 2 < this.size
    //     )
    // }

    // addSubnetBySize(name: string, subnetSize: number) {
    //     const subnetPrefix = this.prefix + Math.ceil(Math.log2(subnetSize))
    //     const subnetMask = new Ip(
    //         NetworkAddressingInfoResolver.maskFromPrefix(subnetPrefix).toDecimal().value
    //     )

    //     // TODO: calculate subnet Ip
    //     this.addSubnet(name, new Network(this.networkIp, subnetMask))
    // }

    // addSubnet(name: string, subnet: Network) {
    //     this.subnets.set(name, { subnet, inRange: true })
    // }

    // getSubnet(name: string): { subnet: Network; inRange: boolean } | undefined {
    //     return this.subnets.get(name)
    // }

    // removeSubnet(name: string) {
    //     this.subnets.delete(name)
    // }

    /*
    |--------------------------------------------------------------------------
    | Getters
    |--------------------------------------------------------------------------
    */

    getMask(): Mask {
        return this.mask
    }

    getPrefix(): number {
        return this.prefix
    }

    getSize(): number {
        return this.size
    }

    getWildcardMask(): Wildcard {
        return this.wildcardMask
    }

    getNetworkIp(): BinaryFormat {
        return this.networkIp
    }

    getFirstHostIp(): BinaryFormat {
        return this.firstHostIp
    }

    getLastHostIp(): BinaryFormat {
        return this.lastHostIp
    }

    getBroadcastIp(): BinaryFormat {
        return this.broadcastIp
    }
}
