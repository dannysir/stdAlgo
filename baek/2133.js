let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const WIDTH = parseInt(input.shift())

let dp = new Array(WIDTH + 1).fill(0);

dp[0] = 1;
dp[2] = 3;
for (let i = 4; i < dp.length; i++) {
    if (i % 2 === 0) {
        dp[i] = dp[i - 2] * dp[2];
        for (let j = 4; j <= i; j += 2) {
            dp[i] += dp[i - j] * 2;
        }
    }
}
console.log(dp[WIDTH]);