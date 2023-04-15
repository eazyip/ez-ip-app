import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import IpAddress from '@/libs/Ipv4/Addresses/IpAddress'
import WildcardMask from '@/libs/Ipv4/Addresses/WildcardMask'
import NetworkAddress from '@/libs/Ipv4/Addresses/NetworkAddress'
import Prefix from '@/libs/Ipv4/Addresses/Prefix'

export default class Mask extends IpAddress {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        if (!this.binaryValue.isMask()) {
            throw new Error(`Invalid mask value ${this.binaryValue.value}`)
        }
    }

    makeWildcard(): WildcardMask {
        return new WildcardMask(
            new BinaryFormat(
                this.binaryValue.value
                    .split('')
                    .map((bit) => parseInt(bit) ^ 1)
                    .join('')
            )
        )
    }

    makeNetworkAddress(ip: IpAddress): NetworkAddress {
        return new NetworkAddress(new BinaryFormat(this.bitwiseAnd(ip)))
    }

    makePrefix(): Prefix {
        return new Prefix(
            this.binaryValue.value.split('').reduce((sum, bit) => sum + (bit === '1' ? 1 : 0), 0)
        )
    }

    private bitwiseAnd(ip: IpAddress): string {
        return ip.binaryValue.value
            .split('')
            .map((bit, index) => parseInt(bit) & parseInt(this.binaryValue.value[index]))
            .join('')
    }
}
