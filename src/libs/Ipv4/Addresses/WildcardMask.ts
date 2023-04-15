import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import Ip from '@/libs/Ipv4/Addresses/Ip'
import BroadcastAddress from '@/libs/Ipv4/Addresses/BroadcastAddress'
import Mask from '@/libs/Ipv4/Addresses/Mask'
import Prefix from '@/libs/Ipv4/Addresses/Prefix'

export default class WildcardMask extends Ip {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        if (!this.binaryValue.isWildCard()) {
            throw new Error(`Invalid wildcard mask value ${this.binaryValue.value}`)
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

    makeBroadcastAddress(ip: Ip): BroadcastAddress {
        return new BroadcastAddress(new BinaryFormat(this.bitwiseOr(ip)))
    }

    makePrefix(): Prefix {
        return new Prefix(
            this.binaryValue.value.split('').reduce((sum, bit) => sum + (bit === '0' ? 1 : 0), 0)
        )
    }

    private bitwiseOr(ip: Ip): string {
        return ip.binaryValue.value
            .split('')
            .map((bit, index) => parseInt(bit) | parseInt(this.binaryValue.value[index]))
            .join('')
    }
}
