import BinaryFormat from '@/libs/Ipv4/Formats/BinaryFormat'
import Mask from '@/libs/Ipv4/Addresses/Mask'
import Wildcard from '@/libs/Ipv4/Addresses/Wildcard'

export default class Prefix {
    readonly value: number
    readonly size: number

    constructor(value: number) {
        this.value = value
        this.size = Math.pow(2, 32 - this.value) - 2
    }

    makeMask(): Mask {
        return new Mask(new BinaryFormat('1'.repeat(this.value).padEnd(32, '0')))
    }

    makeWildcard(): Wildcard {
        return new Wildcard(new BinaryFormat('0'.repeat(this.value).padEnd(32, '1')))
    }
}
