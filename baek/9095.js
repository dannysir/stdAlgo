let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const TestCase = parseInt(input.shift());
const NumArr = input.map(Number);
let dp = new Array(12).fill(1);
dp[1] = 1;
dp[2] = 2;
dp[3] = 4;

for (let i = 4; i < dp.length; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
}
let answer = [];
for (const number of NumArr) {
    answer.push(dp[number]);
}
console.log(answer.join('\n'));