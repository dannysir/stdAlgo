// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// // let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
//
// const [N, K] = input.shift().split(' ').map(Number);
// const todos = input.map(v => v.split(' ').map(Number));
// const dp = Array.from({length: K + 1}, _ => Array(N + 1).fill(0));
//
// todos.sort((a, b) => {
//     if (a[1] !== b[1]) {
//         return a[1] - b[1];
//     } else {
//         return a[0] - b[0];
//     }
// });
//
// for (let i = 1; i < K + 1; i++) {
//     const [value, weight] = todos[i - 1];
//     for (let j = 1; j < N + 1; j++) {
//         if (j >= weight) {
//             dp[i][j] = Math.max(dp[i - 1][j - weight] + value, dp[i - 1][j]);
//         } else {
//             dp[i][j] = dp[i - 1][j];
//         }
//     }
// }
// console.log(dp[K][N]);

let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, K] = input.shift().split(' ').map(Number);
const todos = input.map(v => v.split(' ').map(Number));
const singleArr = Array(N + 1).fill(0);

for (const todo of todos) {
    const [value, weight] = todo;

    for (let i = N; i >= weight; i--) {
        singleArr[i] = Math.max(singleArr[i - weight] + value, singleArr[i]);
    }
}
console.log(singleArr[N]);