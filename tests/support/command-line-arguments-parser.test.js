const CommandLineArgumentsParser = require("../../src/support/command-line-arguments-parser");

describe('command line arguments parser test', () => {
  test('it gets config', () => {
    const parser = new CommandLineArgumentsParser(['-c', 'A']);
    expect(parser.getConfig()).toBe('A');
  });

  test('it gets input', () => {
    const parser = new CommandLineArgumentsParser(['-i', 'input.txt']);
    expect(parser.getInput()).toBe('input.txt');
  });

  test('it gets output', () => {
    const parser = new CommandLineArgumentsParser(['-o', 'output.txt']);
    expect(parser.getOutput()).toBe('output.txt');
  });

  test('it gets complete config', () => {
    const parser = new CommandLineArgumentsParser(['-c', 'A', '-i', 'input.txt', '-o', 'output.txt']);
    expect(parser.get()).toEqual({
      config: 'A',
      input: 'input.txt',
      output: 'output.txt'
    });
  });

  test('it gets argument index', () => {
    const parser = new CommandLineArgumentsParser(['-c', 'A']);
    expect(parser._getIndex('-c')).toBe(1);
  });

  test('it returns null if flag is not provided', () => {
    const parser = new CommandLineArgumentsParser([]);
    expect(parser._getIndex('-c')).toBeNull();
  });
});