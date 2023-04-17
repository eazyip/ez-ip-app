import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

export default class BinaryFormat {
    readonly value: string
    readonly base10Value: number

    constructor(binaryIp: string) {
        if (!BinaryFormat.isValid(binaryIp)) {
            throw new InvalidBinaryFormatError(binaryIp)
        }

        this.value = binaryIp
        this.base10Value = parseInt(this.value, 2)
    }

    static isValid(binaryIp: string): boolean {
        if (!/^[01]{32}$/.test(binaryIp)) {
            return false
        }

        return true
    }

    toDecimal(): DecimalFormat {
        return new DecimalFormat(
            this.octets.map((octet) => parseInt(octet, 2).toString()).join('.')
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Masks
    |--------------------------------------------------------------------------
    */

    isMask(): boolean {
        return this.isSequentialBits(this.value.indexOf('0'), this.value.lastIndexOf('1'))
    }

    isWildCardMask(): boolean {
        return this.isSequentialBits(this.value.indexOf('1'), this.value.lastIndexOf('0'))
    }

    private isSequentialBits(startIndex: number, endIndex: number): boolean {
        return endIndex === -1 || startIndex === -1 || endIndex + 1 === startIndex
    }

    /*
    |--------------------------------------------------------------------------
    | Calculations
    |--------------------------------------------------------------------------
    */

    add(value: number): BinaryFormat {
        if (this.base10Value === 4294967295) {
            throw new Error(
                `The binary value ${this.value} cannot be incremented by ${value.toString(2)}`
            )
        }

        return new BinaryFormat((this.base10Value + value).toString(2).padStart(32, '0'))
    }

    substract(value: number): BinaryFormat {
        if (this.base10Value - value < 0) {
            throw new Error(
                `The binary value ${this.value} cannot be decremented by ${value.toString(2)}`
            )
        }

        return new BinaryFormat((this.base10Value - value).toString(2).padStart(32, '0'))
    }

    /*
    |--------------------------------------------------------------------------
    | Bitwise operations
    |--------------------------------------------------------------------------
    */

    bitwiseAnd(ip: BinaryFormat): BinaryFormat {
        return new BinaryFormat(
            Array.from(ip.value, (bit, index) => parseInt(bit) & parseInt(this.value[index])).join(
                ''
            )
        )
    }

    bitwiseOr(ip: BinaryFormat): BinaryFormat {
        return new BinaryFormat(
            Array.from(ip.value, (bit, index) => parseInt(bit) | parseInt(this.value[index])).join(
                ''
            )
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

    /*
    |--------------------------------------------------------------------------
    | getters
    |--------------------------------------------------------------------------
    */

    get octets(): [string, string, string, string] {
        return this.value.match(/.{1,8}/g) as [string, string, string, string]
    }

    get dotted(): string {
        return this.octets.join('.')
    }
}

class InvalidBinaryFormatError extends Error {
    constructor(binaryIp: string) {
        super(`Invalid binary IPv4 address ${binaryIp}`)
        this.name = 'InvalidBinaryFormatError'
    }
}
