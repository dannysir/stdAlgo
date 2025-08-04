let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();
const dp = Array.from({length: N + 1}, _ => Infinity);
const history = Array.from({length: N + 1}, (_, index) => index);

dp[N] = 0;

for (let i = N; i >= 1; i--) {
    const cnt = dp[i];
    if (i % 3 === 0) {
        if (dp[i / 3] > cnt + 1) {
            dp[i / 3] = cnt + 1
            history[i / 3] = i;
        }
    }

    if (i % 2 === 0) {
        if (dp[i / 2] > cnt + 1) {
            dp[i / 2] = cnt + 1
            history[i / 2] = i;
        }
    }

    if (i - 1 >= 1) {
        if (dp[i - 1] > cnt + 1) {
            dp[i - 1] = cnt + 1;
            history[i - 1] = i;
        }
    }
}
let idx = 1;
const answer = [];
while (true) {
    answer.push(idx);
    if (idx === N) break;
    idx = history[idx];
}
console.log(`${dp[1]}\n${answer.reverse().join(' ')}`);