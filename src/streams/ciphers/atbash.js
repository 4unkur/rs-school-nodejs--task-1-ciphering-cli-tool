const { AbstractCipher } = require("./abstract-cipher");

module.exports = Atbash = class Atbash extends AbstractCipher {
  constructor(options = {}) {
    super(options);

    this._shiftedLowercaseAlphabet = this._shiftAlphabet(this._alphabet);
    this._shiftedUppercaseAlphabet = this._shiftAlphabet(
      this._uppercaseAlphabet
    );
  }

  _encode(letter) {
    const letterCode = letter.charCodeAt();

    if (!this._isNonLatinCode(letterCode)) {
      return letter;
    }

    let encodedCode;
    if (letter === letter.toLowerCase()) {
      const index = this._alphabet.findIndex((code) => code === letterCode);

      encodedCode = this._shiftedLowercaseAlphabet[index];
    } else {
      const index = this._uppercaseAlphabet.findIndex(
        (code) => code === letterCode
      );

      encodedCode = this._shiftedUppercaseAlphabet[index];
    }

    return String.fromCharCode(encodedCode);
  }

  _shiftAlphabet(alphabet) {
    return alphabet.slice().reverse();
  }
}
