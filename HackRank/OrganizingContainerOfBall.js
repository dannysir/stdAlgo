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
 * Complete the 'organizingContainers' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts 2D_INTEGER_ARRAY container as parameter.
 */

const checkPossible = (container) => {
    const n = container[0].length;
    const containerCountMap = new Map();
    const countMap = new Map();
    container.forEach((arr) => {
        let sum = 0;
        arr.forEach((value, index) => {
            sum += value;
            if (countMap.has(index)) {
                countMap.set(index, countMap.get(index) + value);
            } else countMap.set(index, value);
        });
        if (containerCountMap.has(sum)) {
            containerCountMap.set(sum, containerCountMap.get(sum) + 1);
        } else containerCountMap.set(sum, 1);
    });
    for (const [_, count] of countMap.entries()) {
        if (containerCountMap.has(count)) {
            const containerCnt = containerCountMap.get(count);
            if (containerCnt > 0) {
                containerCountMap.set(count, containerCnt - 1);
            } else return false;
        } else return false;
    }
    return true;
}

function organizingContainers(container) {
    // Write your code here
    const POSSIBLE_STRING = 'Possible';
    const IMPOSSIBLE_STRING = 'Impossible';
    if (checkPossible(container)) {
        return POSSIBLE_STRING;
    }else return IMPOSSIBLE_STRING;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine().trim(), 10);

        let container = Array(n);

        for (let i = 0; i < n; i++) {
            container[i] = readLine().replace(/\s+$/g, '').split(' ').map(containerTemp => parseInt(containerTemp, 10));
        }

        const result = organizingContainers(container);

        ws.write(result + '\n');
    }

    ws.end();
}
