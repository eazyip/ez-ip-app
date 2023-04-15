export default class BinaryFormat {
    value: string
    dotted: string
    arr: [string, string, string, string]
    decimal: string
    // TODO: hex+octal

    constructor(binaryIp: string) {
        if (binaryIp.length !== 32) {
            throw new Error(
                `Invalid input length: expected 32 bits, received ${binaryIp.length} bits (${binaryIp})`
            )
        }

        if (!/^[01]{32}$/.test(binaryIp)) {
            throw new Error(
                `Invalid input characters: expected only 0's and 1's, received (${binaryIp})`
            )
        }

        this.value = binaryIp
        this.arr = this.value.match(/.{1,8}/g)! as [string, string, string, string]
        this.dotted = this.arr.join('.')
        this.decimal = this.arr.map((octet) => parseInt(octet, 2).toString()).join('.')
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
}
