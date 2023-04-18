import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import type BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import WildcardMask from '@/libs/Ipv4/Addresses/WildcardMask'
import NetworkAddress from '@/libs/Ipv4/Addresses/NetworkAddress'
import PrefixIpv4 from '@/libs/Ipv4/Addresses/PrefixIpv4'

export default class MaskIpv4 extends AddressIpv4 {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        if (!this.binaryValue.isMask()) {
            throw new Error(`Invalid mask value ${this.binaryValue.value}`)
        }
    }

    makeWildcard(): WildcardMask {
        return new WildcardMask(this.binaryValue.invert())
    }

    makeNetworkAddress(ip: AddressIpv4): NetworkAddress {
        return new NetworkAddress(this.binaryValue.bitwiseAnd(ip.binaryValue))
    }

    makePrefix(): PrefixIpv4 {
        return new PrefixIpv4(
            this.binaryValue.value.split('').reduce((sum, bit) => sum + (bit === '1' ? 1 : 0), 0)
        )
    }
}
