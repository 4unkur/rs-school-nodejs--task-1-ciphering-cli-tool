import { Writable } from "stream";
import fs from "fs";

export default class FileWritable extends Writable {
  constructor(filepath) {
    super();

    this._filepath = filepath;
    this._fd = null;
  }

  _construct(cb) {
    fs.open(this._filepath, "a", (err, fd) => {
      if (err) {
        cb(err);
      } else {
        this.fd = fd;
        cb();
      }
    });
  }

  _write(chunk, enc, cb) {
    fs.write(this.fd, chunk, cb);
  }

  _destroy(error, cb) {
    if (this._fd) {
      fs.close(this._fd, (err) => cb(err || error));
    } else {
      cb(error);
    }
  }
}
