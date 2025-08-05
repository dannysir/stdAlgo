let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const boards = input.map(v => v.split('').map(Number));

const dp = Array.from({length: N + 1}, (_, x) => Array(M + 1).fill(0));
let answer = 0;
for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
        dp[i][j] = boards[i - 1][j - 1];
        if (dp[i][j] === 0) continue;

        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
        answer = Math.max(answer, dp[i][j]);
    }
}

console.log(answer**2);