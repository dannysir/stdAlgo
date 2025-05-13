let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
input = input.map(Number);

input.sort((a, b) => a - b);

let minGap = 1;
let maxGap = input[input.length - 1] - input[0];

while (minGap <= maxGap) {
    const midGap = Math.floor((minGap + maxGap) / 2);
    let cnt = 1;
    let prev = input[0];
    for (const inputNum of input) {
        if (inputNum - prev < midGap) continue;

        prev = inputNum;
        cnt++;
    }

    if (cnt >= M) {
        minGap = midGap + 1;
    } else {
        maxGap = midGap - 1;
    }
}

console.log(maxGap);