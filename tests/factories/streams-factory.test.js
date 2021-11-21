const StreamFactory = require("../../src/factories/streams-factory");
const Caesar = require("../../src/streams/ciphers/caesar");
const Atbash = require("../../src/streams/ciphers/atbash");
const ROT = require("../../src/streams/ciphers/rot");
const FileReadable = require("../../src/streams/file-readable");
const FileWritable = require("../../src/streams/file-writable");

const streamsFactory = new StreamFactory();

describe('streams factory: create ciphers test', () => {
  const ciphers = [
    ["caesar", Caesar],
    ["rot", ROT],
  ];

  test.each(ciphers)("it creates encoding %j cipher", (cipherName, cipherClass) => {
    const result = streamsFactory.createCiphers([{ "cipher": cipherName, "direction": 1 }]);
    expect(result[0]).toBeInstanceOf(cipherClass);
    expect(result[0]._encodeFlag).toBeTruthy();
  });

  test.each(ciphers)("it creates decoding %j cipher", (cipherName, cipherClass) => {
    const result = streamsFactory.createCiphers([{ "cipher": cipherName, "direction": 0 }]);
    expect(result[0]).toBeInstanceOf(cipherClass);
    expect(result[0]._encodeFlag).toBeFalsy();
  });

  test('it creates atbash cipher', () => {
    const result = streamsFactory.createCiphers([{ "cipher": "atbash" }]);
    expect(result[0]).toBeInstanceOf(Atbash);
  });
});

describe('streams factory: create readable test', () => {
  test('it creates stdin stream if input file is not given', () => {
    const result = streamsFactory.createReadable(null);
    expect(result).toBe(process.stdin);
  });

  test('it creates readable stream if input file is given', () => {
    const result = streamsFactory.createReadable('input.txt');
    expect(result).toBeInstanceOf(FileReadable);
  });
});


describe('streams factory: create writable test', () => {
  test('it creates stdout stream if output file is not given', () => {
    const result = streamsFactory.createWritable(null);
    expect(result).toBe(process.stdout);
  });

  test('it creates writable stream if output file is given', () => {
    const result = streamsFactory.createWritable('output.txt');
    expect(result).toBeInstanceOf(FileWritable);
  });
});