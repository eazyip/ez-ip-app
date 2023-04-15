import NetworkAddressingInfoResolver from '@/libs/Ipv4/Utils/NetworkAddressingInfoResolver'
import type Mask from '@/libs/Ipv4/Addresses/Mask'
import type Wildcard from '@/libs/Ipv4/Addresses/Wildcard'
import type Broadcast from '@/libs/Ipv4/Addresses/Broadcast'
import type Ip from '@/libs/Ipv4/Addresses/Ip'
import type NetworkAddress from '@/libs/Ipv4/Addresses/NetworkAddress'

export default class Network {
    private mask: Mask
    private prefix: number
    private size: number
    private wildcardMask: Wildcard
    private networkIp: NetworkAddress
    private firstHostIp: Ip
    private lastHostIp: Ip
    private broadcastIp: Broadcast

    private subnets: Map<string, { subnet: Network; inRange: boolean }>

    // TODO: support more signatures (anyIp can be binary or array, can give prefix instead of mask ...)
    constructor(anyIp: Ip, mask: Mask) {
        this.mask = mask
        this.prefix = NetworkAddressingInfoResolver.prefixFromMask(this.mask)
        this.size = NetworkAddressingInfoResolver.sizeFromPrefix(this.prefix)
        this.wildcardMask = NetworkAddressingInfoResolver.wildcardFromMask(this.mask)
        this.networkIp = this.mask.makeNetworkAddress(anyIp)
        this.firstHostIp = this.networkIp.makeFirstHostAddress()
        this.broadcastIp = this.wildcardMask.makeBroadcastAddress(this.networkIp)
        this.lastHostIp = this.broadcastIp.makeLastHostAddress()

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

    getNetworkIp(): Ip {
        return this.networkIp
    }

    getFirstHostIp(): Ip {
        return this.firstHostIp
    }

    getLastHostIp(): Ip {
        return this.lastHostIp
    }

    getBroadcastIp(): Broadcast {
        return this.broadcastIp
    }
}
