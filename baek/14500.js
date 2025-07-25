let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(v => +v);
const boards = input.map(v => v.split(' ').map(Number));
const visited = Array.from({length: N}, _ => Array(M).fill(false));
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
let answer = 0;
const dfs = (x, y, cnt, sum) => {
    if (cnt === 4) {
        answer = Math.max(answer, sum);
        return;
    }

    for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
        if (!visited[nx][ny]) {
            if (cnt === 2) {
                visited[nx][ny] = true;
                dfs(x, y, cnt + 1, sum + boards[nx][ny]);
                visited[nx][ny] = false;
            }
            visited[nx][ny] = true;
            dfs(nx, ny, cnt + 1, sum + boards[nx][ny]);
            visited[nx][ny] = false;
        }
    }
};

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        visited[i][j] = true;
        dfs(i, j, 1, boards[i][j]);
        visited[i][j] = false;
    }
}
console.log(answer);
// let fs = require("fs");
// let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// // let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");
// const [N, M] = input.shift().split(' ').map(Number);
// const MAP = input.map(v => v.split(' ').map(Number));
// let visited = Array.from({length: N}, _ => Array.from({length: M}, _ => false));
// let maxValue = 0;
// MAP.forEach(v => {
//     maxValue = Math.max(maxValue, ...v);
// });
// let max = 0;
// const DFS = (now, cnt, value) => {
//     if (value + (4 - cnt) * maxValue < max) return;
//     if (cnt === 4) {
//         max = Math.max(max, value);
//         return;
//     }
//
//     const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
//     for (const dir of dirs) {
//         const NextX = now[0] + dir[0];
//         const NextY = now[1] + dir[1];
//         if (NextX < 0 || NextX >= N || NextY < 0 || NextY >= M) continue;
//
//         if (!visited[NextX][NextY]) {
//             if (cnt === 2) {
//                 visited[NextX][NextY] = true;
//                 DFS(now, cnt + 1, value + MAP[NextX][NextY]);
//                 visited[NextX][NextY] = false;
//             }
//             visited[NextX][NextY] = true;
//             DFS([NextX, NextY], cnt + 1, value + MAP[NextX][NextY]);
//             visited[NextX][NextY] = false;
//
//         }
//     }
// };
//
// const solution = () => {
//     for (let i = 0; i < N; i++) {
//         for (let j = 0; j < M; j++) {
//             visited[i][j] = true;
//             DFS([i, j], 1, MAP[i][j]);
//             visited[i][j] = false;
//         }
//     }
// };
// solution();
// console.log(max);
