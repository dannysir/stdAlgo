let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

let N = parseInt(input.shift());
const Test = input.map(v => parseInt(v));

let dp = new Array(101).fill(0);
dp[1] = 1;
dp[2] = 1;
dp[3] = 1;
dp[4] = 2;
for (let i = 5; i < dp.length; i++) {
    dp[i] = dp[i -1] + dp[i - 5]
}
let answer = [];
Test.forEach(v => {
    answer.push(dp[v]);
});
console.log(answer.join('\n'));