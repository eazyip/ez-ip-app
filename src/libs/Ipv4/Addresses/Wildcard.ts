import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import Ip from '@/libs/Ipv4/Addresses/Ip'
import Broadcast from '@/libs/Ipv4/Addresses/Broadcast'

export default class Mask extends Ip {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        if (!this.binaryValue.isWildCard()) {
            throw new Error(`Invalid wildcard value ${this.binaryValue.value}`)
        }
    }

    bitwiseOr(ip: Ip): Broadcast {
        return new Broadcast(
            new BinaryFormat(
                ip.binaryValue.value
                    .split('')
                    .map((bit, index) => parseInt(bit) | parseInt(this.binaryValue.value[index]))
                    .join('')
            )
        )
    }

    makeBroadcastAddress(ip: Ip): Broadcast {
        return this.bitwiseOr(ip)
    }
}
