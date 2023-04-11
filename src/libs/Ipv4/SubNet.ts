import Ip from './Ip'

export default class SubNet {
    mask: Ip
    prefix: number
    size: number
    wildcardMask: Ip
    networkIp: Ip
    firstHostIp: Ip
    lastHostIp: Ip
    broadcastIp: Ip

    // TODO: support more signatures (anyIp can be binary or array, can give prefix instead of mask ...)
    constructor(anyIp: Ip | string, mask: Ip | string) {
        anyIp = anyIp instanceof Ip ? anyIp : new Ip(anyIp)

        this.mask = mask instanceof Ip ? mask : new Ip(mask)
        this.prefix = this._resolvePrefix(this.mask)
        this.size = this._resolveNetworkSize(this.prefix)
        this.wildcardMask = this._resolveWildcardMask(this.mask)
        this.networkIp = this._resolveIp(anyIp)
        this.firstHostIp = this._resolveFirstHostIp(this.networkIp)
        this.broadcastIp = this._resolveBroadcastIp(this.networkIp)
        this.lastHostIp = this._resolveLastHostIp(this.broadcastIp)
    }

    private _resolvePrefix(mask: Ip): number {
        return mask
            .getBinValue()
            .split('')
            .reduce((sum, bit) => sum + (bit === '1' ? 1 : 0), 0)
    }

    private _resolveNetworkSize(prefix: number): number {
        return Math.pow(2, 32 - prefix) - 2
    }

    private _resolveWildcardMask(mask: Ip): Ip {
        const wildcardMaskBin = mask
            .getBinValue()
            .split('')
            .map((bit) => parseInt(bit) ^ 1)
            .join('')

        const wildcardMaskDecimal = wildcardMaskBin
            .match(/.{1,8}/g)!
            .map((octet) => parseInt(octet, 2))
            .join('.')

        return new Ip(wildcardMaskDecimal)
    }

    private _resolveIp(anyIp: Ip): Ip {
        const networkIpBin = anyIp
            .getBinValue()
            .split('')
            .map((bit, index) => parseInt(bit) & parseInt(this.mask.getBinValue()[index]))
            .join('')

        const networkIpDecimal = networkIpBin
            .match(/.{1,8}/g)!
            .map((octet) => parseInt(octet, 2))
            .join('.')

        return new Ip(networkIpDecimal)
    }

    private _resolveFirstHostIp(networkIp: Ip): Ip {
        const firstHostIp = networkIp.getArrValue().slice()

        firstHostIp[3]++

        return new Ip(firstHostIp.join('.'))
    }

    private _resolveBroadcastIp(networkIp: Ip): Ip {
        const broadcastIpBin = networkIp
            .getBinValue()
            .split('')
            .map((bit, index) => parseInt(bit) | parseInt(this.wildcardMask.getBinValue()[index]))
            .join('')

        const broadcastIpDecimal = broadcastIpBin
            .match(/.{1,8}/g)!
            .map((octet) => parseInt(octet, 2))
            .join('.')

        return new Ip(broadcastIpDecimal)
    }

    private _resolveLastHostIp(broadcastIp: Ip): Ip {
        const lastHostIp = broadcastIp.getArrValue().slice()

        lastHostIp[3]--

        return new Ip(lastHostIp.join('.'))
    }

    getMask(): Ip {
        return this.mask
    }

    getPrefix(): number {
        return this.prefix
    }

    getSize(): number {
        return this.size
    }

    getWildcardMask(): Ip {
        return this.wildcardMask
    }

    getNetworkIp(): Ip {
        return this.networkIp
    }

    getFirstHostIp(): Ip {
        return this.firstHostIp
    }

    getLastHostIp(): Ip {
        return this.lastHostIp
    }

    getBroadcastIp(): Ip {
        return this.broadcastIp
    }
}
