import {pipeline } from 'stream';
import Caesar from './src/ciphers/caesar.js';

const cipher = new Caesar({encode: 1})

pipeline(
    process.stdin,
    cipher,
    process.stdout,
    err => console.log(err)
);