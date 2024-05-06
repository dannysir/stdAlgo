let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
const STAIRS = input.map(v => parseInt(v));

let dp = [...STAIRS];
dp[1] = Math.max(STAIRS[1] + STAIRS[0], dp[1]);
dp[2] = Math.max(STAIRS[0] + STAIRS[2], STAIRS[1] + STAIRS[2]);
for (let i = 3; i < dp.length; i++) {
    dp[i] = Math.max(dp[i - 2] + STAIRS[i], dp[i - 3] + STAIRS[i - 1]+ STAIRS[i])
}
console.log(dp[N - 1]);