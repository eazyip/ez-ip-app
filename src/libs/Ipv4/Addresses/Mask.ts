import type DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import Ip from '@/libs/Ipv4/Addresses/Ip'
import NetworkAddress from '@/libs/Ipv4/Addresses/NetworkAddress'

export default class Mask extends Ip {
    constructor(address: DecimalFormat | BinaryFormat) {
        super(address)

        if (!this.binaryValue.isMask()) {
            throw new Error(`Invalid mask value ${this.binaryValue.value}`)
        }
    }

    bitwiseAnd(ip: Ip): NetworkAddress {
        return new NetworkAddress(
            new BinaryFormat(
                ip.binaryValue.value
                    .split('')
                    .map((bit, index) => parseInt(bit) & parseInt(this.binaryValue.value[index]))
                    .join('')
            )
        )
    }

    makeNetworkAddress(ip: Ip): NetworkAddress {
        return this.bitwiseAnd(ip)
    }
}
