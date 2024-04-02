let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());

let dp = new Array(N);
for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(10).fill(1);
}
dp[0][0] = 0;
for (let i = 1; i < N; i++) {
    for (let j = 0; j < 10; j++) {
        if (j === 0) {
            dp[i][j] = dp[i - 1][1] % 1000000000;
        }else if (j === 9) {
            dp[i][j] = dp[i - 1][8] % 1000000000;
        } else {
            dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % 1000000000;
        }
    }
}
console.log(dp[N - 1].reduce((acc, cur) => {
    return (acc + cur) % 1000000000
}, 0));