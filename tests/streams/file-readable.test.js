import FileReadable from "../../src/streams/file-readable";
import {Readable} from "stream";

describe('FileReadable test', () => {
    test('it creates Readable stream', () => {
        expect(new FileReadable('input.txt')).toBeInstanceOf(Readable)
    })

    test('it creates Readable stream with file descriptor and filename properties', () => {
        const stream = new FileReadable('input.txt');
        expect(stream._filepath).toBe('input.txt')
        expect.anything(stream._fd)
    })
})
