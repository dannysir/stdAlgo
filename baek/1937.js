let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const N = +input.shift();

const board = input.map(v => v.split(' ').map(Number));

const dp = Array.from({length: N}, _ => Array(N).fill(0));
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const dfs = (x, y) => {
    if (dp[x][y] !== 0) return dp[x][y];

    dp[x][y] = 1;

    for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy

        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
        if (board[nx][ny] > board[x][y]) {
            dp[x][y] = Math.max(dp[x][y], dfs(nx, ny) + 1);
        }
    }

    return dp[x][y];
};

const solution = () => {
    let answer = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            answer = Math.max(answer, dfs(i, j));
        }
    }
    console.log(answer);
};

solution();

// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split('\n');
// // let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split('\n');
//
// const N = Number(input.shift());
//
// const boards = input.map(v => v.split(' ').map(Number));
// const dp = Array.from({length: N}, _ => Array(N).fill(-1));
// const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
// const dfs = (x, y) => {
//     if (dp[x][y] === -1) {
//         dp[x][y] = 0;
//         for (const [dx, dy] of dirs) {
//             const nx = x + dx;
//             const ny = y + dy;
//             if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
//             if (boards[x][y] < boards[nx][ny]) {
//                 dp[x][y] = Math.max(dp[x][y], dfs(nx, ny));
//             }
//         }
//     }
//     return dp[x][y] + 1;
// };
// const solution = () => {
//     let max = -1;
//     for (let i = 0; i < N; i++) {
//         for (let j = 0; j < N; j++) {
//             if (dp[i][j] === -1) {
//                 max = Math.max(max, dfs(i, j));
//             }
//         }
//     }
//     console.log(max);
// };
//
// solution();