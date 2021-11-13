import AbstractCustomError from "./abstract-custom-error.js";

export default class InvalidConfigSyntaxError extends AbstractCustomError {
    constructor(message) {
        super(message);
        this.name = 'InvalidConfigSyntaxError';
    }
};