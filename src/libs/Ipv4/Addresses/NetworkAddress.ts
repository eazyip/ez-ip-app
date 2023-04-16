import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import type BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import IpAddress from '@/libs/Ipv4/Addresses/IpAddress'

export default class NetworkAddress extends IpAddress {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        // TODO: validate ?
    }

    makeFirstHostAddress(): IpAddress {
        return this.nextAddress()
    }
}
