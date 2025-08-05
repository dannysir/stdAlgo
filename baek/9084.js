// 2차원 배열 사용 풀이식
let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
input = input.map(v => v.split(' ').map(Number));
const [TC] = input.shift();

const solution = (N, Goal, coins) => {
    const dp = Array.from({length: N + 1}, _ => Array(Goal + 1).fill(0));
    dp[0][0] = 1;

    for (let i = 1; i <= N; i++) {
        for (let j = 0; j <= Goal; j++) {
            dp[i][j] = dp[i - 1][j];
            if (j - coins[i - 1] >= 0) {
                dp[i][j] += dp[i][j - coins[i - 1]];
            }else break;
        }
    }
    return dp[N][Goal];
};

const answer = [];

for (let i = 0; i < TC; i++) {
    const [N] = input.shift();
    const coins = input.shift();
    const [goal] = input.shift();

    answer.push(solution(N, goal, coins));
}

console.log(answer.join('\n'));

// 1차원 배열 풀이

// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// // let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
//
// const TEST_CASE = parseInt(input.shift());
// let idx = 0;
// let answer = [];
// for (let i = 0; i < TEST_CASE; i++) {
//
//     const C = parseInt(input[idx++]);
//     const COINS = input[idx++].split(' ').map(Number);
//     const GOAL = parseInt(input[idx++]);
//
//
//     let dp = Array.from({length: GOAL + 1}, _ => 0);
//     dp[0] = 1;
//
//     for (let i = 0; i < COINS.length; i++) {
//         for (let j = 0; j < dp.length; j++) {
//             if (COINS[i] <= j) {
//                 dp[j] += dp[j - COINS[i]];
//             }
//         }
//     }
//     answer.push(dp[GOAL]);
// }
//
// console.log(answer.join("\n"));