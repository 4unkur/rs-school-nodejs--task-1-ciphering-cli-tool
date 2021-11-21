import ROT from "../../../src/streams/ciphers/rot";

const rot = new ROT();

describe('ROT test', () => {
    const data = [
        ['a', 'i'],
        ['b', 'j'],
        ['z', 'h'],
        ['A', 'I'],
        ['B', 'J'],
        ['Z', 'H']
    ];

    test.each(data)('it encodes a letter %j to %j', (letter, encrypted) => {
        expect(rot._encode(letter)).toBe(encrypted)
    })

    test.each(data)('it decodes a letter', (letter, encrypted) => {
        expect(rot._decode(encrypted)).toBe(letter)
    })

    test('it shifts alphabet', () => {
        expect(rot._shiftAlphabet([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
            .toEqual([9, 10, 1, 2, 3, 4, 5, 6, 7, 8])
    })

    const nonLatinSymbols = ['1', '2', '3', 'а', 'б', 'я', ',', '.', '#', '$'];

    test.each(nonLatinSymbols)('it does not encrypt symbol %j', (symbol) => {
        expect(rot._encode(symbol)).toBe(symbol)
        expect(rot._decode(symbol)).toBe(symbol)
    })
})