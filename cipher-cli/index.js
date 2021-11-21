const CommandLineArgumentsParser = require("../src/support/command-line-arguments-parser")
const Validator = require("../src/support/validator");
const StreamFactory = require("../src/factories/streams-factory");
const { pipeline } = require("stream");

const factory = new StreamFactory();
const validator = new Validator();
const parser = new CommandLineArgumentsParser(process.argv);

const { config, input, output } = parser.get();

try {
  validator.validateArgs(process.argv.splice(2));
  const ciphers = factory.createCiphers(
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
