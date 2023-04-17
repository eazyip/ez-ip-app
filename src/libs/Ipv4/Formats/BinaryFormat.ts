import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

export default class BinaryFormat {
    readonly value: string
    readonly dotted: string
    readonly octets: [string, string, string, string]

    constructor(binaryIp: string) {
        if (!BinaryFormat.isValid(binaryIp)) {
            throw new InvalidBinaryIpError(`Invalid binary IPv4 address ${binaryIp}`)
        }

        this.value = binaryIp
        this.octets = this.value.match(/.{1,8}/g) as [string, string, string, string]
        Object.freeze(this.octets)
        this.dotted = this.octets.join('.')
    }

    static isValid(binaryIp: string): boolean {
        if (!/^[01]{32}$/.test(binaryIp)) {
            return false
        }

        return true
    }

    isMask(): boolean {
        return this.isSequentialBits(this.value.indexOf('0'), this.value.lastIndexOf('1'))
    }

    isWildCardMask(): boolean {
        return this.isSequentialBits(this.value.indexOf('1'), this.value.lastIndexOf('0'))
    }

    private isSequentialBits(startIndex: number, endIndex: number): boolean {
        return endIndex === -1 || startIndex === -1 || endIndex + 1 === startIndex
    }

    toDecimal(): DecimalFormat {
        return new DecimalFormat(
            this.octets.map((octet) => parseInt(octet, 2).toString()).join('.')
        )
    }

    add(value: number): BinaryFormat {
        // ! can't if 255.255.255.255
        return new BinaryFormat((parseInt(this.value, 2) + value).toString(2).padStart(32, '0'))
    }

    substract(value: number): BinaryFormat {
        // ! can't if 0.0.0.0
        return new BinaryFormat((parseInt(this.value, 2) - value).toString(2).padStart(32, '0'))
    }

    bitwiseAnd(ip: BinaryFormat): BinaryFormat {
        return new BinaryFormat(
            ip.value
                .split('')
                .map((bit, index) => parseInt(bit) & parseInt(this.value[index]))
                .join('')
        )
    }

    bitwiseOr(ip: BinaryFormat): BinaryFormat {
        return new BinaryFormat(
            ip.value
                .split('')
                .map((bit, index) => parseInt(bit) | parseInt(this.value[index]))
                .join('')
        )
    }

    invert(): BinaryFormat {
        return new BinaryFormat(
            this.value
                .split('')
                .map((bit) => parseInt(bit) ^ 1)
                .join('')
        )
    }
}

class InvalidBinaryIpError extends Error {
    constructor(binaryIp: string) {
        super(`Invalid binary IPv4 address ${binaryIp}`)
        this.name = 'InvalidBinaryIpError'
    }
}
