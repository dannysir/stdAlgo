let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
input = input.map(v => v.split(' ').map(Number));
let dp = Array.from({length: N + 1}, (value, x) =>
    Array.from({length: M + 1}, (v, y) => {
        if (x === 0 || y === 0) return 0;
        return input[x - 1][y - 1];
    }));

for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < M + 1; j++) {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + dp[i][j];
    }
}
console.log(dp[N][M]);