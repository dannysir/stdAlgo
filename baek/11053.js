let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let N = parseInt(input.shift());
let NumArr = input.shift().split(' ').map(Number);

let dp = new Array(N).fill(1);

for (let i = 1; i < dp.length; i++) {
    for (let j = 0; j < i; j++) {
        if (NumArr[i] > NumArr[j]) {
            dp[i] = Math.max(dp[i], dp[j] + 1);
        }
    }
}
console.log(Math.max(...dp));