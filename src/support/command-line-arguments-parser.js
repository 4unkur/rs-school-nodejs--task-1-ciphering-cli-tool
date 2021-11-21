module.exports = class CommandLineArgumentsParser {
  constructor(argv) {
    this._argv = argv;
  }

  get() {
    return {
      config: this.getConfig(),
      input: this.getInput(),
      output: this.getOutput(),
    };
  }

  getConfig() {
    const index = this._getIndex("--config", "-c");

    return this._argv[index];
  }

  getInput() {
    const index = this._getIndex("--input", "-i");

    return this._argv[index];
  }

  getOutput() {
    const index = this._getIndex("--output", "-o");

    return this._argv[index];
  }

  _getIndex(flag, shortFlag) {
    let index = this._argv.findIndex((arg) => arg === flag);
    if (index !== -1) {
      return index + 1;
    }

    index = this._argv.findIndex((arg) => arg === shortFlag);

    if (index !== -1) {
      return index + 1;
    }

    return null;
  }
}
