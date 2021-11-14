import { Transform } from 'stream';
import alphabetProvider from '../support/alphabet-provider.js';

export class AbstractCipher extends Transform {
    constructor(options) {
        super(options)
    }

    _construct(cb) {
        this._alphabet = alphabetProvider
        cb()
    }
}
