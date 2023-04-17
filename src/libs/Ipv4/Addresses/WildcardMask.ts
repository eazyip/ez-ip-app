import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import type BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import IpAddress from '@/libs/Ipv4/Addresses/IpAddress'
import BroadcastAddress from '@/libs/Ipv4/Addresses/BroadcastAddress'
import Mask from '@/libs/Ipv4/Addresses/Mask'
import Prefix from '@/libs/Ipv4/Addresses/Prefix'

export default class WildcardMask extends IpAddress {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        if (!this.binaryValue.isWildCardMask()) {
            throw new Error(`Invalid wildcard mask value ${this.binaryValue.value}`)
        }
    }

    makeMask(): Mask {
        return new Mask(this.binaryValue.invert())
    }

    makeBroadcastAddress(ip: IpAddress): BroadcastAddress {
        return new BroadcastAddress(this.binaryValue.bitwiseOr(ip.binaryValue))
    }

    makePrefix(): Prefix {
        return new Prefix(
            this.binaryValue.value.split('').reduce((sum, bit) => sum + (bit === '0' ? 1 : 0), 0)
        )
    }
}
