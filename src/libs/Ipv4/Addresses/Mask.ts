import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import Ip from '@/libs/Ipv4/Addresses/Ip'
import Wildcard from '@/libs/Ipv4/Addresses/Wildcard'
import NetworkAddress from '@/libs/Ipv4/Addresses/NetworkAddress'
import Prefix from '@/libs/Ipv4/Addresses/Prefix'

export default class Mask extends Ip {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        if (!this.binaryValue.isMask()) {
            throw new Error(`Invalid mask value ${this.binaryValue.value}`)
        }
    }

    makeWildcard(): Wildcard {
        return new Wildcard(
            new BinaryFormat(
                this.binaryValue.value
                    .split('')
                    .map((bit) => parseInt(bit) ^ 1)
                    .join('')
            )
        )
    }

    makeNetworkAddress(ip: Ip): NetworkAddress {
        return new NetworkAddress(new BinaryFormat(this.bitwiseAnd(ip)))
    }

    makePrefix(): Prefix {
        return new Prefix(
            this.binaryValue.value.split('').reduce((sum, bit) => sum + (bit === '1' ? 1 : 0), 0)
        )
    }

    private bitwiseAnd(ip: Ip): string {
        return ip.binaryValue.value
            .split('')
            .map((bit, index) => parseInt(bit) & parseInt(this.binaryValue.value[index]))
            .join('')
    }
}
