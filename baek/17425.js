let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const T = Number(input.shift());

const testCases = input.map(Number);
const MAX = 1_000_000;

const arr = Array(MAX + 1).fill(1);
arr[0] = 0;

for (let i = 2; i <= MAX; i++) {
    for (let j = 1; j * i <= MAX; j++) {
        arr[i * j] += i;
    }
}
const result = Array(MAX + 1);
result[0] = 0;

for (let i = 1; i < arr.length; i++) {
    result[i] = result[i - 1] + arr[i];
}

const answer = testCases.map(v => {
    return result[v];
});

console.log(answer.join('\n'));