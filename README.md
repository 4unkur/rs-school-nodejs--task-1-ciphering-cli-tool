RS School Node JS: Task 1 Ciphering CLI Tool
===

Installation
---
Just clone the repo, navigate to the folder (`cd rs-school-nodejs--task-1-ciphering-cli-tool`)

Options
---
CLI tool accepts 3 options (short alias and full name):

1.  `-c`, `--config`: config for ciphers
Config is a string with pattern `{XY(-)}n`, where:
  * `X` is a cipher mark:
    * `C` is for Caesar cipher (with shift 1)
    * `A` is for Atbash cipher
    * `R` is for ROT-8 cipher
  * `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
    * `1` is for encoding
    * `0` is for decoding
2.  (optional) `-i`, `--input`: a path to input file. If omited terminal prompt will be used
3.  (optional) `-o`, `--output`: a path to output file. If omited output will be printed to the terminal

For example, config `C1-C1-R0-A` means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"

Usage
---

```sh
node cipher-cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`

```sh
node cipher-cli -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`

```sh
node cipher-cli -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`

```sh
node cipher-cli -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `This is secret. Message about "_" symbol!`

Testing
---
```sh
npm install # to install jest and dependencies

npm run test # to run the tests

npm run test:coverage # to run the test with coverage
```
