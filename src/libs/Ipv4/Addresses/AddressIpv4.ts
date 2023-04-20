import DecimalFormatIpv4 from '@/libs/Ipv4/Formats/DecimalFormatIpv4'
import BinaryFormatIpv4 from '@/libs/Ipv4/Formats/BinaryFormatIpv4'

export default class AddressIpv4 {
    readonly decimalValue: DecimalFormatIpv4
    readonly binaryValue: BinaryFormatIpv4
    // TODO: label (default and from constructor)

    constructor(address: DecimalFormatIpv4 | BinaryFormatIpv4 | string) {
        if (typeof address === 'string') {
            if (address.length === 32) {
                address = new BinaryFormatIpv4(address)
            } else {
                address = new DecimalFormatIpv4(address)
            }
        }

        if (address instanceof DecimalFormatIpv4) {
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
