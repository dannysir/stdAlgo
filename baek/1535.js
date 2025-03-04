let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = Number(input.shift());
const weights = input.shift().split(' ').map(Number);
const values = input.shift().split(' ').map(Number);
const dp = Array(101).fill(0);

for (let i = 0; i < N; i++) {
    const weight = weights[i];
    const value = values[i];

    for (let j = dp.length - 1; j >= weight; j--) {
        dp[j] = Math.max(dp[j], dp[j - weight] + value);
    }
}
console.log(dp[99]);