const Validator = require("../../src/support/validator");
const InvalidArgumentError = require("../../src/errors/invalid-argument-error");
const InvalidConfigSyntaxError = require("../../src/errors/invalid-config-syntax");

describe('validator test', () => {
  const validator = new Validator();

  const duplicateArguments = [
    ['-c', '-c'],
    ['-c', '--config'],
    ['-i', '-i'],
    ['-i', '--input'],
    ['-o', '-o'],
    ['-o', '--output'],
  ];

  test.each(duplicateArguments)("it does not allow duplicate arguments %j and %j", (config1, config2) => {
    expect(() => validator.validateArgs([config1, config2]))
      .toThrowError(InvalidArgumentError);
  });

  const invalidConfigs = [
    [null, InvalidArgumentError],
    [undefined, InvalidArgumentError],
    ['', InvalidArgumentError],
    ['A1', InvalidConfigSyntaxError],
    ['C4', InvalidConfigSyntaxError],
    ['R', InvalidConfigSyntaxError],
    ['C', InvalidConfigSyntaxError],
    ['C-C1', InvalidConfigSyntaxError],
    ['C1-C1-', InvalidConfigSyntaxError],
  ];

  test.each(invalidConfigs)('it throws an error on invalid config', (config, errorClass) => {
    expect(() => validator.validateConfig(config)).toThrowError(errorClass);
  });

  const validConfigs = [
    'A-A-A',
    'C1-C1-C0',
    'R1-R0',
    'A-R1-C0-R0-C1-A',
  ];

  test.each(validConfigs)('it allows valid config', config => {
    expect.anything(validator.validateConfig(config));
  });

  test.each([undefined, 'input.txt'])('it allows empty input (stdin case) and existing file for input', (input) => {
    expect.anything(validator.validateReadable(input));
  });

  test('it throws an error if input file does not exist', () => {
    expect(() => validator.validateReadable('nonexisting.txt')).toThrowError(InvalidArgumentError);
  });

  test.each([undefined, 'output.txt'])('it allows empty output (stdout case) and existing file for output', (output) => {
    expect.anything(validator.validateWritable(output));
  });

  test('it throws an error if output file does not exist', () => {
    expect(() => validator.validateWritable('nonexisting.txt')).toThrowError(InvalidArgumentError);
  });

  const configAbbreviations = [
    ['A', 'atbash'],
    ['C', 'caesar'],
    ['R', 'rot'],
    ['anything else', null],
    [null, null]
  ];

  test.each(configAbbreviations)('it converts abbreviation to cipher name', (abbr, name) => {
    expect(validator._getCipherName(abbr)).toBe(name);
  });
});