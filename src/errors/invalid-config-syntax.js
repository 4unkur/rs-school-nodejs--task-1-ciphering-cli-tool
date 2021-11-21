const AbstractCustomError = require("./abstract-custom-error");

module.exports = class InvalidConfigSyntaxError extends AbstractCustomError {
    constructor(message) {
        super(message);
        this.name = 'InvalidConfigSyntaxError';
    }
};