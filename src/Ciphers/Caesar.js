import { AbstractCipher } from "./abstract-cipher.js";

export default class Caesar extends AbstractCipher {
    constructor(options = {}) {
        super(options);
    }

    _transform(chunk, enc, cb) {
        const transformedChunk = this._encodeString(chunk.toString().trim());

        this.push(transformedChunk + "\n");

        cb();
    }
}
