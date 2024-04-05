let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const LINE = parseInt(input.shift())
const lines = input.map(v => v.split(' ').map(Number));
lines.sort((a, b) => a[0] - b[0]);

let dp = new Array(LINE).fill(1);


for (let i = 1; i < dp.length; i++) {
    for (let j = 0; j < i; j++) {
        if (lines[i][1] > lines[j][1]) {
            dp[i] = Math.max(dp[i], dp[j] + 1);
        }
    }
}
console.log(LINE - Math.max(...dp));