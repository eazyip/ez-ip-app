import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'

export default class BinaryFormat {
    value: string
    dotted: string
    arr: [string, string, string, string]

    constructor(binaryIp: string) {
        if (!BinaryFormat.isValid(binaryIp)) {
            throw new Error(`Invalid binary IPv4 address ${binaryIp}`)
        }

        this.value = binaryIp
        this.arr = this.value.match(/.{1,8}/g)! as [string, string, string, string]
        this.dotted = this.arr.join('.')
    }

    static isValid(binaryIp: string): boolean {
        if (binaryIp.length !== 32) {
            return false
        }

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
        return new DecimalFormat(this.arr.map((octet) => parseInt(octet, 2).toString()).join('.'))
    }
}
