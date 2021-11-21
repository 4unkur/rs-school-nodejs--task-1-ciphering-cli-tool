import { Transform } from "stream";
import AlphabetProvider from "../../support/alphabet-provider.js";

export class AbstractCipher extends Transform {
  constructor(options = {}) {
    const encode =
      options.encode === undefined ? true : Boolean(options.encode);
    delete options.encode;

    super(options);

    const alphabetProvider = new AlphabetProvider();

    this._encodeFlag = encode;
    this._alphabet = alphabetProvider.getLowerCase();
    this._uppercaseAlphabet = alphabetProvider.getUpperCase();
  }

  _transform(chunk, enc, cb) {
    const transformedChunk = this._transformString(
      chunk.toString().trim(),
      this._encodeFlag
    );

    this.push(transformedChunk + "\n");

    cb();
  }

  _transformString(string, encode) {
    return string
      .split("")
      .map((chunk) => (encode ? this._encode(chunk) : this._decode(chunk)))
      .join("");
  }

  _encode(char) {
    throw Error("Implement _encode method");
  }

  _decode(char) {
    throw Error("Implement _decode method");
  }

  _shiftAlphabet(alphabet) {
    throw Error("Implement _shiftAlphabet method");
  }

  _isNonLatinCode(code) {
    return this._alphabet.concat(this._uppercaseAlphabet).includes(code)
  }
}
