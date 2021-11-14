import Caesar from "./Caesar.js";

export default class ROT extends Caesar {
  _shift = 8;
}

export const createStream = (encode) => new ROT({ encode });
