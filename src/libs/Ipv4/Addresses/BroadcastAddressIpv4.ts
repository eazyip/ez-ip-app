import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import type BinaryFormatIpv4 from '@/libs/Ipv4/Formats/BinaryFormatIpv4'
import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'

export default class BroadcastAddressIpv4 extends AddressIpv4 {
    constructor(address: DecimalFormat | BinaryFormatIpv4) {
        super(address)

        // TODO: validate ?
    }

    makeLastHostAddress(): AddressIpv4 {
        return this.previousAddress()
    }
}
