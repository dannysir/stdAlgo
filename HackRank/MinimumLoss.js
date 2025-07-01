'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'minimumLoss' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts LONG_INTEGER_ARRAY price as parameter.
 */

function minimumLoss(price) {
    // Write your code here
    price = price.map((value, index) => [value, index]);
    price.sort((a, b) => b[0] - a[0]);
    let min = Infinity;
    for (let i = 0; i < price.length - 1; i++) {
        const [nowPrice, nowIndex] = price[i];
        const [nextPrice, nextIndex] = price[i + 1];
        if (nowIndex < nextIndex) {
            min = Math.min(nowPrice - nextPrice, min);
        }
    }
    return min;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const price = readLine().replace(/\s+$/g, '').split(' ').map(priceTemp => parseInt(priceTemp, 10));

    const result = minimumLoss(price);

    ws.write(result + '\n');

    ws.end();
}
