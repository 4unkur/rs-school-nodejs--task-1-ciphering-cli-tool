import { Transform } from "stream";
import alphabetProvider from "../support/alphabet-provider.js";

export class AbstractCipher extends Transform {
  _shiftedLowercaseAlphabet;

  constructor(options) {
    super(options);
    this._alphabet = alphabetProvider.getLowerCase();
    this._uppercaseAlphabet = alphabetProvider.getUpperCase();
  }

  _transform(chunk, enc, cb) {
    const transformedChunk = this._encodeString(chunk.toString().trim());

    this.push(transformedChunk + "\n");

    cb();
  }

  _encodeString(string) {
    let encodedString = "";
    for (const char of string) {
      encodedString += this._encode(char);
    }

    return encodedString;
  }

  _encode(char) {
    throw Error("Implement _encode method");
  }

  _shiftAlphabet(encode, alphabet) {
    throw Error("Implement _shiftAlphabet method");
  }
}
