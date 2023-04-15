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
        const zerosIndex = this.value.indexOf('0')
        const onesIndex = this.value.lastIndexOf('1')

        return onesIndex === -1 || zerosIndex === -1 || onesIndex + 1 === zerosIndex
    }

    isWildCard(): boolean {
        const onesIndex = this.value.indexOf('1')
        const zerosIndex = this.value.lastIndexOf('0')

        return onesIndex === -1 || zerosIndex === -1 || zerosIndex + 1 === onesIndex
    }

    toDecimal(): DecimalFormat {
        return new DecimalFormat(
            this.octets.map((octet) => parseInt(octet, 2).toString()).join('.')
        )
    }
}

class InvalidBinaryIpError extends Error {
    constructor(binaryIp: string) {
        super(`Invalid binary IPv4 address ${binaryIp}`)
        this.name = 'InvalidBinaryIpError'
    }
}
