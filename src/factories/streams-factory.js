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

  createReadable(path) {
    if (path === null) {
      const readable = process.stdin;
      readable.on('data', () => {

      })

      return readable;
    }

    return new FileReadable(path);
  }
})();
