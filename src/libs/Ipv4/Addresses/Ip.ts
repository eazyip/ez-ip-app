import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import type BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'

export default class Ip {
    decimalValue: DecimalFormat
    binaryValue: BinaryFormat

    constructor(address: string) {
        this.decimalValue = new DecimalFormat(address)
        this.binaryValue = this.decimalValue.toBinary()
    }

    getValue(): string {
        return this.decimalValue.value
    }

    getArrValue(): [number, number, number, number] {
        return this.decimalValue.arr
    }

    getBinValue(): string {
        return this.binaryValue.value
    }

    getBinDottedValue(): string {
        return this.binaryValue.dotted
    }
}
