import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import type BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import IpAddress from '@/libs/Ipv4/Addresses/IpAddress'

export default class BroadcastAddress extends IpAddress {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        // TODO: validate ?
    }

    makeLastHostAddress(): IpAddress {
        return this.previousAddress()
    }
}
