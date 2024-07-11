let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = parseInt(input[0]);

let dp = Array.from({length: N + 1}, _ => 0);
dp[0] = 0;
dp[1] = 3;
dp[2] = 7;
for (let i = 3; i < N + 1; i++) {
    dp[i] = (dp[i - 1] * 2 + dp[i - 2]) % 9901;
}
console.log(dp[N]);