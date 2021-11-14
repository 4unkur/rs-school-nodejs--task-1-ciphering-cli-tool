import { AbstractCipher } from "./abstract-cipher.js";

export class Atbash extends AbstractCipher {
  constructor(options = {}) {
    super(options);
    this._shiftedLowercaseAlphabet = this._shiftAlphabet(null, this._alphabet);
    this._shiftedUppercaseAlphabet = this._shiftAlphabet(
      null,
      this._uppercaseAlphabet
    );
  }

  _transform(chunk, enc, cb) {
    const transformedChunk = this._encodeString(chunk.toString().trim());

    this.push(transformedChunk + "\n");

    cb();
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

  _shiftAlphabet(encode, alphabet) {
    return alphabet.slice().reverse();
  }
}

export const createStream = () => new Atbash();
