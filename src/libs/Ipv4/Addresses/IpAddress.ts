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

    /*
    |--------------------------------------------------------------------------
    | Relative address
    |--------------------------------------------------------------------------
    */

    nextAddress(): IpAddress {
        // TODO: try catch
        return new IpAddress(this.binaryValue.add(1))
    }

    previousAddress(): IpAddress {
        // TODO: try catch
        return new IpAddress(this.binaryValue.substract(1))
    }

    /*
    |--------------------------------------------------------------------------
    | Comparisons
    |--------------------------------------------------------------------------
    */

    lesserThan(address: IpAddress): boolean {
        return this.binaryValue.base10Value < address.binaryValue.base10Value
    }

    lesserThanOrEqualTo(address: IpAddress): boolean {
        return this.binaryValue.base10Value <= address.binaryValue.base10Value
    }

    equalTo(address: IpAddress): boolean {
        return this.binaryValue.base10Value === address.binaryValue.base10Value
    }

    greaterThanOrEqualTo(address: IpAddress): boolean {
        return this.binaryValue.base10Value >= address.binaryValue.base10Value
    }

    greaterThan(address: IpAddress): boolean {
        return this.binaryValue.base10Value > address.binaryValue.base10Value
    }
}
