let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = Number(input.shift());
const difficulties = input.shift().split(' ').map(Number);
const M = Number(input.shift());
const cases = input.map(v => v.split(' ').map(Number));

// 실수 여부 배열 생성
const difArr = Array(N).fill(0);
for (let i = 0; i < N - 1; i++) {
    difArr[i] = difficulties[i] > difficulties[i + 1] ? 1 : 0;
}

// 누적합 배열 계산
const dp = Array(N + 1).fill(0);
for (let i = 0; i < N; i++) {
    dp[i + 1] = dp[i] + difArr[i];
}

const result = [];

for (let i = 0; i < cases.length; i++) {
    const [start, end] = cases[i];

    const x = start - 1;
    const y = end - 1;

    const mistakes = dp[y] - dp[x];

    result.push(mistakes);
}

console.log(result.join('\n'));