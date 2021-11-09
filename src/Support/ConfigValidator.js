import InvalidArgumentError from "../Errors/InvalidArgumentError.js";

export default new class ConfigValidator {
    validate(config) {
        if (!config) {
            throw new InvalidArgumentError('Config cannot be empty');
        }
    }
};