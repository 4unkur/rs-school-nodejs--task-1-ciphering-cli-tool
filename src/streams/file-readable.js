const { Readable } = require("stream");
const fs = require("fs");

module.exports = class FileReadable extends Readable {
  constructor(filepath) {
    super();

    this._filepath = filepath;
    this._fd = null;
  }

  _construct(cb) {
    fs.open(this._filepath, (err, fd) => {
      if (err) {
        cb(err);
      } else {
        this._fd = fd;
        cb();
      }
    });

    this.setEncoding("utf-8");
  }

  _read(n) {
    const buffer = Buffer.alloc(n);
    fs.read(this._fd, buffer, 0, n, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        const chunk = bytesRead > 0 ? buffer.slice(0, bytesRead) : null;
        this.push(chunk);
      }
    });
  }

  _destroy(error, cb) {
    if (this._fd) {
      fs.close(this._fd, (err) => cb(err || error));
    } else {
      cb(error);
    }
  }
}
