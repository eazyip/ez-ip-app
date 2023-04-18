import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import type BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'

export default class BroadcastAddressIpv4 extends AddressIpv4 {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        // TODO: validate ?
    }

    makeLastHostAddress(): AddressIpv4 {
        return this.previousAddress()
    }
}
