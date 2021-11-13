export default new (class StreamFactory {
  createCiphers(ciphers) {
    return Promise.all(
      ciphers.map(async (item) => {
        return await import(`../ciphers/${item.cipher}.js`);
      })
    );
  }
})();
