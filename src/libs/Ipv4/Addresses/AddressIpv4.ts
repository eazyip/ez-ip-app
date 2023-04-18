import DecimalFormat from '@/libs/Ipv4/Formats/DecimalFormat'
import type BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'

export default class AddressIpv4 {
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

    nextAddress(): AddressIpv4 {
        // TODO: try catch
        return new AddressIpv4(this.binaryValue.add(1))
    }

    previousAddress(): AddressIpv4 {
        // TODO: try catch
        return new AddressIpv4(this.binaryValue.substract(1))
    }

    /*
    |--------------------------------------------------------------------------
    | Comparisons
    |--------------------------------------------------------------------------
    */

    lesserThan(address: AddressIpv4): boolean {
        return this.binaryValue.base10Value < address.binaryValue.base10Value
    }

    lesserThanOrEqualTo(address: AddressIpv4): boolean {
        return this.binaryValue.base10Value <= address.binaryValue.base10Value
    }

    equalTo(address: AddressIpv4): boolean {
        return this.binaryValue.base10Value === address.binaryValue.base10Value
    }

    greaterThanOrEqualTo(address: AddressIpv4): boolean {
        return this.binaryValue.base10Value >= address.binaryValue.base10Value
    }

    greaterThan(address: AddressIpv4): boolean {
        return this.binaryValue.base10Value > address.binaryValue.base10Value
    }
}
