import InvalidArgumentError from "../Errors/InvalidArgumentError.js";

export default class ConfigValidator {
    constructor(extractor) {
        this._extractor = extractor;
    }

    validate(configString) {
        if (!configString) {
            throw new InvalidArgumentError('Config cannot be empty');
        }

        try {
            return this._extractor.extract(configString);
        } catch (error) {
            throw new InvalidArgumentError('Incorrect config syntax');
        }
    }
};