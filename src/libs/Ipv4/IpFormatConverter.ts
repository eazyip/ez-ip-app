class IpFormatConverter {
    strToArr(strIp: string): [number, number, number, number] {
        const arr = strIp.split('.').map((octet) => parseInt(octet))

        if (arr.length !== 4) {
            throw new Error('Invalid IP string')
        }

        return arr as [number, number, number, number]
    }

    decimalTobin(binIp: string): string {
        return binIp
            .split('.')
            .map((octet) => parseInt(octet, 10).toString(2).padStart(8, '0'))
            .join('')
    }

    binToDecimal(decimalIp: string): string {
        return decimalIp
            .match(/.{1,8}/g)!
            .map((octet) => parseInt(octet, 2))
            .join('.')
    }

    maskFromPrefix(prefix: number): string {
        return '1'
            .repeat(prefix)
            .padEnd(32, '0')
            .match(/.{1,8}/g)!
            .map((octet) => parseInt(octet, 2))
            .join('.')
    }
}
export default new IpFormatConverter()
