import InvalidArgumentError from "../errors/invalid-argument-error.js";
import InvalidConfigSyntaxError from "../errors/invalid-config-syntax.js";
import fs from "fs";
import _path from "path";

export default class Validator {
  validateArgs(args) {
    const userArgs = [...args].splice(2);

    const validArgumentPairs = [
      ["-c", "--config"],
      ["-i", "--input"],
      ["-o", "--output"],
    ];

    for (const pair of validArgumentPairs) {
      this._checkDuplicates(userArgs, pair);
    }
  }

  validateConfig(config) {
    // validate for empty
    if (!config) {
      throw new InvalidArgumentError("Config cannot be empty");
    }

    const ciphers = [];
    const chunks = config.split("-");

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      let cipher = this._getCipherName(chunk[0]);
      let direction = null;

      if (cipher === null) {
        throw new InvalidConfigSyntaxError("Invalid config " + config);
      }

      if (["caesar", "rot"].includes(cipher)) {
        if (chunk[1] === undefined) {
          throw new InvalidConfigSyntaxError(
            "Encoding/decoding flag is not passed for " + cipher
          );
        }

        direction = parseInt(chunk[1]);
        if (![0, 1].includes(direction)) {
          throw new InvalidConfigSyntaxError(
            "Incorrect values for encoding/decoding flag"
          );
        }
      } else if (chunk[1] !== undefined) {
        throw new InvalidConfigSyntaxError(
          "Encoding/decoding flag should not be passed for " + cipher
        );
      }

      ciphers.push({
        cipher,
        direction,
      });
    }

    return ciphers;
  }

  validateReadable(input) {
    if (input === undefined) {
      return null;
    }

    const path = _path.resolve("./") + "/" + input;

    if (!fs.existsSync(path)) {
      throw new InvalidArgumentError("Input file does not exist");
    }

    return path;
  }

  validateWritable(output) {
    if (output === undefined) {
      return null;
    }

    const path = _path.resolve("./") + "/" + output;

    if (!fs.existsSync(path)) {
      throw new InvalidArgumentError("Output file does not exist");
    }

    return path;
  }

  _getCipherName(config) {
    switch (config) {
      case "C":
        return "caesar";
      case "A":
        return "atbash";
      case "R":
        return "rot";
      default:
        return null;
    }
  }

  _checkDuplicates(args, pair) {
    let index = args.findIndex((arg) => arg === pair[0]);
    if (index !== -1) {
      delete args[index];
    } else {
      index = args.findIndex((arg) => arg === pair[1]);
      if (index !== -1) {
        delete args[index];
      }
    }

    for (let i = 0; i < args.length; i++) {
      if (pair.includes(args[i])) {
        throw new InvalidArgumentError("Flags cannot be duplicated");
      }
    }
  }
}
