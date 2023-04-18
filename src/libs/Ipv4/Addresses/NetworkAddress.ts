import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import type BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'

export default class NetworkAddress extends AddressIpv4 {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        // TODO: validate ?
    }

    makeFirstHostAddress(): AddressIpv4 {
        return this.nextAddress()
    }
}
