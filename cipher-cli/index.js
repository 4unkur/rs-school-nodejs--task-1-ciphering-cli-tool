import CommandLineArgumentsParser from "../src/support/command-line-arguments-parser.js";
import Validator from "../src/support/validator.js";
import factory from "../src/factories/streams-factory.js";
import { pipeline } from "stream";

const validator = new Validator();
const parser = new CommandLineArgumentsParser(process.argv);

const { config, input, output } = parser.get();

(async () => {
  try {
    validator.validateArgs(process.argv);
    const ciphers = await factory.createCiphers(
      validator.validateConfig(config)
    );

    pipeline(process.stdin, ...ciphers, process.stdout, (err) =>
      console.log(err)
    );
  } catch (error) {
    if (error.custom) {
      process.stderr.write(error.message + "\n");
      process.exit(1);
    } else {
      throw error;
    }
  }
})();

// const readable = validator.validateReadable(input, factory.createReadable);

// const writable = validator.validateWritable(output, factory.createWritable);
