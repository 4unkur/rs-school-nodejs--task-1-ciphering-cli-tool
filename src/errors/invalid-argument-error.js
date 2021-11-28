import AbstractCustomError from "./abstract-custom-error.js";

export default class InvalidArgumentError extends AbstractCustomError {
    constructor(message) {
        super(message);
        this.name = 'InvalidArgumentError';
    }
};