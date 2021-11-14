import { AbstractCipher } from "./abstract-cipher.js";

export default class Caesar extends AbstractCipher {
  _shift = 1;

  constructor(options = {}) {
    const encode = new Boolean(options.encode);
    delete options.encode;
    super(options);

    if (this._shift === undefined) {
      throw new Error("Shift value is not set");
    }

    this._shiftedLowercaseAlphabet = this._shiftAlphabet(
      encode,
      this._alphabet
    );
    this._shiftedUppercaseAlphabet = this._shiftAlphabet(
      encode,
      this._uppercaseAlphabet
    );
  }

  _encode(letter) {
    const letterCode = letter.charCodeAt();

    let shiftedCode;
    if (letter === letter.toLowerCase()) {
      const index = this._alphabet.findIndex((code) => code === letterCode);
      shiftedCode = this._shiftedLowercaseAlphabet[index];
    } else {
      const index = this._uppercaseAlphabet.findIndex((code) => code === letterCode);
      shiftedCode = this._shiftedUppercaseAlphabet[index];
    }

    return String.fromCharCode(shiftedCode);
  }

  _shiftAlphabet(encode, alphabet) {
    const cloneAlphabet = [...alphabet];
    const shiftedPart = cloneAlphabet.splice((encode ? 1 : -1) * this._shift);

    return shiftedPart.concat(cloneAlphabet);
  }
}

export const createStream = (encode) => new Caesar({ encode });
