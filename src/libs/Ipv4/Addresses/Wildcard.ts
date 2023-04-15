import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import Ip from '@/libs/Ipv4/Addresses/Ip'
import Broadcast from '@/libs/Ipv4/Addresses/Broadcast'
import Mask from '@/libs/Ipv4/Addresses/Mask'

export default class Wildcard extends Ip {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        if (!this.binaryValue.isWildCard()) {
            throw new Error(`Invalid wildcard value ${this.binaryValue.value}`)
        }
    }

    makeMask(): Mask {
        return new Mask(
            new BinaryFormat(
                this.binaryValue.value
                    .split('')
                    .map((bit) => parseInt(bit) ^ 1)
                    .join('')
            )
        )
    }

    makeBroadcastAddress(ip: Ip): Broadcast {
        return new Broadcast(new BinaryFormat(this.bitwiseOr(ip)))
    }

    private bitwiseOr(ip: Ip): string {
        return ip.binaryValue.value
            .split('')
            .map((bit, index) => parseInt(bit) | parseInt(this.binaryValue.value[index]))
            .join('')
    }
}
