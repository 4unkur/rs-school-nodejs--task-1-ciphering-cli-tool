import {AbstractCipher} from "../../../src/streams/ciphers/abstract-cipher";

const cipher = new AbstractCipher();

describe('Abstract cipher test', () => {
    test('it requires to implement method _encode', () => {
        expect(() => cipher._encode()).toThrowError()
    })

    test('it requires to implement method _decode', () => {
        expect(() => cipher._decode()).toThrowError()
    })

    test('it requires to implement method _shiftAlphabet', () => {
        expect(() => cipher._shiftAlphabet()).toThrowError()
    })

    test('it checks for non latin symbols', () => {
        expect(cipher._isNonLatinCode('a'.charCodeAt())).toBeTruthy()
        expect(cipher._isNonLatinCode('#'.charCodeAt())).toBeFalsy()
    })
})