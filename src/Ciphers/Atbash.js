import { Transform } from 'stream';

export class Atbash extends Transform {
    constructor(options = {}) {
        super(options);
    }

    _transform(chunk, enc, cb) {
        const transformedChunk = this._encodeString(chunk.toString().trim());

        this.push(transformedChunk + "\n");

        cb();
    }

    _encodeString(string) {
        let encodedString = '';
        for (const char of string) {
            encodedString += this._encode(char)
        }

        return encodedString;
    }

    _encode(letter) {
        const letterCode = letter.charCodeAt();
        const lowercaseAlphabet = [];
        const uppercaseAlphabet = [];
        for (let i = 'A'.charCodeAt(); i <= 'Z'.charCodeAt(); i++) {
            uppercaseAlphabet.push(i);
        }
        for (let i = 'a'.charCodeAt(); i <= 'z'.charCodeAt(); i++) {
            lowercaseAlphabet.push(i);
        }
        const reversedLowercaseAlphabet = lowercaseAlphabet.slice().reverse();
        const reversedUppercaseAlphabet = uppercaseAlphabet.slice().reverse();

        let encodedCode;
        if (letter === letter.toLowerCase()) {
            const index = lowercaseAlphabet.findIndex(code => code === letterCode);

            encodedCode = reversedLowercaseAlphabet[index];
        } else {
            const index = uppercaseAlphabet.findIndex(code => code === letterCode);

            encodedCode = reversedUppercaseAlphabet[index];
        }

        return String.fromCharCode(encodedCode);
    }
};

export const createStream = () => new Atbash();