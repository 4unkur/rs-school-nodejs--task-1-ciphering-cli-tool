import Atbash from "../../../src/streams/ciphers/atbash";

const atbash = new Atbash();

describe('Atbash test', () => {
    const data = [
        ['a', 'z'],
        ['b', 'y'],
        ['z', 'a'],
        ['A', 'Z'],
        ['B', 'Y'],
        ['Z', 'A']
    ];

    test.each(data)('it encodes a letter %j to %j', (letter, encrypted) => {
        expect(atbash._encode(letter)).toBe(encrypted)
    })

    test('it shifts alphabet', () => {
        expect(atbash._shiftAlphabet([1, 2, 3])).toEqual([3, 2, 1])
    })

    const nonLatinSymbols = ['1', '2', '3', 'а', 'б', 'я', ',', '.', '#', '$'];

    test.each(nonLatinSymbols)('it does not encrypt symbol %j', (symbol) => {
        expect(atbash._encode(symbol)).toBe(symbol)
    })
})