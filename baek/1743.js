let fs = require("fs");
let input = fs.readFileSync("./input.text").toString().trim().split("\n");
// let input = require("fs").readFileSync(0, 'utf-8').toString().trim().split("\n");

const [N, M, K] = input.shift().split(' ').map(Number);

const foods = input.map(v => v.split(' ').map(Number));

const boards = Array.from({length: N}, _ => Array(M).fill(0));
const visited = Array.from({length: N}, _ => Array(M).fill(false));
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
let max = 0;

foods.forEach(v => {
    const [x, y] = v;
    boards[x - 1][y - 1] = 1;
})
const dfs = (now, cnt) => {
    max = Math.max(max, cnt[0]);

    for (const [dx, dy] of dirs) {
        const nx = now[0] + dx;
        const ny = now[1] + dy;

        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

        if (!visited[nx][ny] && boards[nx][ny] === 1) {
            visited[nx][ny] = true;
            cnt[0]++;
            dfs([nx, ny], cnt);
        }
    }
}

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (boards[i][j] === 1 && !visited[i][j]) {
            dfs([i, j], [0]);
        }
    }
}

console.log(max);