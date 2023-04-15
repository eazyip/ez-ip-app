import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'

class NetworkAddressingInfoResolver {
    wildcardFromMask(mask: BinaryFormat): BinaryFormat {
        return new BinaryFormat(
            mask.value
                .split('')
                .map((bit) => parseInt(bit) ^ 1)
                .join('')
        )
    }

    prefixFromMask(mask: BinaryFormat): number {
        return mask.value.split('').reduce((sum, bit) => sum + (bit === '1' ? 1 : 0), 0)
    }

    maskFromPrefix(prefix: number): BinaryFormat {
        return new BinaryFormat('1'.repeat(prefix).padEnd(32, '0'))
    }

    sizeFromPrefix(prefix: number): number {
        return Math.pow(2, 32 - prefix) - 2
    }

    networkAddress(anyIp: BinaryFormat, mask: BinaryFormat): BinaryFormat {
        return new BinaryFormat(
            anyIp.value
                .split('')
                .map((bit, index) => parseInt(bit) & parseInt(mask.value[index]))
                .join('')
        )
    }

    firstHostFromNetworkAddress(networkIp: BinaryFormat): BinaryFormat {
        return new BinaryFormat((parseInt(networkIp.value, 2) + 1).toString(2))
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
        return new BinaryFormat((parseInt(broadcastIp.value, 2) - 1).toString(2))
    }
}

export default new NetworkAddressingInfoResolver()
