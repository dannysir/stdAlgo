let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let dp = new Array(N + 1).fill(-1);

dp[1] = 1;
dp[2] = 1;

for (let i = 3; i <= N; i++) {
    dp[i] = BigInt(dp[i - 1]) + BigInt(dp[i - 2]);
}
console.log(String(dp[N]));