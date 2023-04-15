import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'

export default class DecimalFormat {
    readonly value: string
    readonly octets: [number, number, number, number]

    constructor(decimalIp: string) {
        if (!DecimalFormat.isValid(decimalIp)) {
            throw new InvalidDecimalIpError(`Invalid decimal IPv4 address ${decimalIp}`)
        }

        this.value = decimalIp
        this.octets = this.value.split('.').map((octet) => parseInt(octet, 10)) as [
            number,
            number,
            number,
            number
        ]
        Object.freeze(this.octets)
    }

    static isValid(decimalIp: string): boolean {
        const octets = decimalIp.split('.')
        if (octets.length !== 4) {
            return false
        }

        return octets.every(
            (octet) => /^\d+$/.test(octet) && Number(octet) >= 0 && Number(octet) <= 255
        )
    }

    toBinary(): BinaryFormat {
        // TODO: cache ?
        return new BinaryFormat(
            this.octets.map((octet) => octet.toString(2).padStart(8, '0')).join('')
        )
    }
}

class InvalidDecimalIpError extends Error {
    constructor(decimalIp: string) {
        super(`Invalid decimal IPv4 address ${decimalIp}`)
        this.name = 'InvalidDecimalIpError'
    }
}
