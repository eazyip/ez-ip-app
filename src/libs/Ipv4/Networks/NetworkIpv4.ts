import type MaskIpv4 from '@/libs/Ipv4/Addresses/MaskIpv4'
import type WildcardMaskIpv4 from '@/libs/Ipv4/Addresses/WildcardMaskIpv4'
import type BroadcastAddressIpv4 from '@/libs/Ipv4/Addresses/BroadcastAddressIpv4'
import type AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import PrefixIpv4 from '@/libs/Ipv4/Addresses/PrefixIpv4'
import type NetworkAddressIpv4 from '@/libs/Ipv4/Addresses/NetworkAddressIpv4'

export default class NetworkIpv4 {
    readonly mask: MaskIpv4
    readonly prefix: PrefixIpv4
    readonly size: number
    readonly wildcardMask: WildcardMaskIpv4
    readonly networkAddress: NetworkAddressIpv4
    readonly firstHostAddress: AddressIpv4 | null = null
    readonly lastHostAddress: AddressIpv4 | null = null
    readonly broadcastAddress: BroadcastAddressIpv4

    // private usedCapacity: number = 0
    private subnets: Map<string, { subnet: NetworkIpv4; inRange: boolean }> = new Map()

    // TODO: support more signatures (anyIp can be binary or array, can give prefix instead of mask ...)
    constructor(anyIp: AddressIpv4, mask: MaskIpv4) {
        // TODO: cover prefix 32|0 cases -> this is a host
        this.mask = mask
        this.prefix = this.mask.makePrefix()
        this.size = this.prefix.size
        this.wildcardMask = this.mask.makeWildcard()
        this.networkAddress = this.mask.makeNetworkAddress(anyIp)
        this.broadcastAddress = this.wildcardMask.makeBroadcastAddress(anyIp)

        // TODO: unit test
        if (this.prefix.value < 31 && this.prefix.value > 0) {
            this.firstHostAddress = this.networkAddress.makeFirstHostAddress()
            this.lastHostAddress = this.broadcastAddress.makeLastHostAddress()
        }
    }

    containsSubnet(subnet: NetworkIpv4): boolean {
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

    /*
    |--------------------------------------------------------------------------
    | Subnetting
    |--------------------------------------------------------------------------
    */

    addSubnetBySize(newSubnetName: string, newSubnetSize: number) {
        if (this.subnets.has(newSubnetName)) {
            throw new Error('Subnet name already in use')
        }

        const newSubnetPrefix = new PrefixIpv4(Math.floor(32 - Math.log2(newSubnetSize + 2)))
        const newSubnetMask = newSubnetPrefix.makeMask()

        this.addSubnet(
            newSubnetName,
            new NetworkIpv4(this.resolveNewSubnetAddress(newSubnetPrefix.size), newSubnetMask)
        )
    }

    addSubnet(newSubnetName: string, newSubnet: NetworkIpv4) {
        this.subnets.set(newSubnetName, {
            subnet: newSubnet,
            inRange: this.containsSubnet(newSubnet)
        })
    }

    private resolveNewSubnetAddress(nextSubnetSize: number): AddressIpv4 {
        if (this.subnets.size === 0) {
            return this.networkAddress
        }

        const lastSubnet = this.lastSubnet()!

        return lastSubnet.broadcastAddress.nextAddress(nextSubnetSize + 2)
    }

    lastSubnet(): null | NetworkIpv4 {
        if (this.subnets.size === 0) {
            return null
        }

        return Array.from(this.subnets.values()).pop()!.subnet
    }

    // TODO: sort on edit

    // --------------------------------------------------------------------------

    getSubnet(name: string): { subnet: NetworkIpv4; inRange: boolean } | undefined {
        return this.subnets.get(name)
    }

    removeSubnet(name: string) {
        // TODO: compact ?
        this.subnets.delete(name)
    }

    getSubnets() {
        return this.subnets
    }

    getSubnetsCount() {
        return this.subnets.size
    }
}
