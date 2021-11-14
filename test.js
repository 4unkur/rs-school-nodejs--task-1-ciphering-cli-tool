import { pipeline } from 'stream'

const readable = process.stdin
const writable = process.stdout

let data = '';
readable.on('data', function(buf) { data += buf.toString(); });
readable.on('end', function() {
    console.log('end')
    // readable.push(data.split('').reverse().join(''))
});

pipeline(
    readable,
    writable,
    err => console.log(err)
)