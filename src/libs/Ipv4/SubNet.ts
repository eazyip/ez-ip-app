import Ip from './Ip'

export default class SubNet {
    networkIp: Ip
    mask: Ip
    firstHostIp: Ip
    broadcastIp: Ip

    constructor(anyIp: Ip | string, mask: Ip | string) {
        anyIp = anyIp instanceof Ip ? anyIp : new Ip(anyIp)

        this.mask = mask instanceof Ip ? mask : new Ip(mask)
        this.networkIp = this._resolveIp(anyIp)
        this.firstHostIp = this._resolveFirstHostIp(this.networkIp)
        this.broadcastIp = this._resolveBroadcastIp(this.networkIp)
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
            .map(
                (bit, index) =>
                    parseInt(bit) | parseInt(this._getWildcardMask().getBinValue()[index])
            )
            .join('')

        const broadcastIpDecimal = broadcastIpBin
            .match(/.{1,8}/g)!
            .map((octet) => parseInt(octet, 2))
            .join('.')

        return new Ip(broadcastIpDecimal)
    }

    private _getWildcardMask(): Ip {
        const wildcardMaskBin = this.mask
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

    getNetworkIp(): Ip {
        return this.networkIp
    }

    getFirstHostIp(): Ip {
        return this.firstHostIp
    }

    getBroadcastIp(): Ip {
        return this.broadcastIp
    }
}
