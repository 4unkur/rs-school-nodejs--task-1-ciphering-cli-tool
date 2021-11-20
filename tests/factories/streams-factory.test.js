import streamsFactory from '../../src/factories/streams-factory.js'
import Caesar from "../../src/streams/ciphers/caesar";
import Atbash from "../../src/streams/ciphers/atbash";
import ROT from "../../src/streams/ciphers/rot";

describe('streams factory test', () => {
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