import type DecimalFormatIpv4 from '@/libs/Ipv4/Formats/DecimalFormatIpv4'
import type BinaryFormatIpv4 from '@/libs/Ipv4/Formats/BinaryFormatIpv4'
import AddressIpv4 from '@/libs/Ipv4/Addresses/AddressIpv4'

export default class NetworkAddressIpv4 extends AddressIpv4 {
    constructor(address: DecimalFormatIpv4 | BinaryFormatIpv4 | string) {
        super(address)

        this.label = 'Network address'

        // TODO: validate ?
    }

    makeFirstHostAddress(): AddressIpv4 {
        return this.nextAddress()
    }
}
