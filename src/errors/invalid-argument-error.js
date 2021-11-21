const AbstractCustomError = require("./abstract-custom-error");

module.exports = class InvalidArgumentError extends AbstractCustomError {
    constructor(message) {
        super(message);
        this.name = 'InvalidArgumentError';
    }
};