const Caesar = require("./caesar");

module.exports = class ROT extends Caesar {
  constructor(options = {}) {
    super(options);

    this._shift = 8

    this._initAlphabets();
  }
}
