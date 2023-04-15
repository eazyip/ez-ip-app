import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import type BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import Ip from '@/libs/Ipv4/Addresses/Ip'

export default class Mask extends Ip {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        if (!this.binaryValue.isWildCard()) {
            throw new Error(`Invalid wildcard value ${this.binaryValue.value}`)
        }
    }
}
