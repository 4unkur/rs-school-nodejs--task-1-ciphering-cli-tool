import InvalidArgumentError from './src/Errors/InvalidArgumentError.js';
import CommandLineArgumentsParser from './src/Support/CommandLineArgumentsParser.js';
import ConfigValidator from './src/Support/ConfigValidator.js';
import configExtractor from './src/Support/ConfigExtractor.js';

const configValidator = new ConfigValidator(configExtractor);

const cliParser = new CommandLineArgumentsParser(process.argv);

const config = cliParser.getConfig()

try {
    configValidator.validate(config)
} catch (err) {
    if (err instanceof InvalidArgumentError) {
        console.log(err.message);
        process.exit(1);
    } else {
        throw err;
    }
}

