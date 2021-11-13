export default new class ConfigExtractor {
    extract(configString) {
        const chunks = configString.split('-');

        chunks.forEach(chunk => this.initCipher(chunk))
    }

    async initCipher(config) {
        const cipher = this.guessCypher(config[0])
        const cipherPath = `../Ciphers/${cipher}.js`;

        let mod = await import(cipherPath);
        console.log(mod)
    }

    guessCypher(config) {
        switch (config) {
            case 'C':
                return 'Caesar';
            case 'A':
                return 'Atbash';
            case 'R':
                return 'ROT';
            default:
                throw new Error("Invalid cipher type passed")
        }
    }
}