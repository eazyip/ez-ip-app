import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import MaskIpv4 from '@/libs/Ipv4/Addresses/MaskIpv4'
import WildcardMaskIpv4 from '@/libs/Ipv4/Addresses/WildcardMaskIpv4'

export default class PrefixIpv4 {
    readonly value: number
    readonly size: number

    readonly minValue: number = 0
    readonly maxValue: number = 32

    constructor(value: number) {
        if (value > this.maxValue || value < this.minValue) {
            throw new Error(`Invalid prfix value ${value}`)
        }

        this.value = value
        this.size = Math.pow(2, this.maxValue - this.value) - 2
    }

    makeMask(): MaskIpv4 {
        return new MaskIpv4(new BinaryFormat('1'.repeat(this.value).padEnd(this.maxValue, '0')))
    }

    makeWildcard(): WildcardMaskIpv4 {
        return new WildcardMaskIpv4(
            new BinaryFormat('0'.repeat(this.value).padEnd(this.maxValue, '1'))
        )
    }
}
