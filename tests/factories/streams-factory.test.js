import streamsFactory from '../../src/factories/streams-factory.js'
import Caesar from "../../src/streams/ciphers/caesar";
import Atbash from "../../src/streams/ciphers/atbash";
import ROT from "../../src/streams/ciphers/rot";
import FileReadable from "../../src/streams/file-readable";
import FileWritable from "../../src/streams/file-writable";

describe('streams factory: create ciphers test', () => {
    const ciphers = [
        ["caesar", Caesar],
        ["rot", ROT],
    ];

    test.each(ciphers)("it creates encoding %j cipher", async (cipherName, cipherClass) => {
        const result = await streamsFactory.createCiphers([{"cipher": cipherName, "direction": 1}])
        expect(result[0]).toBeInstanceOf(cipherClass)
        expect(result[0]._encodeFlag).toBeTruthy()
    })

    test.each(ciphers)("it creates decoding %j cipher", async (cipherName, cipherClass) => {
        const result = await streamsFactory.createCiphers([{"cipher": cipherName, "direction": 0}])
        expect(result[0]).toBeInstanceOf(cipherClass)
        expect(result[0]._encodeFlag).toBeFalsy()
    })

    test('it creates atbash cipher', async () => {
        const result = await streamsFactory.createCiphers([{"cipher": "atbash"}])
        expect(result[0]).toBeInstanceOf(Atbash)
    })
});

describe('streams factory: create readable test', () => {
    test('it creates stdin stream if input file is not given', async () => {
        const result = await streamsFactory.createReadable(null)
        expect(result).toBe(process.stdin)
    })

    test('it creates readable stream if input file is given', async () => {
        const result = await streamsFactory.createReadable('input.txt')
        expect(result).toBeInstanceOf(FileReadable)
    })
})


describe('streams factory: create writable test', () => {
    test('it creates stdout stream if output file is not given', async () => {
        const result = await streamsFactory.createWritable(null)
        expect(result).toBe(process.stdout)
    })

    test('it creates writable stream if output file is given', async () => {
        const result = await streamsFactory.createWritable('output.txt')
        expect(result).toBeInstanceOf(FileWritable)
    })
})