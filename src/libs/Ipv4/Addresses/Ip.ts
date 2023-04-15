import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import type BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'

export default class Ip {
    decimalValue: DecimalFormat
    binaryValue: BinaryFormat

    constructor(address: DecimalFormat | BinaryFormat) {
        if (address instanceof DecimalFormat) {
            this.decimalValue = address
            this.binaryValue = this.decimalValue.toBinary()
        } else {
            this.binaryValue = address
            this.decimalValue = this.binaryValue.toDecimal()
        }
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
