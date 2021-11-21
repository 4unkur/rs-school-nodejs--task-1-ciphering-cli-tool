const AlphabetProvider = require("../../src/support/alphabet-provider");

const alphabetProvider = new AlphabetProvider();

describe('alphabet provider test', () => {
  const alphabetLowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const alphabetUppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  test('it provides correct lowercase alphabet array', () => {
    expect(alphabetProvider.getLowerCase())
      .toEqual(alphabetLowercase.map(letter => letter.charCodeAt()));
  });

  test('it provides correct uppercase alphabet array', () => {
    expect(alphabetProvider.getUpperCase())
      .toEqual(alphabetUppercase.map(letter => letter.charCodeAt()));
  });
});
