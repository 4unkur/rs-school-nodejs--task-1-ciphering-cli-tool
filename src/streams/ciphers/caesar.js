const { AbstractCipher } = require("./abstract-cipher");

module.exports = class Caesar extends AbstractCipher {
  _shift = 1;

  constructor(options = {}) {
    super(options);

    this._initAlphabets();
  }

  _initAlphabets() {
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

    let shiftedCode;
    if (letter === letter.toLowerCase()) {
      const index = this._alphabet.findIndex((code) => code === letterCode);
      shiftedCode = this._shiftedLowercaseAlphabet[index];
    } else {
      const index = this._uppercaseAlphabet.findIndex(
        (code) => code === letterCode
      );
      shiftedCode = this._shiftedUppercaseAlphabet[index];
    }

    return String.fromCharCode(shiftedCode);
  }

  _decode(letter) {
    const letterCode = letter.charCodeAt();

    if (!this._isNonLatinCode(letterCode)) {
      return letter;
    }

    let shiftedCode;
    if (letter === letter.toLowerCase()) {
      const index = this._shiftedLowercaseAlphabet.findIndex(
        (code) => code === letterCode
      );
      shiftedCode = this._alphabet[index];
    } else {
      const index = this._shiftedUppercaseAlphabet.findIndex(
        (code) => code === letterCode
      );
      shiftedCode = this._uppercaseAlphabet[index];
    }

    return String.fromCharCode(shiftedCode);
  }

  _shiftAlphabet(alphabet) {
    const cloneAlphabet = [...alphabet];
    const shiftedPart = cloneAlphabet.splice(this._shift);

    return shiftedPart.concat(cloneAlphabet);
  }
}
