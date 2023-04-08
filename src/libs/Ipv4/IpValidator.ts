class IpValidator {
    passes(address: string) {
        return this._isValidIPv4Address(address)
    }

    private _isValidIPv4Address(address: string): boolean {
        const octets = address.split('.')
        if (octets.length !== 4) {
            return false
        }

        for (const octet of octets) {
            if (!this._isValidIPvOctet(octet)) {
                return false
            }
        }

        return true
    }

    private _isValidIPvOctet(octet: any): boolean {
        octet = parseInt(octet, 10)

        return !isNaN(octet) && octet >= 0 && octet <= 255
    }
}

export default new IpValidator()
