import type DecimalFormatIpv4 from '@/libs/Ipv4/Formats/DecimalFormatIpv4'
import type BinaryFormatIpv4 from '@/libs/Ipv4/Formats/BinaryFormatIpv4'
import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'
import WildcardMaskIpv4 from '@/libs/Ipv4/Addresses/WildcardMaskIpv4'
import NetworkAddressIpv4 from '@/libs/Ipv4/Addresses/NetworkAddressIpv4'
import PrefixIpv4 from '@/libs/Ipv4/Addresses/PrefixIpv4'

export default class MaskIpv4 extends AddressIpv4 {
    constructor(address: DecimalFormatIpv4 | BinaryFormatIpv4 | string) {
        super(address)

        this.label = 'Mask'

        if (!this.binaryValue.isMask()) {
            throw new Error(`Invalid mask value ${this.binaryValue.value}`)
        }
    }

    makeWildcard(): WildcardMaskIpv4 {
        return new WildcardMaskIpv4(this.binaryValue.invert())
    }

    makeNetworkAddress(ip: AddressIpv4): NetworkAddressIpv4 {
        return new NetworkAddressIpv4(this.binaryValue.bitwiseAnd(ip.binaryValue))
    }

    makePrefix(): PrefixIpv4 {
        return new PrefixIpv4(
            this.binaryValue.value.split('').reduce((sum, bit) => sum + (bit === '1' ? 1 : 0), 0)
        )
    }
}
