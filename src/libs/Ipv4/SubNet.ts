import Ip from './Ip'

export default class SubNet {
    networkIp: Ip
    mask: Ip
    firstHostIp: Ip

    constructor(anyIp: Ip | string, mask: Ip | string) {
        anyIp = anyIp instanceof Ip ? anyIp : new Ip(anyIp)

        this.mask = mask instanceof Ip ? mask : new Ip(mask)
        this.networkIp = this._resolveIp(anyIp)
        this.firstHostIp = this._resolveFirstHostIp(this.networkIp)
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

    getNetworkIp(): Ip {
        return this.networkIp
    }

    getFirstHostIp(): Ip {
        return this.firstHostIp
    }
}
