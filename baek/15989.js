let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const M = +input.shift();

for (let i = 0; i < M; i++) {
  const N = +input.shift();
  const dp = Array.from({length: 4}, () => Array(N + 1).fill(0));

  for (let coin = 0; coin <= 3; coin++) {
    dp[coin][0] = 1;
  }

  for (let coin = 1; coin <= 3; coin++) {
    for (let j = 1; j < N + 1; j++) {
      dp[coin][j] = dp[coin - 1][j];

      if (j - coin >= 0) {
        dp[coin][j] += dp[coin][j - coin];
      }
    }
  }

  console.log(dp[3][N]);
}