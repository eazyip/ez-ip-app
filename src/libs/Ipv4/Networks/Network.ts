import type Mask from '@/libs/Ipv4/Addresses/Mask'
import type WildcardMask from '@/libs/Ipv4/Addresses/WildcardMask'
import type BroadcastAddressIpv4 from '@/libs/Ipv4/Addresses/BroadcastAddressIpv4'
import type AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import Prefix from '@/libs/Ipv4/Addresses/Prefix'
import type NetworkAddress from '@/libs/Ipv4/Addresses/NetworkAddress'

export default class Network {
    readonly mask: Mask
    readonly prefix: Prefix
    readonly size: number
    readonly wildcardMask: WildcardMask
    readonly networkAddress: NetworkAddress
    readonly firstHostAddress: AddressIpv4
    readonly lastHostAddress: AddressIpv4
    readonly broadcastAddress: BroadcastAddressIpv4

    // private usedCapacity: number = 0
    private subnets: Map<string, { subnet: Network; inRange: boolean }> = new Map()

    // TODO: support more signatures (anyIp can be binary or array, can give prefix instead of mask ...)
    constructor(anyIp: AddressIpv4, mask: Mask) {
        this.mask = mask
        this.prefix = this.mask.makePrefix()
        this.size = this.prefix.size
        this.wildcardMask = this.mask.makeWildcard()
        this.networkAddress = this.mask.makeNetworkAddress(anyIp)
        this.firstHostAddress = this.networkAddress.makeFirstHostAddress()
        this.broadcastAddress = this.wildcardMask.makeBroadcastAddress(anyIp)
        this.lastHostAddress = this.broadcastAddress.makeLastHostAddress()
    }

    addSubnetBySize(name: string, subnetSize: number) {
        if (this.subnets.has(name)) {
            throw new Error('Subnet name already in use')
        }

        const subnetPrefix = new Prefix(Math.floor(32 - Math.log2(subnetSize + 2)))
        const subnetMask = subnetPrefix.makeMask()

        let subnetAddress
        if (this.subnets.size === 0) {
            subnetAddress = this.networkAddress
        } else {
            subnetAddress = Array.from(this.subnets.values())[
                this.subnets.size - 1
            ].subnet.broadcastAddress.nextAddress()
        }

        this.addSubnet(name, new Network(subnetAddress, subnetMask))
    }

    addSubnet(name: string, subnet: Network) {
        this.subnets.set(name, { subnet, inRange: this.containsSubnet(subnet) })
    }

    getSubnet(name: string): { subnet: Network; inRange: boolean } | undefined {
        return this.subnets.get(name)
    }

    // removeSubnet(name: string) {
    //     this.subnets.delete(name)
    // }

    containsSubnet(subnet: Network): boolean {
        return (
            this.networkAddress.lesserThanOrEqualTo(subnet.networkAddress) &&
            this.broadcastAddress.greaterThanOrEqualTo(subnet.broadcastAddress)
        )
    }

    containsAddress(address: AddressIpv4): boolean {
        return (
            this.networkAddress.lesserThanOrEqualTo(address) &&
            this.broadcastAddress.greaterThanOrEqualTo(address)
        )
    }
}
