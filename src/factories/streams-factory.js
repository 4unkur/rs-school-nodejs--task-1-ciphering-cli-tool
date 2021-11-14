import FileReadable from "../streams/file-readable.js";

export default new (class StreamFactory {
  createCiphers(ciphers) {
    const promises = ciphers.map((item) =>
      import(`../streams/ciphers/${item.cipher}.js`).then((module) =>
        module.createStream(item.direction)
      )
    );

    return Promise.all(promises);
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
    
  }
})();
