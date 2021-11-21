const Caesar = require("../../../src/streams/ciphers/caesar");

const caesar = new Caesar();

describe('Caesar test', () => {
  const data = [
    ['a', 'b'],
    ['b', 'c'],
    ['z', 'a'],
    ['A', 'B'],
    ['B', 'C'],
    ['Z', 'A']
  ];

  test.each(data)('it encodes a letter %j to %j', (letter, encrypted) => {
    expect(caesar._encode(letter)).toBe(encrypted);
  });

  test.each(data)('it decodes a letter', (letter, encrypted) => {
    expect(caesar._decode(encrypted)).toBe(letter);
  });

  test('it shifts alphabet', () => {
    expect(caesar._shiftAlphabet([1, 2, 3])).toEqual([2, 3, 1]);
  });

  const nonLatinSymbols = ['1', '2', '3', 'а', 'б', 'я', ',', '.', '#', '$'];

  test.each(nonLatinSymbols)('it does not encrypt symbol %j', (symbol) => {
    expect(caesar._encode(symbol)).toBe(symbol);
    expect(caesar._decode(symbol)).toBe(symbol);
  });
});