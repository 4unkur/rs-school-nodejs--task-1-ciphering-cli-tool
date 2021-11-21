const FileWritable = require("../../src/streams/file-writable");
const { Writable } = require("stream");

describe('FileWritable test', () => {
  test('it creates Writable stream', () => {
    expect(new FileWritable('output.txt')).toBeInstanceOf(Writable);
  });

  test('it creates Writable stream with file descriptor and filename properties', () => {
    const stream = new FileWritable('output.txt');
    expect(stream._filepath).toBe('output.txt');
    expect.anything(stream._fd);
  });
});