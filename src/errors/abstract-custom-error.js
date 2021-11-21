module.exports = class AbstractCustomError extends Error {
    constructor(message) {
        super(message);
        this.custom = true;
        this.name = 'AbstractCustomError';
    }
}