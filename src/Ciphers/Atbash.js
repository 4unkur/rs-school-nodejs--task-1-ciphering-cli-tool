import { AbstractCipher } from "./abstract-cipher.js";

export class Atbash extends AbstractCipher {
  constructor(options = {}) {
    super(options);
    this._shiftedLowercaseAlphabet = this._shiftAlphabet(this._alphabet);
    this._shiftedUppercaseAlphabet = this._shiftAlphabet(
      this._uppercaseAlphabet
    );
  }

  _encode(letter) {
    const letterCode = letter.charCodeAt();

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

export const createStream = () => new Atbash();
