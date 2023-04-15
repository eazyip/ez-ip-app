import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import Mask from '@/libs/Ipv4/Addresses/Mask'
import Wildcard from '@/libs/Ipv4/Addresses/Wildcard'

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
}

export default new NetworkAddressingInfoResolver()
