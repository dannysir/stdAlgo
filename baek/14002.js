let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
//let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const N = parseInt(input.shift());
const Numbers = input[0].split(' ').map(Number);

let dp = Array.from({length: N}, _ => []);
for (let i = 0; i < dp.length; i++) {
    dp[i] = [Numbers[i]];
}

let max = [1, dp[0]];
for (let i = 1; i < N; i++) {
    for (let j = 0; j < i; j++) {
        if (Numbers[i] > Numbers[j]) {
            if (dp[i].length < dp[j].length + 1) {
                dp[i] = [...dp[j], Numbers[i]];
            }
        }
    }
    if (dp[i].length > max[0]) {
        max = [dp[i].length, dp[i]];
    }
}
let answer = `${max[0]}\n${max[1].join(' ')}`;
console.log(answer);