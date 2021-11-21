export default class AlphabetProvider {
  getLowerCase() {
    const alphabet = [];
    for (let i = "a".charCodeAt(); i <= "z".charCodeAt(); i++) {
      alphabet.push(i);
    }

    return alphabet;
  }

  getUpperCase() {
    const alphabet = [];
    for (let i = "A".charCodeAt(); i <= "Z".charCodeAt(); i++) {
      alphabet.push(i);
    }

    return alphabet;
  }
};
