let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split('\n');

// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let [N, K] = input.shift().split(' ').map(Number);
const STUFFS = input.map(v => v.split(' ').map(Number));
// 2차원 DP 사용
// let dp = Array.from({length : N + 1}, () => Array.from({length : K + 1}, _ => 0));
// for (let i = 1; i < STUFFS.length + 1; i++) {
//
//     const [MASS, HAPPY] = STUFFS[i - 1];
//     for (let j = 1; j < K + 1; j++) {
//         if (j - MASS >= 0) {
//
//             dp[i][j] = Math.max(dp[i - 1][j - MASS] + HAPPY, dp[i - 1][j]);
//         } else {
//             dp[i][j] = dp[i - 1][j];
//         }
//     }
// }
// console.log(dp[N][K]);

let dp = new Array(K + 1).fill(0);

for (const [WEIGHT, VALUE] of STUFFS) {

    for (let i = K; i >= WEIGHT ; i--) {
        dp[i] = dp[i - WEIGHT] + VALUE > dp[i] ? dp[i - WEIGHT] + VALUE : dp[i];
    }
}
console.log(dp[K]);