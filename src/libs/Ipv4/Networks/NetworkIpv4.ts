import type MaskIpv4 from '@/libs/Ipv4/Addresses/MaskIpv4'
import type AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import PrefixIpv4 from '@/libs/Ipv4/Addresses/PrefixIpv4'
import BaseNetworkIpv4 from '@/libs/Ipv4/Networks/BaseNetworkIpv4'

export default class NetworkIpv4 extends BaseNetworkIpv4 {
    // private usedCapacity: number = 0
    private subnets: Map<string, { subnet: NetworkIpv4; inRange: boolean }> = new Map()

    // TODO: support more signatures (anyIp can be binary or array, can give prefix instead of mask ...)
    constructor(anyIp: AddressIpv4, mask: MaskIpv4) {
        super(anyIp, mask)
    }

    /*
    |--------------------------------------------------------------------------
    | Contains
    |--------------------------------------------------------------------------
    */

    containsSubnet(subnet: NetworkIpv4): boolean {
        return (
            this.networkAddress.lesserThanOrEqualTo(subnet.networkAddress) &&
            this.broadcastAddress.greaterThanOrEqualTo(subnet.broadcastAddress)
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

    // TODO: unit test + optimize?
    sortSubnets(): void {
        // ! need to make a copy
        const sortedSubnets = [...this.subnets.entries()].sort(
            (a, b) => b[1].subnet.size - a[1].subnet.size
        )

        this.subnets = new Map()

        sortedSubnets.forEach((subnetEntry) => {
            // ! need to re-instantiate subnet
            this.addSubnetBySize(subnetEntry[0], subnetEntry[1].subnet.size)
        })
    }

    // TODO: edit

    // --------------------------------------------------------------------------

    getSubnet(name: string): { subnet: NetworkIpv4; inRange: boolean } | undefined {
        return this.subnets.get(name)
    }

    removeSubnet(name: string) {
        // TODO: sort ?
        this.subnets.delete(name)
    }

    getSubnets() {
        return this.subnets
    }

    getSubnetsCount() {
        return this.subnets.size
    }
}
