let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());

let dp = new Array(N + 1);
for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(10).fill(1);
}

for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < 10; j++) {
        dp[i][j] = (dp[i][j - 1] + dp[i - 1][j]) % 10007;
    }
}
console.log(dp[N][9]);