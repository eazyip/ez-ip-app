import type Mask from '@/libs/Ipv4/Addresses/Mask'
import type WildcardMask from '@/libs/Ipv4/Addresses/WildcardMask'
import type BroadcastAddress from '@/libs/Ipv4/Addresses/BroadcastAddress'
import type IpAddress from '@/libs/Ipv4/Addresses/IpAddress'
import type Prefix from '@/libs/Ipv4/Addresses/Prefix'
import type NetworkAddress from '@/libs/Ipv4/Addresses/NetworkAddress'

export default class Network {
    readonly mask: Mask
    readonly prefix: Prefix
    readonly size: number
    readonly wildcardMask: WildcardMask
    readonly networkAddress: NetworkAddress
    readonly firstHostAddress: IpAddress
    readonly lastHostAddress: IpAddress
    readonly broadcastAddress: BroadcastAddress

    private subnets: Map<string, { subnet: Network; inRange: boolean }>

    // TODO: support more signatures (anyIp can be binary or array, can give prefix instead of mask ...)
    constructor(anyIp: IpAddress, mask: Mask) {
        this.mask = mask
        this.prefix = this.mask.makePrefix()
        this.size = this.prefix.size
        this.wildcardMask = this.mask.makeWildcard()
        this.networkAddress = this.mask.makeNetworkAddress(anyIp)
        this.firstHostAddress = this.networkAddress.makeFirstHostAddress()
        this.broadcastAddress = this.wildcardMask.makeBroadcastAddress(anyIp)
        this.lastHostAddress = this.broadcastAddress.makeLastHostAddress()

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
    //     const subnetMask = new IpAddress(
    //         NetworkAddressingInfoResolver.maskFromPrefix(subnetPrefix).toDecimal().value
    //     )

    //     // TODO: calculate subnet IpAddress
    //     this.addSubnet(name, new Network(this.networkAddress, subnetMask))
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
}
