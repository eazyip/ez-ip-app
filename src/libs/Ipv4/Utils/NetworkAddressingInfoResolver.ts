import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import Mask from '@/libs/Ipv4/Addresses/Mask'
import Wildcard from '@/libs/Ipv4/Addresses/Wildcard'
import Ip from '@/libs/Ipv4/Addresses/Ip'

class NetworkAddressingInfoResolver {
    wildcardFromMask(mask: Mask): Wildcard {
        return new Wildcard(
            new BinaryFormat(
                mask.binaryValue.value
                    .split('')
                    .map((bit) => parseInt(bit) ^ 1)
                    .join('')
            )
        )
    }

    prefixFromMask(mask: Mask): number {
        return mask.binaryValue.value.split('').reduce((sum, bit) => sum + (bit === '1' ? 1 : 0), 0)
    }

    maskFromPrefix(prefix: number): Mask {
        return new Mask(new BinaryFormat('1'.repeat(prefix).padEnd(32, '0')))
    }

    sizeFromPrefix(prefix: number): number {
        return Math.pow(2, 32 - prefix) - 2
    }

    firstHostFromNetworkAddress(networkIp: Ip): Ip {
        return new Ip(
            new BinaryFormat(
                (parseInt(networkIp.binaryValue.value, 2) + 1).toString(2).padStart(32, '0')
            )
        )
    }

    lastHostFromBroadcastAddress(broadcastIp: Ip): Ip {
        return new Ip(
            new BinaryFormat(
                (parseInt(broadcastIp.binaryValue.value, 2) - 1).toString(2).padStart(32, '0')
            )
        )
    }
}

export default new NetworkAddressingInfoResolver()
