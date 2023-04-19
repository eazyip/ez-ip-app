import BinaryFormatIpv4 from '@/libs/Ipv4/Formats/BinaryFormatIpv4'

export default class DecimalFormatIpv4 {
    readonly value: string

    constructor(decimalIp: string) {
        if (!DecimalFormatIpv4.isValid(decimalIp)) {
            throw new InvalidDecimalIpError(`Invalid decimal IPv4 address ${decimalIp}`)
        }

        this.value = decimalIp
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

    toBinary(): BinaryFormatIpv4 {
        return new BinaryFormatIpv4(
            this.octets.map((octet) => octet.toString(2).padStart(8, '0')).join('')
        )
    }

    get octets(): [number, number, number, number] {
        return this.value.split('.').map((octet) => parseInt(octet, 10)) as [
            number,
            number,
            number,
            number
        ]
    }
}

class InvalidDecimalIpError extends Error {
    constructor(decimalIp: string) {
        super(`Invalid decimal IPv4 address ${decimalIp}`)
        this.name = 'InvalidDecimalIpError'
    }
}
