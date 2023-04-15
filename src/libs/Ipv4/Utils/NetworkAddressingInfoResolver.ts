import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import type Mask from '@/libs/Ipv4/Addresses/Mask'

class NetworkAddressingInfoResolver {
    wildcardFromMask(mask: Mask): BinaryFormat {
        return new BinaryFormat(
            mask.binaryValue.value
                .split('')
                .map((bit) => parseInt(bit) ^ 1)
                .join('')
        )
    }

    prefixFromMask(mask: Mask): number {
        return mask.binaryValue.value.split('').reduce((sum, bit) => sum + (bit === '1' ? 1 : 0), 0)
    }

    maskFromPrefix(prefix: number): BinaryFormat {
        return new BinaryFormat('1'.repeat(prefix).padEnd(32, '0'))
    }

    sizeFromPrefix(prefix: number): number {
        return Math.pow(2, 32 - prefix) - 2
    }

    networkAddress(anyIp: BinaryFormat, mask: Mask): BinaryFormat {
        return new BinaryFormat(
            anyIp.value
                .split('')
                .map((bit, index) => parseInt(bit) & parseInt(mask.binaryValue.value[index]))
                .join('')
        )
    }

    firstHostFromNetworkAddress(networkIp: BinaryFormat): BinaryFormat {
        return new BinaryFormat((parseInt(networkIp.value, 2) + 1).toString(2).padStart(32, '0'))
    }

    broadcastAddress(networkIp: BinaryFormat, wildcardMask: BinaryFormat): BinaryFormat {
        return new BinaryFormat(
            networkIp.value
                .split('')
                .map((bit, index) => parseInt(bit) | parseInt(wildcardMask.value[index]))
                .join('')
        )
    }

    lastHostFromBroadcastAddress(broadcastIp: BinaryFormat): BinaryFormat {
        return new BinaryFormat((parseInt(broadcastIp.value, 2) - 1).toString(2).padStart(32, '0'))
    }
}

export default new NetworkAddressingInfoResolver()
