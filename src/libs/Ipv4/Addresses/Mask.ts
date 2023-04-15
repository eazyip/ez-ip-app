import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import Ip from '@/libs/Ipv4/Addresses/Ip'

export default class Mask extends Ip {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        if (!this.binaryValue.isMask()) {
            throw new Error(`Invalid mask value ${this.binaryValue.value}`)
        }
    }

    bitwiseAnd(ip: Ip): Ip {
        return new Ip(
            new BinaryFormat(
                ip.binaryValue.value
                    .split('')
                    .map((bit, index) => parseInt(bit) & parseInt(this.binaryValue.value[index]))
                    .join('')
            )
        )
    }

    makeNetworkAddress(ip: Ip): Ip {
        return this.bitwiseAnd(ip)
    }
}
