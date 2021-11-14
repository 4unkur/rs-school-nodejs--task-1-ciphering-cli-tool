import Caesar from "./caesar.js";

export default class ROT extends Caesar {
  constructor(options = {}) {
    super(options);

    this._shift = 8
  }
}

export const createStream = (encode) => new ROT({ encode });
