const FileReadable = require("../streams/file-readable");
const FileWritable = require("../streams/file-writable");

module.exports = class StreamFactory {
  createCiphers(ciphers) {
    return ciphers.map(item => {
        const module = require(`../streams/ciphers/${item.cipher}`);

        return new module({ encode: item.direction });
      }
    );
  }

  createReadable(input) {
    if (!input) {
      return process.stdin;
    }

    return new FileReadable(input);
  }

  createWritable(output) {
    if (!output) {
      return process.stdout;
    }

    return new FileWritable(output);
  }
};