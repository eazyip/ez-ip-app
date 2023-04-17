import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import type BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'

export default class IpAddress {
    readonly decimalValue: DecimalFormat
    readonly binaryValue: BinaryFormat

    constructor(address: DecimalFormat | BinaryFormat) {
        if (address instanceof DecimalFormat) {
            this.decimalValue = address
            this.binaryValue = this.decimalValue.toBinary()
        } else {
            this.binaryValue = address
            this.decimalValue = this.binaryValue.toDecimal()
        }
    }

    nextAddress(): IpAddress {
        return new IpAddress(this.binaryValue.add(1))
    }

    previousAddress(): IpAddress {
        return new IpAddress(this.binaryValue.substract(1))
    }

    less(address: IpAddress): boolean {
        return this.binaryValue.base10Value < address.binaryValue.base10Value
    }

    lessOrEqual(address: IpAddress): boolean {
        return this.binaryValue.base10Value <= address.binaryValue.base10Value
    }

    equal(address: IpAddress): boolean {
        return this.binaryValue.base10Value === address.binaryValue.base10Value
    }

    greaterOrEqual(address: IpAddress): boolean {
        return this.binaryValue.base10Value >= address.binaryValue.base10Value
    }

    greater(address: IpAddress): boolean {
        return this.binaryValue.base10Value > address.binaryValue.base10Value
    }
}
