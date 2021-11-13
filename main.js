import InvalidArgumentError from './src/errors/invalid-argument-error.js';
import CommandLineArgumentsParser from './src/support/command-line-arguments-parser.js';
import ConfigValidator from './src/support/ConfigValidator.js';
import configExtractor from './src/support/ConfigExtractor.js.js';
import pipeline from 'stream';

const configValidator = new ConfigValidator(configExtractor);

const cliParser = new CommandLineArgumentsParser(process.argv);

const config = cliParser.getConfig()

try {
    (async () => {
        const streams = await configValidator.validate(config)
        console.log(streams)
        pipeline(
            process.stdin,
            ...streams,
            process.stdout,
            err => console.log(err)
        );
    })
} catch (err) {
    if (err instanceof InvalidArgumentError) {
        console.log(err.message);
        process.exit(1);
    } else {
        throw err;
    }
}

