import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import IpAddress from '@/libs/Ipv4/Addresses/IpAddress'

export default class NetworkAddress extends IpAddress {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        // TODO: validate ?
    }

    makeFirstHostAddress(): IpAddress {
        return new IpAddress(
            new BinaryFormat(
                (parseInt(this.binaryValue.value, 2) + 1).toString(2).padStart(32, '0')
            )
        )
    }
}
