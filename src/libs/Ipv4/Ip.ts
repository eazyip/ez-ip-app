import IpValidator from '@/libs/Ipv4/IpValidator'
import IpFormatConverter from './IpFormatConverter'

export default class Ip {
    value: string
    arrValue: [number, number, number, number]
    binValue: string

    constructor(address: string) {
        if (!IpValidator.passes(address)) {
            throw 'invalid IPv4'
        }

        this.value = address
        this.arrValue = IpFormatConverter.strToArr(this.value)
        this.binValue = IpFormatConverter.decimalTobin(this.value)
    }

    getValue(): string {
        return this.value
    }

    getArrValue(): [number, number, number, number] {
        return this.arrValue
    }

    getBinValue(): string {
        return this.binValue
    }
}
