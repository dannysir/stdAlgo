let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let [N, K] = input[0].split(' ').map(Number);

let dp = new Array(K);
for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(N + 1).fill(1);
}

for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[0].length; j++) {
        for (let k = 1; k <= j; k++) {
            dp[i][j] = (dp[i - 1][k] + dp[i][k - 1]) % 1000000000;
        }
    }
}
console.log(dp[K - 1][N]);
