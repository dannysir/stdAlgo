let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
input = input[0].split(' ').map(Number);

let dp = new Array(N).fill(1);
for (let i = 0; i < dp.length; i++) {
    dp[i] = input[i];
    for (let j = 0; j < i; j++) {
        if (input[i] > input[j]) {
            dp[i] = Math.max(dp[i],dp[j] + input[i]);
        }
    }
}
console.log(Math.max(...dp));