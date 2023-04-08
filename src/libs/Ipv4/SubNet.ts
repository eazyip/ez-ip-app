import Ip from './Ip'

export default class SubNet {
    networkIp: Ip
    mask: Ip

    constructor(anyIp: Ip | string, mask: Ip | string) {
        anyIp = anyIp instanceof Ip ? anyIp : new Ip(anyIp)

        this.mask = mask instanceof Ip ? mask : new Ip(mask)
        this.networkIp = new Ip(this._resolveIp(anyIp).networkIpDecimal)
    }

    private _resolveIp(anyIp: Ip): { networkIpBin: string; networkIpDecimal: string } {
        const networkIpBin = anyIp
            .getBinValue()
            .split('')
            .map((bit, index) => parseInt(bit) & parseInt(this.mask.getBinValue()[index]))
            .join('')

        const networkIpDecimal = networkIpBin
            .match(/.{1,8}/g)!
            .map((octet) => parseInt(octet, 2))
            .join('.')

        return { networkIpBin, networkIpDecimal }
    }

    getNetworkIp(): Ip {
        return this.networkIp
    }
}
