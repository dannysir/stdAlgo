let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number);

const memories = input[0].split(' ').map(Number);
const costs = input[1].split(' ').map(Number);

const dp = Array(M + 1).fill(Number.MAX_SAFE_INTEGER);
dp[0] = 0;
for (let i = 0; i < N; i++) {
    const memory = memories[i];
    const cost = costs[i];
    for (let j = M; j >= memory; j--) {
        dp[j] = Math.min(dp[j], dp[j - memory] + cost);
    }
}
console.log(dp[M]);