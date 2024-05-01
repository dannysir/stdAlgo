let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let dp = new Array(10001).fill(-1);
dp[1] = 1;
dp[2] = 2;
for (let i = 3; i < dp.length; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
}
console.log(dp[N]);