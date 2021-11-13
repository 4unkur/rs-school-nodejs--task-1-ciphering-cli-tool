import InvalidArgumentError from "../errors/invalid-argument-error.js";
import InvalidConfigSyntaxError from "../errors/invalid-config-syntax.js";

export default class Validator {
  validateArgs() {}

  validateConfig(config, cb) {
    // validate for empty
    if (!config) {
      throw new InvalidArgumentError("Config cannot be empty");
    }

    config.split("-").forEach((chunk) => {
      const cipher = this.getCipherName(chunk[0]);
      let direction;

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
    });

    cb(config, direction);
  }

  getCipherName(config) {
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
}
