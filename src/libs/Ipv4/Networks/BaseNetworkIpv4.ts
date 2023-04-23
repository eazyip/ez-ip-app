import type MaskIpv4 from '@/libs/Ipv4/Addresses/MaskIpv4'
import type WildcardMaskIpv4 from '@/libs/Ipv4/Addresses/WildcardMaskIpv4'
import type BroadcastAddressIpv4 from '@/libs/Ipv4/Addresses/BroadcastAddressIpv4'
import type AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import type PrefixIpv4 from '@/libs/Ipv4/Addresses/PrefixIpv4'
import type NetworkAddressIpv4 from '@/libs/Ipv4/Addresses/NetworkAddressIpv4'

export default abstract class BaseNetworkIpv4 {
    label: string = ''

    readonly mask: MaskIpv4
    readonly prefix: PrefixIpv4
    readonly size: number
    readonly wildcardMask: WildcardMaskIpv4
    readonly networkAddress: NetworkAddressIpv4
    readonly firstHostAddress: AddressIpv4 | null = null
    readonly lastHostAddress: AddressIpv4 | null = null
    readonly broadcastAddress: BroadcastAddressIpv4
    // TODO: add size needed by user to calculate unused space
    // TODO: support saving host addresses and calculate acually used/free space

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
            this.firstHostAddress = this.networkAddress
                .makeFirstHostAddress()
                .setLabel('First host address')
            this.lastHostAddress = this.broadcastAddress
                .makeLastHostAddress()
                .setLabel('Last host address')
        }
    }

    setLabel(label: string): BaseNetworkIpv4 {
        this.label = label
        return this
    }

    resolveAddressLabel(address: AddressIpv4): string {
        if (this.networkAddress.equalTo(address)) {
            return this.networkAddress.label
        }
        if (this.broadcastAddress.equalTo(address)) {
            return this.broadcastAddress.label
        }
        if (!this.lastHostAddress || !this.firstHostAddress) {
            // ! throw
            return ''
        }
        if (this.firstHostAddress.equalTo(address)) {
            return this.firstHostAddress.label
        }
        if (this.lastHostAddress.equalTo(address)) {
            return this.lastHostAddress.label
        }
        return 'Host address'
    }

    /*
    |--------------------------------------------------------------------------
    | Contains
    |--------------------------------------------------------------------------
    */

    containsAddress(address: AddressIpv4): boolean {
        return (
            this.networkAddress.lesserThanOrEqualTo(address) &&
            this.broadcastAddress.greaterThanOrEqualTo(address)
        )
    }
}
