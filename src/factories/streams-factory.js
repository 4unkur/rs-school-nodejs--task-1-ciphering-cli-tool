export default new (class StreamFactory {
  createCiphers(ciphers) {
    const promises = ciphers.map((item) =>
      import(`../ciphers/${item.cipher}.js`).then((module) =>
        module.createStream(item.direction)
      )
    );

    return Promise.all(promises);
  }
})();
