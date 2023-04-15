import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import Ip from '@/libs/Ipv4/Addresses/Ip'

export default class Broadcast extends Ip {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        // TODO: validate ?
    }

    makeLastHostAddress(): Ip {
        return new Ip(
            new BinaryFormat(
                (parseInt(this.binaryValue.value, 2) - 1).toString(2).padStart(32, '0')
            )
        )
    }
}
