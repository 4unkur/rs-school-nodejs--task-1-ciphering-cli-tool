export default new (class StreamFactory {
  createCiphers(ciphers) {
    const promises = ciphers.map((item) => {
      return import(`../ciphers/${item.cipher}.js`).then((module) =>
        module.createStream()
      );
    });

    return Promise.all(promises);
  }
})();
