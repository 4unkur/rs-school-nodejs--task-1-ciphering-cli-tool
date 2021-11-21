import CommandLineArgumentsParser from "../src/support/command-line-arguments-parser.js";
import Validator from "../src/support/validator.js";
import factory from "../src/factories/streams-factory.js";
import { pipeline } from "stream";

const validator = new Validator();
const parser = new CommandLineArgumentsParser(process.argv);

const { config, input, output } = parser.get();

(async () => {
  try {
    validator.validateArgs(process.argv.splice(2));
    const ciphers = await factory.createCiphers(
      validator.validateConfig(config)
    );

    const readable = factory.createReadable(validator.validateReadable(input));
    const writable = factory.createWritable(validator.validateWritable(output));

    pipeline(readable, ...ciphers, writable, (err) => console.log(err));
  } catch (error) {
    if (error.custom) {
      process.stderr.write(error.message + "\n");
      process.exit(1);
    } else {
      throw error;
    }
  }
})();
