let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number);
const board = input.map(v => v.split(' ').map(Number));
const visited = Array.from({length: N}, _ => Array(M).fill(false));

const sizeArr = [];

const DFS = (x, y, size) => {
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    visited[x][y] = true;

    for (let i = 0; i < dx.length; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

        if (board[nx][ny] === 1 && !visited[nx][ny]) {
            size = DFS(nx, ny, size + 1);
        }
    }

    return size;
};

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (!visited[i][j] && board[i][j] === 1) {
            sizeArr.push(DFS(i, j, 1));
        }
    }
}
console.log(`${sizeArr.length}\n${sizeArr.reduce((acc, cur) => {
    acc = acc < cur ? cur : acc;
    return acc;
}, 0)}`);
