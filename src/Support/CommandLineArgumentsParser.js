export default class CommandLineArgumentsParser {
    constructor(argv) {
        this._argv = argv;
    }

    getConfig() {
        let index = this._argv.findIndex(arg => arg === '--config');

        if (index === -1) {
            index = this._argv.findIndex(arg => arg === '-c');
        }

        const configIndex = index + 1;

        return this._argv[configIndex];
    }
};